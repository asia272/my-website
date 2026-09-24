import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const projectType = v.union(
    v.literal("GEN_AI"),
    v.literal("WEB_DEVELOPMENT"),
    v.literal("MOBILE_APP"),
    v.literal("FULL_STACK"),
    v.literal("E_COMMERCE"),
    v.literal("SAAS"),
    v.literal("OTHER"),
);

/**
 * Generate a Convex Storage upload URL.
 *
 * The client uploads the selected image directly
 * to Convex Storage using this URL.
 */
export const generateUploadUrl = mutation({
    args: {},

    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});

/**
 * Get all projects for the admin dashboard.
 *
 * The imageStorageId is converted into an actual
 * usable image URL before returning the project.
 */
export const getAll = query({
    args: {},

    handler: async (ctx) => {
        const projects = await ctx.db
            .query("projects")
            .order("desc")
            .collect();

        return await Promise.all(
            projects.map(async (project) => {
                const imageUrl =
                    await ctx.storage.getUrl(
                        project.imageStorageId,
                    );

                return {
                    ...project,
                    imageUrl,
                };
            }),
        );
    },
});


//  * Get all active projects by project type.
//  *
//  * Used by the public project category pages:
//  *

export const getByType = query({
    args: {
        type: projectType,
    },

    handler: async (ctx, args) => {
        const projects = await ctx.db
            .query("projects")
            .filter((q) =>
                q.and(
                    q.eq(q.field("type"), args.type),
                    q.eq(q.field("isActive"), true),
                ),
            )
            .order("desc")
            .collect();

        return await Promise.all(
            projects.map(async (project) => {
                const imageUrl =
                    await ctx.storage.getUrl(
                        project.imageStorageId,
                    );

                return {
                    ...project,
                    imageUrl,
                };
            }),
        );
    },
});
/**
 * Get one project.
 *
 * Used by the Edit Project page.
 */
export const getById = query({
    args: {
        id: v.id("projects"),
    },

    handler: async (ctx, args) => {
        const project = await ctx.db.get(args.id);

        if (!project) {
            return null;
        }

        const imageUrl =
            await ctx.storage.getUrl(
                project.imageStorageId,
            );

        return {
            ...project,
            imageUrl,
        };
    },
});

/**
 * Create project.
 */
export const create = mutation({
    args: {
        name: v.string(),
        description: v.string(),

        imageStorageId: v.id("_storage"),

        type: projectType,

        isFeatured: v.boolean(),
        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const name = args.name.trim();
        const description =
            args.description.trim();

        if (!name) {
            throw new Error(
                "Project name is required.",
            );
        }

        if (!description) {
            throw new Error(
                "Project description is required.",
            );
        }

        if (!args.imageStorageId) {
            throw new Error(
                "Project image is required.",
            );
        }

        const now = Date.now();

        return await ctx.db.insert("projects", {
            name,
            description,

            imageStorageId:
                args.imageStorageId,

            type: args.type,

            isFeatured: args.isFeatured,
            isActive: args.isActive,

            createdAt: now,
            updatedAt: now,
        });
    },
});

/**
 * Update project.
 */
export const update = mutation({
    args: {
        id: v.id("projects"),

        name: v.string(),
        description: v.string(),

        imageStorageId: v.id("_storage"),

        type: projectType,

        isFeatured: v.boolean(),
        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const name = args.name.trim();
        const description =
            args.description.trim();

        if (!name) {
            throw new Error(
                "Project name is required.",
            );
        }

        if (!description) {
            throw new Error(
                "Project description is required.",
            );
        }

        if (!args.imageStorageId) {
            throw new Error(
                "Project image is required.",
            );
        }

        const existingProject =
            await ctx.db.get(args.id);

        if (!existingProject) {
            throw new Error(
                "Project not found.",
            );
        }

        /*
         * If the image changed, remove the old image
         * from Convex Storage.
         */
        if (
            existingProject.imageStorageId !==
            args.imageStorageId
        ) {
            await ctx.storage.delete(
                existingProject.imageStorageId,
            );
        }

        await ctx.db.patch(args.id, {
            name,
            description,

            imageStorageId:
                args.imageStorageId,

            type: args.type,

            isFeatured: args.isFeatured,
            isActive: args.isActive,

            updatedAt: Date.now(),
        });

        return args.id;
    },
});

/**
 * Delete project.
 *
 * The associated Convex Storage image is also
 * deleted so unused files don't remain.
 */
export const remove = mutation({
    args: {
        id: v.id("projects"),
    },

    handler: async (ctx, args) => {
        const project = await ctx.db.get(args.id);

        if (!project) {
            throw new Error(
                "Project not found.",
            );
        }

        await ctx.storage.delete(
            project.imageStorageId,
        );

        await ctx.db.delete(args.id);

        return {
            success: true,
        };
    },
});
import {
    internalMutation,
    mutation,
    query,
    type QueryCtx,
} from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { v } from "convex/values";

const mediaType = v.union(
    v.literal("IMAGE"),
    v.literal("VIDEO"),
);

const UNCATEGORIZED_LABEL = "Other";

/**
 * Normalize and validate an optional URL.
 *
 * Empty values are stored as undefined.
 * Only HTTP and HTTPS URLs are accepted.
 */
function normalizeOptionalUrl(
    value: string | undefined,
    fieldName: string,
) {
    const trimmed = value?.trim();

    if (!trimmed) {
        return undefined;
    }

    try {
        const url = new URL(trimmed);

        if (
            url.protocol !== "http:" &&
            url.protocol !== "https:"
        ) {
            throw new Error();
        }

        return url.toString();
    } catch {
        throw new Error(
            `${fieldName} must be a valid HTTP or HTTPS URL.`,
        );
    }
}

/**
 * Validate that the correct storage ID exists
 * for the selected media type.
 */
function validateMedia(
    selectedMediaType: "IMAGE" | "VIDEO",
    imageStorageId: string | undefined,
    videoStorageId: string | undefined,
) {
    if (selectedMediaType === "IMAGE") {
        if (!imageStorageId) {
            throw new Error("Project image is required.");
        }

        if (videoStorageId) {
            throw new Error(
                "Only one project media type can be used at a time.",
            );
        }
    }

    if (selectedMediaType === "VIDEO") {
        if (!videoStorageId) {
            throw new Error("Project video is required.");
        }

        if (imageStorageId) {
            throw new Error(
                "Only one project media type can be used at a time.",
            );
        }
    }
}

/**
 * Attach usable media URLs and the service-based
 * project type to a project.
 *
 * `serviceTitles` is a cache so each service is
 * only read once per query.
 *
 * Returned fields:
 * - serviceId     -> the real reference
 * - serviceTitle  -> title of the service
 * - typeLabel     -> same as serviceTitle (display label)
 * - type          -> LEGACY alias = service title, so existing
 *                    frontend code reading `project.type` keeps working
 */
async function enrichProject(
    ctx: QueryCtx,
    project: Doc<"projects">,
    serviceTitles: Map<Id<"services">, string | null>,
) {
    const imageUrl = project.imageStorageId
        ? await ctx.storage.getUrl(project.imageStorageId)
        : null;

    const videoUrl = project.videoStorageId
        ? await ctx.storage.getUrl(project.videoStorageId)
        : null;

    let serviceTitle: string | null = null;

    if (project.serviceId) {
        if (!serviceTitles.has(project.serviceId)) {
            const service = await ctx.db.get(project.serviceId);
            serviceTitles.set(
                project.serviceId,
                service?.title ?? null,
            );
        }

        serviceTitle = serviceTitles.get(project.serviceId) ?? null;
    }

    const typeLabel = serviceTitle ?? UNCATEGORIZED_LABEL;

    return {
        ...project,
        imageUrl,
        videoUrl,
        serviceTitle,
        typeLabel,
        type: typeLabel,
    };
}

async function enrichProjects(
    ctx: QueryCtx,
    projects: Doc<"projects">[],
) {
    const serviceTitles = new Map<Id<"services">, string | null>();

    return await Promise.all(
        projects.map((project) =>
            enrichProject(ctx, project, serviceTitles),
        ),
    );
}

//  * Get all active projects.
//  *
//  * Used by the public /projects page.
export const getAllActive = query({
    args: {},

    handler: async (ctx) => {
        const projects = await ctx.db
            .query("projects")
            .filter((q) => q.eq(q.field("isActive"), true))
            .order("desc")
            .collect();

        return await enrichProjects(ctx, projects);
    },
});

/**
 * Generate a Convex Storage upload URL.
 */
export const generateUploadUrl = mutation({
    args: {},

    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});

/**
 * Get all projects for the admin dashboard.
 */
export const getAll = query({
    args: {},

    handler: async (ctx) => {
        const projects = await ctx.db
            .query("projects")
            .order("desc")
            .collect();

        return await enrichProjects(ctx, projects);
    },
});

/**
 * Get all active projects of one service.
 *
 * Replaces the old getByType.
 * The project type is now the service itself.
 */
export const getByService = query({
    args: {
        serviceId: v.id("services"),
    },

    handler: async (ctx, args) => {
        const projects = await ctx.db
            .query("projects")
            .withIndex("by_service", (q) =>
                q.eq("serviceId", args.serviceId),
            )
            .filter((q) => q.eq(q.field("isActive"), true))
            .order("desc")
            .collect();

        return await enrichProjects(ctx, projects);
    },
});

/**
 * Get one project.
 *
 * Used by the Edit Project page and
 * project detail page.
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

        const [enriched] = await enrichProjects(ctx, [project]);

        return enriched;
    },
});

/**
 * Create project.
 */
export const create = mutation({
    args: {
        name: v.string(),
        description: v.string(),

        githubUrl: v.optional(v.string()),
        liveDemoUrl: v.optional(v.string()),

        mediaType,

        imageStorageId: v.optional(v.id("_storage")),
        videoStorageId: v.optional(v.id("_storage")),

        // Project type = the service it belongs to
        serviceId: v.id("services"),

        isFeatured: v.boolean(),
        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const name = args.name.trim();
        const description = args.description.trim();

        if (!name) {
            throw new Error("Project name is required.");
        }

        if (!description) {
            throw new Error("Project description is required.");
        }

        const service = await ctx.db.get(args.serviceId);

        if (!service) {
            throw new Error("Selected service was not found.");
        }

        validateMedia(
            args.mediaType,
            args.imageStorageId,
            args.videoStorageId,
        );

        const githubUrl = normalizeOptionalUrl(
            args.githubUrl,
            "GitHub URL",
        );

        const liveDemoUrl = normalizeOptionalUrl(
            args.liveDemoUrl,
            "Live Demo URL",
        );

        const now = Date.now();

        return await ctx.db.insert("projects", {
            name,
            description,

            githubUrl,
            liveDemoUrl,

            mediaType: args.mediaType,

            imageStorageId:
                args.mediaType === "IMAGE"
                    ? args.imageStorageId
                    : undefined,

            videoStorageId:
                args.mediaType === "VIDEO"
                    ? args.videoStorageId
                    : undefined,

            serviceId: args.serviceId,

            isFeatured: args.isFeatured,
            isActive: args.isActive,

            createdAt: now,
            updatedAt: now,
        });
    },
});

/**
 * Update project.
 *
 * Handles:
 * - media replacement
 * - image -> video changes
 * - video -> image changes
 * - old storage cleanup
 * - service (project type) change
 */
export const update = mutation({
    args: {
        id: v.id("projects"),

        name: v.string(),
        description: v.string(),

        githubUrl: v.optional(v.string()),
        liveDemoUrl: v.optional(v.string()),

        mediaType,

        imageStorageId: v.optional(v.id("_storage")),
        videoStorageId: v.optional(v.id("_storage")),

        serviceId: v.id("services"),

        isFeatured: v.boolean(),
        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const name = args.name.trim();
        const description = args.description.trim();

        if (!name) {
            throw new Error("Project name is required.");
        }

        if (!description) {
            throw new Error("Project description is required.");
        }

        const existingProject = await ctx.db.get(args.id);

        if (!existingProject) {
            throw new Error("Project not found.");
        }

        const service = await ctx.db.get(args.serviceId);

        if (!service) {
            throw new Error("Selected service was not found.");
        }

        validateMedia(
            args.mediaType,
            args.imageStorageId,
            args.videoStorageId,
        );

        const githubUrl = normalizeOptionalUrl(
            args.githubUrl,
            "GitHub URL",
        );

        const liveDemoUrl = normalizeOptionalUrl(
            args.liveDemoUrl,
            "Live Demo URL",
        );

        /*
         * Delete the previous image when:
         * 1. Media changed from IMAGE -> VIDEO
         * 2. A new image was uploaded
         */
        if (
            existingProject.imageStorageId &&
            (args.mediaType === "VIDEO" ||
                existingProject.imageStorageId !==
                args.imageStorageId)
        ) {
            await ctx.storage.delete(
                existingProject.imageStorageId,
            );
        }

        /*
         * Delete the previous video when:
         * 1. Media changed from VIDEO -> IMAGE
         * 2. A new video was uploaded
         */
        if (
            existingProject.videoStorageId &&
            (args.mediaType === "IMAGE" ||
                existingProject.videoStorageId !==
                args.videoStorageId)
        ) {
            await ctx.storage.delete(
                existingProject.videoStorageId,
            );
        }

        await ctx.db.patch(args.id, {
            name,
            description,

            githubUrl,
            liveDemoUrl,

            mediaType: args.mediaType,

            imageStorageId:
                args.mediaType === "IMAGE"
                    ? args.imageStorageId
                    : undefined,

            videoStorageId:
                args.mediaType === "VIDEO"
                    ? args.videoStorageId
                    : undefined,

            serviceId: args.serviceId,

            // Old hardcoded type is no longer used
            type: undefined,

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
 * Deletes whichever media file is currently
 * associated with the project.
 */
export const remove = mutation({
    args: {
        id: v.id("projects"),
    },

    handler: async (ctx, args) => {
        const project = await ctx.db.get(args.id);

        if (!project) {
            throw new Error("Project not found.");
        }

        if (project.imageStorageId) {
            await ctx.storage.delete(project.imageStorageId);
        }

        if (project.videoStorageId) {
            await ctx.storage.delete(project.videoStorageId);
        }

        await ctx.db.delete(args.id);

        return { success: true };
    },
});

/**
 * ONE-TIME MIGRATION (run from the Convex dashboard).
 *
 * Links old projects to services by matching the legacy
 * type to a service title, ignoring case and punctuation:
 *   "GEN_AI" matches "Gen AI"
 *   "WEB_DEVELOPMENT" matches "Web Development"
 *
 * Projects with no matching service are left untouched and
 * listed in the result, so you can assign them from the
 * admin edit form.
 *
 * Safe to run multiple times.
 */
const normalizeKey = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");

export const migrateTypesToServices = internalMutation({
    args: {},

    handler: async (ctx) => {
        const services = await ctx.db.query("services").collect();
        const projects = await ctx.db.query("projects").collect();

        const serviceByKey = new Map(
            services.map((s) => [normalizeKey(s.title), s._id]),
        );

        let migrated = 0;
        const unmatched: { id: string; name: string; type?: string }[] = [];

        for (const project of projects) {
            if (project.serviceId) continue;

            const serviceId = project.type
                ? serviceByKey.get(normalizeKey(project.type))
                : undefined;

            if (serviceId) {
                await ctx.db.patch(project._id, {
                    serviceId,
                    type: undefined,
                });
                migrated++;
            } else {
                unmatched.push({
                    id: project._id,
                    name: project.name,
                    type: project.type,
                });
            }
        }

        return { migrated, unmatched };
    },
});
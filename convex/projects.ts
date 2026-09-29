// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// const projectType = v.union(
//     v.literal("GEN_AI"),
//     v.literal("WEB_DEVELOPMENT"),
//     v.literal("MOBILE_APP"),
//     v.literal("FULL_STACK"),
//     v.literal("E_COMMERCE"),
//     v.literal("SAAS"),
//     v.literal("OTHER"),
// );

// /**
//  * Generate a Convex Storage upload URL.
//  *
//  * The client uploads the selected image directly
//  * to Convex Storage using this URL.
//  */
// export const generateUploadUrl = mutation({
//     args: {},

//     handler: async (ctx) => {
//         return await ctx.storage.generateUploadUrl();
//     },
// });

// /**
//  * Get all projects for the admin dashboard.
//  *
//  * The imageStorageId is converted into an actual
//  * usable image URL before returning the project.
//  */
// export const getAll = query({
//     args: {},

//     handler: async (ctx) => {
//         const projects = await ctx.db
//             .query("projects")
//             .order("desc")
//             .collect();

//         return await Promise.all(
//             projects.map(async (project) => {
//                 const imageUrl =
//                     await ctx.storage.getUrl(
//                         project.imageStorageId,
//                     );

//                 return {
//                     ...project,
//                     imageUrl,
//                 };
//             }),
//         );
//     },
// });


// //  * Get all active projects by project type.
// //  *
// //  * Used by the public project category pages:
// //  *

// export const getByType = query({
//     args: {
//         type: projectType,
//     },

//     handler: async (ctx, args) => {
//         const projects = await ctx.db
//             .query("projects")
//             .filter((q) =>
//                 q.and(
//                     q.eq(q.field("type"), args.type),
//                     q.eq(q.field("isActive"), true),
//                 ),
//             )
//             .order("desc")
//             .collect();

//         return await Promise.all(
//             projects.map(async (project) => {
//                 const imageUrl =
//                     await ctx.storage.getUrl(
//                         project.imageStorageId,
//                     );

//                 return {
//                     ...project,
//                     imageUrl,
//                 };
//             }),
//         );
//     },
// });
// /**
//  * Get one project.
//  *
//  * Used by the Edit Project page.
//  */
// export const getById = query({
//     args: {
//         id: v.id("projects"),
//     },

//     handler: async (ctx, args) => {
//         const project = await ctx.db.get(args.id);

//         if (!project) {
//             return null;
//         }

//         const imageUrl =
//             await ctx.storage.getUrl(
//                 project.imageStorageId,
//             );

//         return {
//             ...project,
//             imageUrl,
//         };
//     },
// });

// /**
//  * Create project.
//  */
// export const create = mutation({
//     args: {
//         name: v.string(),
//         description: v.string(),

//         imageStorageId: v.id("_storage"),

//         type: projectType,

//         isFeatured: v.boolean(),
//         isActive: v.boolean(),
//     },

//     handler: async (ctx, args) => {
//         const name = args.name.trim();
//         const description =
//             args.description.trim();

//         if (!name) {
//             throw new Error(
//                 "Project name is required.",
//             );
//         }

//         if (!description) {
//             throw new Error(
//                 "Project description is required.",
//             );
//         }

//         if (!args.imageStorageId) {
//             throw new Error(
//                 "Project image is required.",
//             );
//         }

//         const now = Date.now();

//         return await ctx.db.insert("projects", {
//             name,
//             description,

//             imageStorageId:
//                 args.imageStorageId,

//             type: args.type,

//             isFeatured: args.isFeatured,
//             isActive: args.isActive,

//             createdAt: now,
//             updatedAt: now,
//         });
//     },
// });

// /**
//  * Update project.
//  */
// export const update = mutation({
//     args: {
//         id: v.id("projects"),

//         name: v.string(),
//         description: v.string(),

//         imageStorageId: v.id("_storage"),

//         type: projectType,

//         isFeatured: v.boolean(),
//         isActive: v.boolean(),
//     },

//     handler: async (ctx, args) => {
//         const name = args.name.trim();
//         const description =
//             args.description.trim();

//         if (!name) {
//             throw new Error(
//                 "Project name is required.",
//             );
//         }

//         if (!description) {
//             throw new Error(
//                 "Project description is required.",
//             );
//         }

//         if (!args.imageStorageId) {
//             throw new Error(
//                 "Project image is required.",
//             );
//         }

//         const existingProject =
//             await ctx.db.get(args.id);

//         if (!existingProject) {
//             throw new Error(
//                 "Project not found.",
//             );
//         }

//         /*
//          * If the image changed, remove the old image
//          * from Convex Storage.
//          */
//         if (
//             existingProject.imageStorageId !==
//             args.imageStorageId
//         ) {
//             await ctx.storage.delete(
//                 existingProject.imageStorageId,
//             );
//         }

//         await ctx.db.patch(args.id, {
//             name,
//             description,

//             imageStorageId:
//                 args.imageStorageId,

//             type: args.type,

//             isFeatured: args.isFeatured,
//             isActive: args.isActive,

//             updatedAt: Date.now(),
//         });

//         return args.id;
//     },
// });

// /**
//  * Delete project.
//  *
//  * The associated Convex Storage image is also
//  * deleted so unused files don't remain.
//  */
// export const remove = mutation({
//     args: {
//         id: v.id("projects"),
//     },

//     handler: async (ctx, args) => {
//         const project = await ctx.db.get(args.id);

//         if (!project) {
//             throw new Error(
//                 "Project not found.",
//             );
//         }

//         await ctx.storage.delete(
//             project.imageStorageId,
//         );

//         await ctx.db.delete(args.id);

//         return {
//             success: true,
//         };
//     },
// });



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

const mediaType = v.union(
    v.literal("IMAGE"),
    v.literal("VIDEO"),
);

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
    imageStorageId:
        | string
        | undefined,
    videoStorageId:
        | string
        | undefined,
) {
    if (selectedMediaType === "IMAGE") {
        if (!imageStorageId) {
            throw new Error(
                "Project image is required.",
            );
        }

        if (videoStorageId) {
            throw new Error(
                "Only one project media type can be used at a time.",
            );
        }
    }

    if (selectedMediaType === "VIDEO") {
        if (!videoStorageId) {
            throw new Error(
                "Project video is required.",
            );
        }

        if (imageStorageId) {
            throw new Error(
                "Only one project media type can be used at a time.",
            );
        }
    }
}

/**
 * Generate a Convex Storage upload URL.
 *
 * The client uploads the selected image or video
 * directly to Convex Storage using this URL.
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
 * Returns the usable media URL based on the
 * project's selected media type.
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
                    project.imageStorageId
                        ? await ctx.storage.getUrl(
                            project.imageStorageId,
                        )
                        : null;

                const videoUrl =
                    project.videoStorageId
                        ? await ctx.storage.getUrl(
                            project.videoStorageId,
                        )
                        : null;

                return {
                    ...project,
                    imageUrl,
                    videoUrl,
                };
            }),
        );
    },
});

/**
 * Get all active projects by project type.
 *
 * Used by the public project category pages.
 */
export const getByType = query({
    args: {
        type: projectType,
    },

    handler: async (ctx, args) => {
        const projects = await ctx.db
            .query("projects")
            .filter((q) =>
                q.and(
                    q.eq(
                        q.field("type"),
                        args.type,
                    ),
                    q.eq(
                        q.field("isActive"),
                        true,
                    ),
                ),
            )
            .order("desc")
            .collect();

        return await Promise.all(
            projects.map(async (project) => {
                const imageUrl =
                    project.imageStorageId
                        ? await ctx.storage.getUrl(
                            project.imageStorageId,
                        )
                        : null;

                const videoUrl =
                    project.videoStorageId
                        ? await ctx.storage.getUrl(
                            project.videoStorageId,
                        )
                        : null;

                return {
                    ...project,
                    imageUrl,
                    videoUrl,
                };
            }),
        );
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

        const imageUrl =
            project.imageStorageId
                ? await ctx.storage.getUrl(
                    project.imageStorageId,
                )
                : null;

        const videoUrl =
            project.videoStorageId
                ? await ctx.storage.getUrl(
                    project.videoStorageId,
                )
                : null;

        return {
            ...project,
            imageUrl,
            videoUrl,
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

        githubUrl: v.optional(v.string()),
        liveDemoUrl: v.optional(v.string()),

        mediaType,

        imageStorageId: v.optional(
            v.id("_storage"),
        ),

        videoStorageId: v.optional(
            v.id("_storage"),
        ),

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

        validateMedia(
            args.mediaType,
            args.imageStorageId,
            args.videoStorageId,
        );

        const githubUrl =
            normalizeOptionalUrl(
                args.githubUrl,
                "GitHub URL",
            );

        const liveDemoUrl =
            normalizeOptionalUrl(
                args.liveDemoUrl,
                "Live Demo URL",
            );

        const now = Date.now();

        return await ctx.db.insert(
            "projects",
            {
                name,
                description,

                githubUrl,
                liveDemoUrl,

                mediaType:

                    args.mediaType,

                imageStorageId:
                    args.mediaType === "IMAGE"
                        ? args.imageStorageId
                        : undefined,

                videoStorageId:
                    args.mediaType === "VIDEO"
                        ? args.videoStorageId
                        : undefined,

                type: args.type,

                isFeatured:
                    args.isFeatured,

                isActive:
                    args.isActive,

                createdAt: now,
                updatedAt: now,
            },
        );
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
 */
export const update = mutation({
    args: {
        id: v.id("projects"),

        name: v.string(),
        description: v.string(),

        githubUrl: v.optional(v.string()),
        liveDemoUrl: v.optional(v.string()),

        mediaType,

        imageStorageId: v.optional(
            v.id("_storage"),
        ),

        videoStorageId: v.optional(
            v.id("_storage"),
        ),

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

        const existingProject =
            await ctx.db.get(args.id);

        if (!existingProject) {
            throw new Error(
                "Project not found.",
            );
        }

        validateMedia(
            args.mediaType,
            args.imageStorageId,
            args.videoStorageId,
        );

        const githubUrl =
            normalizeOptionalUrl(
                args.githubUrl,
                "GitHub URL",
            );

        const liveDemoUrl =
            normalizeOptionalUrl(
                args.liveDemoUrl,
                "Live Demo URL",
            );

        /*
         * Delete the previous image when:
         *
         * 1. Media changed from IMAGE -> VIDEO
         * 2. A new image was uploaded
         */
        if (
            existingProject.imageStorageId &&
            (
                args.mediaType === "VIDEO" ||
                existingProject.imageStorageId !==
                args.imageStorageId
            )
        ) {
            await ctx.storage.delete(
                existingProject.imageStorageId,
            );
        }

        /*
         * Delete the previous video when:
         *
         * 1. Media changed from VIDEO -> IMAGE
         * 2. A new video was uploaded
         */
        if (
            existingProject.videoStorageId &&
            (
                args.mediaType === "IMAGE" ||
                existingProject.videoStorageId !==
                args.videoStorageId
            )
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

            mediaType:

                args.mediaType,

            imageStorageId:
                args.mediaType === "IMAGE"
                    ? args.imageStorageId
                    : undefined,

            videoStorageId:
                args.mediaType === "VIDEO"
                    ? args.videoStorageId
                    : undefined,

            type: args.type,

            isFeatured:
                args.isFeatured,

            isActive:
                args.isActive,

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
            throw new Error(
                "Project not found.",
            );
        }

        if (project.imageStorageId) {
            await ctx.storage.delete(
                project.imageStorageId,
            );
        }

        if (project.videoStorageId) {
            await ctx.storage.delete(
                project.videoStorageId,
            );
        }

        await ctx.db.delete(args.id);

        return {
            success: true,
        };
    },
});
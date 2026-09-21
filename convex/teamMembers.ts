import {
    mutation,
    query,
} from "./_generated/server";

import {
    v,
} from "convex/values";

/**
 * Get all team members.
 *
 * Admin dashboard uses this query to display
 * the complete team list.
 */
export const list = query({
    args: {},

    handler: async (ctx) => {
        const teamMembers =
            await ctx.db
                .query("teamMembers")
                .order("desc")
                .collect();

        return Promise.all(
            teamMembers.map(
                async (teamMember) => {
                    const imageUrl =
                        await ctx.storage.getUrl(
                            teamMember.imageStorageId,
                        );

                    return {
                        ...teamMember,
                        imageUrl,
                    };
                },
            ),
        );
    },
});


/**
 * Get one team member by ID.
 *
 * Used by the edit page.
 */
export const getById = query({
    args: {
        id: v.id("teamMembers"),
    },

    handler: async (ctx, args) => {
        const teamMember =
            await ctx.db.get(args.id);

        if (!teamMember) {
            return null;
        }

        const imageUrl =
            await ctx.storage.getUrl(
                teamMember.imageStorageId,
            );

        return {
            ...teamMember,
            imageUrl,
        };
    },
});


/**
 * Get active team members.
 *
 * This can be used later by the public website
 * to display only visible team members.
 */
export const listActive = query({
    args: {},

    handler: async (ctx) => {
        const teamMembers =
            await ctx.db
                .query("teamMembers")
                .withIndex(
                    "by_active",
                    (query) =>
                        query.eq(
                            "isActive",
                            true,
                        ),
                )
                .order("desc")
                .collect();

        return Promise.all(
            teamMembers.map(
                async (teamMember) => {
                    const imageUrl =
                        await ctx.storage.getUrl(
                            teamMember.imageStorageId,
                        );

                    return {
                        ...teamMember,
                        imageUrl,
                    };
                },
            ),
        );
    },
});


/**
 * Generate a Convex storage upload URL.
 *
 * The client uploads the selected image directly
 * to Convex storage using this URL.
 */
export const generateUploadUrl =
    mutation({
        args: {},

        handler: async (ctx) => {
            return await ctx.storage.generateUploadUrl();
        },
    });


/**
 * Create a new team member.
 */
export const create = mutation({
    args: {
        name: v.string(),
        role: v.string(),
        description: v.string(),

        imageStorageId:
            v.id("_storage"),

        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const now = Date.now();

        const name =
            args.name.trim();

        const role =
            args.role.trim();

        const description =
            args.description.trim();

        if (!name) {
            throw new Error(
                "Team member name is required.",
            );
        }

        if (!role) {
            throw new Error(
                "Team member role is required.",
            );
        }

        if (!description) {
            throw new Error(
                "Team member description is required.",
            );
        }

        const teamMemberId =
            await ctx.db.insert(
                "teamMembers",
                {
                    name,
                    role,
                    description,
                    imageStorageId:
                        args.imageStorageId,
                    isActive:
                        args.isActive,
                    createdAt: now,
                    updatedAt: now,
                },
            );

        return teamMemberId;
    },
});


/**
 * Update an existing team member.
 */
export const update = mutation({
    args: {
        id: v.id("teamMembers"),

        name: v.string(),
        role: v.string(),
        description: v.string(),

        imageStorageId:
            v.id("_storage"),

        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const existingTeamMember =
            await ctx.db.get(args.id);

        if (!existingTeamMember) {
            throw new Error(
                "Team member not found.",
            );
        }

        const name =
            args.name.trim();

        const role =
            args.role.trim();

        const description =
            args.description.trim();

        if (!name) {
            throw new Error(
                "Team member name is required.",
            );
        }

        if (!role) {
            throw new Error(
                "Team member role is required.",
            );
        }

        if (!description) {
            throw new Error(
                "Team member description is required.",
            );
        }

        await ctx.db.patch(
            args.id,
            {
                name,
                role,
                description,
                imageStorageId:
                    args.imageStorageId,
                isActive:
                    args.isActive,
                updatedAt: Date.now(),
            },
        );

        /**
         * Delete the previous image when a new
         * image has been uploaded.
         *
         * This prevents unused images from remaining
         * in Convex storage after an update.
         */
        if (
            existingTeamMember.imageStorageId !==
            args.imageStorageId
        ) {
            await ctx.storage.delete(
                existingTeamMember.imageStorageId,
            );
        }

        return args.id;
    },
});


/**
 * Delete a team member and its stored image.
 */
export const remove = mutation({
    args: {
        id: v.id("teamMembers"),
    },

    handler: async (ctx, args) => {
        const teamMember =
            await ctx.db.get(args.id);

        if (!teamMember) {
            throw new Error(
                "Team member not found.",
            );
        }

        /**
         * Delete the image from Convex storage
         * before deleting the database record.
         */
        await ctx.storage.delete(
            teamMember.imageStorageId,
        );

        await ctx.db.delete(args.id);

        return args.id;
    },
});
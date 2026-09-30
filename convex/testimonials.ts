import {
    mutation,
    query,
} from "./_generated/server";

import {
    v,
} from "convex/values";


/**
 * Get all testimonials for the admin dashboard.
 */
export const getAll = query({
    args: {},

    handler: async (ctx) => {
        const testimonials =
            await ctx.db
                .query("testimonials")
                .order("desc")
                .collect();

        return Promise.all(
            testimonials.map(
                async (testimonial) => ({
                    ...testimonial,

                    imageUrl:
                        testimonial.imageStorageId
                            ? await ctx.storage.getUrl(
                                testimonial.imageStorageId,
                            )
                            : null,
                }),
            ),
        );
    },
});

/**
 * Get a single testimonial by ID.
 */
export const getById = query({
    args: {
        id: v.id("testimonials"),
    },

    handler: async (ctx, args) => {
        const testimonial =
            await ctx.db.get(args.id);

        if (!testimonial) {
            return null;
        }

        return {
            ...testimonial,

            imageUrl:
                testimonial.imageStorageId
                    ? await ctx.storage.getUrl(
                        testimonial.imageStorageId,
                    )
                    : null,
        };
    },
});

/**
 * Get only active testimonials for the public website.
 */
export const listActive = query({
    args: {},

    handler: async (ctx) => {
        const testimonials =
            await ctx.db
                .query("testimonials")
                .filter((q) =>
                    q.eq(
                        q.field("isActive"),
                        true,
                    ),
                )
                .order("desc")
                .collect();

        return Promise.all(
            testimonials.map(
                async (testimonial) => ({
                    ...testimonial,

                    imageUrl:
                        testimonial.imageStorageId
                            ? await ctx.storage.getUrl(
                                testimonial.imageStorageId,
                            )
                            : null,
                }),
            ),
        );
    },
});


/**
 * Generate a Convex storage upload URL
 * for an optional testimonial image.
 */
export const generateUploadUrl = mutation({
    args: {},

    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});


/**
 * Create a new testimonial.
 */
export const create = mutation({
    args: {
        name: v.string(),

        role: v.optional(
            v.string(),
        ),

        company: v.optional(
            v.string(),
        ),

        message: v.string(),

        rating: v.number(),

        imageStorageId: v.optional(
            v.id("_storage"),
        ),

        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const now = Date.now();

        if (
            args.rating < 1 ||
            args.rating > 5
        ) {
            throw new Error(
                "Rating must be between 1 and 5.",
            );
        }

        if (
            !Number.isInteger(
                args.rating,
            )
        ) {
            throw new Error(
                "Rating must be a whole number.",
            );
        }

        const name =
            args.name.trim();

        const message =
            args.message.trim();

        const role =
            args.role?.trim();

        const company =
            args.company?.trim();

        if (!name) {
            throw new Error(
                "Client name is required.",
            );
        }

        if (!message) {
            throw new Error(
                "Testimonial message is required.",
            );
        }

        return await ctx.db.insert(
            "testimonials",
            {
                name,

                role:
                    role || undefined,

                company:
                    company || undefined,

                message,

                rating: args.rating,

                imageStorageId:
                    args.imageStorageId,

                isActive:
                    args.isActive,

                createdAt: now,

                updatedAt: now,
            },
        );
    },
});


/**
 * Update an existing testimonial.
 */
export const update = mutation({
    args: {
        id: v.id("testimonials"),

        name: v.string(),

        role: v.optional(
            v.string(),
        ),

        company: v.optional(
            v.string(),
        ),

        message: v.string(),

        rating: v.number(),

        imageStorageId: v.optional(
            v.id("_storage"),
        ),

        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const existing =
            await ctx.db.get(args.id);

        if (!existing) {
            throw new Error(
                "Testimonial not found.",
            );
        }

        if (
            args.rating < 1 ||
            args.rating > 5
        ) {
            throw new Error(
                "Rating must be between 1 and 5.",
            );
        }

        if (
            !Number.isInteger(
                args.rating,
            )
        ) {
            throw new Error(
                "Rating must be a whole number.",
            );
        }

        const name =
            args.name.trim();

        const message =
            args.message.trim();

        const role =
            args.role?.trim();

        const company =
            args.company?.trim();

        if (!name) {
            throw new Error(
                "Client name is required.",
            );
        }

        if (!message) {
            throw new Error(
                "Testimonial message is required.",
            );
        }

        /*
         * Delete the old image when a new image
         * is supplied.
         */
        if (
            existing.imageStorageId &&
            args.imageStorageId &&
            existing.imageStorageId !==
            args.imageStorageId
        ) {
            await ctx.storage.delete(
                existing.imageStorageId,
            );
        }

        await ctx.db.patch(
            args.id,
            {
                name,

                role:
                    role || undefined,

                company:
                    company || undefined,

                message,

                rating: args.rating,

                imageStorageId:
                    args.imageStorageId,

                isActive:
                    args.isActive,

                updatedAt:
                    Date.now(),
            },
        );

        return args.id;
    },
});


/**
 * Delete a testimonial.
 *
 * The associated image is also removed
 * from Convex storage.
 */
export const remove = mutation({
    args: {
        id: v.id("testimonials"),
    },

    handler: async (ctx, args) => {
        const testimonial =
            await ctx.db.get(args.id);

        if (!testimonial) {
            throw new Error(
                "Testimonial not found.",
            );
        }

        if (
            testimonial.imageStorageId
        ) {
            await ctx.storage.delete(
                testimonial.imageStorageId,
            );
        }

        await ctx.db.delete(
            args.id,
        );

        return true;
    },
});
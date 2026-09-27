import { v } from "convex/values";

import {
    mutation,
    query,
} from "./_generated/server";

/**
 * Maximum number of list items allowed
 * for a single service.
 */
const MAX_LIST_ITEMS = 20;

/**
 * Maximum field lengths.
 */
const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_LIST_ITEM_LENGTH = 150;
const MAX_ICON_LENGTH = 50;

/**
 * Normalize and validate service list items.
 *
 * - Trims whitespace.
 * - Removes empty items.
 * - Removes duplicate items.
 * - Limits the number of items.
 */
function normalizeListItems(
    listItems: string[],
): string[] {
    const normalizedItems = listItems
        .map((item) => item.trim())
        .filter(Boolean);

    const uniqueItems = [
        ...new Set(normalizedItems),
    ];

    if (
        uniqueItems.length >
        MAX_LIST_ITEMS
    ) {
        throw new Error(
            `A service can have a maximum of ${MAX_LIST_ITEMS} list items.`,
        );
    }

    for (const item of uniqueItems) {
        if (
            item.length >
            MAX_LIST_ITEM_LENGTH
        ) {
            throw new Error(
                `Each list item must be ${MAX_LIST_ITEM_LENGTH} characters or fewer.`,
            );
        }
    }

    return uniqueItems;
}

/**
 * Normalize and validate service title.
 */
function normalizeTitle(
    title: string,
): string {
    const normalizedTitle =
        title.trim();

    if (!normalizedTitle) {
        throw new Error(
            "Service title is required.",
        );
    }

    if (
        normalizedTitle.length >
        MAX_TITLE_LENGTH
    ) {
        throw new Error(
            `Service title must be ${MAX_TITLE_LENGTH} characters or fewer.`,
        );
    }

    return normalizedTitle;
}

/**
 * Normalize and validate service description.
 */
function normalizeDescription(
    description: string,
): string {
    const normalizedDescription =
        description.trim();

    if (!normalizedDescription) {
        throw new Error(
            "Service description is required.",
        );
    }

    if (
        normalizedDescription.length >
        MAX_DESCRIPTION_LENGTH
    ) {
        throw new Error(
            `Service description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`,
        );
    }

    return normalizedDescription;
}

/**
 * Normalize the optional Lucide icon name.
 */
function normalizeIcon(
    icon?: string,
): string | undefined {
    if (icon === undefined) {
        return undefined;
    }

    const normalizedIcon =
        icon.trim();

    if (!normalizedIcon) {
        return undefined;
    }

    if (
        normalizedIcon.length >
        MAX_ICON_LENGTH
    ) {
        throw new Error(
            `Icon name must be ${MAX_ICON_LENGTH} characters or fewer.`,
        );
    }

    return normalizedIcon;
}

/**
 * Make sure another service does not
 * already use the same title.
 *
 * Comparison is case-insensitive.
 */
async function ensureUniqueTitle(
    ctx: any,
    title: string,
    excludeId?: any,
) {
    const services =
        await ctx.db
            .query("services")
            .collect();

    const normalizedTitle =
        title.toLowerCase();

    const duplicate =
        services.find(
            (service: any) =>
                service._id !==
                excludeId &&
                service.title.toLowerCase() ===
                normalizedTitle,
        );

    if (duplicate) {
        throw new Error(
            "A service with this title already exists.",
        );
    }
}

/**
 * Get all services.
 *
 * Convex automatically updates subscribed
 * clients whenever the data changes.
 */
export const getAll = query({
    args: {},

    handler: async (ctx) => {
        return await ctx.db
            .query("services")
            .withIndex("by_created_at")
            .order("desc")
            .collect();
    },
});

/**
 * Get a single service by ID.
 */
export const getById = query({
    args: {
        id: v.id("services"),
    },

    handler: async (ctx, args) => {
        return await ctx.db.get(
            args.id,
        );
    },
});

/**
 * Create a new service.
 */
export const create = mutation({
    args: {
        title: v.string(),
        icon: v.optional(
            v.string(),
        ),
        description: v.string(),
        listItems: v.array(
            v.string(),
        ),
    },

    handler: async (ctx, args) => {
        const title =
            normalizeTitle(
                args.title,
            );

        const description =
            normalizeDescription(
                args.description,
            );

        const icon =
            normalizeIcon(
                args.icon,
            );

        const listItems =
            normalizeListItems(
                args.listItems,
            );

        await ensureUniqueTitle(
            ctx,
            title,
        );

        const now = Date.now();

        const serviceId =
            await ctx.db.insert(
                "services",
                {
                    title,
                    icon,
                    description,
                    listItems,
                    createdAt: now,
                    updatedAt: now,
                },
            );

        return serviceId;
    },
});

/**
 * Update an existing service.
 */
export const update = mutation({
    args: {
        id: v.id("services"),
        title: v.string(),
        icon: v.optional(
            v.string(),
        ),
        description: v.string(),
        listItems: v.array(
            v.string(),
        ),
    },

    handler: async (ctx, args) => {
        const existingService =
            await ctx.db.get(
                args.id,
            );

        if (!existingService) {
            throw new Error(
                "Service not found.",
            );
        }

        const title =
            normalizeTitle(
                args.title,
            );

        const description =
            normalizeDescription(
                args.description,
            );

        const icon =
            normalizeIcon(
                args.icon,
            );

        const listItems =
            normalizeListItems(
                args.listItems,
            );

        await ensureUniqueTitle(
            ctx,
            title,
            args.id,
        );

        await ctx.db.patch(
            args.id,
            {
                title,
                icon,
                description,
                listItems,
                updatedAt:
                    Date.now(),
            },
        );

        return args.id;
    },
});

/**
 * Delete a service.
 */
export const remove = mutation({
    args: {
        id: v.id("services"),
    },

    handler: async (ctx, args) => {
        const existingService =
            await ctx.db.get(
                args.id,
            );

        if (!existingService) {
            throw new Error(
                "Service not found.",
            );
        }

        await ctx.db.delete(
            args.id,
        );

        return args.id;
    },
});
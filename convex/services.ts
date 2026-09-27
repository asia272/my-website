import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Get all services.
 * Newest services are returned first.
 */
export const getAll = query({
    args: {},
    handler: async (ctx) => {
        const services = await ctx.db
            .query("services")
            .withIndex("by_created_at")
            .order("desc")
            .collect();

        return services;
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
        return await ctx.db.get(args.id);
    },
});

/**
 * Create a new service.
 */
export const create = mutation({
    args: {
        title: v.string(),
        icon: v.optional(v.string()),
        description: v.string(),
        listItems: v.array(v.string()),
        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const title = args.title.trim();
        const description = args.description.trim();

        if (!title) {
            throw new Error("Service title is required.");
        }

        if (!description) {
            throw new Error("Service description is required.");
        }

        const listItems = args.listItems
            .map((item) => item.trim())
            .filter(Boolean);

        const existingServices = await ctx.db
            .query("services")
            .withIndex("by_created_at")
            .collect();

        const duplicate = existingServices.find(
            (service) =>
                service.title.toLowerCase() === title.toLowerCase(),
        );

        if (duplicate) {
            throw new Error(
                "A service with this title already exists.",
            );
        }

        const now = Date.now();

        const serviceId = await ctx.db.insert("services", {
            title,
            icon: args.icon?.trim() || undefined,
            description,
            listItems,
            isActive: args.isActive,
            createdAt: now,
            updatedAt: now,
        });

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
        icon: v.optional(v.string()),
        description: v.string(),
        listItems: v.array(v.string()),
        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const existingService = await ctx.db.get(args.id);

        if (!existingService) {
            throw new Error("Service not found.");
        }

        const title = args.title.trim();
        const description = args.description.trim();

        if (!title) {
            throw new Error("Service title is required.");
        }

        if (!description) {
            throw new Error("Service description is required.");
        }

        const listItems = args.listItems
            .map((item) => item.trim())
            .filter(Boolean);

        const existingServices = await ctx.db
            .query("services")
            .withIndex("by_created_at")
            .collect();

        const duplicate = existingServices.find(
            (service) =>
                service._id !== args.id &&
                service.title.toLowerCase() === title.toLowerCase(),
        );

        if (duplicate) {
            throw new Error(
                "A service with this title already exists.",
            );
        }

        await ctx.db.patch(args.id, {
            title,
            icon: args.icon?.trim() || undefined,
            description,
            listItems,
            isActive: args.isActive,
            updatedAt: Date.now(),
        });

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
        const service = await ctx.db.get(args.id);

        if (!service) {
            throw new Error("Service not found.");
        }

        await ctx.db.delete(args.id);

        return args.id;
    },
});
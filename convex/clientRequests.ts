import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

const requestStatus = v.union(
    v.literal("NEW"),
    v.literal("REVIEWING"),
    v.literal("CONTACTED"),
    v.literal("IN_PROGRESS"),
    v.literal("COMPLETED"),
    v.literal("REJECTED"),
);

// Generate a secure upload URL for client attachments
export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});

// Create a new client request
export const create = mutation({
    args: {
        clientName: v.string(),
        email: v.string(),
        phone: v.string(),
        serviceType: v.string(),
        projectDescription: v.string(),
        attachmentStorageId: v.optional(
            v.id("_storage")
        ),
    },

    handler: async (ctx, args) => {
        const now = Date.now();

        const clientName = args.clientName.trim();
        const email = args.email.trim().toLowerCase();
        const phone = args.phone.trim();
        const serviceType = args.serviceType.trim();
        const projectDescription =
            args.projectDescription.trim();

        if (!clientName) {
            throw new Error("Client name is required.");
        }

        if (!email) {
            throw new Error("Email is required.");
        }

        if (!phone) {
            throw new Error("Phone number is required.");
        }

        if (!serviceType) {
            throw new Error("Service type is required.");
        }

        if (!projectDescription) {
            throw new Error(
                "Project description is required."
            );
        }

        const requestId = await ctx.db.insert(
            "clientRequests",
            {
                clientName,
                email,
                phone,
                serviceType,
                projectDescription,
                ...(args.attachmentStorageId
                    ? {
                        attachmentStorageId:
                            args.attachmentStorageId,
                    }
                    : {}),
                status: "NEW",
                createdAt: now,
                updatedAt: now,
            }
        );

        return requestId;
    },
});

// Get all client requests
export const getAll = query({
    args: {},
    handler: async (ctx) => {
        const requests = await ctx.db
            .query("clientRequests")
            .withIndex("by_created_at")
            .order("desc")
            .collect();

        return Promise.all(
            requests.map(async (request) => ({
                ...request,
                attachmentUrl:
                    request.attachmentStorageId
                        ? await ctx.storage.getUrl(
                            request.attachmentStorageId
                        )
                        : null,
            }))
        );
    },
});

// Get a single client request
export const getById = query({
    args: {
        id: v.id("clientRequests"),
    },

    handler: async (ctx, args) => {
        const request = await ctx.db.get(args.id);

        if (!request) {
            return null;
        }

        return {
            ...request,
            attachmentUrl:
                request.attachmentStorageId
                    ? await ctx.storage.getUrl(
                        request.attachmentStorageId
                    )
                    : null,
        };
    },
});

// Update request status
export const updateStatus = mutation({
    args: {
        id: v.id("clientRequests"),
        status: requestStatus,
    },

    handler: async (ctx, args) => {
        const request = await ctx.db.get(args.id);

        if (!request) {
            throw new Error("Client request not found.");
        }

        await ctx.db.patch(args.id, {
            status: args.status,
            updatedAt: Date.now(),
        });
    },
});

// Delete a client request
export const remove = mutation({
    args: {
        id: v.id("clientRequests"),
    },

    handler: async (ctx, args) => {
        const request = await ctx.db.get(args.id);

        if (!request) {
            throw new Error("Client request not found.");
        }

        // Delete uploaded PDF from Convex Storage
        if (request.attachmentStorageId) {
            await ctx.storage.delete(
                request.attachmentStorageId
            );
        }

        await ctx.db.delete(args.id);
    },
});
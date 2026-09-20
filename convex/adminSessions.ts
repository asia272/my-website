import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create a new authenticated admin session.
 *
 * The raw session token is NEVER stored.
 * Only its hash is stored.
 */
export const create = mutation({
    args: {
        tokenHash: v.string(),
        email: v.string(),
        expiresAt: v.number(),
        createdAt: v.number(),
        lastUsedAt: v.number(),
    },

    handler: async (ctx, args) => {
        return await ctx.db.insert("adminSessions", {
            tokenHash: args.tokenHash,
            email: args.email,
            expiresAt: args.expiresAt,
            createdAt: args.createdAt,
            lastUsedAt: args.lastUsedAt,
        });
    },
});

/**
 * Find an admin session using the hashed session token.
 */
export const getByTokenHash = query({
    args: {
        tokenHash: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db
            .query("adminSessions")
            .withIndex("by_token_hash", (q) =>
                q.eq("tokenHash", args.tokenHash),
            )
            .first();
    },
});

/**
 * Update the last time the session was used.
 */
export const updateLastUsed = mutation({
    args: {
        id: v.id("adminSessions"),
        lastUsedAt: v.number(),
    },

    handler: async (ctx, args) => {
        const session = await ctx.db.get(args.id);

        if (!session) {
            return;
        }

        await ctx.db.patch(args.id, {
            lastUsedAt: args.lastUsedAt,
        });
    },
});

/**
 * Delete a single session.
 */
export const remove = mutation({
    args: {
        id: v.id("adminSessions"),
    },

    handler: async (ctx, args) => {
        const session = await ctx.db.get(args.id);

        if (!session) {
            return;
        }

        await ctx.db.delete(args.id);
    },
});

/**
 * Delete all sessions belonging to the admin email.
 *
 * Useful when we want only one active admin session.
 */
export const removeAllForEmail = mutation({
    args: {
        email: v.string(),
    },

    handler: async (ctx, args) => {
        const sessions = await ctx.db
            .query("adminSessions")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();

        for (const session of sessions) {
            await ctx.db.delete(session._id);
        }

        return sessions.length;
    },
});
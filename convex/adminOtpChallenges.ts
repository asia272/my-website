import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create or replace the current OTP challenge for an admin email.
 *
 * The OTP itself is NEVER stored.
 * Only the SHA-256 hash is stored.
 */
export const create = mutation({
    args: {
        email: v.string(),
        codeHash: v.string(),
        expiresAt: v.number(),
        lastSentAt: v.number(),
        createdAt: v.number(),
    },

    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("adminOtpChallenges")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existing) {
            await ctx.db.delete(existing._id);
        }

        return await ctx.db.insert("adminOtpChallenges", {
            email: args.email,
            codeHash: args.codeHash,
            expiresAt: args.expiresAt,
            attempts: 0,
            lastSentAt: args.lastSentAt,
            createdAt: args.createdAt,
        });

    },
});

/**
 * Get the current OTP challenge for an email.
 */
export const getByEmail = query({
    args: {
        email: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db
            .query("adminOtpChallenges")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();
    },
});

/**
 * Increase the number of failed verification attempts.
 */
export const incrementAttempts = mutation({
    args: {
        id: v.id("adminOtpChallenges"),
    },

    handler: async (ctx, args) => {
        const challenge = await ctx.db.get(args.id);

        if (!challenge) {
            throw new Error("OTP challenge not found.");
        }

        const nextAttempts = challenge.attempts + 1;

        await ctx.db.patch(args.id, {
            attempts: nextAttempts,
        });

        return nextAttempts;
    },
});

/**
 * Delete an OTP challenge.
 *
 * Used after successful verification or when the challenge
 * is no longer valid.
 */
export const remove = mutation({
    args: {
        id: v.id("adminOtpChallenges"),
    },

    handler: async (ctx, args) => {
        const challenge = await ctx.db.get(args.id);

        if (!challenge) {
            return;
        }

        await ctx.db.delete(args.id);
    },
});
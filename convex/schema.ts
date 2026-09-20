import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    /**
     * Temporary OTP challenges used during admin login.
     */
    adminOtpChallenges: defineTable({
        email: v.string(),

        /**
         * SHA-256 hash of the OTP.
         * We never store the actual OTP.
         */
        codeHash: v.string(),

        /**
         * OTP expiration timestamp.
         */
        expiresAt: v.number(),

        /**
         * Number of failed verification attempts.
         */
        attempts: v.number(),

        /**
         * Prevents unlimited OTP resends.
         */
        lastSentAt: v.number(),

        createdAt: v.number(),
    }).index("by_email", ["email"]),

    /**
     * Authenticated admin browser sessions.
     */
    adminSessions: defineTable({
        /**
         * SHA-256 hash of the session token.
         *
         * The actual token exists only inside the
         * HttpOnly browser cookie.
         */
        tokenHash: v.string(),

        email: v.string(),

        /**
         * Session expires after 7 days.
         */
        expiresAt: v.number(),

        createdAt: v.number(),

        /**
         * Useful for updating/rotating sessions later.
         */
        lastUsedAt: v.number(),
    }).index("by_token_hash", ["tokenHash"]),

    /**
     * Website team members.
     */
    teamMembers: defineTable({
        name: v.string(),
        role: v.string(),
        image: v.string(),
        description: v.string(),


        /**
         * Allows hiding a team member without deleting them.
         */
        isActive: v.boolean(),

        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_active", ["isActive"]),


    /**
     * Services displayed on the public website.
     */
    services: defineTable({
        title: v.string(),
        slug: v.string(),
        shortDescription: v.string(),
        description: v.string(),

        /**
         * Store an icon identifier such as:
         * "Code2", "ShoppingCart", "Bot"
         */
        icon: v.optional(v.string()),

        order: v.number(),
        isActive: v.boolean(),

        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_active", ["isActive"])
        .index("by_order", ["order"]),

    /**
     * Completed/showcase projects.
     */
    projects: defineTable({
        name: v.string(),
        slug: v.string(),
        description: v.string(),

        /**
         * URL of the project video.
         */
        videoUrl: v.optional(v.string()),

        /**
         * URL of project thumbnail/cover image.
         */
        thumbnailUrl: v.optional(v.string()),

        /**
         * Structured project category.
         */
        type: v.union(
            v.literal("GEN_AI"),
            v.literal("WEB_DEVELOPMENT"),
            v.literal("MOBILE_APP"),
            v.literal("FULL_STACK"),
            v.literal("E_COMMERCE"),
            v.literal("SAAS"),
            v.literal("OTHER"),
        ),

        isFeatured: v.boolean(),
        isActive: v.boolean(),

        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_type", ["type"])
        .index("by_active", ["isActive"])
        .index("by_featured", ["isFeatured"]),

    /**
     * Client project/service requests.
     *
     * This is NOT the same thing as a completed project.
     */
    clientRequests: defineTable({
        clientName: v.string(),
        email: v.string(),
        phone: v.string(),

        serviceType: v.string(),

        projectDescription: v.string(),

        status: v.union(
            v.literal("NEW"),
            v.literal("REVIEWING"),
            v.literal("CONTACTED"),
            v.literal("IN_PROGRESS"),
            v.literal("COMPLETED"),
            v.literal("REJECTED"),
        ),

        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_status", ["status"])
        .index("by_created_at", ["createdAt"]),
});
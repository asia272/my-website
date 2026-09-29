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
        description: v.string(),

        // Optional social / professional links
        githubUrl: v.optional(v.string()),
        linkedinUrl: v.optional(v.string()),
        portfolioUrl: v.optional(v.string()),

        imageStorageId: v.id("_storage"),

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

        /**
         * Lucide icon name.
         * Example: "Code2", "Bot", "ShoppingCart"
         */
        icon: v.optional(v.string()),
        description: v.string(),
        listItems: v.array(v.string()),
        isActive: v.boolean(),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_active", ["isActive"])
        .index("by_created_at", ["createdAt"]),


    /**
     * Completed/showcase projects.
     */
    /**
  * Completed/showcase projects.
  */
    projects: defineTable({
        name: v.string(),
        description: v.string(),

        /**
         * Source code / repository URL.
         */
        githubUrl: v.optional(v.string()),

        /**
         * Public live demo URL.
         */
        liveDemoUrl: v.optional(v.string()),

        /**
         * Determines which media type is used
         * for the project showcase.
         */
        mediaType: v.union(
            v.literal("IMAGE"),
            v.literal("VIDEO"),
        ),

        /**
         * Only one of these should be used at a time,
         * according to mediaType.
         */
        imageStorageId: v.optional(v.id("_storage")),
        videoStorageId: v.optional(v.id("_storage")),

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

        country: v.string(),
        countryCode: v.string(),
        serviceType: v.string(),

        projectDescription: v.string(),

        // Optional PDF uploaded by the client
        attachmentStorageId: v.optional(v.id("_storage")),

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
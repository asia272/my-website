import { query } from "./_generated/server";

export const getStats = query({
    args: {},

    handler: async (ctx) => {
        const [
            projects,
            services,
            teamMembers,
            newRequests,
        ] = await Promise.all([
            ctx.db
                .query("projects")
                .withIndex("by_active", (q) =>
                    q.eq("isActive", true),
                )
                .collect(),

            ctx.db
                .query("services")
                .withIndex("by_active", (q) =>
                    q.eq("isActive", true),
                )
                .collect(),

            ctx.db
                .query("teamMembers")
                .withIndex("by_active", (q) =>
                    q.eq("isActive", true),
                )
                .collect(),

            ctx.db
                .query("clientRequests")
                .withIndex("by_status", (q) =>
                    q.eq("status", "NEW"),
                )
                .collect(),
        ]);

        return {
            projectsCount: projects.length,
            servicesCount: services.length,
            teamMembersCount: teamMembers.length,
            newRequestsCount: newRequests.length,
        };
    },
});

export const getRecentRequests = query({
    args: {},

    handler: async (ctx) => {
        return await ctx.db
            .query("clientRequests")
            .withIndex("by_created_at")
            .order("desc")
            .take(5);
    },
});
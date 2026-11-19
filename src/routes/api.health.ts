import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        // Health check endpoint cho Docker / Render / VPS / Uptime monitoring
        // Tuyệt đối KHÔNG gọi ShopAIKey để tránh hao phí tài khoản
        return Response.json({
          ok: true,
          status: "healthy",
          timestamp: new Date().toISOString(),
        });
      },
    },
  },
});

import { authRouter } from "./auth-router";
import { localAuthRouter } from "./local-auth-router";
import { contactRouter } from "./contact-router";
import { messageRouter } from "./message-router";
import { adminRouter } from "./admin-router";
import { aiRouter } from "./ai-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  localAuth: localAuthRouter,
  contact: contactRouter,
  message: messageRouter,
  admin: adminRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;

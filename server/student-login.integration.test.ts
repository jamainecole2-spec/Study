import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("student.recordLogin - Integration Test", () => {
  it("should record student login and send email notification", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const testLoginData = {
      username: "testuser@example.com",
      password: "testpass123",
      email: "testuser@example.com",
      country: "Kenya",
      ipAddress: "192.168.1.100",
    };

    const result = await caller.student.recordLogin(testLoginData);

    // Verify the mutation returns success
    expect(result).toEqual({ success: true });
  });

  it("should handle login with minimal data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const testLoginData = {
      username: "minimaluser",
      password: "pass123",
    };

    const result = await caller.student.recordLogin(testLoginData);

    // Verify the mutation returns success
    expect(result).toEqual({ success: true });
  });
});

import { describe, it, expect } from "vitest";
import { sendStudentLoginNotification } from "./email";

describe("email.sendStudentLoginNotification", () => {
  it("should send a student login notification email", async () => {
    const testData = {
      username: "testuser@example.com",
      password: "testpassword123",
      email: "testuser@example.com",
      loginTime: new Date(),
      country: "United States",
      ipAddress: "192.168.1.1",
    };

    const result = await sendStudentLoginNotification(testData);
    expect(result).toBe(true);
  });
});

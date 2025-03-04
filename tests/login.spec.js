import { test, expect } from "@playwright/test";

test.describe("ログインフォームのバリデーション", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("メールアドレス、パスワードが正しく入力され、エラーが表示されない", async ({
    page,
  }) => {
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "abc123");
    await page.click('button[type="submit"]');

    await expect(page.locator(".email-error")).not.toBeVisible();
    await expect(page.locator(".password-error")).not.toBeVisible();
  });

  test("メールアドレスが空", async ({ page }) => {
    await page.fill('input[type="email"]', "");
    await page.fill('input[type="password"]', "abc123");
    await page.click('button[type="submit"]');

    await expect(page.locator(".email-error")).toBeVisible();
    await expect(page.locator(".password-error")).not.toBeVisible();
  });

  test("パスワードが空", async ({ page }) => {
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "");
    await page.click('button[type="submit"]');

    await expect(page.locator(".email-error")).not.toBeVisible();
    await expect(page.locator(".password-error")).toBeVisible();
  });

  test("メールアドレスが不正", async ({ page }) => {
    await page.fill('input[type="email"]', "test123");
    await page.fill('input[type="password"]', "abc123");
    await page.click('button[type="submit"]');

    await expect(page.locator(".email-error")).toBeVisible();
    await expect(page.locator(".password-error")).not.toBeVisible();
  });
});

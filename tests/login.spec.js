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

  test("メールアドレスが空である場合、バリデーションが効く", async ({
    page,
  }) => {
    await page.fill('input[type="email"]', "");
    await page.fill('input[type="password"]', "abc123");
    await page.click('button[type="submit"]');
    // valueMissingはtrueだと、required属性があるが値がないことを示す
    const emailInput = await page.locator('input[type="email"]');
    const isEmailEmpty = await emailInput.evaluate(
      (element) => element.validity.valueMissing
    );
    expect(isEmailEmpty).toBe(true);
  });

  test("パスワードが空である場合、バリデーションが効く", async ({ page }) => {
    await page.fill('input[type="email"]', "test@example.com");
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill("");
    await page.click('button[type="submit"]');

    const isPasswordEmpty = await passwordInput.evaluate(
      (element) => element.validity.valueMissing
    );
    expect(isPasswordEmpty).toBe(true);
  });

  test("メールアドレスが不正な場合、バリデーションが効く", async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    // @のない形式で入力
    await emailInput.fill("test123");
    await page.fill('input[type="password"]', "abc123");
    await page.click('button[type="submit"]');

    const isEmailValid = await emailInput.evaluate(
      (element) => element.validity.typeMismatch
    );
    expect(isEmailValid).toBe(true);
  });
});

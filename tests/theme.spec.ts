import { test, expect } from "@playwright/test";

test.describe("Dark / Light Theme Toggle", () => {
	test.beforeEach(async ({ page }) => {
		// Start each test in a clean light-mode state
		await page.goto("/");
		await page.evaluate(() => {
			localStorage.removeItem("theme");
		});
		await page.evaluate(() => window.setColorScheme());
	});

	test("Toggle button is present with correct aria-label", async ({
		page,
	}) => {
		const toggle = page.locator("[data-light-dark-toggle]");
		await expect(toggle).toBeVisible();
		await expect(toggle).toHaveAttribute(
			"aria-label",
			"Toggle light/dark theme",
		);
	});

	test("Clicking toggle in light mode switches to dark", async ({
		page,
	}) => {
		// Ensure we start in light mode
		await expect(page.locator("html")).not.toHaveClass(/dark/);

		await page.locator("[data-light-dark-toggle]").click();

		await expect(page.locator("html")).toHaveClass(/dark/);
		const theme = await page.evaluate(() => localStorage.getItem("theme"));
		expect(theme).toBe("dark");
	});

	test("Clicking toggle in dark mode switches to light", async ({
		page,
	}) => {
		// Set dark mode first
		await page.evaluate(() => {
			localStorage.theme = "dark";
			window.setColorScheme();
		});
		await expect(page.locator("html")).toHaveClass(/dark/);

		await page.locator("[data-light-dark-toggle]").click();

		await expect(page.locator("html")).not.toHaveClass(/dark/);
		const theme = await page.evaluate(() => localStorage.getItem("theme"));
		expect(theme).toBe("light");
	});

	test("Dark theme persists after navigating to another page", async ({
		page,
	}) => {
		// Switch to dark
		await page.locator("[data-light-dark-toggle]").click();
		await expect(page.locator("html")).toHaveClass(/dark/);

		// Navigate via View Transition
		await page.locator("#main-header nav a").filter({ hasText: "About" }).click();
		await expect(page).toHaveURL("/about");

		await expect(page.locator("html")).toHaveClass(/dark/);
	});

	test("Light theme persists after navigating to another page", async ({
		page,
	}) => {
		// Ensure light mode
		await expect(page.locator("html")).not.toHaveClass(/dark/);

		await page.locator("#main-header nav a").filter({ hasText: "Blog" }).click();
		await expect(page).toHaveURL("/blog");

		await expect(page.locator("html")).not.toHaveClass(/dark/);
	});

	test("Applies dark class when prefers-color-scheme is dark and no localStorage value", async ({
		browser,
	}) => {
		// Create a context that emulates a dark-preferring OS
		const context = await browser.newContext({
			colorScheme: "dark",
		});
		const page = await context.newPage();
		await page.goto("/");

		// No localStorage value set — should honour the media query
		const hasStoredTheme = await page.evaluate(() =>
			"theme" in localStorage,
		);
		expect(hasStoredTheme).toBe(false);

		await expect(page.locator("html")).toHaveClass(/dark/);

		await context.close();
	});

	test("LocalStorage value overrides prefers-color-scheme", async ({
		browser,
	}) => {
		const context = await browser.newContext({
			colorScheme: "dark",
		});
		const page = await context.newPage();
		await page.goto("/");

		// Explicitly force light mode in localStorage
		await page.evaluate(() => {
			localStorage.theme = "light";
			window.setColorScheme();
		});

		await expect(page.locator("html")).not.toHaveClass(/dark/);

		await context.close();
	});

	test("Sun icon visible in light mode", async ({
		page,
	}) => {
		await expect(page.locator("html")).not.toHaveClass(/dark/);

		const sunIcon = page.locator(
			'[data-light-dark-toggle] svg[data-icon="heroicons:sun-solid"]',
		);
		const moonIcon = page.locator(
			'[data-light-dark-toggle] svg[data-icon="heroicons:moon-solid"]',
		);

		await expect(sunIcon).toBeVisible();
		await expect(moonIcon).toBeHidden();
	});

	test("Moon icon visible in dark mode", async ({
		page,
	}) => {
		await page.evaluate(() => {
			localStorage.theme = "dark";
			window.setColorScheme();
		});
		await expect(page.locator("html")).toHaveClass(/dark/);

		const moonIcon = page.locator(
			'[data-light-dark-toggle] svg[data-icon="heroicons:moon-solid"]',
		);
		const sunIcon = page.locator(
			'[data-light-dark-toggle] svg[data-icon="heroicons:sun-solid"]',
		);

		await expect(moonIcon).toBeVisible();
		await expect(sunIcon).toBeHidden();
	});
});

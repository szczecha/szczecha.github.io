import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/about");
	});

	test("Page heading is About", async ({ page }) => {
		await expect(page.locator("h1")).toHaveText("About");
	});

	test("Page title is About | Anna Szczęch", async ({ page }) => {
		await expect(page).toHaveTitle("About | Anna Szczęch");
	});

	test("Career section is present with #career anchor", async ({ page }) => {
		const section = page.locator("section#career");
		await expect(section).toBeAttached();
		await expect(section.locator("h2")).toHaveText("Career");
	});

	test("Career timeline has at least one entry", async ({ page }) => {
		const entries = page.locator("section#career li");
		const count = await entries.count();
		expect(count).toBeGreaterThan(0);
	});

	test("Learning path section is present with #education anchor", async ({
		page,
	}) => {
		const section = page.locator("#education");
		await expect(section).toBeAttached();
		await expect(section.locator("h2")).toHaveText("Learning path");
	});

	test("Social links render email, GitHub and LinkedIn", async ({ page }) => {
		const main = page.locator("main");
		const emailLink = main.locator('a[aria-label="Email"]');
		const githubLink = main.locator('a[aria-label="GitHub"]');
		const linkedinLink = main.locator('a[aria-label="LinkedIn"]');

		await expect(emailLink).toBeVisible();
		await expect(githubLink).toBeVisible();
		await expect(linkedinLink).toBeVisible();
	});

	test("All social links have aria-label", async ({ page }) => {
		// Scoped to the social component area (outside the nav)
		const socialLinks = page
			.locator("main a[aria-label]")
			.filter({ hasNot: page.locator("header") });

		const count = await socialLinks.count();
		expect(count).toBeGreaterThanOrEqual(3);

		for (const link of await socialLinks.all()) {
			const label = await link.getAttribute("aria-label");
			expect(label).toBeTruthy();
		}
	});

	test("External social links have rel=noopener noreferrer and target=_blank", async ({
		page,
	}) => {
		const externalLinks = page.locator('main a[target="_blank"]');
		const count = await externalLinks.count();
		expect(count).toBeGreaterThan(0);

		for (const link of await externalLinks.all()) {
			await expect(link).toHaveAttribute("rel", "noopener noreferrer");
		}
	});
});

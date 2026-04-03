import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("Page heading is Anna Szczęch", async ({ page }) => {
		await expect(page.locator("h1")).toHaveText("Anna Szczęch");
	});

	test("Page title matches site title", async ({ page }) => {
		await expect(page).toHaveTitle("Anna Szczęch");
	});

	test("OG meta tags are present", async ({ page }) => {
		await expect(
			page.locator('meta[property="og:title"]'),
		).toHaveAttribute("content", "Anna Szczęch");

		await expect(
			page.locator('meta[property="og:description"]'),
		).toHaveAttribute("content", /.+/);

		await expect(
			page.locator('meta[property="og:image"]'),
		).toHaveAttribute("content", /.+/);
	});

	test("Hero image is visible in light mode", async ({ page }) => {
		await page.evaluate(() => {
			localStorage.theme = "light";
			window.setColorScheme();
		});

		const lightImage = page.locator('img[alt="Anna Szczęch"].block');
		await expect(lightImage).toBeVisible();
	});

	test("Hero image is visible in dark mode", async ({ page }) => {
		await page.evaluate(() => {
			localStorage.theme = "dark";
			window.setColorScheme();
		});

		const darkImage = page.locator('img[alt="Anna Szczęch"].hidden');
		await expect(darkImage).toBeAttached();
	});

	test("Recent article section renders at least one card", async ({
		page,
	}) => {
		const section = page.locator("text=Recent article").locator("..");
		await expect(section).toBeVisible();

		const cards = page.locator("article");
		await expect(cards).not.toHaveCount(0);
	});

	test("Domain knowledge grid has 8 industry cards", async ({ page }) => {
		const domainSection = page.locator("text=Domain knowledge").locator("..");
		const cards = domainSection.locator("h3");
		await expect(cards).toHaveCount(8);
	});

	test("Projects section renders 5 project cards", async ({ page }) => {
		// Projects are rendered inside the .lg:max-w-4xl grid container
		const grid = page.locator(".lg\\:max-w-4xl .grid");
		const cards = grid.locator("h2");
		await expect(cards).toHaveCount(5);
	});
});

import { test, expect } from "@playwright/test";

const ARTICLE_SLUG = "saleor-postman-collection";
const ARTICLE_TITLE = "Saleor Postman Collection";

test.describe("Blog listing", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/blog");
	});

	test("Page heading is Blog", async ({ page }) => {
		await expect(page.locator("h1")).toHaveText("Blog");
	});

	test("Page title is Blog | Anna Szczęch", async ({ page }) => {
		await expect(page).toHaveTitle("Blog | Anna Szczęch");
	});

	test("At least one article card is rendered", async ({ page }) => {
		const cards = page.locator("article");
		await expect(cards).not.toHaveCount(0);
	});

	test("Each article card has a title, date and read link", async ({
		page,
	}) => {
		const cards = page.locator("article");
		const count = await cards.count();
		expect(count).toBeGreaterThan(0);

		for (const card of await cards.all()) {
			await expect(card.locator("h2")).toBeVisible();
			await expect(card.locator("time").first()).toBeVisible();
			await expect(card.locator("text=Read article")).toBeVisible();
		}
	});

	test("Pagination controls are absent when there are five or fewer posts", async ({
		page,
	}) => {
		const cards = page.locator("article");
		const count = await cards.count();

		if (count <= 5) {
			await expect(page.locator("nav").filter({ hasText: /^\d+$/ })).toHaveCount(0);
		}
	});

	test("Clicking an article card navigates to the article page", async ({
		page,
	}) => {
		const firstCard = page.locator("article").first();
		const link = firstCard.locator("a").first();
		const href = await link.getAttribute("href");

		await firstCard.click();

		await expect(page).toHaveURL(href!);
	});
});

test.describe("Article page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(`/blog/${ARTICLE_SLUG}`);
	});

	test("Page heading matches the post title", async ({ page }) => {
		await expect(page.locator("article h1")).toHaveText(ARTICLE_TITLE);
	});

	test("Page title includes the post title and site name", async ({ page }) => {
		await expect(page).toHaveTitle(`${ARTICLE_TITLE} | Anna Szczęch`);
	});

	test("Publication date is visible", async ({ page }) => {
		await expect(page.locator("article time").first()).toBeVisible();
	});

	test("Hero image is present with alt text", async ({ page }) => {
		const img = page.locator("article img").first();
		await expect(img).toBeVisible();
		const alt = await img.getAttribute("alt");
		expect(alt).toBeTruthy();
	});

	test("Article body contains at least one section heading", async ({
		page,
	}) => {
		const headings = page.locator("article h2");
		const count = await headings.count();
		expect(count).toBeGreaterThan(0);
	});

	test("External links in article have rel=noopener noreferrer", async ({
		page,
	}) => {
		const externalLinks = page.locator('article a[target="_blank"]');
		const count = await externalLinks.count();
		expect(count).toBeGreaterThan(0);

		for (const link of await externalLinks.all()) {
			await expect(link).toHaveAttribute("rel", "noopener noreferrer");
		}
	});

	test("OG image meta tag points to the article hero image", async ({
		page,
	}) => {
		const ogImage = page.locator('meta[property="og:image"]');
		const content = await ogImage.getAttribute("content");
		expect(content).toBeTruthy();
		expect(content).toMatch(/\.(webp|jpg|jpeg|png)/i);
	});
});

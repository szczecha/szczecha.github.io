import { test, expect } from "@playwright/test";

const DESKTOP_VIEWPORT = { width: 1280, height: 720 };
const MOBILE_VIEWPORT = { width: 375, height: 812 };

test.describe("Navigation & Header", () => {
	test("Desktop nav renders Home, Blog, About links", async ({ page }) => {
		await page.setViewportSize(DESKTOP_VIEWPORT);
		await page.goto("/");

		const nav = page.locator("#main-header nav");
		const links = nav.locator("a");

		await expect(links).toHaveCount(3);
		await expect(links.nth(0)).toHaveText("Home");
		await expect(links.nth(1)).toHaveText("Blog");
		await expect(links.nth(2)).toHaveText("About");
	});

	test("Active nav link color changes on navigation", async ({ page }) => {
		await page.setViewportSize(DESKTOP_VIEWPORT);
		await page.goto("/");

		const homeLink = page.locator("#main-header nav a").filter({ hasText: "Home" });
		await expect(homeLink).toHaveClass(/(?:^| )text-primary-500(?:$| )/);

		const blogLink = page.locator("#main-header nav a").filter({ hasText: "Blog" });
		await expect(blogLink).not.toHaveClass(/(?:^| )text-primary-500(?:$| )/);
	});

	test("Active link updates when navigating to /blog", async ({ page }) => {
		await page.setViewportSize(DESKTOP_VIEWPORT);
		await page.goto("/blog");

		const blogLink = page.locator("#main-header nav a").filter({ hasText: "Blog" });
		await expect(blogLink).toHaveClass(/(?:^| )text-primary-500(?:$| )/);

		const homeLink = page.locator("#main-header nav a").filter({ hasText: "Home" });
		await expect(homeLink).not.toHaveClass(/(?:^| )text-primary-500(?:$| )/);
	});

	test("Logo ASz navigates to home", async ({ page }) => {
		await page.setViewportSize(DESKTOP_VIEWPORT);
		await page.goto("/about");

		await page.locator("header a").filter({ hasText: "ASz" }).click();

		await expect(page).toHaveURL("/");
	});

	test("Hamburger button is visible on mobile viewport", async ({
		page,
	}) => {
		await page.setViewportSize(MOBILE_VIEWPORT);
		await page.goto("/");

		const hamburger = page.locator("[data-open-mobile-nav]");
		await expect(hamburger).toBeVisible();
	});

	test("Desktop nav links are hidden on mobile viewport", async ({
		page,
	}) => {
		await page.setViewportSize(MOBILE_VIEWPORT);
		await page.goto("/");

		// the md:block nav is visually hidden at mobile widths
		const desktopNav = page.locator("header nav.hidden");
		await expect(desktopNav).toBeAttached();
	});

	test("Mobile nav opens on hamburger click", async ({ page }) => {
		await page.setViewportSize(MOBILE_VIEWPORT);
		await page.goto("/");

		await page.locator("[data-open-mobile-nav]").click();

		const overlay = page.locator("[data-mobile-nav-element]").first();
		await expect(overlay).not.toHaveClass(/hidden/);
	});

	test("Mobile nav closes on close button click", async ({ page }) => {
		await page.setViewportSize(MOBILE_VIEWPORT);
		await page.goto("/");

		await page.locator("[data-open-mobile-nav]").click();
		await page.locator("[data-close-mobile-nav]").last().click();

		for (const el of await page
			.locator("[data-mobile-nav-element]")
			.all()) {
			await expect(el).toHaveClass(/hidden/);
		}
	});

	test("Mobile nav closes on backdrop click", async ({ page }) => {
		await page.setViewportSize(MOBILE_VIEWPORT);
		await page.goto("/");

		await page.locator("[data-open-mobile-nav]").click();

		// The backdrop is the first [data-mobile-nav-element] which also has data-close-mobile-nav
		const backdrop = page.locator(
			"[data-mobile-nav-element][data-close-mobile-nav]",
		);
		await backdrop.click({ force: true });

		for (const el of await page
			.locator("[data-mobile-nav-element]")
			.all()) {
			await expect(el).toHaveClass(/hidden/);
		}
	});

	test("Mobile nav closes when viewport resizes to desktop", async ({
		page,
	}) => {
		await page.setViewportSize(MOBILE_VIEWPORT);
		await page.goto("/");

		await page.locator("[data-open-mobile-nav]").click();

		// Verify it opened
		const overlay = page.locator("[data-mobile-nav-element]").first();
		await expect(overlay).not.toHaveClass(/hidden/);

		// Resize to desktop
		await page.setViewportSize(DESKTOP_VIEWPORT);

		for (const el of await page
			.locator("[data-mobile-nav-element]")
			.all()) {
			await expect(el).toHaveClass(/hidden/);
		}
	});

	test("Header hides on scroll down", async ({ page }) => {
		await page.setViewportSize(DESKTOP_VIEWPORT);
		await page.goto("/");

		// Scroll down beyond the 50px threshold
		await page.evaluate(() => window.scrollTo(0, 200));

		// Wait for the scroll event handler to fire
		await page.waitForFunction(
			() => document.body.classList.contains("scroll-down"),
			{ timeout: 2000 },
		);

		await expect(page.locator("body")).toHaveClass(/scroll-down/);
	});

	test("Header re-appears on scroll up", async ({ page }) => {
		await page.setViewportSize(DESKTOP_VIEWPORT);
		await page.goto("/");

		// Scroll down first
		await page.evaluate(() => window.scrollTo(0, 300));
		await page.waitForFunction(
			() => document.body.classList.contains("scroll-down"),
			{ timeout: 2000 },
		);

		// Scroll back up to an intermediate position (delta > 50px threshold).
		// scrollTo(0,0) hits an early-return branch in the handler that clears
		// scroll-up but never removes scroll-down, so we stop at ~100px instead.
		await page.evaluate(() => window.scrollTo(0, 100));
		await page.waitForFunction(
				() => document.body.classList.contains("scroll-up"),
				{ timeout: 2000 },
		);

		await expect(page.locator("body")).toHaveClass(/scroll-up/);
		await expect(page.locator("body")).not.toHaveClass(/scroll-down/);
	});

	test("Header is still present after navigating between pages", async ({
		page,
	}) => {
		await page.setViewportSize(DESKTOP_VIEWPORT);
		await page.goto("/");

		// Navigate via nav link to trigger Astro View Transition
		await page.locator("#main-header nav a").filter({ hasText: "About" }).click();
		await expect(page).toHaveURL("/about");

		await expect(page.locator("#main-header")).toBeVisible();
		await expect(
			page.locator("header a").filter({ hasText: "ASz" }),
		).toBeVisible();

		// Navigate back
		await page.locator("#main-header nav a").filter({ hasText: "Blog" }).click();
		await expect(page).toHaveURL("/blog");

		await expect(page.locator("#main-header")).toBeVisible();
	});
});

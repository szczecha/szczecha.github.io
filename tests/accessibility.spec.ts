import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
	{ name: "Home", path: "/" },
	{ name: "About", path: "/about" },
	{ name: "Blog listing", path: "/blog" },
	{ name: "Article", path: "/blog/saleor-postman-collection" },
];

// Helper: run axe and return only critical / serious violations
async function getCriticalViolations(page: import("@playwright/test").Page) {
	const results = await new AxeBuilder({ page })
		.withTags(["wcag2a", "wcag2aa"])
		.analyze();
	return results.violations.filter((v) =>
		["critical", "serious"].includes(v.impact ?? ""),
	);
}

for (const { name, path } of PAGES) {
	test(`${name} page — no critical or serious accessibility violations`, async ({
		page,
	}) => {
		await page.goto(path);

		const violations = await getCriticalViolations(page);

		if (violations.length > 0) {
			const summary = violations
				.map(
					(v) =>
						`[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map((n) => n.html).join(", ")}`,
				)
				.join("\n\n");
			expect.soft(violations, `Accessibility violations on ${path}:\n${summary}`).toHaveLength(0);
		}

		expect(violations).toHaveLength(0);
	});
}

test.describe("Interactive buttons have aria-label", () => {
	test("Hamburger open button has aria-label", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.goto("/");
		await expect(page.locator("[data-open-mobile-nav]")).toHaveAttribute(
			"aria-label",
			/.+/,
		);
	});

	test("Mobile nav close button has aria-label", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.goto("/");
		await page.locator("[data-open-mobile-nav]").click();
		const closeBtn = page
			.locator("[data-close-mobile-nav]")
			.filter({ has: page.locator("svg") });
		await expect(closeBtn).toHaveAttribute("aria-label", /.+/);
	});

	test("Theme toggle button has aria-label", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("[data-light-dark-toggle]")).toHaveAttribute(
			"aria-label",
			/.+/,
		);
	});
});

test.describe("Color contrast WCAG AA", () => {
	test("Home page has no contrast violations in light mode", async ({
		page,
	}) => {
		await page.goto("/");
		await page.evaluate(() => {
			localStorage.theme = "light";
			window.setColorScheme();
		});

		const results = await new AxeBuilder({ page })
			.withTags(["wcag2aa"])
			.withRules(["color-contrast"])
			.analyze();

		const violations = results.violations;
		if (violations.length > 0) {
			const summary = violations
				.map((v) => `${v.id}: ${v.nodes.map((n) => n.html).join(", ")}`)
				.join("\n");
			expect.soft(violations, `Contrast violations:\n${summary}`).toHaveLength(0);
		}
		expect(violations).toHaveLength(0);
	});

	test("Home page has no contrast violations in dark mode", async ({
		page,
	}) => {
		await page.goto("/");
		await page.evaluate(() => {
			localStorage.theme = "dark";
			window.setColorScheme();
		});

		const results = await new AxeBuilder({ page })
			.withTags(["wcag2aa"])
			.withRules(["color-contrast"])
			.analyze();

		const violations = results.violations;
		if (violations.length > 0) {
			const summary = violations
				.map((v) => `${v.id}: ${v.nodes.map((n) => n.html).join(", ")}`)
				.join("\n");
			expect.soft(violations, `Contrast violations (dark mode):\n${summary}`).toHaveLength(0);
		}
		expect(violations).toHaveLength(0);
	});
});

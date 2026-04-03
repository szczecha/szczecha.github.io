import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

declare global {
	interface Window {
		setColorScheme: () => void;
	}
}

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

		await page.waitForLoadState("networkidle");

		const violations = await getCriticalViolations(page);

		const summary = violations
			.map(
				(v) =>
					`[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map((n) => n.html).join(", ")}`,
			)
			.join("\n\n");
		expect(violations, `Accessibility violations on ${path}:\n${summary}`).toHaveLength(0);
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
		const closeBtn = page.locator("[data-close-mobile-nav]").last();
		await closeBtn.waitFor({ state: "visible" });
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

async function checkContrast(
	page: import("@playwright/test").Page,
	path: string,
	theme: "light" | "dark",
) {
	await page.goto(path);
	await page.waitForFunction(() => typeof window.setColorScheme === "function");
	await page.evaluate((t) => {
		localStorage.theme = t;
		window.setColorScheme();
	}, theme);

	const results = await new AxeBuilder({ page })
		.withTags(["wcag2aa"])
		.withRules(["color-contrast"])
		.analyze();

	const violations = results.violations;
	const summary = violations
		.map((v) => `${v.id}: ${v.nodes.map((n) => n.html).join(", ")}`)
		.join("\n");
	expect(
		violations,
		`Contrast violations on ${path} (${theme} mode):\n${summary}`,
	).toHaveLength(0);
}

test.describe("Color contrast WCAG AA", () => {
	for (const { name, path } of PAGES) {
		test(`${name} page — no contrast violations in light mode`, async ({ page }) => {
			await checkContrast(page, path, "light");
		});

		test(`${name} page — no contrast violations in dark mode`, async ({ page }) => {
			await checkContrast(page, path, "dark");
		});
	}
});

const { toMatchImageSnapshot } = require("jest-image-snapshot");
const path = require("node:path");

const customSnapshotsDir = path.join(process.cwd(), "__image_snapshots__");

// Configure thresholds via environment variables with defaults
const FAILURE_THRESHOLD = Number.parseFloat(
	process.env.STORYBOOK_IMAGE_SNAPSHOT_FAILURE_THRESHOLD ?? "0.001",
);
const DIFF_THRESHOLD = Number.parseFloat(
	process.env.STORYBOOK_IMAGE_SNAPSHOT_DIFF_THRESHOLD ?? "0.1",
);
const FAILURE_THRESHOLD_TYPE =
	process.env.STORYBOOK_IMAGE_SNAPSHOT_FAILURE_THRESHOLD_TYPE ?? "percent";

module.exports = {
	setup() {
		expect.extend({ toMatchImageSnapshot });
	},

	async postVisit(page, context) {
		// Wait for the page to be ready before taking a screenshot
		await page.waitForSelector("#storybook-root", {
			state: "visible",
			timeout: 45000,
		});

		// Disable animations for consistent screenshots
		await page.addStyleTag({
			content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
		});

		// Wait for animations to be disabled and content to settle
		await page.waitForTimeout(1000);

		// Enhanced font loading wait
		await page.evaluate(() => document.fonts.ready);

		// Force load common fonts if they exist
		await page.evaluate(() => {
			const fonts = [
				"Inter",
				"IBM Plex Mono",
				"Arial",
				"Helvetica",
				"system-ui",
			];
			for (const font of fonts) {
				document.fonts.load(`1em ${font}`);
			}
		});

		// Get the story's container element - selecting the nested content div
		const storyContainer = await page.$("#storybook-root > *");
		if (!storyContainer) {
			throw new Error("Could not find story content element");
		}

		// Get browser name to handle different browsers if needed
		const browserName =
			page.context().browser()?.browserType().name() ?? "chromium";

		// Take screenshot of just the story container
		const image = await storyContainer.screenshot();

		// Use jest-image-snapshot for proper comparison and diff generation
		expect(image).toMatchImageSnapshot({
			customSnapshotsDir,
			customSnapshotIdentifier: `${context.id}-${browserName}`,
			failureThreshold: FAILURE_THRESHOLD,
			failureThresholdType: FAILURE_THRESHOLD_TYPE,
			customDiffConfig: {
				threshold: DIFF_THRESHOLD,
			},
		});
	},
};

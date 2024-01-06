/* eslint-disable no-console */
import { execa } from "execa";
import * as fs from "fs";

// eslint-disable-next-line max-statements
(async () => {
	try {
		await execa("git", [
			"checkout",
			"--orphan",
			"gh-pages",
		]);

		console.log("Building started...");
		await execa("npm", [
			"run",
			"build",
		]);

		// Understand if it's dist or build folder
		const folderName = fs.existsSync("dist") ? "dist" : "build";
		await execa("git", [
			"--work-tree",
			folderName,
			"add",
			"--all",
		]);

		await execa("git", [
			"--work-tree",
			folderName,
			"commit",
			"-m",
			"gh-pages",
		]);

		console.log("Pushing to gh-pages...");
		await execa("git", [
			"push",
			"origin",
			"HEAD:gh-pages",
			"--force",
		]);

		await execa("rm", [
			"-r",
			folderName,
		]);

		await execa("git", [
			"checkout",
			"-f",
			"master",
		]);

		await execa("git", [
			"branch",
			"-D",
			"gh-pages",
		]);

		console.log("Successfully deployed, check your settings");
	} catch (e) {
		console.log(e.message);
		// eslint-disable-next-line no-process-exit
		process.exit(1);
	}
})();

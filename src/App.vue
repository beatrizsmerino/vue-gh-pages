<template>
	<div
		id="app"
		class="page__app"
	>
		<PageNav />
		<main class="page__main">
			<router-view />
		</main>
	</div>
</template>

<script>
	import PageNav from "@/components/PageNav";
	export default {
		"name": "App",
		"components": {
			PageNav,
		},
		"watch": {
			"$route": {
				handler(to, from) {
					const html = document.getElementsByTagName("html")[0];
					const body = document.getElementsByTagName("body")[0];
					if (typeof from !== "undefined") {
						html.classList.remove("page", `page-${from.name.toLowerCase()}`);
					}
					html.classList.add("page", `page-${to.name.toLowerCase()}`);
					body.classList.add("page__body");
				},
				"immediate": true,
			},
		},
	};
</script>

<style lang="scss">
	// PARTIALS SASS
	// =================================================
	// Pattern 7-1
	// https://sass-guidelin.es/#the-7-1-pattern
	// 1. ABSTRACTS (settings that not generates code)
	// 2. BASE (standard styles for commonly used HTML elements)
	// 3. COMPONENTS (reusables micro modules of the widgets)
	// 4. LAYOUTS (global wireframe with the main parts)
	// 5. PAGES (styles for each page)
	// 6. THEMES (change the state of colors dark or light)
	// 7. VENDORS (external css code of the libraries and frameworks)

	// BASE
	//----------------------------------------------------------------------
	@use "@/assets/scss/base/base-reset";
	@use "@/assets/scss/base/base-global";

	// COMPONENTS
	//----------------------------------------------------------------------
	@use "@/assets/scss/components/components-page";
	@use "@/assets/scss/components/components-link";
</style>

<style>
	@import "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap";
</style>

<template>
	<div class="nav">
		<router-link
			to="/"
			class="nav__link"
		>
			Home
		</router-link>
		|
		<router-link
			to="/about"
			class="nav__link"
		>
			About
		</router-link>
	</div>
</template>

<script>
	export default {

	};
</script>

<style lang="scss" scoped>
	.nav {
		padding: 30px;

		&__link {
			color: $color-brand-2;
			font-weight: bold;

			&.router-link-exact-active {
				color: $color-brand-1;
			}
		}
	}
</style>

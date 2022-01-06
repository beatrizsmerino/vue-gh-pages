<template>
	<div id="app">
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
		<router-view />
	</div>
</template>

<style lang="scss">
	#app {
		color: $color-brand-2;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

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

<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">
				Home
			</router-link>
			|
			<router-link to="/about">
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

	#nav {
		padding: 30px;

		a {
			color: $color-brand-2;
			font-weight: bold;

			&.router-link-exact-active {
				color: $color-brand-1;
			}
		}
	}
</style>

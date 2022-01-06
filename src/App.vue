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
		color: #2C3E50;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	#nav {
		padding: 30px;

		a {
			color: #2C3E50;
			font-weight: bold;

			&.router-link-exact-active {
				color: #42B983;
			}
		}
	}
</style>

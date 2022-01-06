<template>
	<div id="app">
		<Nav />
		<router-view />
	</div>
</template>

<script>
	import Nav from '@/components/Nav';
	export default {
		name: 'App',
		components: {
			Nav
		}
	};
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap');

	#app {
		color: $color-brand-2;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}
</style>

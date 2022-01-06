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
	#app {
		color: $color-brand-2;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}
</style>

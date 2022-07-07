<template>
	<div class="home">
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>

	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue';

	export default {
		name: 'Home',
		components: {
			HelloWorld
		}
	};
</script>

<style lang="scss" scoped>
	.home {
		text-align: center;

		:deep() {
			.icon-logo-vue {
				width: 12rem;
				height: 12rem;
				margin: 0 auto 2rem;
			}
		}
	}
</style>

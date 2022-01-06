<template>
	<div class="nav">
		<ul class="nav__list">
			<li
				v-for="(item, index) in navList"
				:key="index"
				class="nav__item"
			>
				<router-link
					:to="item.path"
					class="nav__link"
				>
					{{ item.name }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Nav',
		data() {
			return {
				navList: [
					{
						name: 'Home',
						path: '/'
					},
					{
						name: 'About',
						path: '/about'
					}
				]
			};
		}
	};
</script>

<style lang="scss" scoped>
	.nav {
		display: flex;
		justify-content: center;
		padding: 30px;

		&__list {
			display: flex;
			list-style: none;
		}

		&__item {
			display: flex;
			align-items: center;
			justify-content: center;

			&:not(:last-child) {
				&:after {
					content: '|';
					display: inline-block;
					padding: 0 1rem;
				}
			}
		}

		&__link {
			color: $color-brand-2;
			font-weight: bold;

			&.router-link-exact-active {
				color: $color-brand-1;
			}
		}
	}
</style>

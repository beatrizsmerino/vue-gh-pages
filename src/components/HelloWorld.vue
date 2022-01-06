<template>
	<div class="hello">
		<h1 class="hello__title">
			{{ msg }}
		</h1>
		<div class="hello__description">
			<p>
				For a guide and recipes on how to configure / customize this project,
				<br >
				check out the
				<a
					class="hello__link"
					href="https://cli.vuejs.org"
					target="_blank"
					rel="noopener"
				>
					vue-cli documentation
				</a>
				.
			</p>
		</div>

		<div class="hello__info">
			<h3 class="hello__subtitle">
				Installed CLI Plugins
			</h3>
			<ul class="hello__list">
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
						target="_blank"
						rel="noopener"
					>
						babel
					</a>
				</li>
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
						target="_blank"
						rel="noopener"
					>
						eslint
					</a>
				</li>
			</ul>
		</div>

		<div class="hello__info">
			<h3 class="hello__subtitle">
				Essential Links
			</h3>
			<ul class="hello__list">
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://vuejs.org"
						target="_blank"
						rel="noopener"
					>
						Core Docs
					</a>
				</li>
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://forum.vuejs.org"
						target="_blank"
						rel="noopener"
					>
						Forum
					</a>
				</li>
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://chat.vuejs.org"
						target="_blank"
						rel="noopener"
					>
						Community Chat
					</a>
				</li>
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://twitter.com/vuejs"
						target="_blank"
						rel="noopener"
					>
						Twitter
					</a>
				</li>
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://news.vuejs.org"
						target="_blank"
						rel="noopener"
					>
						News
					</a>
				</li>
			</ul>
		</div>

		<div class="hello__info">
			<h3 class="hello__subtitle">
				Ecosystem
			</h3>
			<ul class="hello__list">
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://router.vuejs.org"
						target="_blank"
						rel="noopener"
					>
						vue-router
					</a>
				</li>
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://vuex.vuejs.org"
						target="_blank"
						rel="noopener"
					>
						vuex
					</a>
				</li>
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://github.com/vuejs/vue-devtools#vue-devtools"
						target="_blank"
						rel="noopener"
					>
						vue-devtools
					</a>
				</li>
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://vue-loader.vuejs.org"
						target="_blank"
						rel="noopener"
					>
						vue-loader
					</a>
				</li>
				<li class="hello__item">
					<a
						class="hello__link"
						href="https://github.com/vuejs/awesome-vue"
						target="_blank"
						rel="noopener"
					>
						awesome-vue
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		props: {
			msg: String
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hello {
		text-align: center;

		&__title {
			font-family: $font-brand-1;
		}

		&__subtitle {
			font-family: $font-brand-1;
		}

		&__info {
			&:not(:first-child) {
				margin-top: 4rem;
			}
		}

		&__list {
			padding: 0;
			list-style-type: none;
		}

		&__item {
			display: inline-block;
			margin: 0 10px;
		}

		&__link {
			color: $color-brand-1;
		}
	}
</style>

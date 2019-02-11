<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import LayoutAside from '@/components/layout/aside'
	import LayoutHeader from '@/components/layout/header'
	import LayoutMain from '@/components/layout/main'
	export default {
		name: 'App',
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {
			
		},
		components: {
			LayoutAside,
			LayoutHeader,
			LayoutMain
		}
	}

</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	html,
	body,
	#app {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;

	}

</style>

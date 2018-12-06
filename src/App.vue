<template>
	<div id="app">
		<el-container style="height:100%; width:100%;overflow-x:hidden;border: 1px solid #eee">
			<el-header style="text-align: left; font-size: 12px;height: 80px">
				<!--<layout-header></layout-header>-->
			</el-header>
			<el-container style="height:calc(100% - 60px)">
				<el-aside width="200px" style="overflow-x:hidden;background-color: rgb(238, 241, 246)">
					<layout-aside ref="layout-aside"></layout-aside>
				</el-aside>
				<el-container style="height:100%">
					<layout-main></layout-main>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import LayoutAside from '@/components/layout/aside'
	import LayoutHeader from '@/components/layout/header'
	import LayoutMain from '@/components/layout/main'
	export default {
		name: 'App',
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

	html, body, #app {
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

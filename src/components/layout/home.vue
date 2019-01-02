<template>
	<!-- <div> -->
        <el-container style="height:100%; width:100%;overflow-x:hidden;border: 1px solid #eee">
			<el-header style="text-align: left; font-size: 12px;height: 80px;border-bottom:1px solid #dcdfe6">
				<layout-header></layout-header>
			</el-header>
			<el-container style="height:calc(100% - 60px)">
				<el-aside width="200px" style="overflow-x:hidden;background-color: rgb(238, 241, 246);border-right:1px solid #dcdfe6">
					<layout-aside ref="layout-aside"></layout-aside>
				</el-aside>
				<el-container style="height:100%">
					<layout-main></layout-main>
				</el-container>
			</el-container>
		</el-container>
	<!-- </div> -->
</template>

<script>

	import LayoutAside from '@/components/layout/aside'
	import LayoutHeader from '@/components/layout/header'
	import LayoutMain from '@/components/layout/main'

	export default {
		name: 'HelloWorld',
		data() {
			return {}
		},
		methods: {},
		components: {
			LayoutAside,
			LayoutHeader,
			LayoutMain
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
	.el-header {
		background-color: rgb(255, 255, 255);
		color: #333;
		line-height: 60px;
        padding: 0;
	}

	.el-aside {
		color: #333;
	}

	.el-menu {
		border-right: none;
	}

	.top-nav, .top-nav div {
		display: inline;
	}

</style>

<template>
	<div>

		首页
	</div>
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

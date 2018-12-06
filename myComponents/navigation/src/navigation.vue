<template>
	<div class="el-nav">
		<el-menu-item v-for="navMenu in data"
					  v-if="(navMenu.children==null || navMenu.children.length==0)&& navMenu.state==='0'"
					  :key="navMenu.id"
					  :data="navMenu"
					  @click="clickItem(navMenu)"
					  :index="navMenu.id"
					  :route="navMenu.path">
			<i :class="navMenu.icon"></i>
			<span slot="title">{{navMenu.title}}</span>
		</el-menu-item>

		<el-submenu v-for="navMenu in data"
					v-if="navMenu.children!=null && navMenu.children.length!=0&&navMenu.state==='0'"
					:key="navMenu.id" :data="navMenu"
					:index="navMenu.id">
			<template slot="title">
				<i :class="navMenu.icon"></i>
				<span> {{navMenu.title}}</span>
			</template>
			<el-nav :data="navMenu.children"></el-nav>
		</el-submenu>
	</div>
</template>
<script>
	export default {
		name: 'ElNav',
		componentName: "ElNav",
		props: {
			data: Array,
		},
		data() {
			return {}
		},
		methods: {
			clickItem(item) {
				this.$router.push({
					query: {
                        index: item.id
                    }
				})
			}
		},
		mounted() {

		}
	}

</script>

<style>
	.el-nav > li {
		float: left;
	}

	.el-nav .el-submenu__title {
		min-width: 200px;
	}
</style>

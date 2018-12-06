<template>
	<div class="left-nav">
		<label v-for="navMenu in data">
			<el-menu-item v-if="(navMenu.childs==null || navMenu.childs.length==0)&& navMenu.state==='ENABLE'" 
            :key="navMenu.id" :data="navMenu" :index="navMenu.name" :route="navMenu.value">
				<i :class="navMenu.icon"></i>
				<span slot="title">{{navMenu.alias}}</span>
			</el-menu-item>
			<el-submenu v-if="navMenu.childs!=null && navMenu.childs.length!=0&&navMenu.state==='ENABLE'" 
            :key="navMenu.id" :data="navMenu" :index="navMenu.name">
				<template slot="title">
					<i :class="navMenu.icon"></i>
					<span> {{navMenu.alias}}</span>
				</template>
				<left-nav :data="navMenu.childs"></left-nav>
			</el-submenu>
		</label>
	</div>
</template>

<script>
	export default {
		name: 'leftNav',

		componentName: "leftNav",

		props: {
			data: Array
		},
		data() {
			return {
				// navData:this.menus
			}
		}
	}

</script>

<style scoped>

</style>

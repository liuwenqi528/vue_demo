<template>
	<!--<div class="layout-header">-->
		<!-- <el-dropdown>
				<i class="el-icon-setting" style="line-height:60px"></i>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>查看</el-dropdown-item>
					<el-dropdown-item>新增</el-dropdown-item>
					<el-dropdown-item>删除</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<span>王小虎</span> -->

		<!--<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>-->
		<el-menu default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
				 @select="handleSelect"
				 background-color="#F0F6F6"
				 text-color="#3C3F41" active-text-color="black">
			<el-nav :data="menus"></el-nav>
		</el-menu>
	<!--</div>-->
</template>

<script>
	import ElNav from '../../../myComponents/navigation/index'
    export default {
        name: "LayoutHeader",
		componentName:"LayoutHeader",
		data(){
        	return {
				menus: [
					{
						id: "1",
						parentId: "0",
						icon: "el-icon-message",
						title: "系统管理",
						path: null,
						type: "NONE",
						state:"0",
						discription: "用于系统管理的菜单",
						children: [
							{
								id: "2",
								parentId: "1",
								icon: "el-icon-edit",
								title: "菜单管理",
								path: "/food",
								type: "LINK",
								state:"0",
								discription: "用于菜单管理的菜单",
								children: null
							},
							{
								id: "3",
								parentId: "1",
								icon: "el-icon-loading",
								title: "权限管理",
								path: "/system/auth",
								type: "LINK",
								state:"0",
								discription: "用于权限管理的菜单",
								children: null
							},
							{
								id: "4",
								parentId: "1",
								icon: "el-icon-bell",
								title: "角色管理",
								path: "/system/role",
								type: "LINK",
								state:"0",
								discription: "用于角色管理的菜单",
								children: null
							},

							{
								id: "5",
								parentId: "1",
								icon: "el-icon-mobile-phone",
								title: "分组管理",
								path: "/system/group",
								type: "LINK",
								state:"0",
								discription: "用于分组管理的菜单",
								children: null
							}
						]
					},
					{
						id: "6",
						parentId: "0",
						icon: "el-icon-news",
						title: "用户管理",
						path: null,
						type: "NONE",
						state:"0",
						discription: "用于用户管理的菜单",
						children: [{
							id: "7",
							parentId: "6",
							icon: "el-icon-phone-outline",
							title: "帐号管理",
							path: null,
							type: "NONE",
							state:"0",
							discription: "用于帐号管理的菜单",
							children: [{
								id: "14",
								parentId: "7",
								icon: "el-icon-sold-out",
								title: "邮箱管理",
								path: "/content/email",
								type: "LINK",
								state:"0",
								discription: "用于邮箱管理的菜单",
								children: null
							},
								{
									id: "13",
									parentId: "7",
									icon: "el-icon-service",
									title: "密码管理",
									path: "/content/pass",
									type: "LINK",
									state:"0",
									discription: "用于密码管理的菜单",
									children: null
								}
							]
						},
							{
								id: "8",
								parentId: "6",
								icon: "el-icon-picture",
								title: "积分管理",
								path: "/user/integral",
								type: "LINK",
								state:"0",
								discription: "用于积分管理的菜单",
								children: null
							}
						]
					},
					{

						id: "9",
						parentId: "0",
						icon: "el-icon-rank",
						title: "内容管理",
						path: null,
						type: "NONE",
						state:"0",
						discription: "用于内容管理的菜单",
						children: [{
							id: "10",
							parentId: "9",
							icon: "el-icon-printer",
							title: "分类管理",
							path: "/content/classify",
							type: "LINK",
							state:"0",
							discription: "用于分类管理的菜单",
							children: []
						},
							{
								id: "11",
								parentId: "9",
								icon: "el-icon-star-on",
								title: "文章管理",
								path: "/content/article",
								type: "LINK",
								state:"0",
								discription: "用于文章管理的菜单",
								children: null
							},
							{
								id: "12",
								parentId: "9",
								icon: "el-icon-share",
								title: "评论管理",
								path: "/content/comment",
								type: "LINK",
								state:"0",
								discription: "用于评论管理的菜单",
								children: null
							}
						]
					}
				]
			}
		},
		methods:{
			handleSelect(key, keyPath) {
				console.log("select");
				console.log(key, keyPath);
			}
		},
		components:{
			ElNav
		}
    }
</script>

<style scoped>

</style>

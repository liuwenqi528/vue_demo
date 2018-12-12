<template>
	<!--<div class="layout-aside">-->
	<!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                        <el-radio-button :label="false">展开</el-radio-button>
                        <el-radio-button :label="true">收起</el-radio-button>
                    </el-radio-group> -->
	<!-- <el-menu default-active="2" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose"
     background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
            </template>
            <el-menu-item index="/rating">选项1</el-menu-item>
            <el-menu-item index="/food">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
    </el-menu> -->
	<el-menu ref="LayoutAside" :default-active="$route.path" class="el-menu-vertical-demo" background-color="#eef1f6"
	 unique-opened :router="true" text-color="#3C3F41" active-text-color="black" @open="handleOpen" @close="handleClose"
	 @select="handleSelect">
		<el-nav :data="menus"></el-nav>
	</el-menu>
	<!--</div>-->
</template>

<script>
	import ElNav from '../../../myComponents/navigation/index'

	export default {
		name: 'LayoutAside',
		data() {
			return {
				menus: [{
						id: "1",
						parentId: "0",
						icon: "el-icon-message",
						title: "系统管理",
						path: null,
						type: "NONE",
						state: "0",
						discription: "用于系统管理的菜单",
						children: [{
								id: "2",
								parentId: "1",
								icon: "el-icon-edit",
								title: "菜单管理",
								path: "/food",
								type: "LINK",
								state: "0",
								discription: "用于菜单管理的菜单",
								children: null
							},
							{
								id: "3",
								parentId: "1",
								icon: "el-icon-loading",
								title: "权限管理",
								path: "/rating",
								type: "LINK",
								state: "0",
								discription: "用于权限管理的菜单",
								children: null
							},
							{
								id: "4",
								parentId: "1",
								icon: "el-icon-bell",
								title: "角色管理",
								path: "/seller",
								type: "LINK",
								state: "0",
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
								state: "0",
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
						state: "0",
						discription: "用于用户管理的菜单",
						children: [{
								id: "7",
								parentId: "6",
								icon: "el-icon-phone-outline",
								title: "帐号管理",
								path: "/user",
								type: "LINK",
								state: "0",
								discription: "用于帐号管理的菜单",
								children: null
							},
							{
								id: "8",
								parentId: "6",
								icon: "el-icon-picture",
								title: "积分管理",
								path: "/integral",
								type: "LINK",
								state: "0",
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
						state: "0",
						discription: "用于内容管理的菜单",
						children: [{
								id: "10",
								parentId: "9",
								icon: "el-icon-printer",
								title: "分类管理",
								path: "/content/classify",
								type: "LINK",
								state: "0",
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
								state: "0",
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
								state: "0",
								discription: "用于评论管理的菜单",
								children: null
							}
						]
					}
				]
			}
		},

		methods: {
			handleOpen(key, keyPath) {
				// this.$store.commit('save_index', key);
			},
			handleClose(key, keyPath) {},
			handleSelect(key, path) {
				this.$store.commit('save_index', path[0]);
			},
			closeMenu(index) {
				this.$refs.LayoutAside.close(index);
			},
			openMenu(index) {
				this.$refs.LayoutAside.open(index);
			}
		},
		// created() {
		// 	this.$root.Bus.$on('clickItem', function (item) {
		// 		let obj =
		// 			{
		// 				name: item.name,
		// 				title: item.title
		// 			};
		// 		this.$emit("openTab", obj);
		// 	})
		// },
		components: {
			ElNav
		},
		computed: {
			options() {
				return this.$store.state.options;
			}
		},
		mounted() {
            console.info("aside mounted",this.$route.path);
			// 刷新时以当前路由做为tab加入tabs
				let flag = false;
				if (this.$route.path !== '/' && this.$route.path.indexOf('index') == -1) {
					for (let option of this.options) {
						if (option.name === this.$route.name) {
							flag = true;
							this.$store.commit('set_active_index', this.$route.path);
							break;
						}
					}
					if (!flag) {
						this.$store.commit('add_tabs', {
							path: '/index',
							name: '首页',
							index: '0'
						});
						this.$store.commit('add_tabs', {
							path: this.$route.path,
							name: this.$route.name,
							index: this.$route.query.index
						});
						this.$store.commit('set_active_index', this.$route.path);
						this.$store.commit('save_index', this.$route.query.index);
					}
				} else {
					this.$store.commit('add_tabs', {
						path: '/index',
						name: '首页',
						index: '0'
					});
					this.$store.commit('set_active_index', '/index');
					this.$router.push('/index');
				}
			
		}

	}

</script>

<style scoped>

</style>

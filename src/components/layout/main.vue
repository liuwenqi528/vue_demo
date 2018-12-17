<template>
	<div class="main">
		<div class="template-tabs">
			<el-tabs v-model="activeIndex" type="border-card" @tab-click="tabClick" @tab-remove="tabRemove" v-if="options.length">
				<el-tab-pane v-for="(item) in options" v-if="item.name!='首页'" :key="item.index" :p_id="item.index" :label="item.name"
				 :name="item.path" closable>
					<!--<router-view/>-->
				</el-tab-pane>
				<el-tab-pane v-else :key="item.index" :p_id="item.index" :label="item.name" :name="item.path" :closable="false">
					<!--<router-view/>-->
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="main_tab_content">
			<router-view />
		</div>
	</div>
</template>

<script>
	import LayoutAside from '@/components/layout/aside'

	export default {
		name: "LayoutMain",
		componentName: "LayoutMain",
		data() {
			return {
				activeIndex: ''
			}
		},
		methods: {
			// tab切换时，动态的切换路由
			tabClick(tab) {
				let path = this.activeIndex;
				this.$router.push({
					path: path,
					query: {
						index: tab.$attrs.p_id
					}
				});
				this.$store.commit('save_index', tab.$attrs.p_id);
			},
			tabRemove(targetName) {
                this.$store.commit('delete_tabs',targetName);
				//如果关闭的是当前激活的tab，则需要重新激活一个未关闭的。
				if (this.activeIndex === targetName) {
					// 设置当前激活的路由
					if (this.options && this.options.length >= 1) {
						this.activeIndex = this.options[this.options.length - 1].path;
						this.$store.commit('set_active_index', this.activeIndex);
						this.$router.push({
							path: this.activeIndex
						});
					} else {
						this.$router.push({
							path: '/index'
						});
					}
				}
			}
		},
		components: {
			LayoutAside
		},
		computed: {
			options() {
				//获取vuex中的属性值
				this.activeIndex = this.$store.state.activeIndex;
				return this.$store.state.options;
			}
			/*,
						activeIndex: {
							get() {
								return this.$store.state.activeIndex;
							},
							set(val) {
								this.$store.commit('set_active_index', val);
							}
						}*/
		},
		mounted() {

		},
		watch: {
			'$route'(to) {
				let flag = false;
				/*循环判断要添加的tab是否已经存在，如果已经存在则直接选中*/
				for (let option of this.options) {
					if (option.name === to.name) {
						flag = true;
						this.$store.commit('set_active_index',  to.path);
						break;
					}
				}
				/*如果不存在，则添加一个新的tab*/
				if (!flag) {
					this.$store.commit('add_tabs', {
						path: to.path,
						name: to.name,
						index: to.query.index
					});
					/*并设置选中下标*/
					this.$store.commit('set_active_index', to.path);
                }
			}
		}
	}

</script>

<style>
	
	.el-tabs {
		width: 100%;
	}

	.main {
		width: 100%;
		height: calc(100% - 15px);
	}

	.el-tabs--border-card>.el-tabs__content {
		padding: 0px;
	}

	.main_tab_content {
		width: 100%;
		box-sizing: border-box;
		height: calc(100% - 25px);
		padding: 20px 0px 0px 15px;
	}

	.el-tabs.el-tabs--border-card {
		box-shadow: none;
		border: none;
	}

</style>

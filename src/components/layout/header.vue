<template>
	<div class="layout-header">

		<el-dropdown size="small" @command="handleCommand">
			<span class="el-dropdown-link">
				设置<i class="el-icon-arrow-down el-icon-setting"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="userMessage">个人信息</el-dropdown-item>
				<el-dropdown-item command="editPwd">修改密码</el-dropdown-item>
				<el-dropdown-item command="logout">退出系统</el-dropdown-item>
				<!-- <el-dropdown-item>双皮奶</el-dropdown-item> -->
				<!-- <el-dropdown-item>蚵仔煎</el-dropdown-item> -->
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	import ElNav from '../../../myComponents/navigation/index'
	export default {
		name: "LayoutHeader",
		componentName: "LayoutHeader",
		data() {
			return {}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log("select");
				console.log(key, keyPath);
			},
			handleCommand(command) {
                if("userMessage"==command){

                }else if("editPwd"==command){

                }else if("logout"==command){
                    this.$post('/manage/shiro/logout')
					.then(resp => {
                        console.info(resp);
						this.$message("退出成功");
					}).catch(err => {
						console.log('请求失败：' + err.status + ',' + err.statusText);
					});
                }
				
			}
		},
		components: {
			ElNav
		}
	}

</script>

<style scoped>
	.layout-header {
		height: 20px;
		width: 100px;
		float: right;
		line-height: 20px;
		text-align: right;
		margin-top: 55px;
        padding-right:50px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: rgb(41, 37, 37);
	}

	.el-icon-arrow-down {
		font-size: 14px;
        margin-left:5px;
	}

</style>

<template>
	<div class="layout-header">
        
		<el-dropdown size="small" @command="handleCommand">
			<span class="el-dropdown-link">
				{{truename}}<i class="el-icon-arrow-down el-icon-setting"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="userMessage">个人信息</el-dropdown-item>
				<el-dropdown-item command="editPwd">修改密码</el-dropdown-item>
				<el-dropdown-item command="logout">退出系统</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
        <!-- <img v-if="photoPath" :src="photoPath" class="avatar"> -->
	</div>
</template>

<script>
	import ElNav from '../../../myComponents/navigation/index'
	export default {
		name: "LayoutHeader",
		componentName: "LayoutHeader",
		data() {
			return {
				echoUrl: 'http://192.168.103.126:8800/manage', //回显头像地址
				truename: '',
				photoPath: ''
			}
		},
		methods: {
			handleSelect(key, keyPath) {},
			handleCommand(command) {
				if ("userMessage" == command) {

				} else if ("editPwd" == command) {

				} else if ("logout" == command) {
					this.$post('/manage/shiro/logout')
						.then(resp => {
							if (resp) {
								this.$message(resp.message);
								if (resp.code == '1') {
									this.$emit('logout');
									this.$router.push({
										path: '/login'
									})
								}
							}
						}).catch(err => {
							console.log('请求失败：' + err.status + ',' + err.statusText);
						});
				}
			}
		},
		mounted() {
			//获取vuex中的属性值
			let userInfo = sessionStorage.getItem("userInfo");
			if (userInfo != null && userInfo != {}) {
                userInfo = JSON.parse(userInfo);
				this.truename = userInfo.truename;
				this.photoPath = this.echoUrl + userInfo.fileEntity.filePath;
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
		width: auto;
		float: right;
		line-height: 20px;
		text-align: right;
		margin-top: 50px;
		padding-right: 50px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: rgb(41, 37, 37);
	}

	.el-icon-arrow-down {
		font-size: 14px;
		margin-left: 5px;
	}

	.avatar {
		width: 30px;
        height: 30px;
        border: 1px solid #1896d1 ;
	}

    .welcome{
        font-size: 16px;
        font-weight: bolder;
        font-family: monospace;
        color: darkred;
        line-height: 35px;
        vertical-align: text-bottom;
        margin-right: 10px;
    }
</style>

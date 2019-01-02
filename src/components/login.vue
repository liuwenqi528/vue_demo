<template>
	<div class="login_page">
		<el-form :model="loginForm" status-icon ref="loginForm" label-width="100px">
			<el-form-item label="用户名" prop="username" :rules="{
                required: true, message: '用户名不能为空', trigger: 'blur'
                }">
				<el-input type="username" v-model="loginForm.username" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password" :rules="{
                required: true, message: '密码不能为空', trigger: 'blur'
                }">
				<el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<!-- <el-form-item label="验证码" prop="securityCode">
				<el-input v-model="loginForm.securityCode"></el-input>
			</el-form-item> -->
            <el-form-item label="记住我" prop="securityCode">
                 <el-checkbox v-model="loginForm.rememberMe" label="记住我" ></el-checkbox>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
				<el-button @click="resetForm('loginForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import qs from "qs"
	export default {
		name: "LoginPage",
		data() {

			return {
				loginForm: {
					username: '',
                    password: '',
                    rememberMe:false
					// ,securityCode: ''
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$post('/manage/shiro/ajaxLogin', this.loginForm, {
							'Content-Type': 'application/json'
						}).then(resp => {
							console.log('登陆成功', resp);
							if(resp.code=='1'){
								//将登陆信息存入全局变量和浏览器session中
								this.$store.commit('save_detail_info', resp.data);
								//  登陆成功后跳转到首页
								let toPath = sessionStorage.getItem("toPath");
							
								this.$router.push({
									path: toPath ? toPath : '/index'
								})
							}
							
						}).catch(err => {
							console.log('请求失败：', err);
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}

</script>

<style scoped>

</style>

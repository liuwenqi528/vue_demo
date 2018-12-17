<template>
	<div class="userAdd" style="width: 100%;height: 100%;overflow-y: auto">
		<el-form ref="userAddForm" :model="userAddForm" label-width="80px" size="small" status-icon :rules="userAddFormRules" class="demo-ruleForm">
			<el-form-item label="姓名" prop="truename">
				<el-input size="small" v-model="userAddForm.truename"></el-input>
			</el-form-item>
			<el-form-item label="用户名" prop="username">
				<el-input size="small" v-model="userAddForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="userAddForm.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="userAddForm.checkPass"></el-input>
			</el-form-item>

			<!-- <el-form-item label="年龄" prop="age">
				<el-input v-model.number="userAddForm.age"></el-input>
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary" @click="submitForm('userAddForm')">提交</el-button>
				<el-button @click="resetForm('userAddForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	export default {
		name: 'userAdd',
		data() {
			var validateTruename = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入姓名'));
				} else {
					callback();
				}
			};
			var validateUsername = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.userAddForm.checkPass !== '') {
						this.$refs.userAddForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.userAddForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				userAddForm: {
					username: '',
					password: '',
					checkPass: '',
					truename: '',
					photo: '',
				},
				userAddFormRules: {
					truename: [{
						validator: validateTruename,
						trigger: 'blur'
					}],
					username: [{
						validator: validateUsername,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			// 保存
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$post('/manage/user/insert', this.userAddForm, {
							'Content-Type': 'application/json'
						}).then(resp => {
                            console.log('保存成功', resp);
                            console.log('this.$route.path', this.$route.path);
							let message = resp.message;
							this.$message({
								showClose: true,
								message: message,
								type: resp.code === '1' ? 'success' : 'error'
							});
							if (resp.code === '1') {
                                 this.$store.commit('delete_tabs',this.$route.path);
								//  登陆成功后跳转到首页
								let toPath = sessionStorage.getItem("toPath");

								this.$router.push({
									path: toPath ? toPath : '/user'
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
			// 重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}

</script>

<style>
	.el-form-item__content>.el-input {
		width: 200px;
	}

</style>

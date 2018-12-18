<template>
	<div class="userAdd" style="width: 100%;height: 100%;overflow-y: auto">
		<el-form ref="userAddForm" :model="userAddForm" label-width="80px" size="small" status-icon :rules="userAddFormRules"
		 class="demo-ruleForm">
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
			<el-form-item>
				<el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" 
                :on-success="handleAvatarSuccess" accept="image/png, image/jpeg"
                :http-request="fileUpload"
				 :before-upload="beforeAvatarUpload" :with-credentials="true">
					<img v-if="userAddForm.photo" :src="userAddForm.photo" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
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
    import qs from 'qs';
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
				uploadUrl: 'http://192.168.103.126:8800/manage/file/fileUpload/', //上传头像地址
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
                },
                uploadHeader:{
                    'Content-Type':'mulitpart/form-data'
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
								this.$store.commit('delete_tabs', this.$route.path);
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
			},
			// 上传成功后执行
			handleAvatarSuccess(res, file) {
                console.info("fileuploadRes==",res);
                console.info("fileupload：",file);
				// this.userAddForm.photo = URL.createObjectURL(file.raw);
			},
			//   上传之前执行
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
            },
			//自定义上传
            fileUpload(item,group){
                console.info(item);
                console.info(group);
                 let formData = new FormData()
                formData.append('file', item.file)
                formData.append('group', 'system')
                
                this.$post('/manage/file/fileUpload?type=123',formData,{
                        'Content-Type':'multipart/form-data'
                })
                .then(resp => {
                    console.info("上传完成resp===",resp)
                }).catch(err => {
                    console.log('请求失败：' + err.status + ',' + err.statusText);
                });



              

            }
		}
	}

</script>

<style>
	.el-form-item__content>.el-input {
		width: 200px;
	}

	/* .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } */

</style>

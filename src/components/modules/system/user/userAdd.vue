<template>
	<!-- <div class="userAdd" style="width: 100%;height: 100%;overflow-y: auto"> -->
	<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close='closeDialog'>
		<el-form ref="userAddForm" :model="userAddForm" label-width="80px" size="small" status-icon :rules="userAddFormRules"
		 class="demo-ruleForm">
			<el-form-item label="姓名" prop="truename">
				<el-input size="small" v-model="userAddForm.truename"></el-input>
			</el-form-item>
			<el-form-item label="用户名" prop="username">
				<el-input size="small" v-model="userAddForm.username" :disabled="userAddForm.id!=null&&userAddForm.id!=''"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="userAddForm.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="userAddForm.checkPass"></el-input>
			</el-form-item>
			<el-form-item>
				<el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess"
				 :data="uploadData" :before-upload="beforeAvatarUpload" :with-credentials="true">
					<img v-if="photoPath" :src="photoPath" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('userAddForm')">提交</el-button>
				<el-button @click="resetForm('userAddForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<!-- </div> -->

</template>

<script>
	import qs from 'qs';
	export default {
		props: ['dialogStatus', 'dialogTitle', 'formModel'],
		name: 'UserAdd',
		componentName: "UserAdd",
		data() {
			var validateTruename = (rule, value, callback) => {
				if (!value || value == '') {
					callback(new Error('请输入姓名'));
				} else {
					callback();
				}
			};
			var validateUsername = (rule, value, callback) => {
				if (!value || value == '') {
					callback(new Error('请输入用户名'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (!value) {
                    if( !this.userAddForm.id){
                        callback(new Error('请输入密码'));
                    }else{
                        callback();
                    }
				} else {
					if (this.userAddForm.checkPass !== '') {
						this.$refs.userAddForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				
				if (!value) {
                    if(!this.userAddForm.id || this.userAddForm.password){
                       callback(new Error('请再次输入密码'));
                    }else{
                        callback();
                    }
				} else if (value !== this.userAddForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				uploadData: {
					module: 'userPhoto'
				},
				uploadUrl: 'http://192.168.103.126:8800/manage/file/fileUpload/', //上传头像地址
				downloadUrl: 'http://192.168.103.126:8800/manage/file/fileDownload/', //回显头像地址
				echoUrl: 'http://192.168.103.126:8800/manage', //回显头像地址
				photoPath: '',
				userAddForm: {
					id: '',
					username: '',
					password: '',
					checkPass: '',
					truename: '',
					photo: '',
					photoPath: ''
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
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				},
				uploadHeader: {
					'Content-Type': 'mulitpart/form-data'
				},
				dialogFormVisible: false,
				title: ''
			}
		},
		methods: {
			//关闭
			closeDialog() {
				this.$refs['userAddForm'].resetFields();
				this.$emit('dialogHide');
			},
			// 保存
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$post('/manage/user/save', this.userAddForm, {
							'Content-Type': 'application/json'
						}).then(resp => {
							let message = resp.message;
							this.$message({
								showClose: true,
								message: message,
								type: resp.code === '1' ? 'success' : 'error'
							});
							if (resp.code === '1') {
								// this.$store.commit('delete_tabs', this.$route.path);
								// //  登陆成功后跳转到首页
								// let toPath = sessionStorage.getItem("toPath");
								// this.$router.push({
								// 	path: toPath ? toPath : '/user'
                                // })
                                this.$emit('dialogCloseAfter');
                                this.$emit('dialogHide');
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
				if (res && res.code == '1') { 
					this.userAddForm.photo = res.data.id;
					this.photoPath = URL.createObjectURL(file.raw);
					this.$message.success('上传成功');
				} else {
					this.$message.error('上传失败');
				}


			},
			//   上传之前执行
			beforeAvatarUpload(file) {
				// const isJPG = file.type === 'image/jpeg';
				let isJPG = true;
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			//自定义上传,上传属性添加 [:http-request="fileUpload"]
			fileUpload(item) {
				let formData = new FormData();
				formData.append('file', item.file);
				formData.append('module', 'userPhoto');

				this.$post('/manage/file/fileUpload', formData, {
					'Content-Type': 'multipart/form-data'
				}).then(resp => {
					if (resp && resp.data.code == '1') {
						this.photoPath = this.echoUrl + resp.data.id;
						this.userAddForm.photo = resp.data.id;
						this.$message.success('上传成功');
					} else {
						this.$message.error('上传失败');
					}

				}).catch(err => {
					console.log('请求失败：' + err.status + ',' + err.statusText);
				});
			}
		},
		watch: {
			dialogStatus(newValue, oldValue) {
				this.dialogFormVisible = newValue;
			},
			dialogTitle(newValue, oldValue) {
				this.title = newValue;
			},
			formModel(newValue, oldValue) {
                console.info("newValue",newValue);
                console.info("oldValue",oldValue);
               
                if(newValue){
                    this.userAddForm = newValue;
                }
				
				if (newValue.fileEntity!=null  && newValue.fileEntity.filePath!=null) {
					this.photoPath = this.echoUrl + newValue.fileEntity.filePath;
                }else{
                    this.photoPath = '';
                }
                console.info("this.userAddForm",this.userAddForm)

			}
		}
	}

</script>

<style>
	.el-form-item__content>.el-input {
		width: 200px;
	}

	.avatar-uploader .el-upload {
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
	}

</style>

<template>
	<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close='closeDialog'>
		<el-form ref="userEntity" :model="userEntity" label-width="80px" size="small" class="demo-ruleForm">
			<el-form-item label="姓名" prop="truename">
				{{userEntity.truename}}
			</el-form-item>
			<el-form-item label="用户名" prop="username">
                {{userEntity.username}}
			</el-form-item>
			<el-form-item>
				<img v-if="photoPath" :src="photoPath" class="avatar">
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="closeDialog">关闭</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
	import qs from 'qs';
	export default {
		props: ['dialogStatus', 'dialogTitle', 'formModel'],
		name: 'UserInfo',
		componentName: "UserInfo",
		data() {
			return {
				uploadData: {
					module: 'userPhoto'
				},
				echoUrl: 'http://192.168.103.126:8800/manage', //回显头像地址
				photoPath: '',
				userEntity: {
					id: '',
					username: '',
					password: '',
					checkPass: '',
					truename: '',
					photo: '',
					photoPath: ''
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
				this.$emit('dialogHide');
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

				if (newValue) {
					this.userEntity = newValue;
				}

				if (newValue.fileEntity != null && newValue.fileEntity.filePath != null) {
					this.photoPath = this.echoUrl + newValue.fileEntity.filePath;
				} else {
					this.photoPath = '';
				}

			}
		}
	}

</script>

<style scoped>
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

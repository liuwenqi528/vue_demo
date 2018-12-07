<template>
	<div class="sys_user" style="width: 100%;height: 100%;overflow-y: auto">
		<!-- 搜索框内容 -->
		<el-row>
			<el-col :span="24" style="height:100%">
				<el-form :inline="true" :model="searchObj" size="small" class="searchForm">
					<el-form-item label="用户名">
						<el-input v-model="searchObj.user" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-select v-model="searchObj.sex" placeholder="性别">
							<el-option label="请选择" value></el-option>
							<el-option label="男" value="1"></el-option>
							<el-option label="女" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<!-- 表格数据 -->
		<el-row style="height:calc(100% - 60px)">
			<el-col :span="24" style="height:100%">
				<el-table :data="tableData" style="width: 100%" height="100%" ref="elTable" :default-sort="{prop: 'date', order: 'descending'}">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column label="序号" type="index" width="50"></el-table-column>
					<el-table-column prop="username" label="用户名" :formatter="formatter" sortable min-width="100"></el-table-column>
					<el-table-column prop="truename" label="真实名称" min-width="100"></el-table-column>
					<el-table-column prop="photo" label="头像" min-width="100"></el-table-column>
					<el-table-column prop="password" label="密码" show-overflow-tooltip min-width="50"></el-table-column>
					<el-table-column label="操作" min-width="100">
						<template slot-scope="scope">
							<el-button @click="infoClick(scope.row)" size="small">查看</el-button>
							<el-button @click="editClick(scope.row)" size="small">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import qs from "qs"
	export default {
		name: 'SysUser',
		data() {
			return {
				searchObj: {
					username: '',
					truename: ''
				},
				count: 1,
				tableData: []

			}
		},
		methods: {
			initTable() {
				this.$post('/manage/user/findAll')
					.then(resp => {
						this.tableData = resp;
					}).catch(err => {
						console.log('请求失败：' + err.status + ',' + err.statusText);
					});
			},
			onSubmit() {
				this.$post('/manage/user/findAll')
					.then(resp => {
						this.tableData = resp;
					}).catch(err => {
						console.log('请求失败：' + err.status + ',' + err.statusText);
					});
			},
			infoClick(row) {
				this.$post('/manage/user/gets/' + row.id, )
					.then(resp => {
						console.log("请求返回数据：", resp);
					}).catch(err => {
						console.log('请求失败：' + err.status + ',' + err.statusText);
					});
			},
			editClick(row) {},
			formatter(row, column) {
				return row.username;
			}
		},
		mounted() {
			this.initTable();
		}
	}

</script>

<style scoped>
	.searchForm {
        padding-left: 14px;
	}

	

	.el-form-item--mini.el-form-item,
	.el-form-item--small.el-form-item {
		margin-bottom: 10px;
	}

</style>

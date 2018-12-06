<template>
	<div class="food" style="width: 100%;height: 100%;overflow-y: auto">
		<!--<el-button type="primary" icon="el-icon-plus" @click="addTable"></el-button>-->
		<!--<el-button type="primary" icon="el-icon-minus" @click="saveTable"></el-button>-->
		<el-form ref="form" :model="form" label-width="80px" size="small">
			<el-form-item label="任务名称">
				<el-input size="small" v-model="form.name" @blur="nameBlur"></el-input>
			</el-form-item>
			<el-form-item label="任务内容">
				<el-input size="small" v-model="form.content" @blur="contentBlur"></el-input>
			</el-form-item>
			<el-form-item label="时效分">
				<el-input size="small" v-model="form.timeScore" disabled></el-input>
			</el-form-item>
			<el-form-item label="质量分">
				<el-input size="small" v-model="form.qualityScore" disabled></el-input>
			</el-form-item>
			<el-form-item label="总分">
				<el-input size="small" v-model="form.sumScore" disabled></el-input>
			</el-form-item>
			<el-form-item label="子任务">
				<el-button type="primary" icon="el-icon-plus" @click="addTable" :disabled="addStage">添加子任务</el-button>
				<el-table :data="form.tableData" style="width: 100%">
					<!--@cell-mouse-leave="mouseLeave">-->
					<el-table-column label="子任务编号" width="150">
						<template slot-scope="scope">
							<el-input size="small" placeholder="子任务编号" v-model="form.tableData[scope.$index].stageNum"  disabled>
							</el-input>
						</template>
					</el-table-column>
					<el-table-column label="子任务名称" min-width="100">
						<template slot-scope="scope">
							<el-input size="small" placeholder="请输入名称"v-model="form.tableData[scope.$index].name"  >
							</el-input>
						</template>
					</el-table-column>
					<el-table-column label="子任务内容" min-width="100">
						<template slot-scope="scope">
							<el-input size="small" placeholder="请输入内容" v-model="form.tableData[scope.$index].content" >
							</el-input>
						</template>
					</el-table-column>
					<el-table-column label="时效分" min-width="50">
						<template slot-scope="scope">
							<el-input size="small" placeholder="时效分" v-model="form.tableData[scope.$index].timeScore">
							</el-input>
						</template>
					</el-table-column>
					<el-table-column label="质量分" min-width="50">
						<template slot-scope="scope">
							<el-input size="small" placeholder="质量分" v-model="form.tableData[scope.$index].qualityScore" >
							</el-input>
						</template>
					</el-table-column>
					<el-table-column label="总分" min-width="50">
						<template slot-scope="scope">
							<el-input size="small" placeholder="总分" v-model="form.tableData[scope.$index].sumScore" disabled>
							</el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作"  min-width="120">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
							</el-button>
							<el-button size="mini" type="danger" :disabled="deleteStage" @click="handleDelete(scope.$index, scope.row)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	export default {
		name: 'food',
		data() {

			return {
				count: false,
                addStage: true,//标识 子任务添加按钮是否可以点击，true不可使用。false可以使用
                deleteStage :true,//标识  是否可以删除子任务  true不可删除，false可以删除
				stageNum: 2,//子任务编号下一位数
				fmt: "yyyyMMdd",//时间格式
				form: {
					id: '',
					name: '',
					content: '',
					timeScore: '0.00',
					qualityScore: '0.00',
					sumScore: '0.00',
					tableData: [{
						id: '',
						stageNum: "RW" + new Date().Format("yyyyMMdd") +"01",
						name: '',
						content: '',
						timeScore: '0.00',
						qualityScore: '0.00',
						sumScore: '0.00'
					}]
				}

			}
		},
		methods: {
			mouseLeave(a, b, c) {},
			nameBlur(a) {
				this.form.tableData[0].name = this.form.name;
                if(this.addStage){
                    // this.form.tableData[0].stageNum = "RW" + new Date().Format(this.fmt) + (("00" + this.stageNum).substr(("" + this.stageNum).length));
                    // this.stageNum++;
                    this.addStage = false;
                }
			},
			contentBlur() {
				this.form.tableData[0].content = this.form.content;
			},
            handleEdit(index, row) {},

			handleDelete(index, row) {
                this.form.tableData.splice(index, 1);
                this.stageNum = index + 1;
                for(let i = index;i<this.form.tableData.length;i++){
                    this.form.tableData[i].stageNum="RW" + new Date().Format(this.fmt) + (("00" + this.stageNum)).substr(("" + this.stageNum).length);
                    this.stageNum++;
                }
                if(this.form.tableData.length==1){
                    this.deleteStage = true;
                }
			},
			addTable() {
				this.form.tableData.push({
					id: '',
					stageNum: "RW" + new Date().Format(this.fmt) + (("00" + this.stageNum).substr(("" + this.stageNum).length)),
					name: '',
					content: '',
					timeScore: '0.00',
					qualityScore: '0.00',
					sumScore: '0.00'
				});
                this.stageNum++;
                if(this.deleteStage){
                    this.deleteStage = false;
                }
			},
			saveTable() {
				console.info(this.form.tableData)
			},
			onSubmit() {
				console.log('submit!');
			}
        }
	}

</script>

<style>
	.el-form-item__content > .el-input {
		width: 200px;
	}

</style>

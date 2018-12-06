<template>
	<div class="rating">{{msg}}

		<el-input
			v-model="inputVal"
			placeholder="请输入内容"
			@blur="blurEvent">
		</el-input>
		<el-input
			placeholder="请输入内容"
			suffix-icon="el-icon-date"
			v-model="input7.name"
			@blur="blurEvent">
		</el-input>
		<el-input
			placeholder="请输入内容"
			suffix-icon="el-icon-date"
			v-model="input7.age"
			@blur="blurEvent">
		</el-input>
		<el-input
			placeholder="请输入内容"
			suffix-icon="el-icon-date"
			v-model="input7.address"
			@blur="blurEvent">
		</el-input>
		<el-input
			placeholder="请输入内容"
			suffix-icon="el-icon-date"
			v-model="input7.list[0].a"
			@blur="blurEvent">
		</el-input>
		<el-input
			placeholder="请输入内容"
			suffix-icon="el-icon-date"
			v-model="input7.list[0].b"
			@blur="blurEvent">
		</el-input>
		<el-input
			placeholder="请输入内容"
			suffix-icon="el-icon-date"
			v-model="input7.list[1].a"
			@blur="blurEvent">
		</el-input>
	</div>
</template>

<script>
	export default {
		name: "rating",
		data() {
			return {
				inputVal: '',
				input7: {
					name: '',
					age: '',
					address: '',
					list: [
						{
							a: '',
							b: ''
						},
						{
							a: '',
							b: ''
						}
					]
				},
				msg: "这是rating页"
			}
		},
		methods:{
			blurEvent(a){
			}
		}
	}
</script>

<style>

</style>

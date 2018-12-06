import Nav from './navigation/index.js'

//引入的组件名称放入此集合中。用于遍历实例化组件
const components =[
	Nav
]

// 这里是重点
const install= function(Vue){
	components.forEach(component => {
		Vue.component(component.name, component);
	});
}
const exportCom = {
	install,
	Nav
}
export default exportCom

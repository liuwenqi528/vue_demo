import ElNav from './src/navigation';
ElNav.install = function(Vue) {
  Vue.component(ElNav.name, ElNav);
};
export default ElNav;

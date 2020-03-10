// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from  'vue-resource'
import VueRouter from 'vue-router'
//引入路由
import Routes from './routes'


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)

//自定义指令调试区
// Vue.directive('rainbow', {
//   //钩子函数
//   bind(el,binding,vnode){
//     //标题
//     el.style.color = "#" + Math.random().toString(16).slice(2,8);
//   }
// })
Vue.directive('theme',{
  bind(el,binding,vnode){
    //判断是wide
    if (binding.value == 'wide'){
      el.style.maxWidth = "1260px";
    }
  //  判断不是wide
    else if (binding.value == 'narrow') {
      el.style.maxWidth = "560px";

    }
    //判断是column指令背景色
    if (binding.arg == 'column'){
      el.style.background = "#236678";
      el.style.padding = '20px';
    }
  }
})

//自定义过滤器   全局
// Vue.filter("to-uppercase",function(value) {
//   return value.toUpperCase();
// })
Vue.filter("snippet", function(value){
  return value.slice(0,100) + "...";
})


//创建路由
const router = new VueRouter({
  routes:Routes,
  //去除#
  mode:"history"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router:router
})

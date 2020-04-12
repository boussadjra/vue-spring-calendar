import Vue from 'vue';


export const Fragment = {
  bind(el, binding, vnode) {
  },

  inserted(el){
    el.replaceWith(...el.childNodes)
  },

}


Vue.directive('fragment', Fragment)
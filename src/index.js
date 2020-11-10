import elementTable from './index.vue'

elementTable.install = function (Vue, options) {
  Vue.component(elementTable.name, elementTable)
  if (options && Object.prototype.toString.call(options) === '[object Object]' && Object.keys(options).length) {
    Vue.prototype.$tableConfig = options
  } else {
    Vue.prototype.$tableConfig = {}
  }
}

export default elementTable

import myTable from './index.vue'

myTable.install = function (Vue, options) {
  Vue.component(myTable.name, myTable)
  if (options && Object.prototype.toString.call(options) === '[object Object]' && Object.keys(options).length) {
    Vue.prototype.$tableConfig = options
  } else {
    Vue.prototype.$tableConfig = {}
  }
}

export default myTable

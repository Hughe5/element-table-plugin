import elementTable from './index.vue'
import { isPlainObj } from './utils'

elementTable.install = function (Vue, options) {
  Vue.component(elementTable.name, elementTable)
  Vue.prototype.$tableConfig = isPlainObj(options) ? options : {}
}

export default elementTable

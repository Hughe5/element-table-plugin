# 表格插件

基于Element，根据配置为网页添加表格

## Features

- 展示静态数据
- 配置接口，自动请求，展示动态数据
- 分页、换页
- 添加与表格相关的操作按钮，如“导出”等
- 统一的空数据时的展示效果
- 固定列、排序、设置列的宽度、控制列的展示
- 自定义列模板
- 鼠标浮在单元格上，展示完整内容，支持一键复制

## 引入

// main.js

``` javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import myTable from 'element-table-plugin'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(myTable, { // 详见fields
  page: 'page',
  pageSize: 'limit',
  code: 'stat',
  apiSuccess: 1,
  data: 'data.list', // 取表格数据
  total: 'data.total', // 取总条数
})
// or
// Vue.use(myTable)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

// index.vue

``` html
<my-table
  :initRequest="request"
  :initColumns="columns"
  :canChangeColumns="canChangeColumns"
  :initPagination="pagination">
    <template #action="{row}">
      <span @click="edit(row)">编辑</span>
    </template>
    <template #buttons>
      <el-button type="primary" @click="export">导出</el-button>
    </template>
</my-table>

<script>
export default {
  data () {
    return {
      request: {
        url: '/api/data/list',
        method: 'post',
      },
      columns: [
        {
          prop: 'name',
          label: '姓名',
          fixed: 'left',
          width: '280px',
        },
        {
          prop: 'desc',
          label: '描述',
          usePopover: true,
        },
        {
          prop: 'create_time',
          label: '创建时间',
          sortable: true,
        },
        {
          prop: 'action',
          label: '操作',
        }
      ],
      canChangeColumns: true,
      pagination: {
        pageSize: 20,
      },
    }
  },
  methods: {
    edit (row) {
      //
    },
    export () {
      //
    },
  },
}
</script>
```

## props

### initRequest

- 请求表身，与axios中的一致，支持异步传入

- 类型：object

- 默认值：`{}`

### initFields

- 字段集

- 类型：object

- 默认值：`{}`

- 属性的列表：

| 参数 | 说明 | 类型 | required | 默认值 |
| - | - | - | - | - |
| page | 当前页 | string | false | - |
| pageSize | 每页条数 | string | false | - |
| code | 状态码 | string | false | - |
| apiSuccess | 成功的状态码的值 | number | false | - |
| data | 表身 | string | false | - |
| total | 总条目数 | string | false | - |

### initColumns

- 表头

- 类型：`Array<object>`

- 默认值：`[]`

- 元素的属性的列表：

| 参数 | 说明 | 类型 | required | 默认值 |
| - | - | - | - | - |
| prop | 列的prop，与Element中的一致 | string | true | - |
| label | 列的label，与Element中的一致 | string | false | - |
| width | 列的宽，与Element中的一致 | string | false | - |
| usePopover | 是否用浮层显示单元格的详情 | boolean | false | - |
| fixed | 固定列，与Element中的一致 | string &#124; boolean | false | - |
| sortable | 是否支持排序 | boolean | false | - |

### initData

- 表身，配了initRequest就不用传这个

- 类型：`Array<object>`

- 默认值：`[]`

### initPagination

- 分页

- 类型：object

- 属性的列表：

| 参数 | 说明 | 类型 | required | 默认值 |
| - | - | - | - | - |
| page | 当前页 | number | false | 1 |
| pageSize | 每页条数 | number | false | 30 |
| total | 总条目数 | number | false | 0 |

## Methods

| 方法名 | 说明 |
| - | - |
| getFields | 返回表头和表身的数据 |

## slot

| name | 说明 |
| - | - |
| 列的prop | 自定义列的内容，参数为 { row } |
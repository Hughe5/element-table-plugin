<template>
  <div class="element-table">
    <slot name="buttons"></slot>
    <el-table border :data="data" max-height="600" v-loading="loading">
      <el-table-column v-for="(item, index) in columns" :key="index" align="center" :prop="item.prop" :label="item.label" :fixed="item.fixed" :width="item.width" :sortable="item.sortable">
        <template slot-scope="scope">
          <slot :name="item.prop" :row="scope.row">
            <el-popover v-if="item.usePopover && (scope.row[item.prop] || scope.row[item.prop] === 0)" placement="top" width="400" popper-class="popper" trigger="hover">
              <p style="margin-bottom: 12px;max-height: 160px;overflow: auto;padding: 12px;">{{scope.row[item.prop]}}</p>
              <el-button style="margin-left: 12px;margin-bottom: 12px;" plain @click="copy(scope.row[item.prop])">复制文本</el-button>
              <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" slot="reference">{{scope.row[item.prop]}}</div>
            </el-popover>
            <template v-else>{{(scope.row[item.prop] || scope.row[item.prop] === 0) ? scope.row[item.prop] : '—'}}</template>
          </slot>
        </template>
      </el-table-column>
      <template #empty>
        <img class="empty-img" src="../assets/imgs/empty.png" alt />
        <p class="empty-p">没有内容</p>
      </template>
    </el-table>
    <el-pagination v-if="initPagination && Number(pagination.total) > Number(pagination.pageSize)" @current-change="changePage" :current-page="Number(pagination.page)" background layout="prev, pager, next, total, jumper" :total="Number(pagination.total)" :page-size="Number(pagination.pageSize)"></el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
const defaultConfig = {
  request: {}, // 请求的配置
  fields: {}, // 字段集
  columns: [], // 表头
  data: [], // 表格数据
  pagination: { // 分页
    page: 1,
    total: 0,
    pageSize: 30,
  },
}
export default {
  name: 'element-table',
  props: {
    initRequest: {
      type: Object,
      default: function () {
        return defaultConfig.request
      },
    },
    initFields: {
      type: Object,
      default: function () {
        return defaultConfig.fields
      },
    },
    initColumns: {
      type: Array,
      default: function () {
        return defaultConfig.columns
      },
    },
    initData: {
      type: Array,
      default: function () {
        return defaultConfig.data
      },
    },
    initPagination: {
      type: Object,
    },
  },
  data () {
    return {
      columns: this.initColumns,
      data: this.initData,
      loading: false,
    }
  },
  computed: {
    pagination () {
      return Object.assign({}, defaultConfig.pagination, this.initPagination)
    },
    request () {
      return _.cloneDeep(this.initRequest)
    },
  },
  watch: {
    initRequest: {
      handler () {
        this.getData()
      },
      immediate: true,
      deep: true
    },
  },
  methods: {
    getFields () {
      const { columns, data } = this
      return {
        columns,
        data,
      }
    },
    isPlainObj (val) {
      return Object.prototype.toString.call(val) === '[object Object]'
    },
    getVal (str, initValue) {
      if (!str) return
      return str.split('.').reduce((obj, key, index, array) => {
        if (index < array.length - 1 && !this.isPlainObj(obj[key])) {
          array.splice(index + 1)
        }
        return obj[key]
      }, initValue)
    },
    getKeyByMethod (method = 'get') {
      const keys = {
        'get': 'params',
        'post': 'data',
      }
      return keys[method.toLowerCase()]
    },
    setPaginationToRequest (page, pageSize) {
      const key = this.getKeyByMethod(this.request.method)
      const pagination = {
        [page]: this.pagination.page,
        [pageSize]: this.pagination.pageSize,
      }
      this.request[key] = Object.assign({}, this.request[key], pagination)
    },
    async getData () {
      try {
        const {page, pageSize, code, apiSuccess, data: dataKey, total} = Object.assign({}, this.$tableConfig, this.initFields)
        if (!(this.initRequest && this.initRequest.url && (apiSuccess || apiSuccess === 0))) return
        if (this.initPagination && page && pageSize) this.setPaginationToRequest(page, pageSize)
        this.loading = true
        const { status, data } = await axios(this.request)
        const dataVal = this.getVal(dataKey, data)
        if (status === 200 && this.getVal(code, data) === apiSuccess) {
          this.data = dataVal
          if (this.initPagination) {
            this.pagination.total = this.getVal(total, data)
          }
        } else if (dataVal) {
          this.$message.error(dataVal)
        }
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    },
    changePage (val) {
      this.pagination.page = val
      this.getData()
    },
    copy (val) {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.value = val
      input.select()
      if (document.execCommand) {
        document.execCommand('copy')
        this.$message.success('已复制到剪贴板')
      }
      document.body.removeChild(input)
    },
  },
}
</script>

<style lang="less">
  .user-select () {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .element-table {
    .el-table__header {
      background-color: #e8eaef;
      tr,
      th {
        background-color: #e8eaef;
        border: none;
      }
      .cell {
        display: flex;
        flex: none;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        border-right: 1px solid #fff;
      }
      th:nth-last-child(2) .cell {
        border-right: none;
      }
    }
    .empty-img {
      width: 160px;
      vertical-align: top;
      margin-top: 50px;
    }
    .empty-p {
      margin-bottom: 44px;
      .user-select();
    }
    .el-pagination {
      text-align: center;
      margin-top: 20px;
    }
  }
  .el-popover.popper {
    padding: 0;
  }
</style>

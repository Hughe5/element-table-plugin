<template>
  <element-table
    :initColumns="columns"
    :initPagination="pagination"
    :initData="data"></element-table>
</template>

<script>
export default {
  data () {
    return {
      // request: {
      //   url: 'http://localhost:3000/table'
      // },
      columns: [
        {
          prop: 'date',
          label: 'id'
        },
        {
          prop: 'name',
          label: '邮箱'
        },
        {
          prop: 'address',
          label: '姓名'
        },
      ],
      data: [
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
        {
          date: '1',
          name: 'n1',
          address: 'n11'
        },
      ],
      pagination: {
        pageSize: 5,
        total: '13',
        page: '2'
      }
    }
  },
  methods: {
    
  }
}
</script>

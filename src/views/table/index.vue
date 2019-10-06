<template>
  <div class="app-container">
    <p>
      <span>
      <el-button type="primary" size="mini" class="btn-style" :loading="listLoading" @click="fetchData">刷新</el-button>
      </span>
    </p>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!-- <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column> -->

      <el-table-column label="兑换礼券" width="220" align="center">
        <template slot-scope="scope">
          {{ scope.row.product.name }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.verification.address.province }}
        </template>
      </el-table-column>
      <el-table-column label="电话" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.verification.address.phone }}
        </template>
      </el-table-column>
      <el-table-column label="收货地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.verification.address.address }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.delivery?'success':'warning'">{{ scope.row.delivery | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="兑换时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.verification.CreateTime.format() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          :disabled="scope.row.delivery"
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">发货</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, delivery } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        true : '已发货',
        false: '待配送',
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList()
      .then(response => {
        this.list = response
      })
      .finally(() => {
        setTimeout(() => {
          this.listLoading = false
        }, 500);
      })
    },
    handleEdit(index, row) {
      delivery({_id : row._id})
      .then(doc => {
        row.delivery = true;
        this.$message.success('发货成功');
        this.list.slice(index, 1, row);
      })
      .catch(err => {
        this.$message.error('发货失败');
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<template>
  <div class="mt-2">
    <el-form
      ref="supplierQueryForm"
      :inline="true"
      :model="supplierQueryParams"
    >
      <el-form-item prop="name">
        <el-input
          v-model="supplierQueryParams.name"
          placeholder="供应商名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="linkman">
        <el-input
          v-model="supplierQueryParams.linkman"
          placeholder="联系人"
        ></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input
          v-model="supplierQueryParams.mobile"
          placeholder="联系电话"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleQuerySupplier">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset('memberQueryForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="supplierList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="供应商名称"></el-table-column>
      <el-table-column prop="linkman" label="联系人"></el-table-column>
      <el-table-column prop="mobile" label="联系电话"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot="scope">
          <el-button size="mini" @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="mt-2"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import SupplierApi from "../../api/supplier";
export default {
  name: "index",
  data() {
    return {
      // 用来保存后台返回的会员列表数据
      supplierList: [],
      // 页码
      page: 1,
      // 条数
      size: 10,
      // 总条数
      total: 0,
      // 查询的参数
      supplierQueryParams: {
        name: "",
        linkman: "",
        remark: "",
      },
    };
  },
  created() {
    this.supplierList();
  },
  filters: {},
  methods: {
    /**
     * 获取会员列表数据
     * @returns {Promise<void>}
     */
    async supplierList() {
      const { rows, total } = await SupplierApi.supplierList(
        this.currentPage,
        this.pagesize,
        this.supplierQueryParams
      );
      this.total = total;
      this.supplierList= rows;
    },
    /**
     * 条数切换触发的方法
     */
    handleSizeChange(size) {
      this.size = size;
      this.supplierList();
    },
    /**
     * 页码切换触发的方法
     */
    handleCurrentChange(page) {
      this.page = page;
      this.supplierList();
    },
  },
};
</script>

<style scoped>
</style>

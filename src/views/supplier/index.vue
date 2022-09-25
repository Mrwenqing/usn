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
          placeholder="联系人电话"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuerySupplier">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset('supplierQueryForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="SupplierList" height="380" border style="width: 100%">
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

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        ref="dialogForm"
        :model="dialogFormParams"
        :rules="dialogRules"
        style="width: 400px"
        label-width="120px"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input
            v-model="dialogFormParams.linkman"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input
            v-model="dialogFormParams.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            v-model="dialogFormParams.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SupplierApi from "../../api/supplier";
export default {
  name: "index",
  data() {
    return {
      // 用来保存后台返回的会员列表数据
      SupplierList: [],
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
        mobile: "",
        remark: "",
      },
      // 控制弹窗的显示与隐藏 true为显示 false为隐藏
      dialogFormVisible: false,
      // 保存弹窗表单的数据
      dialogFormParams: {
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      // 弹窗标题
      dialogTitle: "供应商新增",
      // 弹窗表单的校验规则
      dialogRules: {
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getSupplierList();
  },
  methods: {
    /**
     * 获取会员列表数据
     * @returns {Promise<void>}
     */
    async getSupplierList() {
      const { rows, total } = await SupplierApi.getSupplierList(
        this.page,
        this.size,
        this.supplierQueryParams
      );
      this.total = total;
      this.SupplierList = rows;
    },
    /**
     * 条数切换触发的方法
     */
    handleSizeChange(size) {
      this.size = size;
      this.getSupplierList();
    },
    /**
     * 页码切换触发的方法
     */
    handleCurrentChange(page) {
      this.page = page;
      this.getSupplierList();
    },
    /**
     * 会员查询功能
     */
    handleQuerySupplier() {
      this.page = 1;
      this.getSupplierList();
    },
    /**
     * 表单重置
     */
    handleReset(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 删除会员功能
     * @param id
     */
    handleDelete(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await SupplierApi.deleteSupplierList(id);
            this.$message.success("删除成功");
            this.getSupplierList();
          } catch (e) {
            console.log(e.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * 打开弹窗
     */
    handleOpenDialog(id) {
      this.dialogFormVisible = true;
      if (typeof id === "number") {
        this.dialogTitle = "会员编辑";
        this.handleFindSupplier(id);
        return;
      }
      this.dialogTitle = "会员新增";
    },
    /**
     * 弹窗的提交方法
     */
    handleSubmit() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogFormParams.id
          ? this.handleEditSupplier()
          : this.handleAddSupplier();
      });
    },
    /**
     * 会员新增
     */
    async handleAddSupplier() {
      try {
        const response = await SupplierApi.addSupplier(this.dialogFormParams);
        this.handleReset("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        this.getSupplierList();
      } catch (e) {
        console.log(e.message);
      }
    },
    /**
     * 会员编辑方法
     */
    async handleEditSupplier() {
      try {
        const response = await SupplierApi.editSupplier(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.handleReset("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("编辑成功");
        this.getSupplierList();
      } catch (e) {
        console.log(e.message);
      }
    },
    /**
     * 查询单个会员数据
     */
    async handleFindSupplier(id) {
      try {
        const member = await SupplierApi.findSupplier(id);
        this.dialogFormParams = member;
      } catch (e) {
        console.log(e.message);
      }
    },
    /**
     * 弹窗的取消按钮方法
     */
    handleCancel() {
      this.dialogFormVisible = false;
      this.handleReset("dialogForm");
    },
  },
};
</script>

<style scoped>
</style>

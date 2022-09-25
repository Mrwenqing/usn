<template>
  <div class="mt-2">
    <el-form ref="staffQueryForm" :inline="true" :model="staffQueryParams">
      <el-form-item prop="username">
        <el-input
          v-model="staffQueryParams.username"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="staffQueryParams.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryStaff">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset('staffQueryForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="StaffList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="salary" label="薪酬"></el-table-column>
      <el-table-column prop="entryDate" label="入职时间"></el-table-column>

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
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="dialogFormParams.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model="dialogFormParams.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input
            v-model="dialogFormParams.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="薪酬" prop="salary">
          <el-input
            v-model="dialogFormParams.salary"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         <el-form-item label="入职时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择入职时间" v-model="dialogFormParams.entryDate"></el-date-picker>
    </el-col>
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
import StaffApi from "../../api/staff";
export default {
  name: "index",
  data() {
    return {
      // 用来保存后台返回的员工列表数据
      StaffList: [],
      // 页码
      page: 1,
      // 条数
      size: 10,
      // 总条数
      total: 0,
      // 查询的参数
      staffQueryParams: {
        username: "",
        name: "",
      },
      // 控制弹窗的显示与隐藏 true为显示 false为隐藏
      dialogFormVisible: false,
      // 保存弹窗表单的数据
      dialogFormParams: {
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      // 弹窗标题
      dialogTitle: "供应商新增",
      // 弹窗表单的校验规则
      dialogRules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getStaffList();
  },
  methods: {
    /**
     * 获取员工列表数据
     * @returns {Promise<void>}
     */
    async getStaffList() {
      const { rows, total } = await StaffApi.getStaffList(
        this.page,
        this.size,
        this.staffQueryParams
      );
      this.total = total;
      this.StaffList = rows;
    },
    /**
     * 条数切换触发的方法
     */
    handleSizeChange(size) {
      this.size = size;
      this.getStaffList();
    },
    /**
     * 页码切换触发的方法
     */
    handleCurrentChange(page) {
      this.page = page;
      this.getStaffList();
    },
    /**
     * 员工查询功能
     */
    handleQueryStaff() {
      this.page = 1;
      this.getStaffList();
    },
    /**
     * 表单重置
     */
    handleReset(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 删除员工功能
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
            const response = await StaffApi.deleteStaffList(id);
            this.$message.success("删除成功");
            this.getStaffList();
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
        this.dialogTitle = "员工编辑";
        this.handleFindStaff(id);
        return;
      }
      this.dialogTitle = "员工新增";
    },
    /**
     * 弹窗的提交方法
     */
    handleSubmit() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogFormParams.id
          ? this.handleEditStaff()
          : this.handleAddStaff();
      });
    },
    /**
     * 员工新增
     */
    async handleAddStaff() {
      try {
        const response = await StaffApi.addSupplier(this.dialogFormParams);
        this.handleReset("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        this.getStaffList();
      } catch (e) {
        console.log(e.message);
      }
    },
    /**
     * 员工编辑方法
     */
    async handleEditStaff() {
      try {
        const response = await StaffApi.editStaff(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.handleReset("dialogForm");
        this.dialogFormVisible = false;
        this.$message.success("编辑成功");
        this.getStaffList();
      } catch (e) {
        console.log(e.message);
      }
    },
    /**
     * 查询单个员工数据
     */
    async handleFindStaff(id) {
      try {
        const staff = await StaffApi.findStaff(id);
        this.dialogFormParams = staff;
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

<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="礼券名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
        action="http://server.h-fish.vip/upload"
        list-type="picture-card"
        :limit = "1"
        :multiple = "false"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number v-model="form.price" :precision="2" :step="0.1"></el-input-number>
      </el-form-item>
      <el-form-item label="内容描述">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList, post } from '@/api/product'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        name  : '',
        price : '',
        img   : '',
        desc  : ''
      }
    }
  },
  methods: {
    onSubmit() {
      post(this.form)
      .then(doc => {
        this.$message.success('上传成功！')
      })
      .catch(err => {
        this.$message.error('上传失败！')
      })
      
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleSuccess(response,file,fileList) {
      this.form.img = file.response.msg;
      this.$message({
          message: '图片上传成功！',
          type: 'success'
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


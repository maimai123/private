
<template>
  <div class="demand-create">
    <grid :title="id ? '修改需求' : '新增需求'">
      <el-form style="width: 600px;" :model="form" :rules="rules" ref="$createform" label-width="110px">
        <div class="title">基本信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="头像" prop="avatar">
              <UploadImg field="avatar" @onSuccess="handleChoose" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nike">
              <el-input v-model="form.nike" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司" prop="company">
              <el-input v-model="form.company" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位" prop="position">
              <el-input v-model="form.position" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">对接信息<span>（信息描述得越详细越高效）</span></div>
        <el-form-item label="我的需求" prop="demand.text">
          <el-input type="textarea" v-model="form.demand.text" placeholder="示例：1.小程序开发 2.网站开发"/>
        </el-form-item>
        <el-form-item label="需求标签选择" prop="demand.tags" class="item-content">
          <el-select v-model="form.demand.tags" placeholder="请选择">
          </el-select>
        </el-form-item>
        <el-form-item label="我的资源" prop="resource.text">
          <el-input type="textarea" v-model="form.resource.text" placeholder="示例：1.100万粉丝群 2.日活1000+产品"/>
        </el-form-item>
        <el-form-item label="资源标签选择" prop="resource.tags" class="item-content">
          <el-select v-model="form.resource.tags" placeholder="请选择">
          </el-select>
        </el-form-item>
        <div class="title">联系方式<span>（信息保密，仅用于高效对接）</span></div>
        <el-form-item label="地址">
          <div class="flex">
            <el-form-item label="" prop="province" class="item-content">
              <el-cascader
                :options="location"
                :props="props"
                :separator="'-'"
                v-model="form.province"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="" prop="address" class="item-content">
              <el-input v-model="form.address" placeholder="请输入所在详细地址" style="width: 300px;" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="类型" prop="type" class="item-content">
          <el-radio v-model="form.type" :label="1">个人</el-radio>
          <el-radio v-model="form.type" :label="2">公司</el-radio>
        </el-form-item>
        <el-form-item label="" prop="personalImg" v-if="form.type === 1">
          <UploadImg field="personalImg" @onSuccess="handleChoose" />
          <div class="item-content tip">请上传个人工牌照</div>
        </el-form-item>
        <el-form-item label="" prop="companyImg" v-if="form.type === 2">
          <UploadImg field="companyImg" @onSuccess="handleChoose" />
          <div class="item-content tip">请上传公司营业执照</div>
        </el-form-item>
        <el-form-item label="我的产品" prop="productImg">
          <UploadImg field="productImg" @onSuccess="handleChoose" />
          <div class="item-content tip">请上传产品二维码</div>
        </el-form-item>
        <el-form-item class="operate-btns">
          <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </grid>
  </div>
</template>

<script>
/*
  name: create => index.vue
  desc: 新增/修改/审核需求
  author: 麦麦
  version：v1.0.0
*/

import location from '@/assets/location.json';
import UploadImg from '@/components/common/UploadImg';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('demand');

export default {
  props: {
    id: [Number, String]
  },

  components: {
    UploadImg
  },

  data () {
    return {
      loading: false,
      current: 1,
      location,
      form: {
        avatar: '',
        nike: '',
        company: '',
        position: '',
        demand: {
          text: '',
          tags: []
        },
        resource: {
          text: '',
          tags: []
        },
        province: '',
        address: '',
        phone: '',
        type: 1,
        personalImg: '',
        companyImg: '',
        productImg: ''
      },
      rules: {
        avatar: [
          { required: true, message: '请上传头像' }
        ],
        nike: [
          { required: true, message: '请输入昵称' }
        ],
        company: [
          { required: true, message: '请输入所在公司' }
        ],
        position: [
          { required: true, message: '请输入您的职位' }
        ],
        'demand.text': [
          { required: true, message: '请输入我的需求' }
        ],
        'resource.text': [
          { required: true, message: '请输入我的资源' }
        ],
        province: [
          { required: true, message: '请选择省市区' }
        ],
        address: [
          { required: true, message: '请输入详细地址' }
        ],
        phone: [
          { required: true, message: '请输入联系方式' }
        ],
        type: [
          { required: true, message: '请选择类型' }
        ],
        personalImg: [
          { required: true, message: '请上传个人工牌照' }
        ],
        companyImg: [
          { required: true, message: '请上传公司营业执照' }
        ]
      },
      props: {
        label: 'name',
        value: 'name',
        children: 'children'
      }
    };
  },

  created () {
    // this.fetch(1);
  },

  computed: {
    ...mapState(['list', 'count', 'searchList'])
  },

  methods: {
    ...mapActions(['FIND', 'CREATE', 'EDIT']),

    fetch (page) {
      this.current = page;
      const params = {
        limit: 20,
        page,
        ...this.form
      };
      this.FETCH(params);
    },

    handleSubmit () {
      this.$refs.$createform.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            console.log(valid);
            // if (this.id) {
            //   await this.CREATE(this.form);
            // } else {
            //   await this.CREATE({ id: this.id, data: this.form });
            // }
            this.loading = false;
          } catch (err) {
            this.loading = false;
          }
          return true;
        }
        return false;
      });
    },

    handleChoose ({ field, data }) {
      this.form[field] = data.img;
    },

    handleAvatarSuccess (res, file) {
      console.log(res, file);
      this.form.avatar = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="less">
@import 'index';
</style>

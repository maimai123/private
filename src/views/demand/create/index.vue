
<template>
  <div class="demand-create">
    <grid :title="getTitle">
      <div class="demand-create__info" v-if="form.status">
        <div>创建时间: {{ form.time_create }}</div>
        <div>被邀请合作次数: {{ form.be_invite_times || 0 }}</div>
        <div>达成合作意向次数: {{ form.success_times || 0 }}</div>
        <div :class="form.status === 1 ? 'pass' : 'refused'">
          审核状态: {{ STATUS_LIST[form.status] }}
        </div>
      </div>
      <el-form style="width: 600px;" :model="form" :rules="rules" ref="$createform" label-width="110px">
        <div class="title">基本信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="头像" prop="avatar">
              <UploadImg field="avatar" @onSuccess="handleChoose" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="name">
              <el-input v-model="form.name" />
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
            <el-form-item label="职位" prop="job">
              <el-input v-model="form.job" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">对接信息<span>（信息描述得越详细越高效）</span></div>
        <el-form-item label="我的需求" prop="needs.text">
          <el-input type="textarea" v-model="form.needs.text" placeholder="示例：1.小程序开发 2.网站开发"/>
        </el-form-item>
        <el-form-item label="需求标签选择" prop="needs.tags" class="item-content">
          <el-select v-model="form.needs.tags" placeholder="请选择">
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
                :props="format"
                :separator="'-'"
                v-model="form.province"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="" prop="address" class="item-content">
              <el-input v-model="form.address" placeholder="请输入所在详细地址" style="width: 300px;" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="form.contact" />
        </el-form-item>
        <el-form-item label="类型" prop="type" class="item-content">
          <el-radio v-model="form.type" :label="1">个人</el-radio>
          <el-radio v-model="form.type" :label="2">公司</el-radio>
        </el-form-item>
        <el-form-item label="" prop="photo">
          <UploadImg field="photo" @onSuccess="handleChoose" />
          <div class="item-content tip">{{ form.type === 1 ? '请上传个人工牌照' : '请上传公司营业执照' }}</div>
        </el-form-item>
        <el-form-item label="我的产品" prop="product_code">
          <UploadImg field="product_code" @onSuccess="handleChoose" />
          <div class="item-content tip">请上传产品二维码</div>
        </el-form-item>
        <el-form-item label="是否显示产品图" v-if="form.product_code" prop="is_show" class="item-content">
          <el-switch v-model="form.is_show" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item class="operate-btns">
          <template v-if="form.status === 0">
            <el-button type="primary" :loading="loading" @click="handleAudit(1)">通过</el-button>
            <el-button :loading="loading" @click="handleAudit(0)">拒绝</el-button>
          </template>
          <el-button v-if="!form.status && form.status !== 0" type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
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
import { STATUS_LIST } from '../constants';
import UploadImg from '@/components/common/UploadImg';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('demand');

export default {
  props: {
    id: [Number, String]
  },

  components: {
    UploadImg
  },

  computed: {
    getTitle () {
      let title = '新增需求';
      if (this.id) {
        if (this.form.status === 0) title = '审核需求';
        else title = '查看详情';
      }
      return title;
    }
  },

  data () {
    return {
      STATUS_LIST,
      loading: false,
      current: 1,
      location,
      form: {
        avatar: '',
        name: '',
        company: '',
        job: '',
        needs: {
          text: '',
          tags: []
        },
        resource: {
          text: '',
          tags: []
        },
        province: '',
        address: '',
        contact: '',
        type: 1,
        photo: '',
        product_code: '',
        is_show: 1
      },
      rules: {
        avatar: [
          { required: true, message: '请上传头像' }
        ],
        name: [
          { required: true, message: '请输入昵称' }
        ],
        company: [
          { required: true, message: '请输入所在公司' }
        ],
        job: [
          { required: true, message: '请输入您的职位' }
        ],
        'needs.text': [
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
        contact: [
          { required: true, message: '请输入联系方式' }
        ],
        type: [
          { required: true, message: '请选择类型' }
        ],
        photo: [
          { required: true, message: '请上传照片' }
        ],
        companyImg: [
          { required: true, message: '请上传公司营业执照' }
        ]
      },
      format: {
        label: 'name',
        value: 'name',
        children: 'children'
      }
    };
  },

  created () {
    // if (this.id && this.id !== 'main') {
    //   this.FIND(this.id).then(data => {
    //     this.form = data;
    //   })
    // }
  },

  methods: {
    ...mapActions(['FIND', 'CREATE', 'EDIT']),

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

    handleAudit (type) {
      console.log(this.id, '通过/拒绝');
    }
  }
};
</script>
<style lang="less">
@import 'index';
</style>

<template>
  <div
    class="uploadImg"
    :class="`uploadImg-${size}`"
    @click="$refs.$input.click()"
  >
    <div
      class="avatar"
      v-if="url"
      :style="{ backgroundImage: url && `url(${url})` }"
    />
    <i v-else class="el-icon-plus avatar-upload-icon"></i>
    <input
      @change="selectFile"
      type="file"
      v-show="false"
      ref="$input"
    >
  </div>
</template>
<script>
import { upload } from '@/api/common';

export default {
  props: {
    field: {
      type: String,
      require: true
    },
    url: {
      type: String,
      require: false
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    async selectFile (e) {
      const { files } = e.target;
      const { field } = this;
      await upload(field, files).then((data) => {
        this.$emit('onSuccess', { field, data });
      });
    }
  }
}
</script>
<style lang="less" scoped>
.uploadImg {
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  border-radius: 5px;

  &-default {
    width: 80px;
    height: 80px;
  }

  &-large {
    width: 120px;
    height: 120px;
  }

  &-small {
    width: 60px;
    height: 60px;
  }

  .avatar {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: 100%;
  }

  &:hover {
    border-color: #409eff;
  }

  .avatar-upload-icon {
    width: 100%;
    height: 100%;
    font-size: 28px;
    line-height: 80px;
    color: #8c939d;
    text-align: center;
  }
}

.is-error {
  .uploadImg {
    border-color: #f56c6c;
  }
}
</style>

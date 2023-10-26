<template>
  <div class="crcc-upload-container">
    <div class="crcc-upload-btn" v-show="false">
      <input
        ref="CrccUploadBtn"
        id="CrccUploadBtn"
        type="file"
        multiple
        :accept="acceptType"
        @change="uploadFile"
      />
    </div>
    <div
      class="crcc-upload-list"
      :style="uploadListStyle"
      v-show="uploadListShow"
    >
      <div class="title">
        <span>文件上传</span>
        <span @click="uploadListShow = false"
          ><i class="el-icon-close icon-btn"></i
        ></span>
      </div>
      <div class="content">
        <div
          v-for="file in fileList"
          :key="file.lastModified"
          class="file-container"
        >
          <div :class="['height32', FILE_STATUS[file?.status]]">
            <span><i :class="FILE_STATUS_ICON[file?.status]"></i></span>
            <span class="ml8">{{ FILE_STATUS_MSG[file?.status] }}</span>
            <!-- <span class="file-delete-icon"><i class="el-icon-delete"></i></span> -->
          </div>
          <div class="ml24 height22 text-overflow-hidden">{{ file?.name }}</div>
          <div class="ml24">
            <el-progress
              :percentage="file?.progress"
              :color="FILE_STATUS_COLOR[file?.status]"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { uploadFileFn as uploadFileUtil } from '@/common/utils/upload.js';
import { socialImport } from '@/api/approval/social.js';
import {
  FILE_STATUS,
  FILE_STATUS_MSG,
  FILE_STATUS_ICON,
  FILE_STATUS_COLOR,
} from '@/constants/file.js';

export default {
  name: 'CrccUploadList',
  props: {
    uploadApiType: {
      type: String,
      default: '',
    },
    fileMaxSizeMB: {
      type: Number,
      default: 50,
    },
    acceptType: {
      type: String,
      default: '',
    },
    uploadListStyle: {
      type: Object,
      default: function () {
        return {
          // top:'10%',
        };
      },
    },
  },
  computed: {},
  data() {
    return {
      uploadListShow: false,
      uploadingNum: 0,
      //liveNum: 0,//非失败文件
      fileList: [],
      FILE_STATUS: FILE_STATUS,
      FILE_STATUS_MSG: FILE_STATUS_MSG,
      FILE_STATUS_ICON: FILE_STATUS_ICON,
      FILE_STATUS_COLOR: FILE_STATUS_COLOR,
    };
  },
  created() {
    this.failList = [];
  },
  mounted() {},
  methods: {
    uploadListShowFn(time = 10) {
      this.uploadListShow = true;
      if (time) {
        setTimeout(() => {
          this.uploadListShow = false;
        }, time * 1000);
      }
    },
    upload() {
      this.$refs.CrccUploadBtn.click();
    },
    getUploadingNum() {
      return this.uploadingNum;
    },
    beforeUpload(file) {
      if (!file) {
        this.$message({
          message: '没有选中文件',
          type: 'error',
        });
        return false;
      }

      const maxFileSize = this.fileMaxSizeMB * 1024 * 1024;
      const isMaxFileSize = file.size <= maxFileSize;

      if (this.acceptType) {
        const fileType = file.name.split('.')?.pop();
        if (!this.acceptType.includes(fileType)) {
          this.$message({
            message: `上传文件类型为${this.acceptType}`,
            type: 'error',
          });
          return false;
        }
      }

      if (!isMaxFileSize) {
        this.$message({
          message: `上传文件大小不能超过${this.fileMaxSizeMB}MB!`,
          type: 'error',
        });
        return false;
      }
      return true;
    },
    uploadFile() {
      let files = this.$refs.CrccUploadBtn.files;
      Object.values(files).forEach((file) => {
        if (this.beforeUpload(file)) {
          if (this.uploadApiType == 'importFile') {
            this.importFile(file);
          } else {
            this.uploadIngFile(file);
          }
        }
      });
      document.getElementById('CrccUploadBtn').value = null;
    },

    async uploadIngFile(file, index) {
      this.uploadListShowFn();
      let _file = {
        name: file.name,
        status: FILE_STATUS.uploading,
        percentage: 0,
      };
      this.fileList.unshift(_file);
      this.uploadingNum++;
      const onUploadProgressCb = (progress) => {
        _file.progress = progress;
      };
      if (!file) return;
      try {
        let res = await uploadFileUtil(file, onUploadProgressCb);
        _file.status = FILE_STATUS.success;
        this.uploadingNum--;
        console.log('=======上传成功 抛出列表', res, this.uploadingNum);
        this.$emit('fileUploadSuccess', {
          file: res,
          uploadingNum: this.uploadingNum,
        });
      } catch (error) {
        this.uploadingNum--;
        _file.status = FILE_STATUS.fail;
        console.log('=======上传失败 抛出列表', this.uploadingNum, error);
      } finally {
        this.uploadListShowFn();
      }
    },
    async importFile(file, index) {
      this.uploadListShowFn();
      let _file = {
        name: file.name,
        status: FILE_STATUS.uploading,
        percentage: 0,
      };
      this.fileList.unshift(_file);
      this.uploadingNum++;
      if (!file) return;
      try {
        let formData = new FormData();
        formData.append('file', file);
        let res = await socialImport(formData);
        _file.status = FILE_STATUS.success;
        _file.progress = 100;
        this.uploadingNum--;
        console.log('=======导入成功 抛出返回list', res, this.uploadingNum);
        this.$emit('fileUploadSuccess', {
          list: res.data,
          uploadingNum: this.uploadingNum,
        });
        this.$message({
          type: res.code == 0 ? 'success' : 'error',
          message: res.msg,
        });
      } catch (error) {
        this.uploadingNum--;
        _file.status = FILE_STATUS.fail;
        console.log('=======导入失败 抛出列表', this.uploadingNum, error);
      } finally {
        this.uploadListShowFn();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.crcc-upload-container {
  .crcc-upload-list {
    z-index: 9999;
    position: fixed;
    right: 20px;
    top: 86px;
    width: 284px;
    height: auto;
    max-height: 534px;
    opacity: 1;
    border-radius: 8px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 16px 24px 16px 24px;
    overflow-y: auto;
    font-weight: 400;
    letter-spacing: 0px;
    color: rgba(51, 51, 51, 1);
    .title {
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      font-size: 16px;
    }
    .content {
      width: 100%;
      font-size: 14px;

      .file-container {
        position: relative;
        border-bottom: 1px solid #ebebeb;
        padding: 8px 0 10px 0;
        .file-delete-icon {
          float: right;
          color: #c4c4c4;
          cursor: pointer;
        }
        .file-delete-icon:hover {
          color: #198cff;
        }
        /*common */
        ::deep(.el-progress__text) {
          font-size: 8px !important;
          color: #999 !important;
          float: right !important;
        }
        .ml24 {
          margin-left: 24px;
        }
        .ml8 {
          margin-left: 8px;
        }
        .height32 {
          height: 32px;
          line-height: 32px;
        }
        .height22 {
          height: 22px;
          line-height: 22px;
          margin-bottom: 10px;
        }
        .success {
          color: #52c41a;
        }
        .fail {
          color: #ff4d4f;
        }
        .uploading {
          color: #198cff;
        }
      }
      .file-container:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>

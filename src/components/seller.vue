<template>
    <div class="seller">
          <el-button type="primary" @click="dialogVisible = true">Load from File</el-button>
  <el-dialog title="Load JSON document from file" :visible.sync="dialogVisible">
    <el-upload :file-list="uploadFiles" action="alert" :auto-upload="false" multiple :on-change="loadJsonFromFile">
      <el-button size="small" type="primary">Select a file</el-button>
      <div slot="tip">upload only jpg/png files, and less than 500kb</div>
    </el-upload>
    <span slot="footer">
      <el-button type="primary" @click="dialogVisible = false">cancel</el-button>
      <el-button type="primary" @click="loadJsonFromFileConfirmed">confirm</el-button>
    </span>
  </el-dialog>

    </div>
</template>

<script>
export default {
  data () {
    return {
      // data for upload files
      uploadFilename: null,
      uploadFiles: [],
      dialogVisible: false
    }
  },
  methods: {
    loadJsonFromFile (file, fileList) {
      this.uploadFilename = file.name
      this.uploadFiles = fileList
    },
    loadJsonFromFileConfirmed () {
      console.log("this.uploadFiles==",this.uploadFiles)
      if (this.uploadFiles) {
        for (let i = 0; i < this.uploadFiles.length; i++) {
          let file = this.uploadFiles[i]
          console.log("file.raw==",file.raw)
          if (!file) continue
          let reader = new FileReader();
          reader.onload = async (e) => {
            try {
              let document = JSON.parse(e.target.result)
              console.log(document)
            } catch (err) {
              console.log(`load JSON document from file error: ${err.message}`)
              
            }
          }
          reader.readAsText(file.raw)
        }
      }
      this.dialogVisible = false
    }
  }
}
</script>


<style>

</style>

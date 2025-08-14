<script setup>
import {ref} from "vue";
import {ElMessage} from "element-plus";

const target_url = ref("");
const copyToClipboard = async () => {
  try {
    if (!target_url.value) {
      ElMessage.warning("Please enter a URL to copy!");
      return;
    }

    const currentUrl = new URL(window.location.origin + window.location.hash);
    currentUrl.searchParams.set("to", target_url.value);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(currentUrl.toString());
      ElMessage.success("Copied to clipboard!");
    } else {
      // Fallback for unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl.toString();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      ElMessage.success("Copied to clipboard using fallback!");
    }
  } catch (err) {
    console.error("Copy failed:", err);
    ElMessage.error("Copy failed, please copy manually!");
  }
};

</script>

<template>
  <div class="main-form">
    <el-row style="width: 100%;">
      <el-col :xs="2" :sm="2" :lg="4"></el-col>
      <el-col :xs="20" :sm="20" :lg="16">
        <el-form style="justify-content: center;" @submit="()=>{copyToClipboard();return false;}">
          <el-form-item label="Target URL" label-position="top" style="width: 100%;">
            <el-input
                style="width: 100%;"
                v-model="target_url"
                placeholder="Enter URL here"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div style="width: 100%;display: flex; flex-direction: row-reverse;">
              <el-button type="primary" plain @click="copyToClipboard">Copy Now</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.main-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>

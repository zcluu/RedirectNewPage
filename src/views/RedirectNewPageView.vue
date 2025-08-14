<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Loading} from '@element-plus/icons-vue'

const loadingText = "Loading...";
const route = useRoute();
const router = useRouter();

const redirectPage = () => {
  const target = route.query.to
  if (target) {
    window.location.href = target
    if (!target.startsWith("http")) {
      window.location.replace('about:blank')
    }
  }
}

const countDown = ref(.5)
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    countDown.value--;
    if (countDown.value <= 0) {
      clearInterval(timer)
      redirectPage();
    }
  }, 1000)
})
onBeforeUnmount(() => {
  if (timer !== null) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="redirect-box">
    <el-result>
      <template #icon>
        <el-icon size="300%" class="loading-icon">
          <Loading/>
        </el-icon>
      </template>
      <template #title>
        <div class="loading-text">
        <span
            v-for="(text, index) in loadingText"
            :style="{'--i': index,'--d': 1 / loadingText.length * 2}"
        >
          <el-text size="large" class="loading-text-item">{{ text }}</el-text>
        </span>
        </div>
      </template>
    </el-result>

  </div>
</template>

<style scoped>
.redirect-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 120px);
}

.loading-icon {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  display: flex;
  gap: .8em;
}

.loading-text span {
  display: inline-block;
  animation: jump 1.5s ease-in-out infinite;
  animation-delay: calc(var(--i) * var(--d) * 1s);
}

@keyframes jump {
  0% {
    transform: translateY(0em);
  }
  100% {
    transform: translateY(.1em);
  }
}

.loading-text-item {
  color: var(--el-color-black);
}

html.dark .loading-text-item {
  color: var(--el-color-white);
}
</style>
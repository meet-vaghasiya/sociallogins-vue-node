<script setup lang="ts">
const healthStatus = ref('Checking...');

const checkHealth = async () => {
  try {
    const response = await fetch('/api/health');
    if (response.ok) {
      healthStatus.value = 'Express server is healthy';
    } else {
      healthStatus.value = 'Express server is not responding properly';
    }
  } catch (error) {
    healthStatus.value = 'Error connecting to Express server';
    console.error('Health check failed:', error);
  }
};

onMounted(() => {
  checkHealth();
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex justify-center items-center flex-col">
    <NuxtPage />
    <div class="mt-4 text-sm text-gray-600">
      Server Status: {{ healthStatus }}
    </div>
  </div>
</template>

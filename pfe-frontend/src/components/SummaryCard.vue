<template>
  <div class="bg-white rounded-xl shadow p-4 h-full flex flex-col items-center justify-center text-center">
    <div class="text-4xl mb-2">{{ icon }}</div>
    <h3 class="text-gray-600 font-semibold text-lg">{{ title }}</h3>
    <p class="text-2xl font-bold text-gray-800">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: Number,
  icon: String,
})
</script>


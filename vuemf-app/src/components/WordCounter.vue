<script setup lang="ts">
defineProps<{
  count: number
  source: string
}>()
</script>

<template>
  <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
    <p class="text-sm text-blue-800">
      <span class="font-semibold">{{ source }}</span> has
      <span class="font-bold text-blue-600">{{ count }}</span> word{{ count !== 1 ? 's' : '' }}
    </p>
  </div>
</template>

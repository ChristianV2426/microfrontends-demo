<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add', word: string): void
}>()

const input = ref('')

const handleAdd = () => {
  if (input.value.trim()) {
    emit('add', input.value.trim())
    input.value = ''
  }
}
</script>

<template>
  <div class="flex mb-4">
    <input
      class="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
      type="text"
      placeholder="Enter a word..."
      v-model="input"
      @keydown.enter="handleAdd"
    />

    <button
      class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r font-semibold transition-colors"
      @click="handleAdd"
    >
      Add
    </button>
  </div>
</template>
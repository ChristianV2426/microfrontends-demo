<script setup lang="ts">
import type { Word } from '../services/wordService'

defineProps<{
  words: Word[]
  editingId: number | null
  editValue: string
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'edit', id: number, currentWord: string): void
  (e: 'updateEditValue', value: string): void
  (e: 'saveEdit'): void
}>()
</script>

<template>
  <ul class="space-y-2">
    <li
      v-for="item in words"
      :key="item.id"
      class="flex items-center justify-between bg-gray-100 rounded px-3 py-2 shadow-sm"
    >
      <template v-if="editingId === item.id">
        <input
          class="flex-1 border border-blue-400 rounded px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          :value="editValue"
          @input="emit('updateEditValue', ($event.target as HTMLInputElement).value)"
          @keydown.enter="emit('saveEdit')"
          autofocus
        />

        <button
          class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2"
          @click="emit('saveEdit')"
        >
          Save
        </button>

        <button
          class="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
          @click="emit('edit', -1, '')"
        >
          Cancel
        </button>
      </template>

      <template v-else>
        <span class="flex-1 text-gray-800">
          {{ item.word }}
        </span>

        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
          @click="emit('edit', item.id, item.word)"
        >
          Edit
        </button>

        <button
          class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
          @click="emit('delete', item.id)"
        >
          Delete
        </button>
      </template>
    </li>
  </ul>
</template>
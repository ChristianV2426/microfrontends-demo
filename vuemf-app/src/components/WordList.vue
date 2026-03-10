<script setup lang="ts">
defineProps<{
  words: string[]
  editingIndex: number | null
  editValue: string
}>()

const emit = defineEmits([
  'delete',
  'edit',
  'updateEditValue',
  'saveEdit'
])
</script>

<template>
  <ul class="space-y-2">
    <li
      v-for="(word, i) in words"
      :key="i"
      class="flex items-center justify-between bg-gray-100 rounded px-3 py-2 shadow-sm"
    >
      <template v-if="editingIndex === i">
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
          @click="emit('edit', -1)"
        >
          Cancel
        </button>
      </template>

      <template v-else>
        <span class="flex-1 text-gray-800">
          {{ word }}
        </span>

        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
          @click="emit('edit', i)"
        >
          Edit
        </button>

        <button
          class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
          @click="emit('delete', i)"
        >
          Delete
        </button>
      </template>
    </li>
  </ul>
</template>
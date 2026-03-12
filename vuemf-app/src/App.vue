<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import WordInput from './components/WordInput.vue'
import WordList from './components/WordList.vue'
import WordCounter from './components/WordCounter.vue'
import { useWords } from './composables/useWords'

const { words, loading, error, addWord, editWord, removeWord } = useWords()
const editingId = ref<number | null>(null)
const editValue = ref('')
const reactWordCount = ref<number>(0)

// Listen for word count updates from all microfrontends
const handleWordCountUpdate = (event: Event) => {
  const customEvent = event as CustomEvent<{ source: string; count: number }>
  if (customEvent.detail.source === 'react-app') {
    reactWordCount.value = customEvent.detail.count
  }
}

onMounted(() => {
  window.addEventListener('words:updated', handleWordCountUpdate)
})

onUnmounted(() => {
  window.removeEventListener('words:updated', handleWordCountUpdate)
})

// Notify other microfrontends when word count changes
watch(words, (newWords) => {
  window.dispatchEvent(
    new CustomEvent('words:updated', {
      detail: { source: 'vue-app', count: newWords.length }
    })
  )
}, { deep: true })

const handleAdd = async (word: string) => {
  await addWord(word)
}

const handleDelete = async (id: number) => {
  await removeWord(id)
  if (editingId.value === id) {
    editingId.value = null
    editValue.value = ''
  }
}

const startEdit = (id: number, currentWord: string) => {
  if (id < 0) {
    editingId.value = null
    editValue.value = ''
    return
  }
  editingId.value = id
  editValue.value = currentWord
}

const saveEdit = async () => {
  if (editingId.value !== null) {
    await editWord(editingId.value, editValue.value)
    editingId.value = null
    editValue.value = ''
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">

    <WordCounter :count="reactWordCount" source="React Microfrontend" />

    <h1 class="text-2xl font-bold mb-4 mt-6 text-green-600">
      Enter a Word
    </h1>

    <p v-if="error" class="text-red-500 text-sm mb-2">{{ error }}</p>

    <WordInput @add="handleAdd" />

    <p v-if="loading" class="text-gray-500 text-sm">Loading words...</p>

    <WordList
      v-else
      :words="words"
      :editingId="editingId"
      :editValue="editValue"
      @delete="handleDelete"
      @edit="startEdit"
      @updateEditValue="editValue = $event"
      @saveEdit="saveEdit"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import WordInput from './components/WordInput.vue'
import WordList from './components/WordList.vue'
import WordCounter from './components/WordCounter.vue'

const words = ref<string[]>([])
const editingIndex = ref<number | null>(null)
const editValue = ref('')
const reactWordCount = ref<number>(0)

// Listen for word count updates from all microfrontends
const handleWordCountUpdate = (event: Event) => {
  const customEvent = event as CustomEvent<{ source: string; count: number }>
  // Only update if the event is from React
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
const notifyWordCount = (count: number) => {
  window.dispatchEvent(
    new CustomEvent('words:updated', {
      detail: { source: 'vue-app', count }
    })
  )
}

watch(words, (newWords) => {
  notifyWordCount(newWords.length)
}, { deep: true })

const addWord = (word: string) => {
  words.value.push(word)
}

const deleteWord = (index: number) => {
  words.value = words.value.filter((_, i) => i !== index)

  if (editingIndex.value === index) {
    editingIndex.value = null
    editValue.value = ''
  }
}

const startEdit = (index: number) => {
  if (index < 0) {
    editingIndex.value = null
    editValue.value = ''
    return
  }

  editingIndex.value = index
  editValue.value = words.value[index] || ''
}

const saveEdit = () => {
  if (editingIndex.value !== null) {
    words.value[editingIndex.value] = editValue.value
    editingIndex.value = null
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

    <WordInput @add="addWord" />

    <WordList
      :words="words"
      :editingIndex="editingIndex"
      :editValue="editValue"
      @delete="deleteWord"
      @edit="startEdit"
      @updateEditValue="editValue = $event"
      @saveEdit="saveEdit"
    />
  </div>
</template>
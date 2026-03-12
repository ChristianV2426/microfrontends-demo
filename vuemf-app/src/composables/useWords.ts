import { ref, onMounted } from 'vue';
import { type Word, fetchWords, createWord, updateWord, deleteWord } from '../services/wordService';

export function useWords() {
  const words = ref<Word[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function loadWords() {
    try {
      error.value = null;
      const data = await fetchWords();
      words.value = data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load words';
    } finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    loadWords();
  });

  async function addWord(word: string) {
    try {
      error.value = null;
      await createWord(word);
      await loadWords();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add word';
    }
  }

  async function editWord(id: number, word: string) {
    try {
      error.value = null;
      await updateWord(id, word);
      await loadWords();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update word';
    }
  }

  async function removeWord(id: number) {
    try {
      error.value = null;
      await deleteWord(id);
      await loadWords();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete word';
    }
  }

  return { words, loading, error, addWord, editWord, removeWord };
}

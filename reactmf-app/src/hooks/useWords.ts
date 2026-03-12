import { useState, useEffect, useCallback } from 'react';
import { type Word, fetchWords, createWord, updateWord, deleteWord } from '../services/wordService';

export function useWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWords = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchWords();
      setWords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load words');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  const addWord = useCallback(async (word: string) => {
    try {
      setError(null);
      await createWord(word);
      await loadWords();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add word');
    }
  }, [loadWords]);

  const editWord = useCallback(async (id: number, word: string) => {
    try {
      setError(null);
      await updateWord(id, word);
      await loadWords();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update word');
    }
  }, [loadWords]);

  const removeWord = useCallback(async (id: number) => {
    try {
      setError(null);
      await deleteWord(id);
      await loadWords();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete word');
    }
  }, [loadWords]);

  return { words, loading, error, addWord, editWord, removeWord };
}

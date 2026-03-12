export type Word = {
  id: number;
  word: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchWords(): Promise<Word[]> {
  const res = await fetch(`${API_URL}/words`);
  if (!res.ok) throw new Error('Failed to fetch words');
  return res.json();
}

export async function createWord(word: string): Promise<Word> {
  const res = await fetch(`${API_URL}/words`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word }),
  });
  if (!res.ok) throw new Error('Failed to create word');
  return res.json();
}

export async function updateWord(id: number, word: string): Promise<Word> {
  const res = await fetch(`${API_URL}/words/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word }),
  });
  if (!res.ok) throw new Error('Failed to update word');
  return res.json();
}

export async function deleteWord(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/words/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete word');
}

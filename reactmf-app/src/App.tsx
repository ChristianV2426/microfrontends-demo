import { useState, useEffect } from 'react';
import WordInput from './components/WordInput';
import WordList from './components/WordList';
import WordCounter from './components/WordCounter';
import { useWords } from './hooks/useWords';

const App = () => {
    const { words, loading, error, addWord, editWord, removeWord } = useWords();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [vueWordCount, setVueWordCount] = useState<number>(0);

    // Listen for word count updates from all microfrontends
    useEffect(() => {
        const handleWordCountUpdate = (event: Event) => {
            const customEvent = event as CustomEvent<{ source: string; count: number }>;
            if (customEvent.detail.source === 'vue-app') {
                setVueWordCount(customEvent.detail.count);
            }
        };

        window.addEventListener('words:updated', handleWordCountUpdate);

        return () => {
            window.removeEventListener('words:updated', handleWordCountUpdate);
        };
    }, []);

    // Notify other microfrontends when word count changes
    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent('words:updated', {
                detail: { source: 'react-app', count: words.length }
            })
        );
    }, [words]);

    const handleDelete = async (id: number) => {
        await removeWord(id);
        if (editingId === id) {
            setEditingId(null);
            setEditValue('');
        }
    };

    const startEdit = (id: number, currentWord: string) => {
        setEditingId(id);
        setEditValue(currentWord);
    };

    const saveEdit = async () => {
        if (editingId !== null) {
            await editWord(editingId, editValue);
            setEditingId(null);
            setEditValue('');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <WordCounter count={vueWordCount} source="Vue Microfrontend" />
            <h1 className="text-2xl font-bold mb-4 mt-6 text-blue-600">Enter a Word</h1>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <WordInput onAdd={addWord} />
            {loading ? (
                <p className="text-gray-500 text-sm">Loading words...</p>
            ) : (
                <WordList
                    words={words}
                    onDelete={handleDelete}
                    onEdit={startEdit}
                    editingId={editingId}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    saveEdit={saveEdit}
                />
            )}
        </div>
    );
};

export default App;
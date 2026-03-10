import { useState, useEffect } from 'react';
import WordInput from './components/WordInput';
import WordList from './components/WordList';
import WordCounter from './components/WordCounter';

const App = () => {
    const [words, setWords] = useState<string[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [vueWordCount, setVueWordCount] = useState<number>(0);

    // Listen for word count updates from all microfrontends
    useEffect(() => {
        const handleWordCountUpdate = (event: Event) => {
            const customEvent = event as CustomEvent<{ source: string; count: number }>;
            // Only update if the event is from Vue
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
    const notifyWordCount = (count: number) => {
        window.dispatchEvent(
            new CustomEvent('words:updated', {
                detail: { source: 'react-app', count }
            })
        );
    };

    useEffect(() => {
        notifyWordCount(words.length);
    }, [words]);

    const addWord = (word: string) => {
        setWords([...words, word]);
    };

    const deleteWord = (index: number) => {
        setWords(words.filter((_, i) => i !== index));
        if (editingIndex === index) {
            setEditingIndex(null);
            setEditValue('');
        }
    };

    const startEdit = (index: number) => {
        setEditingIndex(index);
        setEditValue(words[index]);
    };

    const saveEdit = () => {
        if (editingIndex !== null) {
            const updated = [...words];
            updated[editingIndex] = editValue;
            setWords(updated);
            setEditingIndex(null);
            setEditValue('');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <WordCounter count={vueWordCount} source="Vue Microfrontend" />
            <h1 className="text-2xl font-bold mb-4 mt-6 text-blue-600">Enter a Word</h1>
            <WordInput onAdd={addWord} />
            <WordList
                words={words}
                onDelete={deleteWord}
                onEdit={startEdit}
                editingIndex={editingIndex}
                editValue={editValue}
                setEditValue={setEditValue}
                saveEdit={saveEdit}
            />
        </div>
    );
};

export default App;
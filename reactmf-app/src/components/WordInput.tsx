import React, { useState } from 'react';

type WordInputProps = {
  onAdd: (word: string) => void;
};

const WordInput: React.FC<WordInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex mb-4">
      <input
        className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Enter a word..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r font-semibold transition-colors"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default WordInput;

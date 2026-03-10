import React from 'react';

type WordListProps = {
  words: string[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  editingIndex: number | null;
  editValue: string;
  setEditValue: (val: string) => void;
  saveEdit: () => void;
};

const WordList: React.FC<WordListProps> = ({
  words,
  onDelete,
  onEdit,
  editingIndex,
  editValue,
  setEditValue,
  saveEdit,
}) => {
  return (
    <ul className="space-y-2">
      {words.map((word, i) => (
        <li
          key={i}
          className="flex items-center justify-between bg-gray-100 rounded px-3 py-2 shadow-sm"
        >
          {editingIndex === i ? (
            <>
              <input
                className="flex-1 border border-blue-400 rounded px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveEdit()}
                autoFocus
              />
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2"
                onClick={saveEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
                onClick={() => {
                  setEditValue('');
                  onEdit(-1);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span className="flex-1 text-gray-800">{word}</span>
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => onEdit(i)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => onDelete(i)}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default WordList;

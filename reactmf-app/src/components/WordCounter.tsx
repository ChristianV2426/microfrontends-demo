import React from 'react';

type WordCounterProps = {
  count: number;
  source: string;
};

const WordCounter: React.FC<WordCounterProps> = ({ count, source }) => {
  return (
    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-sm text-green-800">
        <span className="font-semibold">{source}</span> has{' '}
        <span className="font-bold text-green-600">{count}</span> word{count !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default WordCounter;

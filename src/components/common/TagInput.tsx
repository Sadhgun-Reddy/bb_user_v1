import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <label className="ml-1 text-sm font-bold text-stone-700">Ingredients</label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type ingredient and press Enter..."
          className="w-full rounded-full border-stone-200 bg-stone-50 px-6 py-4 font-medium text-stone-900 placeholder:text-stone-400 focus:border-[#ef9d2a] focus:ring-[#ef9d2a] outline-none transition-all"
        />
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 p-4 rounded-3xl border border-stone-100 bg-white">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 rounded-full bg-[#ef9d2a]/10 py-1.5 pl-4 pr-2 text-sm font-bold text-[#b57315] animate-fade-in"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ef9d2a]/20 text-[#b57315] hover:bg-[#ef9d2a] hover:text-white transition-colors"
              >
                <X className="w-3 h-3" strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;

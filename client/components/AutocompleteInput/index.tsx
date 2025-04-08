import React, { useState, useEffect } from "react";
import { debounce } from "lodash"
import type { User } from "@/store/api";

type Props = {
    projectId: number
}

const AutocompleteInput = ({ projectId }: Props) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query: any) => {
    return Promise.resolve(console.log(`query: ${query}, project: ${projectId}`))
  };

  // Debounce the function to avoid making too many requests
  const debouncedFetch = debounce(fetchSuggestions, 300);

  useEffect(() => {
    debouncedFetch(input);
    return () => debouncedFetch.cancel();
  }, [input]);

  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-none"

  return (
    <div className="w-full relative">
      <input
        className={inputStyles}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for a user..."
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-8 left-0 w-full h-min">
          {suggestions.map((user: User) => (
            <li className={`${inputStyles} cursor-pointer`} onClick={() => setInput(user.email)} key={user.userId}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;

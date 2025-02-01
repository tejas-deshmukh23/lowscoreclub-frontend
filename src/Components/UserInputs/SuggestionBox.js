import { useState } from 'react';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const allSuggestions = [
    'Apple',
    'Banana',
    'Orange',
    'Grape',
    'Pineapple',
    'Strawberry',
    'Mango',
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value) {
      // Filter suggestions based on the input
      const filteredSuggestions = allSuggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Start typing..."
        style={{
          padding: '10px',
          width: '300px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: '0',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            maxHeight: '150px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                listStyle: 'none',
                borderBottom: '1px solid #eee',
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;

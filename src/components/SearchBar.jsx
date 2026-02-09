import {useState} from 'react';


function SearchBar({onSearch, onClear}) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(query.trim()){
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();

  }
  return (
    <div>
      <div className="search-container">
        <form action="">
           <input 
            className="search-bar"
            type="text" 
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button type='button' onClick={handleClear} className='clear-button'>
            Clear
          </button>
        )}

        <button type='submit' className='search-button' onClick={handleSubmit}>
          search
        </button>  
        </form>
      </div>
    </div>
  )
}

export default SearchBar
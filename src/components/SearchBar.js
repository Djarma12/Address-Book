import Button from "./UI/Button";

function SearchBar({ search, onSearch, onAddContact, onSort }) {
  function handleSearch(e) {
    onSearch(e.target.value);
  }

  function handleSort(e) {
    onSort(e.target.value);
  }

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
      />
      <select onChange={handleSort}>
        <option value="noOrder">No specific order</option>
        <option value="ascending">Alphabedical ascending</option>
        <option value="descending">Alphabedical descending</option>
      </select>
      <Button className="button" onClick={(e) => onAddContact(true)}>
        Add Contact
      </Button>
    </div>
  );
}

export default SearchBar;

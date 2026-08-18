import { useState } from "react";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {searchTerm ? (
        <p>Searching for: {searchTerm}</p>
      ) : (
        <p>No search term entered.</p>
      )}
    </div>
  );
}

export default SearchBox;

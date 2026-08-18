import { useEffect, useState } from "react";

function SearchEffect() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Search changed:", searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchEffect;

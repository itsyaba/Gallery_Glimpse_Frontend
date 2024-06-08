import { useState } from "react";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const searchHandler = () => {
    console.log(searchTerm);
    if (searchTerm.length > 0) navigate(`search/${searchTerm.toLowerCase()}`);
  };

  return (
    <form className="flex lg:w-3/4 items-center gap-4 w-full" onSubmit={searchHandler}>
      <Input
        type="text"
        placeholder="Search "
        className="p-6 "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="submit" variant="secondary" className="p-6">
        <SearchIcon />
      </Button>
    </form>
  );
};

export default Search;

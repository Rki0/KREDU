import React, { useState } from "react";

import { BsSearch } from "react-icons/bs";

function SearchBar() {
  const [searchLecture, setSearchLecture] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLecture(e.target.value);
  };

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="relative my-4" onSubmit={searchSubmitHandler}>
      <input
        placeholder="강의 제목을 검색해보세요"
        value={searchLecture}
        onChange={onChangeHandler}
        className="pl-2 mb-2 font-semibold w-[250px] h-[40px] border-2 border-[#ffcdd2] rounded focus:border-[#e57373] focus:outline-none sm:w-[400px] md:w-[500px] lg:w-[500px] lg:h-[50px]"
      />

      <button
        type="submit"
        className="absolute top-3 right-3 md:text-lg lg:top-4"
      >
        <BsSearch />
      </button>
    </form>
  );
}

export default SearchBar;

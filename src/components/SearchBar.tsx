import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";

interface SearchBarPropsType {
  placeholder: string;
  purpose: string;
}

function SearchBar(props: SearchBarPropsType) {
  const [searchKeyWord, setSearchKeyWord] = useState("");

  // searchParams가 안 쓰이잖아요? 굳이 쓰고싶으면
  // 부모 컴포넌트로 얘네를 옮기고
  // setSearchParams만 이 컴포넌트로 가져와서 설정해주면 됨
  // 부모 컴포넌트에서도 useSearchParams를 쓰고 있기 때문에, 거기서는 searchParams를 사용하면 되고 ㅇㅇ
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWord(e.target.value);
  };

  const searchSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!searchKeyWord) {
      setSearchParams({
        search: searchKeyWord,
      });
    } else {
      navigate(`${props.purpose === "lecture" ? "/lecture" : "/qa"}`);
    }

    // 시도 2. 검색 시, navigate에 search 옵션 전달로 fetch 유발, 백쪽에서 filter된 데이터 받기
    // 음...분기처리를 하는건?
    // 검색어가 있을 경우는 pathName에 /search를 넣어주고, search 옵션 전달
    // 없는 경우 다시 /lecture로 이동시키는 거지.
    // 아니 그런데, 이거 때문에 페이지를 하나 더 생성하는게 맞는건가?
    // if (searchKeyWord) {
    //   navigate({
    //     pathname: "/lecture/search",
    //     search: `?keyword=${searchKeyWord}`,
    //   });
    // } else {
    //   navigate("/lecture");
    // }
  };

  return (
    <form className="relative my-4" onSubmit={searchSubmitHandler}>
      <input
        placeholder={props.placeholder}
        value={searchKeyWord}
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

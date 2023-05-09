import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarPropsType {
  filtering: (keyword: string) => void;
}

function MySearchBar(props: SearchBarPropsType) {
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWord(e.target.value);

    props.filtering(e.target.value);
  };

  const { t } = useTranslation();

  return (
    <div className="flex justify-center my-4">
      <input
        placeholder={t("mypage.placeholder")}
        value={searchKeyWord}
        onChange={onChangeHandler}
        className="pl-2 mb-2 font-semibold w-[250px] h-[40px] border-2 border-[#ffcdd2] rounded focus:border-[#e57373] focus:outline-none sm:w-[400px] md:w-[500px] lg:w-[500px] lg:h-[50px]"
      />
    </div>
  );
}

export default MySearchBar;

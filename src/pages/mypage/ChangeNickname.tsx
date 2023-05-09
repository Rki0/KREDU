import React, { useContext, useState } from "react";

import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hoc/http-hook";
import { useTranslation } from "react-i18next";

interface nicknameProps {
  userNickname: string;
}

function ChangeNickname(props: nicknameProps) {
  const [nickname, setNickname] = useState("");
  const [placeholder, setPlaceholder] = useState(props.userNickname);
  const [isNicknameRevise, setIsNicknameRevise] = useState(false);

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const toggleRevise = () => {
    setIsNicknameRevise((prev) => !prev);
  };

  const nicknameReviseHandler = async () => {
    if (props.userNickname === nickname) {
      alert("동일한 닉네임을 입력하셨습니다.");
      return;
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/users/change/nickname`,
        "PATCH",
        JSON.stringify({
          nickname,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData.changeSuccess) {
        alert("닉네임 변경 성공!");
      }

      setPlaceholder(nickname);
      setNickname("");
      setIsNicknameRevise(false);
    } catch (err) {}
  };

  const nicknameResetHandler = () => {
    setNickname("");
    setIsNicknameRevise((prev) => !prev);
  };

  const { t } = useTranslation();

  return (
    <div className="border-b-2 pb-2 border-[rgba(255,164,161,0.3)] mb-2">
      <div className="mb-2 font-semibold">
        {t("mypageRevise.nickname.title")}
      </div>

      <div className="flex">
        <input
          value={nickname}
          placeholder={
            !isNicknameRevise
              ? placeholder
              : t("mypageRevise.nickname.placeholder")
          }
          onChange={nicknameHandler}
          className={`border-2 mr-2 w-[200px] pl-1 border-[rgba(0,0,0,0.2)] outline-none focus:border-[#e57373] rounded-md disabled:bg-[rgba(0,0,0,0.2)] placeholder:text-slate-400 ${
            !isNicknameRevise && "hover:cursor-not-allowed"
          }`}
          disabled={!isNicknameRevise}
        />

        {isNicknameRevise ? (
          <div>
            <button
              type="reset"
              onClick={nicknameResetHandler}
              className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
            >
              {t("mypageRevise.nickname.cancel")}
            </button>
            <button
              type="button"
              onClick={nicknameReviseHandler}
              className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
            >
              {t("mypageRevise.nickname.submit")}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={toggleRevise}
            className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
          >
            {t("mypageRevise.nickname.button")}
          </button>
        )}
      </div>
    </div>
  );
}

export default ChangeNickname;

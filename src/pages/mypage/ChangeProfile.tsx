import React, { useState, useRef, useEffect, useContext } from "react";

import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hoc/http-hook";

interface profileProps {
  userProfile: string;
}

function ChangeProfile(props: profileProps) {
  const [profileImg, setProfileImg] = useState<any>();
  const [previewUrl, setPreviewUrl] = useState<any>();

  const imgInputRef = useRef<HTMLInputElement>(null);

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    if (!profileImg) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(profileImg);
  }, [profileImg]);

  const changeProfile = () => {
    if (!imgInputRef.current) {
      return;
    }

    imgInputRef.current.click();
  };

  const getNewProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    let pickedFile = e.target.files[0];
    setProfileImg(pickedFile);

    try {
      const formData = new FormData();
      formData.append("image", pickedFile);

      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/users/change/image`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData.changeSuccess) {
        alert("프로필 이미지 변경 성공!");
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="border-b-2 pb-2 border-[rgba(255,164,161,0.3)] mb-2">
        <h2 className="mb-2 font-semibold">프로필 사진</h2>

        <div className="flex justify-center mb-2">
          <div className="border-2 border-transparent rounded-full w-[150px] h-[150px] overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="w-full h-full" />
            ) : (
              <img
                alt="profile"
                src={
                  props.userProfile
                    ? `${process.env.REACT_APP_ASSET_URL}/${props.userProfile}`
                    : process.env.PUBLIC_URL + `/img/profile.jpg`
                }
                className="w-full h-full"
              />
            )}
          </div>
        </div>

        <form className="flex justify-center w-full">
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={getNewProfile}
            ref={imgInputRef}
            className="hidden"
          />

          <button
            type="button"
            onClick={changeProfile}
            className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
          >
            변경하기
          </button>
        </form>
      </div>
    </>
  );
}

export default ChangeProfile;

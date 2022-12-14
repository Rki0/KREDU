import Layout from "../../layout/Layout";
import { useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reducerhooks";
import { uploadProfileImg, reviseNickname } from "../../_reducers/userSlice";
// import { useNavigate } from 'react-router-dom';

function ReviseMyInfoPage() {
  const userData = useAppSelector((state) => state.user.userData);
  const authData = useAppSelector((state) => state.user.authData);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState("");

  // 닉네임
  const [nickname, setNickname] = useState("");
  const [isNicknameRevise, setIsNicknameRevise] = useState(false);

  // 비밀번호
  const [isPswdRevise, setIsPswdRevise] = useState(false);
  const [revisedPswd, setRevisedPswd] = useState("");
  const [nowPswd, setNowPswd] = useState("");
  const [checkPswd, setCheckPswd] = useState("");

  const imgInputRef = useRef<HTMLInputElement>(null);

  // 프로필 이미지 등록
  const getImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    // console.log(e.target.files[0]);
    setProfileImg(URL.createObjectURL(e.target.files[0]));
  };

  // input 태그를 hidden하고 대신 button 태그가 input을 누르도록
  const profileImgUpload = () => {
    if (!imgInputRef.current) {
      return;
    }

    // inputRef로 참조 중인 요소를 click한다.
    imgInputRef.current.click();
  };

  // 프로필 이미지 삭제
  const deleteImg = () => {
    URL.revokeObjectURL(profileImg);
    setProfileImg("");
    // 기본 이미지로 전환 하기
  };

  // 프로필 이미지 서버 등록
  const submitImgToServer = () => {
    const formData = new FormData();

    formData.append("file", profileImg);
    // formData.append("email", userData.email);

    // // api 통신
    // dispatch(uploadProfileImg(formData))
    //   .then((res) => {
    //     alert("프로필 이미지 수정 성공!");

    //     // navigate("/mypage")
    //   })
    //   .catch((err) => console.log(err));
  };

  // 닉네임 onChange
  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 닉네임 수정하기 버튼 클릭 시
  const ableNicknameReviseHandler = () => {
    setIsNicknameRevise((prev) => !prev);
  };

  // 닉네임 수정버튼 클릭 시
  const nicknameReviseHandler = () => {
    let body = {
      email: authData.email,
      nickname: nickname,
    };

    dispatch(reviseNickname(body))
      .then((res) => {
        if (res.payload?.nicknameReviseSuccess) {
          alert("닉네임 변경 성공!");

          setIsNicknameRevise((prev) => !prev);
        }
      })
      .catch((err) => console.log(err));
  };

  // 닉네임 수정 취소 버튼 클릭 시
  const nicknameResetHandler = () => {
    setNickname("");
    setIsNicknameRevise((prev) => !prev);
  };

  // 비밀번호 변경하기/취소 클릭 시
  const pswdReviseHandler = () => {
    setIsPswdRevise((prev) => !prev);

    setNowPswd("");
    setRevisedPswd("");
    setCheckPswd("");
  };

  // 현재 비밀번호 입력
  const revisedNowPswdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowPswd(e.target.value);
  };

  // 변경할 비밀번호 입력
  const revisedPswdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevisedPswd(e.target.value);
  };

  // 비밀번호 확인
  const checkPswdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPswd(e.target.value);
  };

  // 비밀번호 유효성 검사 해야함.

  // 비밀번호 입력 후 변경 버튼 클릭 시
  const revisedPswdSubmitHandler = () => {};

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <h1 className="font-bold text-xl border-b-2 mb-2 border-[#ffa4a2] sm:text-2xl md:text-3xl">
          개인정보 수정
        </h1>

        <div className="flex flex-col">
          <div className="border-b-2 pb-2 border-[rgba(255,164,161,0.3)] mb-2">
            <h2 className="font-semibold mb-2">프로필 사진</h2>

            <div className="flex justify-center mb-2">
              <div className="border-2 border-transparent rounded-[50%] w-[100px] h-[100px] overflow-hidden">
                <img
                  alt="profile"
                  src={
                    profileImg
                      ? profileImg
                      : process.env.PUBLIC_URL + `/favicon.ico`
                  }
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="flex justify-center w-full">
              <input
                type="file"
                accept="image/*"
                onChange={getImgFile}
                ref={imgInputRef}
                className="hidden"
              />

              <button
                type="button"
                onClick={profileImgUpload}
                className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
              >
                사진 선택
              </button>

              <button
                type="button"
                onClick={deleteImg}
                className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
              >
                초기화
              </button>

              <button
                type="button"
                className="border-2 p-1 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
                onClick={submitImgToServer}
              >
                등록
              </button>
            </div>
          </div>

          <div className="border-b-2 pb-2 border-[rgba(255,164,161,0.3)] mb-2">
            <div className="font-semibold mb-2">닉네임</div>

            <div className="flex">
              <input
                value={nickname}
                placeholder={userData.nickname}
                onChange={nicknameHandler}
                className="border-2 mr-2 w-[200px] pl-1 border-[rgba(0,0,0,0.2)] outline-none focus:border-[#e57373] rounded-md disabled:bg-[rgba(0,0,0,0.2)]"
                disabled={!isNicknameRevise}
              />

              {isNicknameRevise ? (
                <div>
                  <button
                    type="reset"
                    onClick={nicknameResetHandler}
                    className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={nicknameReviseHandler}
                    className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
                  >
                    등록
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={ableNicknameReviseHandler}
                  className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
                >
                  수정하기
                </button>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">비밀번호 변경</h2>
            {isPswdRevise ? (
              <div className="flex flex-col ">
                <input
                  type="password"
                  placeholder="현재 비밀번호를 입력해주세요"
                  value={nowPswd}
                  onChange={revisedNowPswdHandler}
                  className="border-2 mr-2 mb-2 w-full pl-1 border-[rgba(0,0,0,0.2)] outline-none focus:border-[#e57373] rounded-md 2sm:w-[250px]"
                />

                <input
                  type="password"
                  placeholder="변경할 비밀번호를 입력해주세요"
                  value={revisedPswd}
                  onChange={revisedPswdHandler}
                  className="border-2 mr-2 mb-2 w-full pl-1 border-[rgba(0,0,0,0.2)] outline-none focus:border-[#e57373] rounded-md 2sm:w-[250px]"
                />

                <input
                  type="password"
                  placeholder="비밀번호를 확인해주세요"
                  value={checkPswd}
                  onChange={checkPswdHandler}
                  className="border-2 mr-2 mb-2 w-full pl-1 border-[rgba(0,0,0,0.2)] outline-none focus:border-[#e57373] rounded-md 2sm:w-[250px]"
                />

                <div>
                  <button
                    type="button"
                    onClick={pswdReviseHandler}
                    className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={revisedPswdSubmitHandler}
                    className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
                  >
                    변경
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={pswdReviseHandler}
                className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
              >
                비밀번호 변경하기
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReviseMyInfoPage;

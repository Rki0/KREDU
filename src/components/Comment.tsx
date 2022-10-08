import { useState } from "react";
import {
  BsFillChatLeftTextFill,
  BsChatLeftText,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { useAppSelector } from "../hooks/reducerhooks";

interface CommentsDataType {
  email: string;
  nickname: string;
  description: string;
  like: number;
  date: string;
  comments: any | undefined;
  outterCommentsId: number;
}

interface CommentsMapType {
  item: CommentsDataType;
  writer: string;
}

function Comment({ item, writer }: CommentsMapType) {
  const [isCommentHover, setIsCommentHover] = useState(false);
  const [commentState, setCommentState] = useState(false);

  const userData = useAppSelector((state) => state.user.userData);

  const commentHoverHandler = () => {
    setIsCommentHover(true);
  };

  const commentHoverOutHandler = () => {
    setIsCommentHover(false);
    setCommentState(false);
  };

  const commentStateHandler = () => {
    setCommentState(true);
  };

  const clickRevise = () => {
    // 댓글 수정 후
    // 댓글 수정본 api 통신으로 update
    // 아...이래서 데이터 하나하나에 id가 있어야함.
    // 없으면 데이터 찾기가 매우 곤란해짐.
    console.log("revise");
  };

  const clickDelete = () => {
    console.log("delete");
  };

  const clickFix = () => {
    console.log("fix");
  };

  // 태블릿 화면까지는 commentState 버튼을 그냥 보여줘야함(유튜브 참고)
  // useEffect랑 addEventListner 사용해서 화면 크기를 측정한 뒤
  // 태블릿 사이즈 이하라면 setIsCommentHover(true)로 해놓으면 될듯?
  // 아니면 onMouseEnter, onMouseOver에 삼항연산자로 사이즈에 따라 함수 활성화를 조절해도 될듯

  return (
    <div
      className="py-3"
      onMouseEnter={commentHoverHandler}
      onMouseLeave={commentHoverOutHandler}
    >
      <div className="flex items-center">
        <div>
          <div className="overflow-hidden w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full mr-2">
            <img
              alt="user profile"
              src={process.env.PUBLIC_URL + `/img/profile.jpg`}
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <div className="flex">
              <h1
                className={
                  writer === item.email
                    ? "bg-slate-300 rounded px-1 mr-4"
                    : "mr-4"
                }
              >
                {item.nickname}
              </h1>

              <p>{item.date}</p>
            </div>

            {item.email === userData.email ? (
              isCommentHover ? (
                <div className="relative">
                  <button onClick={commentStateHandler}>
                    <BsThreeDotsVertical />
                  </button>

                  {commentState ? (
                    <nav className="absolute bg-slate-300 rounded overflow-hidden w-[70px] right-0">
                      <ul className="flex flex-col text-center">
                        <li
                          className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
                          onClick={clickRevise}
                        >
                          수정
                        </li>
                        <li
                          className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
                          onClick={clickDelete}
                        >
                          삭제
                        </li>

                        {userData.isAdmin ? (
                          <li
                            className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
                            onClick={clickFix}
                          >
                            고정
                          </li>
                        ) : null}
                      </ul>
                    </nav>
                  ) : null}
                </div>
              ) : null
            ) : null}
          </div>

          <p>{item.description}</p>
        </div>
      </div>

      <div className="flex ml-12 sm:ml-14">
        <div className="flex mr-3 items-center">
          <BiLike className="mr-1" />
          <span>{item.like}</span>
        </div>

        <div className="flex items-center">
          <BsChatLeftText className="mr-1" />
          <span>{item.comments.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;

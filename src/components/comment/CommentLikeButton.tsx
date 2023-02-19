import React, { useContext, useEffect, useState } from "react";

import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hoc/http-hook";

interface CommentLikeButtonProps {
  commentId: string;
  likedUser: string[];
  isSubComment: boolean;
  comment: any;
}

function CommentLikeButton(props: CommentLikeButtonProps) {
  // 여기서도 마찬가지로, fetch 해온 데이터에서는 likedUser가 변하지 않기 때문에
  // 특정 동작을 해서 likedUser가 변경되어도, 이미 받아온 likedUser 상태로 다시 돌아가버린다.
  // 지금 거의 모든 요소들이 이러한 이유로 수정을 해주고 있는데,
  // 이렇게되면 그냥 동작하나 발생할 때, fetch를 새로하는게 나은 것 같은데..?
  // 뭐 일단은 아까처럼 해보자고. 직접 수정 ㅇㅇ
  // 아니면 comment 자체를 state로 두고, setState 해서 특정 요소만 수정해도 되긴하는데...
  // 그리고 state가 변경되었다고 인지할지도 잘 고려해보자. 객체를 state로 사용하니까 참조를 직접 변경해야하지도? 저번처럼 ㅇㅇ
  // 꼬일 것 같으니까 마지막에 한번에 다 바꿔버릴까? ㅇㅇ
  // 우선 지금은 api 통신 성공했을 때 직접 comment.likeUser를 수정하는 수밖에..
  // auth인 경우에 대해서 처리해놓음. 성공!

  // 한번 상태가 변경되면 다시 돌아오지 않음
  // ex) 좋아요 누르고, 좋아요 취소하면 좋아요 상태로 고정
  // ex) 좋아요 취소하고, 좋아요 누르면 좋아요 취소 상태로 고정
  // 아무래도 props.likedUser가 아니라 props.comment.likedUser를 해야지 반영될듯. 아까랑 동일하네.
  // 성공! 그런데 점점 더 comment를 state에 넣고 관리할 필요성이 높아진다 ㅋㅋ;;

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      return;
    }

    setIsLiked(props.likedUser.includes(auth.userId));
  }, [props]);

  const commentLikeHandler = async () => {
    if (!auth.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/lecture/${
          props.isSubComment ? "subcomments" : "comments"
        }/like/${props.commentId}`,
        "PATCH",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData.commentLikeSuccess) {
        props.comment.likedUser.push(auth.userId);

        setIsLiked(true);
      }
    } catch (err) {}
  };

  const commentDislikeHandler = async () => {
    if (!auth.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/lecture/${
          props.isSubComment ? "subcomments" : "comments"
        }/dislike/${props.commentId}`,
        "PATCH",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData.commentDislikeSuccess) {
        props.comment.likedUser = props.comment.likedUser.filter(
          (user: string) => user !== auth.userId
        );

        setIsLiked(false);
      }
    } catch (err) {}
  };

  return (
    <button
      type="button"
      onClick={isLiked ? commentDislikeHandler : commentLikeHandler}
      className="flex items-center"
    >
      {isLiked ? <AiFillLike /> : <AiOutlineLike />}
    </button>
  );
}

export default CommentLikeButton;

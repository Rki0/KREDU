import { useEffect, useState } from "react";

import { CommentsDataType } from "./Comments";
import CommentUserProfileImg from "./CommentUserProfileImg";
import CommentContent from "./CommentContent";
import CommentLikeButton from "./CommentLikeButton";
import SubCommentButton from "./SubCommentButton";
import SubCommentTextarea from "./SubCommentTextarea";
import SubCommentCreateButton from "./SubCommentCreateButton";
import SubComments from "./SubComments";
import CreatedSubComments from "./CreatedSubComments";
import DotDivision from "./DotDivision";

interface CommentProps {
  comment: CommentsDataType;
  writer: string;
  deleteHandler: (id: string) => void;
  isFixed?: boolean;
  setFixedComment?: React.Dispatch<any>;
  fixedCommentDeleteHandler?: (id: string) => void;
  setIsDeleteFix?: React.Dispatch<React.SetStateAction<boolean>>;
  setRawCommentsData?: React.Dispatch<any>;
}

function Comment(props: CommentProps) {
  const [isCommentHover, setIsCommentHover] = useState(false);
  const [commentState, setCommentState] = useState(false);
  const [wantUpdate, setWantUpdate] = useState(false);
  const [wantCreateSubComment, setWantCreateSubComment] = useState(false);
  const [wantShowSubComment, setWantShowSubComment] = useState(false);
  const [subComments, setSubComments] = useState<any>([]);
  const [createdSubComments, setCreatedSubComments] = useState<any>([]);

  // props가 새로 넘어오면 그냥 생성된 답글을 초기화를 해버리는거지...
  // 강제로 닫힘처리를 하는 느낌 ㅎㅎ;
  // 해결은 됐는데, 답글 쓰고, 댓글을 쓰는 경우, 답글이 사라지는 매직
  // 어쩔 수 없는게, createdSubComments는 이 컴포넌트에서 생성되는거라서
  // props를 가져와서 반영시켜줄 수가 없어. 이게 가장 최선인듯.
  useEffect(() => {
    setCreatedSubComments([]);
  }, [props]);

  const commentHoverHandler = () => {
    setIsCommentHover(true);
  };

  const commentHoverOutHandler = () => {
    setIsCommentHover(false);
    setCommentState(false);
  };

  const commentUpdateHandler = () => {
    setWantUpdate(true);
    setCommentState(false);
  };

  const subCommentCreateHandler = () => {
    setWantCreateSubComment((prev) => !prev);
  };

  const createdSubCommentDeleteHandler = (createdSubCommentId: string) => {
    // setCreatedSubComments((prev: any) => {
    //   console.log("prev", prev);

    //   return prev.filter(
    //     (createdSubComment: any) =>
    //       createdSubComment._id !== createdSubCommentId
    //   );
    // });

    setCreatedSubComments((prev: any) =>
      prev.filter(
        (createdSubComment: any) =>
          createdSubComment._id !== createdSubCommentId
      )
    );
  };

  // 댓글 시간은 계산을 통해서 ~초 전, ~ 분 전, 이런 식으로 할 수 없을까?

  return (
    <div
      className="py-3"
      onMouseEnter={commentHoverHandler}
      onMouseLeave={commentHoverOutHandler}
    >
      <div className="flex">
        <CommentUserProfileImg image={props.comment.image} />

        <CommentContent
          writer={props.writer}
          creator={props.comment.creator}
          date={props.comment.date}
          nickname={props.comment.nickname}
          text={props.comment.text}
          commentId={props.comment._id}
          wantUpdate={wantUpdate}
          setWantUpdate={setWantUpdate}
          isSubComment={false}
          comment={props.comment}
          commentState={commentState}
          setCommentState={setCommentState}
          setIsCommentHover={setIsCommentHover}
          isCommentHover={isCommentHover}
          deleteHandler={props.deleteHandler}
          commentUpdateHandler={commentUpdateHandler}
          setWantShowSubComment={setWantShowSubComment}
          isFixed={props.isFixed}
          setFixedComment={props.setFixedComment}
          fixedCommentDeleteHandler={props.fixedCommentDeleteHandler}
          setIsDeleteFix={props.setIsDeleteFix}
          setRawCommentsData={props.setRawCommentsData}
        />
      </div>

      <div className="flex ml-12 sm:ml-14">
        <CommentLikeButton
          commentId={props.comment._id}
          likedUser={props.comment.likedUser}
          isSubComment={false}
          comment={props.comment}
        />

        <DotDivision />

        <SubCommentCreateButton
          subCommentCreateHandler={subCommentCreateHandler}
        />

        <DotDivision />

        <SubCommentButton
          subCommentsNum={props.comment.subComments.length}
          setWantShowSubComment={setWantShowSubComment}
          wantShowSubComment={wantShowSubComment}
        />
      </div>

      {wantCreateSubComment && (
        <SubCommentTextarea
          subCommentCreateHandler={subCommentCreateHandler}
          mainCommentId={props.comment._id}
          setSubComments={setSubComments}
          setCreatedSubComments={setCreatedSubComments}
        />
      )}

      {subComments && wantShowSubComment && (
        <SubComments
          mainCommentId={props.comment._id}
          writer={props.writer}
          setSubComments={setSubComments}
          subComments={subComments}
          createdSubComments={createdSubComments}
          createdSubCommentsDeleteHandler={createdSubCommentDeleteHandler}
          setCreatedSubComments={setCreatedSubComments}
        />
      )}

      {createdSubComments && !wantShowSubComment && (
        <CreatedSubComments
          createdSubComments={createdSubComments}
          writer={props.writer}
          deleteHandler={createdSubCommentDeleteHandler}
          setSubComments={setSubComments}
          setCreatedSubComments={setCreatedSubComments}
          mainCommentId={props.comment._id}
        />
      )}
    </div>
  );
}

export default Comment;

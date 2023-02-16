import { useState } from "react";

import { CommentsDataType } from "./Comments";
import CommentUserProfileImg from "./CommentUserProfileImg";
import CommentContent from "./CommentContent";
import CommentLikeButton from "./CommentLikeButton";
import SubCommentTextarea from "./SubCommentTextarea";
import SubCommentCreateButton from "./SubCommentCreateButton";
import DotDivision from "./DotDivision";

interface CreatedSubCommentProps {
  comment: CommentsDataType;
  writer: string;
  deleteHandler: (id: string) => void;
  setSubComments: React.Dispatch<any>;
  setCreatedSubComments: React.Dispatch<any>;
  mainCommentId: string;
}

function CreatedSubComment(props: CreatedSubCommentProps) {
  const [isCommentHover, setIsCommentHover] = useState(false);
  const [commentState, setCommentState] = useState(false);
  const [wantUpdate, setWantUpdate] = useState(false);
  const [wantCreateSubComment, setWantCreateSubComment] = useState(false);

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

  return (
    <div
      className="flex flex-col pl-4"
      onMouseEnter={commentHoverHandler}
      onMouseLeave={commentHoverOutHandler}
    >
      <div className="flex items-center">
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
          isSubComment={true}
          comment={props.comment}
          commentState={commentState}
          setCommentState={setCommentState}
          setIsCommentHover={setIsCommentHover}
          isCommentHover={isCommentHover}
          deleteHandler={props.deleteHandler}
          commentUpdateHandler={commentUpdateHandler}
        />
      </div>

      <div className="flex ml-12 sm:ml-14">
        <CommentLikeButton
          commentId={props.comment._id}
          likedUser={props.comment.likedUser}
          isSubComment={true}
          comment={props.comment}
        />

        <DotDivision />

        <SubCommentCreateButton
          subCommentCreateHandler={subCommentCreateHandler}
        />
      </div>

      {wantCreateSubComment && (
        <SubCommentTextarea
          subCommentCreateHandler={subCommentCreateHandler}
          mainCommentId={props.mainCommentId}
          setSubComments={props.setSubComments}
          setCreatedSubComments={props.setCreatedSubComments}
        />
      )}
    </div>
  );
}

export default CreatedSubComment;

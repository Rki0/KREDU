import React from "react";
import { useTranslation } from "react-i18next";

interface SubCommentCreateButtonProps {
  subCommentCreateHandler: () => void;
}

function SubCommentCreateButton(props: SubCommentCreateButtonProps) {
  const { t } = useTranslation();

  return (
    <button onClick={props.subCommentCreateHandler}>
      {t("comment.createSubcomment")}
    </button>
  );
}

export default SubCommentCreateButton;

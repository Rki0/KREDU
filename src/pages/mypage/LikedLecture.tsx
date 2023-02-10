import React from "react";
import { Link } from "react-router-dom";

import TrashButton from "../../components/TrashButton";

interface LikedLectureProps {
  likedLecture: any;
  deleteHandler: (id: string) => void;
}

function LikedLecture(props: LikedLectureProps) {
  const { likedLecture, deleteHandler } = props;

  return likedLecture.map((lecture: any, index: number) => (
    <div
      className="flex items-center justify-between border-b-2 border-[rgba(255,164,161,0.3)] hover:bg-[rgba(0,0,0,0.05)] px-2"
      key={lecture.id}
    >
      <Link
        to={`/lecture/${lecture.id}`}
        className="flex items-center w-11/12 py-2"
      >
        <div className="w-1/3 max-w-[120px] mr-2">
          <img
            alt="thumbnail"
            src={`https://img.youtube.com/vi/${lecture.link}/mqdefault.jpg`}
          />
        </div>

        <div className="w-2/3">
          <div>
            <h2 className="truncate">{lecture.title}</h2>
          </div>

          <p>{lecture.date}</p>
          <p className="truncate">{lecture.description}</p>
        </div>
      </Link>

      <TrashButton lectureId={lecture.id} deleteHandler={deleteHandler} />
    </div>
  ));
}

export default LikedLecture;

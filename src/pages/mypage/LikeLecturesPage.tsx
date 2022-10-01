import Layout from "../../layout/Layout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LikeLecturesPage() {
  // const [likedLecture, setLikedLecture] = useState([]);
  // 더미 데이터
  const likedLecture = [
    {
      id: 1,
      title: "강의.입니다.",
      // 유튜브 영상 썸네일 받아오기
      thumbnail: "https://img.youtube.com/vi/V-MdUgZI9u4/0.jpg",
      // 강의 페이지에 있는 상세 강의 페이지 링크 가져오기
      url: "/lecture/1",
      date: "22.09.30",
      looked: 280,
    },
    {
      id: 2,
      title: "강의.입니다.",
      // 유튜브 영상 썸네일 받아오기
      thumbnail: "https://img.youtube.com/vi/V-MdUgZI9u4/0.jpg",
      // 강의 페이지에 있는 상세 강의 페이지 링크 가져오기
      url: "/lecture/1",
      date: "22.09.30",
      looked: 280,
    },
    {
      id: 3,
      title: "강의.입니다.이건 엄청나게 긴 제목이죠 하하하하하하하하하.",
      // 유튜브 영상 썸네일 받아오기
      thumbnail: "https://img.youtube.com/vi/V-MdUgZI9u4/0.jpg",
      // 강의 페이지에 있는 상세 강의 페이지 링크 가져오기
      url: "/lecture/1",
      date: "22.09.30",
      looked: 280,
    },
    {
      id: 4,
      title: "강의.입니다.",
      // 유튜브 영상 썸네일 받아오기
      thumbnail: "https://img.youtube.com/vi/V-MdUgZI9u4/0.jpg",
      // 강의 페이지에 있는 상세 강의 페이지 링크 가져오기
      url: "/lecture/1",
      date: "22.09.30",
      looked: 280,
    },
    {
      id: 5,
      title: "강의.입니다.",
      // 유튜브 영상 썸네일 받아오기
      thumbnail: "https://img.youtube.com/vi/V-MdUgZI9u4/0.jpg",
      // 강의 페이지에 있는 상세 강의 페이지 링크 가져오기
      url: "/lecture/1",
      date: "22.09.30",
      looked: 280,
    },
    {
      id: 6,
      title: "강의.입니다.",
      // 유튜브 영상 썸네일 받아오기
      thumbnail: "https://img.youtube.com/vi/V-MdUgZI9u4/0.jpg",
      // 강의 페이지에 있는 상세 강의 페이지 링크 가져오기
      url: "/lecture/1",
      date: "22.09.30",
      looked: 280,
    },
    {
      id: 7,
      title: "강의.입니다.",
      // 유튜브 영상 썸네일 받아오기
      thumbnail: "https://img.youtube.com/vi/V-MdUgZI9u4/0.jpg",
      // 강의 페이지에 있는 상세 강의 페이지 링크 가져오기
      url: "/lecture/1",
      date: "22.09.30",
      looked: 280,
    },
    {
      id: 8,
      title: "강의.입니다.",
      // 유튜브 영상 썸네일 받아오기
      thumbnail: "https://img.youtube.com/vi/V-MdUgZI9u4/0.jpg",
      // 강의 페이지에 있는 상세 강의 페이지 링크 가져오기
      url: "/lecture/1",
      date: "22.09.30",
      looked: 280,
    },
  ];

  // api 통신으로 좋아요 누른 강의만 가져오기

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <h1 className="font-bold text-xl border-b-2 mb-2 border-[#ffa4a2] sm:text-2xl md:text-3xl">
          좋아요 표시한 강의
        </h1>

        <article>
          {likedLecture.map((item) => (
            <Link
              key={item.id}
              to={item.url}
              className="flex items-center border-b-2 border-[rgba(255,164,161,0.3)] py-2"
            >
              <div className="w-[120px] mr-2">
                <img alt="thumbnail" src={item.thumbnail} />
              </div>

              <div>
                <div className="w-[100px]">
                  <h2 className="truncate">{item.title}</h2>
                </div>

                <div className="flex">
                  <p className="mr-4">조회수 {item.looked}</p>
                  <p>{item.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </article>
      </div>
    </Layout>
  );
}

export default LikeLecturesPage;

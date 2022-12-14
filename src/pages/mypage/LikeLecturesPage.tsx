import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reducerhooks";

function LikeLecturesPage() {
  const userData = useAppSelector((state) => state.user.userData);

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <h1 className="font-bold text-xl border-b-2 mb-2 border-[#ffa4a2] sm:text-2xl md:text-3xl">
          좋아요 표시한 강의
        </h1>

        <article>
          {userData.liked.map((item: any, index: number) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center border-b-2 border-[rgba(255,164,161,0.3)] py-2 hover:bg-[rgba(0,0,0,0.05)]"
            >
              <div className="w-1/3 max-w-[120px] mr-2">
                <img alt="thumbnail" src={item.thumbnail} />
              </div>

              <div className="w-2/3">
                <div>
                  <h2 className="truncate">{item.title}</h2>
                </div>

                <div className="flex flex-col">
                  <p>{item.date}</p>
                  <p>조회수</p>
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

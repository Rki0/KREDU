import Layout from "../../layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

interface CommentsDataType {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}

function WishContentsPage() {
  const [wishList, setWishList] = useState<CommentsDataType[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setWishList(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <div className="border-b-2 mb-2 pb-1 border-[#ffa4a2] flex justify-between items-center">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
            컨텐츠 건의
          </h1>

          <Link
            to="/wish/write"
            className="px-2 rounded border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
          >
            작성하기
          </Link>
        </div>

        <div>
          <Table dataList={wishList} />
        </div>
      </div>
    </Layout>
  );
}

export default WishContentsPage;

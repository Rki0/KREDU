import React from "react";

import { AiOutlineYoutube, AiOutlineInstagram } from "react-icons/ai";
import { SiNotion } from "react-icons/si";

function Footer() {
  return (
    <footer className="flex flex-col items-center py-4 mt-4 border-t-2 lg:col-start-2 lg:col-end-6">
      <p className="mb-2">이 홈페이지의 모든 저작권은 기영에게 있습니다.</p>

      <div className="flex items-center justify-between w-2/5 text-3xl">
        <a
          href="https://www.youtube.com/channel/UCiJ_NJiNBNFEM0f5jd54Ofg"
          className="hover:text-red-700"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineYoutube />
        </a>

        <a href="https://rki0.notion.site/" target="_blank" rel="noreferrer">
          <SiNotion />
        </a>

        <a
          href="https://www.instagram.com/sora_o_toru/"
          className="text-black rounded hover:text-white hover:bg-gradient-to-r hover:from-rose-400 hover:via-yellow-300 hover:to-fuchsia-500"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineInstagram />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

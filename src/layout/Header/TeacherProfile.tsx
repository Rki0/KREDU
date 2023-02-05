import React from "react";

function TeacherProfile() {
  return (
    <div className="flex-col items-center hidden text-xl lg:flex">
      <img
        src={process.env.PUBLIC_URL + "/img/profile.jpg"}
        alt="profile"
        className="w-[180px] h-[180px] mb-4 bg-white rounded-full"
      />

      <span className="text-lg">박기영</span>
      <span>적당히 한국어</span>
    </div>
  );
}

export default TeacherProfile;

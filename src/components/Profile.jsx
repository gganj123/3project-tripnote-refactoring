import React from 'react';
import useUserStore from '../store/useUserStore';
import profile from '../assets/profile.png';

const Profile = () => {
  const nickname = useUserStore((state) => state.nickname);

  // userId 값을 nickname으로 설정
  const userId = nickname;

  return (
    <>
      <img
        src={profile}
        alt="기본 이미지"
        className="rounded-full w-20 h-20 object-cover mb-4"
      />
      <h3 className="text-5xl mb-4">{userId}</h3>
    </>
  );
};

export default Profile;

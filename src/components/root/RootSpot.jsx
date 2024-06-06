import React from 'react';
import Input from '../commons/Input';

export default function RootSpot() {
  return (
    <>
      <form className="relative mt-4 flex-col justify-center">
        <Input variant="searchInput" placeholder="여행지를 검색해보세요!" />
        <div className="w-[300px] h-[180px] border-2 mt-4"></div>
        <div className="w-[300px] h-[180px] border-2 mt-4"></div>
        <div className="w-[300px] h-[180px] border-2 mt-4"></div>
        <div className="w-[300px] h-[180px] border-2 mt-4"></div>
      </form>
    </>
  );
}

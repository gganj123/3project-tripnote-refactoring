import React, { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { GoSearch } from 'react-icons/go';

export default function Selector() {
  const mockRegionsTags = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기',
    '강원',
    '충북',
    '충남',
    '경북',
    '경남',
    '전북',
    '전남',
    '제주',
  ];

  const [inputValue, setInputValue] = useState('');
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="w-72 font-medium top-0">
      <div className="w-full p-2 flex items-center justify-between rounded bg-subBackground" onClick={() => setDropdown(!dropdown)}>
        여행지 검색
        <GoChevronDown className={`text-xl ${dropdown && 'rotate-180'}`} />
      </div>
      <ul className={`bg-subBackground mt-2 overflow-y-auto ${dropdown ? 'max-h-40' : 'max-h-0'}`}>
        <div className="flex items-center px-2 sticky top-0 bg-subBackground">
          <GoSearch className="text-gray-300" />
          <input
            type="text"
            placeholder="여행지를 검색해보세요!"
            className="placeholder:text-gray-300 p-2 outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        {mockRegionsTags.map((region, i) => (
          <li
            key={i}
            className={`text-ml text-title bg-white hover:bg-prime hover:text-white pl-2 ${region.startsWith(inputValue) ? 'block' : 'hidden'}`}
          >
            {region}
          </li>
        ))}
      </ul>
    </div>
  );
}

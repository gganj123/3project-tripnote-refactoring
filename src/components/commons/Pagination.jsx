import React from 'react';

export default function Pagination({ currentPage, totalPage, onPageChange }) {
  const MAX_VISIBLE_PAGE = 5; // 최대 보여지는 페이지 버튼 수
  const startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGE / 2));
  const endPage = Math.min(totalPage, startPage + MAX_VISIBLE_PAGE - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className='flex justify-center items-center'>
      <ul className="flex list-none p-0">
        {currentPage > 0 && (
          <li
            className="px-3 py-1 rounded cursor-pointer text-[#777777] hover:bg-gray-200"
            onClick={(e) => onPageChange(e, currentPage - 1)}
          >
            &lt;
          </li>
        )}
        {pages.map((page) => (
          <li
            key={page}
            className={`${
              currentPage === page
                ? ' text-black bg-prime'
                : ' text-[#777777] hover:bg-gray-200'
            } cursor-pointer px-3 py-1 rounded `}
            onClick={(e) => onPageChange(e, page)}
          >
            {page}
          </li>
        ))}
        {currentPage < totalPage && (
          <li
            className="px-3 py-1 rounded cursor-pointer text-[#777777] hover:bg-gray-200"
            onClick={(e) => onPageChange(e, currentPage + 1)}
          >
            &gt;
          </li>
        )}
      </ul>
    </div>
  );
}
// Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
        <div
          onClick={() => handlePageChange(currentPage - 1)}
          className={`${
            currentPage === 1 ? "pointer-events-none" : "cursor-pointer"
          } flex items-center pt-3 text-gray-600 hover:text-indigo-700`}
        >
          <svg
            width={14}
            height={8}
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path for previous icon */}
          </svg>
          <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
        </div>
        <div className="sm:flex hidden">
          {Array.from(Array(totalPages).keys()).map((page) => (
            <p
              key={page}
              onClick={() => handlePageChange(page + 1)}
              className={`${
                currentPage === page + 1
                  ? "text-indigo-700 border-indigo-400"
                  : "text-gray-600 hover:text-indigo-700 border-transparent hover:border-indigo-400"
              } text-sm font-medium leading-none cursor-pointer border-t border-transparent pt-3 mr-4 px-2`}
            >
              {page + 1}
            </p>
          ))}
        </div>
        <div
          onClick={() => handlePageChange(currentPage + 1)}
          className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
        >
          <p className="text-sm font-medium leading-none mr-3">Next</p>
          <svg
            width={14}
            height={8}
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path for next icon */}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

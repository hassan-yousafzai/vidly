import React from 'react';

// Interface of Pagination component
// Input - What data does this component needs i.e itemsCount and PageSize
// Events - What events will this component raise i.e. onPageChange?

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // Generate an array from [1..n] from just an integer value pagesCount
  // There are different ways but the following is the one which creates a new empty array
  // in the memory with the length of pagesCount. Then we fill it with nothing(undefined) and then map it and return a new array

  if (pagesCount === 1) return null; //don't display pagination when there is only one page

  const pages = new Array(pagesCount).fill().map((value, index) => index + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page && 'active'}`}
          >
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

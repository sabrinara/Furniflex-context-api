import { useState } from "react";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  const nextPage = () => {
    setCurrentPage((current) => Math.min(current + 1, maxPage));
  };

  const prevPage = () => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  };

  const jumpToPage = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  };

  return { nextPage, prevPage, jumpToPage, currentData, currentPage, maxPage };
};

export default usePagination;

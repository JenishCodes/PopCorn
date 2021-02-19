import React from "react";
import _ from "lodash";
import "../Styles/pagination.css";

function Pagination(props) {
  const { itemCount, pageSize, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemCount / pageSize);

  const pages = _.range(1, pagesCount + 1);

  return pagesCount && pagesCount !== 1 ? (
    <div className="pagination">
      <span
        className="page-number prev"
        onClick={() => {
          if (currentPage !== 1) onPageChange(currentPage - 1);
          else return;
        }}
      >
        <i className="fa fa-chevron-left" />
      </span>
      {pages.map((page) => {
        return (
          <span
            key={page}
            className={
              currentPage === page ? "page-number current" : "page-number"
            }
            onClick={() => {
              if (currentPage !== 0) onPageChange(page);
              else return;
            }}
          >
            <span>{page}</span>
          </span>
        );
      })}
      <span
        className="page-number next"
        onClick={() => {
          if (currentPage !== pagesCount) onPageChange(currentPage + 1);
          else return;
        }}
      >
        <i className="fa fa-chevron-right" />
      </span>
    </div>
  ) : null;
}

export default Pagination;

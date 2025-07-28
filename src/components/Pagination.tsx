import { useState } from "react";
import type { FC } from "react";
import type { CollectionLink } from "../types/nasa-api";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";

interface PaginationProps {
  links: CollectionLink[];
  onPaginate: (page: string) => void;
  totalHits: number;
  itemsPerPage: number;
}

const getPageFromLink = (href: string): string => {
  const url = new URL(href);
  const pageParam = url.searchParams.get("page");
  return pageParam || "1";
};

const Pagination: FC<PaginationProps> = ({
  links,
  onPaginate,
  totalHits,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState<string>("1");
  const nextLink = links.find((link) => link.rel === "next");
  const prevLink = links.find((link) => link.rel === "prev");
  const totalPages = Math.ceil(totalHits / itemsPerPage);
  const isNotNumber = isNaN(totalPages);
  return (
    <div className="pagination">
      {!isNotNumber && (
        <div>
          <Typography variant="body1" component="p">
            {currentPage} of {totalPages.toLocaleString("en-US")} pages
          </Typography>
        </div>
      )}
      <ButtonGroup variant="text" aria-label="Basic button group">
        {prevLink && (
          <Button
            onClick={() => {
              const page = getPageFromLink(prevLink.href);
              setCurrentPage(page);
              onPaginate(page);
            }}
            rel="prev"
          >
            Previous
          </Button>
        )}
        {nextLink && (
          <Button
            onClick={() => {
              const page = getPageFromLink(nextLink.href);
              setCurrentPage(page);
              onPaginate(page);
            }}
            rel="next"
          >
            Next
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

export default Pagination;

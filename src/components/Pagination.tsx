import type { FC } from "react";
import type { CollectionLink } from "../types/nasa-api";
import Button from "@mui/material/Button";

interface PaginationProps {
  links: CollectionLink[];
  onPaginate: (page: string) => void;
}

const getPageFromLink = (href: string): string => {
  const url = new URL(href);
  const pageParam = url.searchParams.get("page");
  return pageParam || "1";
};

const Pagination: FC<PaginationProps> = ({ links, onPaginate }) => {
  const nextLink = links.find((link) => link.rel === "next");
  const prevLink = links.find((link) => link.rel === "prev");

  return (
    <div className="pagination">
      {prevLink && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPaginate(getPageFromLink(prevLink.href))}
          rel="prev"
        >
          Previous
        </Button>
      )}
      {nextLink && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPaginate(getPageFromLink(nextLink.href))}
          rel="next"
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;

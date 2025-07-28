import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import type { Collection, SearchParams } from "../types/nasa-api";
import Typography from "@mui/material/Typography";
import Search from "./Search";
import Results from "./Results";
import Pagination from "./Pagination";

const API_URL = import.meta.env.VITE_API_URL || "";

const initialParams = {
  q: "",
  media_type: "",
  page_size: "10",
};

const HelloWorld: FC = () => {
  // states
  const [searchParams, setSearchParams] = useState<SearchParams>(initialParams);
  // fetch URL
  const fetchUrlParams = new URLSearchParams(searchParams);
  const fetchUrl = `${API_URL}/search?${fetchUrlParams.toString()}`;
  // fetch data
  // TODO: data is refreshed when other states change... can this be fixed?
  // e.g. when pageSize changes, the data is fetched again
  const {
    data = { collection: { items: [], metadata: {}, links: [] } },
    isLoading,
    error,
  } = useQuery({
    queryKey: [searchParams],
    queryFn: async () => {
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  // handlers
  const onSubmit = (q: string, mediaType: string, pageSize: string) => {
    setSearchParams({ q, media_type: mediaType, page_size: pageSize });
  };
  const onPaginate = (page: string) => {
    setSearchParams({ ...searchParams, page });
  };
  // component context
  const { collection } = data as { collection: Collection };
  const { items, metadata, links } = collection;
  const { total_hits: totalHits = 0 } = metadata;
  // JSX
  return (
    <div className="grid-panels">
      <div>
        <Search onSubmit={onSubmit} isLoading={isLoading} />
      </div>
      <div>
        {error ? (
          <div>
            <Typography variant="h3" component="h2" gutterBottom>
              A thousand pardons
            </Typography>
            <Typography variant="body1" component="p">
              There was a “{error.message}” error. Please try adjusting your
              search parameters, or try again later.
            </Typography>
          </div>
        ) : (
          <Results items={items} totalHits={totalHits} isLoading={isLoading} />
        )}

        {links && (
          <Pagination
            links={links}
            onPaginate={onPaginate}
            totalHits={totalHits}
            itemsPerPage={items.length}
          />
        )}
      </div>
    </div>
  );
};

export default HelloWorld;

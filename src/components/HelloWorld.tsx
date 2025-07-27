import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Collection, MediaTypes, SearchParams } from "../types/nasa-api";

const API_URL = import.meta.env.VITE_API_URL || "";

const initialSearchParams = {
  q: "",
  media_type: "",
  page_size: "10",
  // page: "1",
};

const initialMediaTypes = {
  image: true,
  video: false,
  audio: false,
};

const getMediaType = (obj: MediaTypes) => {
  const keys = Object.keys(obj) as (keyof MediaTypes)[];
  const filtered = keys.filter((key) => obj[key as keyof MediaTypes]);
  return filtered.length > 0 ? filtered.join(",") : "";
};

const HelloWorld: React.FC = () => {
  // states
  const [searchParams, setSearchParams] =
    useState<SearchParams>(initialSearchParams);
  const [q, setQ] = useState<string>("");
  const [mediaTypes, setMediaTypes] = useState<MediaTypes>(initialMediaTypes);
  const [pageSize, setPageSize] = useState<string>("10");
  // fetch URL
  const fetchUrlParams = new URLSearchParams(searchParams);
  const fetchUrl = `${API_URL}/search?${fetchUrlParams.toString()}`;
  // fetch data
  const { data, isLoading, error } = useQuery({
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const media_type = getMediaType(mediaTypes);
    console.log("pageSize:", pageSize);
    setSearchParams({ q, media_type, page_size: pageSize });
  };
  // JSX loading
  if (isLoading) return <div>Loading...</div>;
  // JSX error
  if (error) return <div>Error: {error.message}</div>;
  // component data
  const { collection } = data as { collection: Collection };
  const { items, metadata, links } = collection;
  const toppingsList = Object.keys(initialMediaTypes) as (keyof MediaTypes)[];
  // JSX success
  return (
    <section>
      <div>
        <h2>Hello world</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Search query:
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="e.g. Apollo 11"
              />
            </label>
          </div>
          <fieldset>
            <legend>Select media types:</legend>
            {toppingsList.map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  checked={mediaTypes[option as keyof MediaTypes]}
                  onChange={(event) => {
                    setMediaTypes({
                      ...mediaTypes,
                      [option as keyof MediaTypes]: event.target.checked,
                    });
                  }}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </fieldset>
          <div>
            <label>
              Page size:
              <input
                type="number"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                step="10"
                min="0"
                max="100"
                required
              />
            </label>
          </div>
          <button type="submit">Search</button>
        </form>
        <p>TODO:metadata... {JSON.stringify(metadata)}</p>
        <p>TODO:items... {items.length}</p>
        <p>TOD:links... {JSON.stringify(links)}</p>
      </div>
    </section>
  );
};

export default HelloWorld;

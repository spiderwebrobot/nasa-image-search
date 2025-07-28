import { useState } from "react";
import type { FC, ChangeEvent, FormEvent } from "react";
import type { MediaTypes } from "../types/nasa-api";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
// import { InfoOutlined } from "@mui/icons-material";

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

interface SearchProps {
  onSubmit: (q: string, mediaType: string, pageSize: string) => void;
  isLoading: boolean;
}

const Search: FC<SearchProps> = ({ onSubmit, isLoading }) => {
  // states
  const [q, setQ] = useState<string>("");
  const [mediaTypes, setMediaTypes] = useState<MediaTypes>(initialMediaTypes);
  const [pageSize, setPageSize] = useState<string>("10");
  const mediaList = Object.keys(initialMediaTypes) as (keyof MediaTypes)[];
  const [hasPageSizeError, setHasPageSizeError] = useState<boolean>(false);
  // handlers
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mediaType = getMediaType(mediaTypes);
    onSubmit(q, mediaType, pageSize);
  };
  const handlePageSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const zeroTo100 = /^(?:[1-9]?\d|100)?$/;
    // const oneTo100 = /^(?:[1-9]|[1-9][0-9]|100)?$/;
    if (zeroTo100.test(value)) {
      setPageSize(value);
      setHasPageSizeError(false);
    } else {
      setPageSize("");
      setHasPageSizeError(true);
    }
  };
  const handleMediaTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setMediaTypes((prev) => ({
      ...prev,
      [value as keyof MediaTypes]: checked,
    }));
  };
  // JSX
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Search query"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. Apollo 11"
            variant="outlined"
            fullWidth
          />
        </div>
        <FormControl
          sx={{ m: 3, margin: 0 }}
          component="fieldset"
          variant="standard"
        >
          <FormLabel component="legend">Select media types</FormLabel>
          <FormGroup sx={{ flexDirection: "row" }}>
            {mediaList.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={mediaTypes[option as keyof MediaTypes]}
                    onChange={handleMediaTypeChange}
                    value={option}
                    name="mediaType"
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
          <FormHelperText>
            Heads up, unchecking all media types will return 0 results
          </FormHelperText>
        </FormControl>
        <div>
          <TextField
            label="Results per page"
            value={pageSize}
            onChange={handlePageSizeChange}
            required
            variant="outlined"
            error={hasPageSizeError}
          />
          {hasPageSizeError && (
            <FormHelperText error>
              The results per page must be a number (1 - 100).
            </FormHelperText>
          )}
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Search;

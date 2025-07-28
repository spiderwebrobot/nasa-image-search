import { useState } from "react";
import type { FC } from "react";
import type { Item } from "../types/nasa-api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Overlay from "./Overlay";
// import Box from '@mui/material/Box';
// import { visuallyHidden } from '@mui/utils';
// usage: <Box component="span" sx={visuallyHidden}>hidden text</Box>

interface ResultsProps {
  items: Item[];
  totalHits: number;
  isLoading: boolean;
}

const Results: FC<ResultsProps> = ({ items, totalHits, isLoading }) => {
  // states
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  // handlers
  const handleClose = () => {
    setOpen(false);
    // NOTE: no need to reset selectedItem here
    // as the Overlay component handles it
    // setSelectedItem(null);
  };
  // component context
  const hasItems = items && items.length > 0;
  // JSX is loading
  if (isLoading) {
    return (
      <div className="results">
        <Typography variant="h3" component="h2" gutterBottom>
          Loading results...
        </Typography>
      </div>
    );
  }
  // JSX no items
  if (!hasItems) {
    return (
      <div className="results">
        <Typography variant="h3" component="h2" gutterBottom>
          No search results
        </Typography>
        <Typography variant="body1" component="p">
          Please enter a search term, or adjust your filters.
        </Typography>
      </div>
    );
  }
  // JSX success
  return (
    <div className="results">
      <Typography variant="h3" component="h2" gutterBottom>
        {totalHits.toLocaleString("en-US")} search results
      </Typography>
      <TableContainer>
        <Table aria-labelledby="tableTitle" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Media</TableCell>
              <TableCell align="right">Preview</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const key = item.data[0]?.nasa_id || item.href;
              const title = item.data[0]?.title || "No title";
              const mediaType = item.data[0]?.media_type || "unknown";
              const preview = item?.links?.find(({ rel }) => rel === "preview");
              return (
                <TableRow
                  hover
                  onClick={() => {
                    setSelectedItem(item);
                    setOpen(true);
                  }}
                  tabIndex={-1}
                  key={key}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell component="th" scope="row">
                    {title}
                  </TableCell>
                  <TableCell align="right">{mediaType}</TableCell>
                  <TableCell align="right">
                    {preview ? (
                      <div>
                        <img
                          src={preview.href}
                          alt={title}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </div>
                    ) : (
                      <span>No preview available</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Overlay open={open} selectedItem={selectedItem} onClose={handleClose} />
    </div>
  );
};

export default Results;

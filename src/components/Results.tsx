import type { FC } from "react";
import type { Item } from "../types/nasa-api";
// import Box from '@mui/material/Box';
// import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from '@mui/material/TablePagination';
import TableRow from "@mui/material/TableRow";
// import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from "@mui/material/Typography";
// import { visuallyHidden } from '@mui/utils';
// import Media from "./Media";

// <Box component="span" sx={visuallyHidden}>hidden text</Box>

const Results: FC<{ items: Item[] }> = ({ items }) => {
  const hasItems = items && items.length > 0;
  // JSX no items
  if (!hasItems) {
    return (
      <div className="results">
        <Typography variant="h3" component="h2" gutterBottom>
          No search results
        </Typography>
        <p>Please try again.</p>
      </div>
    );
  }
  // JSX
  return (
    <div className="results">
      <Typography variant="h3" component="h2" gutterBottom>
        Search Results
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
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
                  onClick={() => console.log("Row clicked", key)}
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
    </div>
  );
};

export default Results;

import type { FC } from "react";
import type { Item } from "../types/nasa-api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export interface OverlayProps {
  open: boolean;
  selectedItem: Item | null;
  onClose: () => void;
}

const Overlay: FC<OverlayProps> = ({ onClose, selectedItem, open }) => {
  // component context
  const title = selectedItem?.data[0]?.title || "No title";
  const description = selectedItem?.data[0]?.description;
  const largeSrc = selectedItem?.links?.find(({ rel, href }) => {
    return rel === "alternate" && href.includes("large.jpg");
  });
  const originalSrc = selectedItem?.links?.find(
    ({ rel }) => rel === "canonical"
  );
  // JSX
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <figure className="overlay-figure">
          <div>
            <img
              className="overlay-image"
              src={largeSrc?.href || originalSrc?.href}
              alt={title}
            />
          </div>
          <figcaption>
            <Typography variant="body1" component="p">
              {description}
            </Typography>
          </figcaption>
        </figure>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Overlay;

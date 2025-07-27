import type { FC } from "react";
import type { Item } from "../types/nasa-api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export interface OverlayProps {
  open: boolean;
  selectedItem: Item | null;
  onClose: () => void;
}

const Overlay: FC<OverlayProps> = ({ onClose, selectedItem, open }) => {
  // handlers
  const handleClose = () => {
    console.log("close overlay");
  };
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
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <figure>
          <div>
            <img
              src={largeSrc?.href || originalSrc?.href}
              alt={title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <figcaption>{description}</figcaption>
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

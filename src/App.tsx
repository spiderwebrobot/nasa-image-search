import Typography from "@mui/material/Typography";
import SearchResults from "./components/SearchResults";

const App: React.FC = () => {
  // JSX
  return (
    <>
      <Typography variant="h1" component="h1" gutterBottom>
        NASA image search
      </Typography>
      <SearchResults />
    </>
  );
};

export default App;

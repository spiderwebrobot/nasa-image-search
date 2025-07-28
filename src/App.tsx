import HelloWorld from "./components/HelloWorld";
import Typography from "@mui/material/Typography";
// import "./App.css";

const App: React.FC = () => {
  // JSX
  return (
    <>
      <Typography variant="h1" component="h1" gutterBottom>
        NASA image search
      </Typography>
      <HelloWorld />
    </>
  );
};

export default App;

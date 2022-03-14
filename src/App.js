/* eslint-disable no-restricted-globals */
import {
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCounter = async () => {
      const { data } = await axios.get(
        "https://translation-counter-default-rtdb.europe-west1.firebasedatabase.app/counter.json"
      );
      setCount(data.total);
    };
    fetchCounter();
  }, []);

  const increaseCounter = async (value) => {
    const { data } = await axios.patch(
      "https://translation-counter-default-rtdb.europe-west1.firebasedatabase.app/counter.json",
      { total: count + value },
      { headers: { "Content-Type": "application/json" } }
    );
    setCount(data.total);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Stack direction="row">
          <Typography style={{ padding: "100px 0 100px 100px", fontSize: "200px" }}>
            {count ?? <CircularProgress />}
          </Typography>
          <IconButton onClick={() => location.reload()} style={{height: "fit-content"}} ><RefreshIcon /></IconButton>
        </Stack>
        <ButtonGroup>
          <Button
            onClick={() => increaseCounter(1)}
            style={{
              fontSize: "30px",
              color: "#005a6e",
              backgroundColor: "#fec30e",
            }}
          >
            Small (+1)
          </Button>
          <Button
            onClick={() => increaseCounter(3)}
            style={{
              fontSize: "30px",
              color: "#005a6e",
              backgroundColor: "#fec30e",
            }}
          >
            Medium (+3)
          </Button>
          <Button
            onClick={() => increaseCounter(5)}
            style={{
              fontSize: "30px",
              color: "#005a6e",
              backgroundColor: "#fec30e",
            }}
          >
            Large (+5)
          </Button>
        </ButtonGroup>
      </header>
    </div>
  );
}

export default App;

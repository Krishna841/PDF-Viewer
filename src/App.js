import "./App.css";
import Home from "./components/home";

function App() {
  return (
    <div
      className="App"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <Home />
    </div>
  );
}

export default App;

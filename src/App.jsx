import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CardView from "./pages/CardView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:builderId" element={<CardView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
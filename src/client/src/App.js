import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRenderer from "./components/PageRenderer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<PageRenderer />} />
      </Routes>
    </Router>
  );
}

export default App;

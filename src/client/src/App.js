import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRenderer from "./components/PageRenderer";
import MarkdownNavigator from "./components/MarkdownNavigator";
function App() {
  return (
    <div className="p-9">
      <Router>
        <MarkdownNavigator />
        <Routes>
          <Route path="*" element={<PageRenderer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

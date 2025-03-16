import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRenderer from "./components/PageRenderer";
import MarkdownNavigator from "./components/MarkdownNavigator";
import CreateDirectory from "./components/CreateDirectory";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [refreshFetching, setRefreshFetching] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="p-9">
      <CreateDirectory
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        setRefreshFetching={setRefreshFetching}
      />
      <Router>
        <MarkdownNavigator
          openModal={openModal}
          setRefreshFetching={setRefreshFetching}
          refreshFetching={refreshFetching}
        />
        <Routes>
          <Route path="*" element={<PageRenderer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

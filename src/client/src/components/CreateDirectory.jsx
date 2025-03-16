import { useState } from "react";
import Modal from "react-modal";
import { API_URL } from "../utils";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CreateDirectory = ({ modalIsOpen, closeModal, setRefreshFetching }) => {
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name !== "index.md") {
      alert("Please upload a the .md file with index as the name");
      e.target.value = null;
    } else if (selectedFile && selectedFile.type === "text/markdown") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid .md file");
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slug || !file) return alert("Please provide both a slug and a file.");

    setLoading(true);

    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload");

      alert("Upload successful!");
      setRefreshFetching();
      closeModal();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Generate Directory Modal"
    >
      <h2>Generate New Directory</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Slug: (e.g. /directory-name)
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Enter directory slug"
            required
            className="mb-5"
          />
        </label>
        <label>
          Upload Markdown File:
          <input
            type="file"
            accept=".md"
            onChange={handleFileChange}
            required
          />
        </label>
        <button type="submit" className="my-5">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </Modal>
  );
};

export default CreateDirectory;

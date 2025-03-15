import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { marked } from "marked";

function PageRenderer() {
  const [content, setContent] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetch(`http://localhost:3000${location.pathname}`)
      .then((res) => res.text())
      .then((data) => setContent(data));
  }, [location]);

  return <div dangerouslySetInnerHTML={{ __html: marked(content) }} />;
}

export default PageRenderer;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import rehypeRaw from "rehype-raw";

import ReactMarkdown from "react-markdown";

function PageRenderer() {
  const [content, setContent] = useState("");
  const location = useLocation();
  useEffect(() => {
    fetch(
      `https://bee-api-markdown-rvo6c.ondigitalocean.app${location.pathname.replace(
        "/review",
        ""
      )}`
    )
      .then((res) => res.text())
      .then((data) => setContent(data));
  }, [location]);

  return (
    <div className="p-5 w-[80%] max-w-full my-10">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  );
}

export default PageRenderer;

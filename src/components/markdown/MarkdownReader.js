import { useState, useEffect } from "react";
import { marked } from "marked";
import Container from "react-bootstrap/Container";

const MarkdownReader = ({ markdownContent }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(markdownContent)
      .then((response) => response.text())
      .then((text) => setContent(marked(text)));
  }, []);

  return <Container dangerouslySetInnerHTML={{ __html: content }} />;
}

export default MarkdownReader;
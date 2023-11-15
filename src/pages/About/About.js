import React, { useState, useEffect } from "react";
import { marked } from "marked";
import aboutContent from "./about.md";

const About = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(aboutContent)
      .then((response) => response.text())
      .then((text) => setContent(marked(text)));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default About;

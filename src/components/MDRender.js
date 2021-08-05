import React, { useEffect, useState } from "react";
import CodeBlock from "./CodeBlock";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

// TODO: Add syntax highlighting to the Markdown Renderer: https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada
const MDRender = (props) => {
  const [pageMarkdown, setPageMarkdown] = useState("");
  const file = props.file || null;

  useEffect(() => {
    if (file) {
      const md = require(`./../documentation/${file}`);

      fetch(md.default)
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          setPageMarkdown(text);
        });
    }
  }, []);
  return (
    <ReactMarkdown
      plugins={[gfm]} // Used to handle tables.
      children={pageMarkdown}
      renderers={{ code: CodeBlock }}
    />
  );
};

export default MDRender;

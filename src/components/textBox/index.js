import { highlight, languages } from "prismjs";
import React from "react";
import Editor from "react-simple-code-editor";

function TextBox(props) {
  const { text, onTextChange, title } = props;

  return (
    <div className="w-full bg-black-transparent p-5">
      <h2 className="border-b border-white pb-4 font-inter">{title}</h2>
      <Editor
        value={text}
        onValueChange={onTextChange}
        highlight={(code) => highlight(code, languages.js)}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          height: "62.5vh",
          overflow: "auto",
          marginTop: "20px",
          borderRadius: "4px",
        }}
      />
    </div>
  );
}

export default TextBox;

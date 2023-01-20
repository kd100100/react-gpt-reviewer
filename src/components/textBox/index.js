import React from "react";
import detect from "lang-detector";
import CodeEditor from "@uiw/react-textarea-code-editor";
import languageMap from "./languageMap";

function TextBox(props) {
  const { text, onTextChange, title, readOnly, language, onLanguageChange } =
    props;

  const handleChange = (event) => {
    onTextChange(event.target.value);
    if (!readOnly) onLanguageChange(detect(event.target.value));
  };

  return (
    <div className="w-full bg-black-transparent p-5">
      <h2 className="border-b border-white pb-4 font-inter mb-4">{title}</h2>
      <div className="overflow-auto h-[65vh] w-full">
        <CodeEditor
          readOnly={readOnly}
          value={text}
          language={languageMap[language]}
          placeholder=""
          onChange={handleChange}
          style={{
            minHeight: "65vh",
            fontSize: 14,
            backgroundColor: "transparent",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </div>
    </div>
  );
}

export default TextBox;

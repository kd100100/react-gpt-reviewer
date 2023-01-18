import React from "react";
import AceEditor from "react-ace";

function TextBox(props) {
  const { text, onTextChange, title } = props;

  return (
    <div className="w-full bg-black-transparent p-5">
      <h2 className="border-b border-white pb-4 font-inter m">{title}</h2>
      <AceEditor
        mode="javascript"
        theme="terminal"
        onChange={onTextChange}
        value={text}
        name={title}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        style={{
          height: "65vh",
          overflow: "auto",
          marginTop: "20px",
          width: "100%",
        }}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}

export default TextBox;

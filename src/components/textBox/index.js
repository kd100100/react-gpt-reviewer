import React, { useEffect, useState } from "react";
import detect from "lang-detector";
import CodeEditor from "@uiw/react-textarea-code-editor";
import languageMap from "./languageMap";
import ClipboardIcon from "../../assets/images/clipboard.svg";

function TextBox(props) {
  const { text, onTextChange, title, readOnly, language, onLanguageChange } =
    props;

  const [copied, setCopied] = useState(false);

  const handleChange = (event) => {
    onTextChange(event.target.value);
    if (!readOnly) onLanguageChange(detect(event.target.value));
  };

  const handlePaste = async () => {
    const pasteText = await navigator.clipboard.readText();
    onTextChange(pasteText);
    if (!readOnly) onLanguageChange(detect(pasteText));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  useEffect(() => {
    setCopied(false);
  }, [text]);

  return (
    <div className="w-full bg-black-transparent p-5 relative">
      {!readOnly && text === "" && (
        <button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-16 py-4 rounded-lg flex items-center gap-1 flex-col hover:bg-black-transparent opacity-75 z-10 transition-all duration-300 border-mist-gray border text-sm animate-pulse"
          onClick={handlePaste}
        >
          <img src={ClipboardIcon} alt="clipboard icon" className="w-8" /> Paste
        </button>
      )}
      <div className="flex justify-between w-full border-b border-white pb-4 mb-4 relative">
        <h2 className="font-inter">{title}</h2>
        {readOnly && text !== "" && (
          <button
            className="bg-black-transparent px-4 py-1 rounded absolute -top-1 right-0"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
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

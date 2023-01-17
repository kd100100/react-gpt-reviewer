import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";

const TestOptions = {
  FunctionalTest: "functionalTest",
  UnitTest: "unitTest",
};

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

function TestWriter() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [testOption, setTestOption] = useState(TestOptions.FunctionalTest);

  const removeEmptyLinesAtStart = (text) => {
    if (text.startsWith("\n")) {
      return removeEmptyLinesAtStart(text.slice(2));
    }

    return text;
  };

  const generate = async () => {
    try {
      // const prompt = `write functional test code for the following function \n ${inputCode}.`;
      const prompt = `write unit test code for the following function \n ${inputCode}.`;
      // const prompt = `Check for application security threats \n ${inputCode}.`;
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 1024,
      });
      const response = removeEmptyLinesAtStart(completion.data.choices[0].text);
      setOutputCode(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center py-6 font-inter">
        <div className="flex items-center">
          <h2 className="font-semibold text-lg mr-6">Type of Test:</h2>
          <button
            type="button"
            className={`mr-4 transition-all duration-500 pb-1 -mb-1.5 border-b-2 border-wave-blue ${
              testOption === TestOptions.FunctionalTest && "optionSelected"
            }`}
            onClick={() => setTestOption(TestOptions.FunctionalTest)}
          >
            Functional Test
          </button>
          <button
            type="button"
            className={`mr-4 transition-all duration-500 pb-1 -mb-1.5 border-b-2 border-wave-blue ${
              testOption === TestOptions.UnitTest && "optionSelected"
            }`}
            onClick={() => setTestOption(TestOptions.UnitTest)}
          >
            Unit Test
          </button>
        </div>
        <button
          type="button"
          className="rounded-full bg-flamingo-pink px-5 py-2"
          onClick={generate}
        >
          Generate
        </button>
      </div>
      <div className="flex justify-between items-center pt-1 gap-4">
        <div className="w-full bg-black-transparent p-5">
          <h2 className="border-b border-white pb-4 font-inter">
            Code for test
          </h2>
          <Editor
            value={inputCode}
            onValueChange={(code) => setInputCode(code)}
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
        <div className="w-full bg-black-transparent p-5">
          <h2 className="border-b border-white pb-4 font-inter">
            Generated Tests
          </h2>
          <Editor
            value={outputCode}
            onValueChange={() => {}}
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
      </div>
    </div>
  );
}

export default TestWriter;

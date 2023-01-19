import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import TextBox from "../../components/textBox";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

function CodeWriter() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");

  const removeEmptyLinesAtStart = (text) => {
    if (text.startsWith("\n")) {
      return removeEmptyLinesAtStart(text.slice(2));
    }

    return text;
  };

  const generate = async () => {
    try {
      const prompt = `Write code that implements the below unit test codes. Do not write tests, give me only the code that implements the tests \n ${inputCode}.`;

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
          <h2 className="font-semibold text-lg mr-6">Get code from tests</h2>
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
        <TextBox
          text={inputCode}
          onTextChange={(code) => setInputCode(code)}
          title="Tests for writing code"
        />
        <TextBox
          text={outputCode}
          onTextChange={() => {}}
          title="Generated Code"
        />
      </div>
    </div>
  );
}

export default CodeWriter;

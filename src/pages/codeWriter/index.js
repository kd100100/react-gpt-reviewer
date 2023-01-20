import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import TextBox from "../../components/textBox";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

function CodeWriter() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(null);

  const removeEmptyLinesAtStart = (text) => {
    if (text.startsWith("\n")) {
      return removeEmptyLinesAtStart(text.slice(2));
    }

    return text;
  };

  const generate = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div class="w-24 h-24 border-l-2 border-white border-opacity-75 rounded-full animate-spin"></div>
        </div>
      )}
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
          readOnly={false}
          language={language}
          onLanguageChange={(language) => setLanguage(language)}
        />
        <TextBox
          text={outputCode}
          onTextChange={() => {}}
          title="Generated Code"
          readOnly={true}
          language={language}
        />
      </div>
    </div>
  );
}

export default CodeWriter;

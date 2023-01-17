import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import "./App.css";
import Highlight from "react-highlight";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

function App() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [promptOptions, setPromptOptions] = useState({
    functionalTest: false,
    unitTest: false,
    staticSecurity: false,
  });

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
      const response = completion.data.choices[0].text;

      setOutputCode(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-wave-blue container mx-auto">
      <div className="flex justify-center gap-3 items-center my-5">
        <div>
          <input
            type="radio"
            name="prompt-options"
            id="functional-test"
            className="mr-2 w-4 h-4"
          />
          <label htmlFor="functional-test">Write functional tests</label>
        </div>
        <div>
          <input
            type="radio"
            name="prompt-options"
            id="unit-test"
            className="mr-2 w-4 h-4"
          />
          <label htmlFor="unit-test">Write unit tests</label>
        </div>
        <div>
          <input
            type="radio"
            name="prompt-options"
            id="security-treats"
            className="mr-2 w-4 h-4"
          />
          <label htmlFor="security-treats">Check Static Security Treats</label>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-flamingo-pink rounded"
          onClick={generate}
        >
          Generate
        </button>
      </div>

      <div className="flex w-full gap-3">
        <div className="w-1/2">
          <textarea
            className="h-[70vh] w-full bg-black-transparent p-5  outline-none"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          ></textarea>
        </div>
        <div className="w-1/2">
          <div className="h-[70vh] w-full bg-black-transparent p-5 overflow-scroll">
            <Highlight className="w-full" language="auto">
              {outputCode}
            </Highlight>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

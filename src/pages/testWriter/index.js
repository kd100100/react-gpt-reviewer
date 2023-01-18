import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import TextBox from "../../components/textBox";

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
    if (text.startsWith(" ")) {
      return removeEmptyLinesAtStart(text.slice(1));
    }
    if (text.startsWith("\n")) {
      return removeEmptyLinesAtStart(text.slice(2));
    }

    return text;
  };

  const generate = async () => {
    try {
      const functionalTestPrompt = `write functional test scenarios that needs to be tested 
                    for the following function \n ${inputCode} \n. 
                    Also, mention which scenario can be tagged as a smoke test. 
                    Lastly write the full test code for all the scenarios 
                    in the format \n Scenario: \n Test code: \n.`;
      const unitTestPrompt = `write unit test code for the following function \n ${inputCode} \n in the format \n Scenario: \n Test code: \n.`;
      const prompt =
        testOption === TestOptions.FunctionalTest
          ? functionalTestPrompt
          : unitTestPrompt;

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
        <TextBox
          text={inputCode}
          onTextChange={(e) => setInputCode(e)}
          title="Code for testing"
        />
        <TextBox
          text={outputCode}
          onTextChange={() => {}}
          title="Generated Tests"
        />
      </div>
    </div>
  );
}

export default TestWriter;

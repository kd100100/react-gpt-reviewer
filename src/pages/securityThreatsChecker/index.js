import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import TextBox from "../../components/textBox";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

function SecurityThreatsChecker() {
  const [inputCode, setInputCode] = useState("");
  const [outputThreats, setOutputThreats] = useState("");

  const removeEmptyLinesAtStart = (text) => {
    if (text.startsWith("\n")) {
      return removeEmptyLinesAtStart(text.slice(2));
    }

    return text;
  };

  const generate = async () => {
    try {
      const prompt = `Check for application security threats \n ${inputCode}. \n 
      Also, explain which line of code has problem and how to fix it 
      using the following format \n Line number: \n Problem: \n Solution: \n. 
      In the solution, provide actual code to fix, in the format \n Proable code: \n.
      Also, mention the name of the security threat and 
      the severity of the threat.`;

      const openai = new OpenAIApi(configuration);
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 1024,
      });
      const response = removeEmptyLinesAtStart(completion.data.choices[0].text);
      setOutputThreats(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center py-6 font-inter">
        <div className="flex items-center">
          <h2 className="font-semibold text-lg mr-6">
            Application Security Threats Review
          </h2>
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
          title="Code for checking threats"
        />
        <TextBox
          text={outputThreats}
          onTextChange={() => {}}
          title="Generated Security Threats"
        />
      </div>
    </div>
  );
}

export default SecurityThreatsChecker;

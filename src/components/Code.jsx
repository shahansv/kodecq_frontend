import { userDataContext } from "../context/UserDataContext";
import React, { useContext } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015, xcode } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Code = ({ sourceCode, language, showLineNumbers = true }) => {
  const { theme } = useContext(userDataContext);

  return (
    <SyntaxHighlighter
      showLineNumbers={showLineNumbers}
      language={language}
      customStyle={{
        borderRadius: "5px",
        padding: "10px",
      }}
      style={theme === "dark" ? vs2015 : xcode}
    >
      {sourceCode}
    </SyntaxHighlighter>
  );
};

export default Code;

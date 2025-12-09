import React, { useEffect, useRef, useState } from "react";
import JavaScript from "../../assets/JavaScript.svg";
import { X } from "lucide-react";

const HEADER_LINES = ["/* demo programs */", ""];

const PROGRAMS = [
  {
    title: "Add two numbers",
    lines: [
      "function add(a, b) {",
      "  return a + b;",
      "}",
      "",
      "const result = add(7, 5);",
      "console.log('add:', result);",
    ],
  },
  {
    title: "Multiply two numbers",
    lines: [
      "function multiply(a, b) {",
      "  return a * b;",
      "}",
      "",
      "const result = multiply(6, 9);",
      "console.log('multiply:', result);",
    ],
  },
  {
    title: "Greet the user",
    lines: [
      "function greet(name) {",
      "  if (!name) return 'Hello, friend!';",
      "  return `Hello, ${name}! Nice to meet you.`;",
      "}",
      "",
      "console.log(greet('Shahan'));",
    ],
  },
  {
    title: "Is even?",
    lines: [
      "function isEven(n) {",
      "  return n % 2 === 0;",
      "}",
      "",
      "console.log('isEven(4):', isEven(4));",
    ],
  },
  {
    title: "Simple factorial",
    lines: [
      "function factorial(n) {",
      "  let r = 1;",
      "  for (let i = 2; i <= n; i++) r *= i;",
      "  return r;",
      "}",
      "",
      "console.log('factorial(5):', factorial(5));",
    ],
  },
];

const VS_COLORS = {
  background: "#1e1e1e",
  text: "#d4d4d4",
  comment: "#6A9955",
  keyword: "#569CD6",
  string: "#CE9178",
  number: "#B5CEA8",
  "function-name": "#DCDCAA",
  "variable-decl": "#9CDCFE",
  identifier: "#9CDCFE",
  operator: "#d4d4d4",
  punctuation: "#d4d4d4",
};

function tokenizeLine(line) {
  const tokens = [];
  let i = 0;
  const len = line.length;
  const push = (type, value) => tokens.push({ type, value });
  while (i < len) {
    const rest = line.slice(i);
    if (rest.startsWith("//") || rest.startsWith("/*")) {
      push("comment", rest);
      break;
    }
    const bk = rest.match(/^`(?:\\.|[^`])*`/);
    if (bk) {
      push("string", bk[0]);
      i += bk[0].length;
      continue;
    }
    const dq = rest.match(/^"(?:\\.|[^"])*"/);
    if (dq) {
      push("string", dq[0]);
      i += dq[0].length;
      continue;
    }
    const sq = rest.match(/^'(?:\\.|[^'])*'/);
    if (sq) {
      push("string", sq[0]);
      i += sq[0].length;
      continue;
    }
    const numMatch = rest.match(/^\b\d+(?:\.\d+)?\b/);
    if (numMatch) {
      push("number", numMatch[0]);
      i += numMatch[0].length;
      continue;
    }
    const idMatch = rest.match(/^[_$A-Za-z][_$A-Za-z0-9]*/);
    if (idMatch) {
      const val = idMatch[0];
      const keywords = new Set([
        "break",
        "case",
        "catch",
        "class",
        "const",
        "continue",
        "debugger",
        "default",
        "delete",
        "do",
        "else",
        "export",
        "extends",
        "finally",
        "for",
        "function",
        "if",
        "import",
        "in",
        "instanceof",
        "let",
        "new",
        "return",
        "super",
        "switch",
        "this",
        "throw",
        "try",
        "typeof",
        "var",
        "void",
        "while",
        "with",
        "yield",
        "await",
        "true",
        "false",
        "null",
        "undefined",
      ]);
      if (keywords.has(val)) push("keyword", val);
      else push("identifier", val);
      i += val.length;
      continue;
    }
    const wsMatch = rest.match(/^\s+/);
    if (wsMatch) {
      push("whitespace", wsMatch[0]);
      i += wsMatch[0].length;
      continue;
    }
    const two = rest.slice(0, 2);
    const twoOps = new Set([
      "==",
      "!=",
      "<=",
      ">=",
      "=>",
      "&&",
      "||",
      "++",
      "--",
      "**",
      "<<",
      ">>",
    ]);
    if (twoOps.has(two)) {
      push("operator", two);
      i += 2;
      continue;
    }
    const ch = rest[0];
    const punct = ",;:.(){}[]+-/*%<>=";
    if (punct.includes(ch)) {
      push("punctuation", ch);
      i += 1;
      continue;
    }
    push("operator", ch);
    i += 1;
  }
  for (let t = 0; t < tokens.length; t++) {
    const tok = tokens[t];
    if (tok.type === "keyword" && tok.value === "function") {
      let j = t + 1;
      while (j < tokens.length && tokens[j].type === "whitespace") j++;
      if (j < tokens.length && tokens[j].type === "identifier")
        tokens[j].type = "function-name";
    }
    if (
      tok.type === "keyword" &&
      (tok.value === "const" || tok.value === "let" || tok.value === "var")
    ) {
      let j = t + 1;
      while (j < tokens.length && tokens[j].type === "whitespace") j++;
      if (j < tokens.length && tokens[j].type === "identifier")
        tokens[j].type = "variable-decl";
    }
  }
  return tokens;
}

export default function AutoIDE({
  loopInterval = 1000,
  typeSpeedMin = 20,
  typeSpeedMax = 80,
  deleteSpeedMin = 12,
  deleteSpeedMax = 50,
  pauseAfterType = 900,
  pauseAfterDelete = 200,
}) {
  const [codeContent, setCodeContent] = useState(
    [...HEADER_LINES, ...PROGRAMS[0].lines].join("\n")
  );
  const [cursorVisible, setCursorVisible] = useState(true);
  const displayRef = useRef(PROGRAMS[0].lines.join("\n"));
  const programIndexRef = useRef(0);
  const runningRef = useRef(true);
  const timeoutRef = useRef(null);
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const typeDelay = () => rand(typeSpeedMin, typeSpeedMax);
  const deleteDelay = () => rand(deleteSpeedMin, deleteSpeedMax);

  const updateEditor = (programText) => {
    const programLines = programText.split("\n");
    setCodeContent([...HEADER_LINES, ...programLines].join("\n"));
  };

  useEffect(() => {
    runningRef.current = true;
    const clearTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const typeToTarget = (target, cb) => {
      const step = () => {
        if (!runningRef.current) return;
        const current = displayRef.current;
        if (current.length >= target.length) {
          updateEditor(displayRef.current);
          cb && cb();
          return;
        }
        displayRef.current = current + target[current.length];
        updateEditor(displayRef.current);
        timeoutRef.current = setTimeout(step, typeDelay());
      };
      step();
    };

    const deleteToEmpty = (cb) => {
      const step = () => {
        if (!runningRef.current) return;
        if (displayRef.current.length === 0) {
          updateEditor(displayRef.current);
          cb && cb();
          return;
        }
        displayRef.current = displayRef.current.slice(0, -1);
        updateEditor(displayRef.current);
        timeoutRef.current = setTimeout(step, deleteDelay());
      };
      step();
    };

    const loop = () => {
      if (!runningRef.current) return;
      const program = PROGRAMS[programIndexRef.current];
      const target = program.lines.join("\n");
      typeToTarget(target, () => {
        timeoutRef.current = setTimeout(() => {
          deleteToEmpty(() => {
            timeoutRef.current = setTimeout(() => {
              programIndexRef.current =
                (programIndexRef.current + 1) % PROGRAMS.length;
              timeoutRef.current = setTimeout(loop, loopInterval);
            }, pauseAfterDelete);
          });
        }, pauseAfterType);
      });
    };

    timeoutRef.current = setTimeout(loop, 200);

    return () => {
      runningRef.current = false;
      clearTimer();
    };
  }, [
    loopInterval,
    typeSpeedMin,
    typeSpeedMax,
    deleteSpeedMin,
    deleteSpeedMax,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    updateEditor(displayRef.current);
  }, []);

  const lines = codeContent.split("\n");
  const lineCount = lines.length;

  const currentProgram = PROGRAMS[programIndexRef.current];
  const animatedLineIndex =
    HEADER_LINES.length + currentProgram.lines.length - 1;

  return (
    <div
      style={{ background: VS_COLORS.background }}
      className="text-white border border-[#333] rounded-lg shadow-lg max-w-4xl mx-auto my-8 overflow-hidden font-mono text-sm w-11/12"
    >
      <div
        style={{ background: "#2d2d2d", borderBottom: "1px solid #333" }}
        className="flex items-center p-2"
      >
        <div className="flex space-x-2">
          <span
            style={{
              width: 12,
              height: 12,
              background: "#FF5F56",
              borderRadius: 6,
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              background: "#FFBD2E",
              borderRadius: 6,
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              background: "#27C93F",
              borderRadius: 6,
              display: "inline-block",
            }}
          />
        </div>
        <div
          style={{ color: "#CCCCCC" }}
          className="grow text-center text-xs select-none"
        >
          index.js
        </div>
      </div>

      <div
        style={{
          background: "rgba(37,37,38,0.6)",
          borderBottom: "1px solid #0E639C",
        }}
        className="flex"
      >
        <div
          style={{ background: VS_COLORS.background }}
          className="w-35 pl-3 pr-1 py-1.5 cursor-default text-white border-r border-gray-700  "
        >
          <span className="mr-1 flex items-center justify-between">
            <img
              src={JavaScript}
              alt="Javascript logo"
              className="h-3.5 mr-2 rounded-xs "
            />
            <h6> index.js</h6>
            <div className="ml-2 rounded-2xl bg-gray-700 h-4 w-4 flex items-center justify-center">
              <X className="h-3" />
            </div>
          </span>
        </div>
      </div>

      <div style={{ display: "flex", height: 340, overflowY: "auto" }}>
        <div
          style={{
            padding: "8px 12px",
            textAlign: "right",
            color: "#858585",
            background: VS_COLORS.background,
            userSelect: "none",
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <pre
          style={{
            flex: 1,
            padding: 12,
            overflowX: "hidden",
            whiteSpace: "pre-wrap",
            lineHeight: "1.45",
          }}
        >
          {lines.map((line, rowIndex) => {
            const tokens = tokenizeLine(line);
            return (
              <div key={rowIndex} style={{ display: "block" }}>
                {tokens.map((tok, i) => {
                  const style = {
                    color: VS_COLORS[tok.type] || VS_COLORS.text,
                  };
                  if (tok.type === "comment") style.fontStyle = "italic";
                  if (tok.type === "whitespace")
                    return <span key={i}>{tok.value}</span>;
                  return (
                    <span key={i} style={style}>
                      {tok.value}
                    </span>
                  );
                })}
                {rowIndex === animatedLineIndex && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: 16,
                      marginLeft: 6,
                      background: "#FFFFFF",
                      verticalAlign: "top",
                      opacity: cursorVisible ? 1 : 0,
                      transition: "opacity 120ms",
                    }}
                  />
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

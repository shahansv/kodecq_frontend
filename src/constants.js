export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  c: "10.2.0",
  cpp: "10.2.0",
  csharp: "5.0.201",
  go: "1.16.2",
  php: "8.2.3",
  rust: "1.68.2",
};

export const CODE_SNIPPETS = {
  javascript:
    '\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Kodecq");\n',

  typescript:
    '\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Kodecq" });\n',

  python:
    '\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Kodecq")\n',

  java: '\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, Kodecq!");\n\t}\n}\n',

  c: '\n#include <stdio.h>\n\nint main() {\n\tprintf("Hello, Kodecq!\\n");\n\treturn 0;\n}\n',

  cpp: '\n#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello, Kodecq!" << endl;\n\treturn 0;\n}\n',

  csharp:
    'using System;\n\nclass Program\n{\n\tstatic void Main()\n\t{\n\t\tConsole.WriteLine("Hello, Kodecq!");\n\t}\n}\n',

  go: '\npackage main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, Kodecq!")\n}\n',

  php: '<?php\n\n$name = "Kodecq";\necho "Hello, $name!";\n',

  rust: '\nfn main() {\n\tprintln!("Hello, Kodecq!");\n}\n',
};

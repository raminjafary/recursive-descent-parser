const assert = require("assert");
const { Parser } = require("../src/parser");

const tests = [
  require("./literal-test.js"),
  require("./statement-list.js"),
  require("./block-test.js"),
  require("./empty-statement-test.js"),
  require("./math-test.js"),
  require("./assignment-test.js"),
  require("./variable-test.js"),
  require("./if-test.js"),
  require("./relational-test.js"),
  require("./equality-test.js"),
  require("./logical-test.js"),
];

const parser = new Parser();

function exec() {
  const program = `
 
  x >= 5 && true;
`;
  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, undefined, 2));
}

// exec();

function test(program, expected) {
  const ast = parser.parse(program);
  assert.deepEqual(ast, expected);
}

tests.forEach((run) => run(test));

console.log("All assertions passed!");

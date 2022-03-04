const assert = require("assert");
const { Parser } = require("../src/parser");

const tests = [
  require("./literal-test.js"),
  require("./statement-list.js"),
  require("./block-test.js"),
  require("./empty-statement-test.js"),
  require("./math-test.js"),
  require("./assignment-test.js"),
];

const parser = new Parser();

function exec() {
  const program = `
  x = 42;
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

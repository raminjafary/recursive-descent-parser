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
];

const parser = new Parser();

function exec() {
  const program = `
  let x;

  let f,n;

  let g = 3;

  let y, z = 3;

  let foo = bar = 20;

  r = 10;
`;
  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, undefined, 2));
}

exec();

function test(program, expected) {
  const ast = parser.parse(program);
  assert.deepEqual(ast, expected);
}

tests.forEach((run) => run(test));

console.log("All assertions passed!");

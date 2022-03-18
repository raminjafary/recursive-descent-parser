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
  require("./unary-test.js"),
  require("./while-test.js"),
  require("./do-while-test.js"),
  require("./for-loop-test.js"),
  require("./function-declrataion-test.js"),
  require("./member-test.js"),
  require("./call-test.js"),
  require("./class-test.js"),
];

const parser = new Parser();

function exec() {
  const program = `
  
  class Point {
    def constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    def calc() {
      return this.x + this.y;
    }
  }

  class Point2D extends Point {
    def constructor(x, y, z) {
      super(x, y);
      this.z = z;
    } 

    def calc() {
      return super() + this.z;
    }
  }


  let p = new Point2D(10, 20, 30);
  p.calc();
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

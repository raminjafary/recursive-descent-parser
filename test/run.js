const assert = require('assert');
const { Parser } = require("../src/parser")

const tests = [
    require('./literal-test.js'),
    require('./statement-list.js'),
    require('./block-test.js')
]

const parser = new Parser()

function exec() {
    const program = `

    /**
     * multi comment
     * /
    42;

    'hello';

    // single line comment

    "hello";
`
    const ast = parser.parse(program)
    console.log(JSON.stringify(ast, undefined, 2));
}

function test(program, expected) {
    const ast = parser.parse(program)
    assert.deepEqual(ast, expected)
}

tests.forEach(run => run(test))

console.log('All assertions passed!')
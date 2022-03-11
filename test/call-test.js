module.exports = function (test) {
  test(`square(2);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "square",
          },
          arguments: [
            {
              type: "NumericLiteral",
              value: 2,
            },
          ],
        },
      },
    ],
  });

  test(`square()();  `, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "square",
            },
            arguments: [],
          },
          arguments: [],
        },
      },
    ],
  });
};

module.exports = function (test) {
  test(`x > 0 && y < 5;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "LogicalExpression",
          operator: "&&",
          left: {
            type: "BinaryExpression",
            operator: ">",
            left: {
              type: "Identifier",
              name: "x",
            },
            right: {
              type: "NumericLiteral",
              value: 0,
            },
          },
          right: {
            type: "BinaryExpression",
            operator: "<",
            left: {
              type: "Identifier",
              name: "y",
            },
            right: {
              type: "NumericLiteral",
              value: 5,
            },
          },
        },
      },
    ],
  });
};

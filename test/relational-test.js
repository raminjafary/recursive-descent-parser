module.exports = function (test) {
  test("x > 5;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: ">",
          left: {
            type: "Identifier",
            name: "x",
          },
          right: {
            type: "NumericLiteral",
            value: 5,
          },
        },
      },
    ],
  });
};

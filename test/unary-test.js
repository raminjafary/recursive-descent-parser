module.exports = function (test) {
  test("-x;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "-",
          argument: {
            type: "Identifier",
            name: "x",
          },
        },
      },
    ],
  });

  test("!x;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "!",
          argument: {
            type: "Identifier",
            name: "x",
          },
        },
      },
    ],
  });
};

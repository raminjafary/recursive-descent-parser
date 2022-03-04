module.exports = function (test) {
  test("2 + 2;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: {
            type: "NumericLiteral",
            value: 2,
          },
          right: {
            type: "NumericLiteral",
            value: 2,
          },
        },
      },
    ],
  });

  test("2 + 1 - 3;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "-",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: {
              type: "NumericLiteral",
              value: 2,
            },
            right: {
              type: "NumericLiteral",
              value: 1,
            },
          },
          right: {
            type: "NumericLiteral",
            value: 3,
          },
        },
      },
    ],
  });

  test("2 + 1 * 3;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          right: {
            type: "BinaryExpression",
            operator: "*",
            left: {
              type: "NumericLiteral",
              value: 1,
            },
            right: {
              type: "NumericLiteral",
              value: 3,
            },
          },
          left: {
            type: "NumericLiteral",
            value: 2,
          },
        },
      },
    ],
  });

  test("2 * 3 * 5;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "*",
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: {
              type: "NumericLiteral",
              value: 2,
            },
            right: {
              type: "NumericLiteral",
              value: 3,
            },
          },
          right: {
            type: "NumericLiteral",
            value: 5,
          },
        },
      },
    ],
  });

  test("(2 + 3) * 5;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "*",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: {
              type: "NumericLiteral",
              value: 2,
            },
            right: {
              type: "NumericLiteral",
              value: 3,
            },
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

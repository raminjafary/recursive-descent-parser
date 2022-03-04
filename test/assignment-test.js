module.exports = function (test) {
  test("x = 23;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: {
            type: "Identifier",
            name: "x",
          },
          right: {
            type: "NumericLiteral",
            value: 23,
          },
        },
      },
    ],
  });

  test("x = y = 23;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: {
            type: "Identifier",
            name: "x",
          },
          right: {
            type: "AssignmentExpression",
            operator: "=",
            left: {
              type: "Identifier",
              name: "y",
            },
            right: {
              type: "NumericLiteral",
              value: 23,
            },
          },
        },
      },
    ],
  });

  test("x += 23;", {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "+=",
          left: {
            type: "Identifier",
            name: "x",
          },
          right: {
            type: "NumericLiteral",
            value: 23,
          },
        },
      },
    ],
  });
};

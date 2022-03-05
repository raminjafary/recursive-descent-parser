module.exports = function (test) {
  test(
    `
        while(x > 23) {
            x -= 1;
        }
      `,
    {
      type: "Program",
      body: [
        {
          type: "WhileStatement",
          test: {
            type: "BinaryExpression",
            operator: ">",
            left: {
              type: "Identifier",
              name: "x",
            },
            right: {
              type: "NumericLiteral",
              value: 23,
            },
          },
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "AssignmentExpression",
                  operator: "-=",
                  left: {
                    type: "Identifier",
                    name: "x",
                  },
                  right: {
                    type: "NumericLiteral",
                    value: 1,
                  },
                },
              },
            ],
          },
        },
      ],
    }
  );
};

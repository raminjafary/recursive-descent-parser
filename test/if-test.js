module.exports = function (test) {
  test(`
    
    if(x) {
        x = 2;
    } else {
        x = 8;
    }

    `),
    {
      type: "Program",
      body: [
        {
          type: "IfStatement",
          test: {
            type: "Identifier",
            name: "x",
          },
          consequent: {
            type: "BlockStatement",
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
                    value: 2,
                  },
                },
              },
            ],
          },
          alternate: {
            type: "BlockStatement",
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
                    value: 8,
                  },
                },
              },
            ],
          },
        },
      ],
    };

  test(`
    
    if(x) {
        x = 2;
    }

    `),
    {
      type: "Program",
      body: [
        {
          type: "IfStatement",
          test: {
            type: "Identifier",
            name: "x",
          },
          consequent: {
            type: "BlockStatement",
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
                    value: 2,
                  },
                },
              },
            ],
          },
          alternate: null,
        },
      ],
    };
};

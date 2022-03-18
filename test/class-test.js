module.exports = function (test) {
  test(
    `
    class Point {
      def constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      def calc() {
        return this.x + this.y;
      }
    }
    `,
    {
      type: "Program",
      body: [
        {
          type: "ClassDeclaration",
          id: {
            type: "Identifier",
            name: "Point",
          },
          superClass: null,
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "FunctionDeclaration",
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                          type: "MemberExpression",
                          computed: false,
                          object: {
                            type: "ThisExpression",
                          },
                          property: {
                            type: "Identifier",
                            name: "x",
                          },
                        },
                        right: {
                          type: "Identifier",
                          name: "x",
                        },
                      },
                    },
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                          type: "MemberExpression",
                          computed: false,
                          object: {
                            type: "ThisExpression",
                          },
                          property: {
                            type: "Identifier",
                            name: "y",
                          },
                        },
                        right: {
                          type: "Identifier",
                          name: "y",
                        },
                      },
                    },
                  ],
                },
                params: [
                  {
                    type: "Identifier",
                    name: "x",
                  },
                  {
                    type: "Identifier",
                    name: "y",
                  },
                ],
                name: {
                  type: "Identifier",
                  name: "constructor",
                },
              },
              {
                type: "FunctionDeclaration",
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ReturnStatement",
                      argument: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                          type: "MemberExpression",
                          computed: false,
                          object: {
                            type: "ThisExpression",
                          },
                          property: {
                            type: "Identifier",
                            name: "x",
                          },
                        },
                        right: {
                          type: "MemberExpression",
                          computed: false,
                          object: {
                            type: "ThisExpression",
                          },
                          property: {
                            type: "Identifier",
                            name: "y",
                          },
                        },
                      },
                    },
                    {
                      type: "EmptyStatement",
                    },
                  ],
                },
                params: [],
                name: {
                  type: "Identifier",
                  name: "calc",
                },
              },
            ],
          },
        },
      ],
    }
  );

  test(
    `
      class Point2D extends Point {
        def constructor(x, y, z) {
          super(x, y);
          this.z = z;
        } 

        def calc() {
          return super() + this.z;
        }
      }
    `,
    {
      type: "Program",
      body: [
        {
          type: "ClassDeclaration",
          id: {
            type: "Identifier",
            name: "Point2D",
          },
          superClass: {
            type: "Identifier",
            name: "Point",
          },
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "FunctionDeclaration",
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "CallExpression",
                        callee: {
                          type: "Super",
                        },
                        arguments: [
                          {
                            type: "Identifier",
                            name: "x",
                          },
                          {
                            type: "Identifier",
                            name: "y",
                          },
                        ],
                      },
                    },
                    {
                      type: "ExpressionStatement",
                      expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                          type: "MemberExpression",
                          computed: false,
                          object: {
                            type: "ThisExpression",
                          },
                          property: {
                            type: "Identifier",
                            name: "z",
                          },
                        },
                        right: {
                          type: "Identifier",
                          name: "z",
                        },
                      },
                    },
                  ],
                },
                params: [
                  {
                    type: "Identifier",
                    name: "x",
                  },
                  {
                    type: "Identifier",
                    name: "y",
                  },
                  {
                    type: "Identifier",
                    name: "z",
                  },
                ],
                name: {
                  type: "Identifier",
                  name: "constructor",
                },
              },
              {
                type: "FunctionDeclaration",
                body: {
                  type: "BlockStatement",
                  body: [
                    {
                      type: "ReturnStatement",
                      argument: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                          type: "CallExpression",
                          callee: {
                            type: "Super",
                          },
                          arguments: [],
                        },
                        right: {
                          type: "MemberExpression",
                          computed: false,
                          object: {
                            type: "ThisExpression",
                          },
                          property: {
                            type: "Identifier",
                            name: "z",
                          },
                        },
                      },
                    },
                    {
                      type: "EmptyStatement",
                    },
                  ],
                },
                params: [],
                name: {
                  type: "Identifier",
                  name: "calc",
                },
              },
            ],
          },
        },
      ],
    }
  );

  test(
    `
    new Point2D(10, 20, 30);
    `,
    {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "NewExpression",
            callee: {
              type: "Identifier",
              name: "Point2D",
            },
            arguments: [
              {
                type: "NumericLiteral",
                value: 10,
              },
              {
                type: "NumericLiteral",
                value: 20,
              },
              {
                type: "NumericLiteral",
                value: 30,
              },
            ],
          },
        },
      ],
    }
  );
};

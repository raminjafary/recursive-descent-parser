module.exports = function (test) {
  test(
    `
    def square(x) {
        return x * x;
    }
    `,
    {
      type: "Program",
      body: [
        {
          type: "FunctionDeclaration",
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ReturnStatement",
                argument: {
                  type: "BinaryExpression",
                  operator: "*",
                  left: {
                    type: "Identifier",
                    name: "x",
                  },
                  right: {
                    type: "Identifier",
                    name: "x",
                  },
                },
              },
              {
                type: "EmptyStatement",
              },
            ],
          },
          params: [
            {
              type: "Identifier",
              name: "x",
            },
          ],
          name: {
            type: "Identifier",
            name: "square",
          },
        },
      ],
    }
  );
};

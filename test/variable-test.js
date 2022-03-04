module.exports = function (test) {
  test(`let x = 5;`, {
    type: "Program",
    body: [
      {
        type: "VariableStatement",
        declarations: [
          {
            type: "VariableDeclaration",
            id: {
              type: "Identifier",
              name: "x",
            },
            init: {
              type: "NumericLiteral",
              value: 5,
            },
          },
        ],
      },
    ],
  });

  test(`let y;`, {
    type: "Program",
    body: [
      {
        type: "VariableStatement",
        declarations: [
          {
            type: "VariableDeclaration",
            id: {
              type: "Identifier",
              name: "y",
            },
            init: null,
          },
        ],
      },
    ],
  });

  test(`let x, y = 10;`, {
    type: "Program",
    body: [
      {
        type: "VariableStatement",
        declarations: [
          {
            type: "VariableDeclaration",
            id: {
              type: "Identifier",
              name: "x",
            },
            init: null,
          },
          {
            type: "VariableDeclaration",
            id: {
              type: "Identifier",
              name: "y",
            },
            init: {
              type: "NumericLiteral",
              value: 10,
            },
          },
        ],
      },
    ],
  });
};

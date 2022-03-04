module.exports = function (test) {
  test(
    `
        42;

        'hello';

        "hello";
    `,
    {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "NumericLiteral",
            value: 42,
          },
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "StringLiteral",
            value: "hello",
          },
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "StringLiteral",
            value: "hello",
          },
        },
      ],
    }
  );

  test(
    `
        42;

        'hello';

        "hello";
    `,
    {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "NumericLiteral",
            value: 42,
          },
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "StringLiteral",
            value: "hello",
          },
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "StringLiteral",
            value: "hello",
          },
        },
      ],
    }
  );
};

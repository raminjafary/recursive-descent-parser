const { Tokenizer } = require("./tokenizer");
const { astNode } = require("./ast");
exports.Parser = class Parser {
  constructor() {
    this.input = "";
    this.tokenizer = new Tokenizer();
  }

  /**
   *  Parses a string into an AST.
   */
  parse(input) {
    this.input = input;
    this.tokenizer.init(input);

    // Prime the tokenizer to obtain the first
    // token which is our lookahead. The lookahead is
    // used for predictive parsing.
    this.lookahead = this.tokenizer.getNextToken();

    // Parses recursively starting from the main
    // entry point, the Program:
    return this.Program();
  }

  /**
   * Main entry point.
   *
   * Program
   * : StatementList
   * ;
   */
  Program() {
    return astNode.Program(this.StatementList());
  }

  /**
   * StatementList
   * : Statement
   * | StatementList Statement -> Statement Statement Statement
   * ;
   */
  StatementList(stopLookahead = null) {
    const statements = [this.Statement()];

    while (this.lookahead != null && this.lookahead.type !== stopLookahead) {
      statements.push(this.Statement());
    }

    return statements;
  }

  /**
   * Statement
   * : ExpressionStatement
   * | BlockStatement
   * | EmptyStatement
   * ;
   */
  Statement() {
    switch (this.lookahead.type) {
      case ";":
        return this.EmptyStatement();
      case "{":
        return this.BlockStatement();
      default:
        return this.ExpressionStatement();
    }
  }

  /**
   * EmptyStatement
   * : ";"
   * ;
   */
  EmptyStatement() {
    this.eat(";");
    return astNode.EmptyStatement();
  }

  /**
   * BlockStatement
   * : "{" OptStatementList "}"
   * ;
   */
  BlockStatement() {
    this.eat("{");
    const body = this.lookahead.type !== "}" ? this.StatementList("}") : [];
    this.eat("}");
    return astNode.BlockStatement(body);
  }

  /**
   * ExpressionStatement
   * : Expression
   * ;
   */
  ExpressionStatement() {
    const expression = this.Expression();
    this.eat(";");
    return astNode.ExpressionStatement(expression);
  }

  /**
   * Expression
   * : AdditiveExpression
   * ;
   */
  Expression() {
    return this.AdditiveExpression();
  }

  /**
   * AdditiveExpression
   * : MultiplicativeExpression
   * | AdditiveExpression ADDITIVE_OPERATOR MultiplicativeExpression
   * ;
   */
  AdditiveExpression() {
    return this.BinaryExpression(
      "MultiplicativeExpression",
      "ADDITIVE_OPERATOR"
    );
  }

  /**
   * MultiplicativeExpression
   * : PrimaryExpression
   * | MultiplicativeExpression MULTIPLICATIVE_OPERATOR PrimaryExpression
   * ;
   */
  MultiplicativeExpression() {
    return this.BinaryExpression(
      "PrimaryExpression",
      "MULTIPLICATIVE_OPERATOR"
    );
  }

  BinaryExpression(builder, opToken) {
    let left = this[builder]();

    while (this.lookahead.type === opToken) {
      const operator = this.eat(opToken).value;

      const right = this[builder]();

      left = {
        type: "BinaryExpression",
        operator,
        left,
        right,
      };
    }

    return left;
  }

  /**
   * PrimaryExpression
   * : Literal
   * | ParanthesizedExpression
   * ;
   */
  PrimaryExpression() {
    switch (this.lookahead.type) {
      case "(":
        return this.ParanthesizedExpression();
      default:
        return this.Literal();
    }
  }

  /**
   * ParanthesizedExpression
   * : "(" Expression ")"
   * ;
   */
  ParanthesizedExpression() {
    this.eat("(");
    const expression = this.Expression();
    this.eat(")");
    return expression;
  }

  /**
   * Literal
   * : NumericLiteral
   * | StringLiteral
   * ;
   */
  Literal() {
    switch (this.lookahead.type) {
      case "NUMBER":
        return this.NumericLiteral();
      case "STRING":
        return this.StringLiteral();
    }

    throw new SyntaxError("Literal: unexpected literal production");
  }

  /**
   * NumericLiteral
   * : NUMBER
   * ;
   */
  NumericLiteral() {
    const token = this.eat("NUMBER");
    return astNode.NumericLiteral(Number(token.value));
  }

  /**
   * StringLiteral
   * : STRING
   * ;
   */
  StringLiteral() {
    const token = this.eat("STRING");
    return astNode.StringLiteral(token.value.slice(1, -1));
  }

  eat(tokenType) {
    const token = this.lookahead;

    if (token == null) {
      throw new SyntaxError(`Unexpected end of input, expected ${tokenType}`);
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: ${token.value}, expected: ${tokenType}`
      );
    }

    this.lookahead = this.tokenizer.getNextToken();

    return token;
  }
};

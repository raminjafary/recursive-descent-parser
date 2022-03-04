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
   * | VariableStatement
   * | IfStatement
   * ;
   */
  Statement() {
    switch (this.lookahead.type) {
      case ";":
        return this.EmptyStatement();
      case "if":
        return this.IfStatement();
      case "{":
        return this.BlockStatement();
      case "let":
        return this.VariableStatement();
      default:
        return this.ExpressionStatement();
    }
  }

  /**
   * IfStatement
   * : "if" "(" Expression ")" Statement
   * | "if" "(" Expression ")" Statement "else" Statement
   * ;
   */
  IfStatement() {
    this.eat("if");

    this.eat("(");
    const test = this.Expression();
    this.eat(")");

    const consequent = this.Statement();

    const alternate =
      this.lookahead != null && this.lookahead.type === "else"
        ? this.eat("else") && this.Statement()
        : null;

    return {
      type: "IfStatement",
      test,
      consequent,
      alternate,
    };
  }

  /**
   * VariableDeclaration
   * : "let" VariableDeclarationList ";"
   * ;
   */
  VariableStatement() {
    this.eat("let");
    const declarations = this.VariableDeclarationList();
    this.eat(";");

    return {
      type: "VariableStatement",
      declarations,
    };
  }

  /**
   * VariableDeclarationList
   * : VariableDeclaration
   * | VariableDeclarationList ',' VariableDeclaration
   * ;
   */
  VariableDeclarationList() {
    const declarations = [];

    do {
      declarations.push(this.VariableDeclaration());
    } while (this.lookahead.type === "," && this.eat(","));

    return declarations;
  }

  /**
   * VariableDeclaration
   * : Identifier OptVariableInitializer
   * ;
   */
  VariableDeclaration() {
    const id = this.Identifier();

    const init =
      this.lookahead.type !== ";" && this.lookahead.type !== ","
        ? this.VariableInitializer()
        : null;

    return {
      type: "VariableDeclaration",
      id,
      init,
    };
  }

  /**
   * VariableInitializer
   * : SIMPLE_ASSIGN AssignmentExpression
   * ;
   */
  VariableInitializer() {
    this.eat("SIMPLE_ASSIGN");
    return this.AssignmentExpression();
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
   * : AssignmentExpression
   * ;
   */
  Expression() {
    return this.AssignmentExpression();
  }

  /**
   * AssignmentExpression
   * : RelationalExpression
   * | LeftHandSideExpression AssignmentOperator AssignmentExpression
   * ;
   */
  AssignmentExpression() {
    const left = this.RelationalExpression();

    if (!this.isAssignmentOperator(this.lookahead.type)) {
      return left;
    }

    return {
      type: "AssignmentExpression",
      operator: this.AssignmentOperator().value,
      left: this.checkValidAssignmentTarget(left),
      right: this.AssignmentExpression(),
    };
  }

  /**
   * RelationalExpression
   * : AdditiveExpression
   * | AdditiveExpression RELATIONAL_OPERATOR RelationalExpression
   * ;
   */
  RelationalExpression() {
    return this.BinaryExpression("AdditiveExpression", "RELATIONAL_OPERATOR");
  }

  /**
   * LeftHandSideExpression
   * : Identifier
   * ;
   */
  LeftHandSideExpression() {
    return this.Identifier();
  }

  /**
   * Identifier
   * : IDENTIFIER
   * ;
   */
  Identifier() {
    const name = this.eat("IDENTIFIER").value;
    return {
      type: "Identifier",
      name,
    };
  }

  isAssignmentOperator(tokenType) {
    return tokenType === "SIMPLE_ASSIGN" || tokenType === "COMPLEX_ASSIGN";
  }

  checkValidAssignmentTarget(node) {
    if (node.type === "Identifier") {
      return node;
    }

    throw new SyntaxError("Invalid left-hand side in assignment expression");
  }

  /**
   * AssignmentOperator
   * : SIMPLE_ASSIGN
   * | COMPLEX_ASSIGN
   * ;
   */
  AssignmentOperator() {
    if (this.lookahead.type === "SIMPLE_ASSIGN") {
      return this.eat("SIMPLE_ASSIGN");
    }

    return this.eat("COMPLEX_ASSIGN");
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
    if (this.isLiteral(this.lookahead.type)) {
      return this.Literal();
    }
    switch (this.lookahead.type) {
      case "(":
        return this.ParanthesizedExpression();
      default:
        return this.LeftHandSideExpression();
    }
  }

  isLiteral(tokenType) {
    return tokenType === "NUMBER" || tokenType === "STRING";
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

/**
 * Tokenizer spec.
 */
const spec = [
  // -------------------
  // Keywords:
  [/^\blet\b/, "let"],
  [/^\bif\b/, "if"],
  [/^\belse\b/, "else"],
  [/^\btrue\b/, "true"],
  [/^\bfalse\b/, "false"],
  [/^\bnull\b/, "null"],
  [/^\bwhile\b/, "while"],
  [/^\bdo\b/, "do"],
  [/^\bfor\b/, "for"],
  [/^\bdef\b/, "def"],
  [/^\breturn\b/, "return"],
  // -------------------
  // Number:
  [/^\d+/, "NUMBER"],
  // -------------------
  // Double quote string:
  [/^"[^"]*"/, "STRING"],
  // Single quote string:
  [/^'[^']*'/, "STRING"],
  // -------------------
  // Symbols, delimiters:
  [/^;/, ";"],
  [/^\{/, "{"],
  [/^\}/, "}"],
  [/^\(/, "("],
  [/^\)/, ")"],
  [/^,/, ","],
  [/^\./, "."],
  [/^\[/, "["],
  [/^\]/, "]"],
  // -------------------
  // Identifiers:
  [/^\w+/, "IDENTIFIER"],
  // -------------------
  // Equality operator:
  [/^[=!]=/, "EQUALITY_OPERATOR"],
  // -------------------
  // Assignment operators:
  [/^=/, "SIMPLE_ASSIGN"],
  [/^[\*\+\-\/]=/, "COMPLEX_ASSIGN"],
  // -------------------
  // Math operators:
  [/^[+\-]/, "ADDITIVE_OPERATOR"],
  [/^[*\/]/, "MULTIPLICATIVE_OPERATOR"],
  // -------------------
  // Relational operators:
  [/^[><]=?/, "RELATIONAL_OPERATOR"],
  // -------------------
  // Logical operators:
  [/^&&/, "LOGICAL_AND"],
  [/^\|\|/, "LOGICAL_OR"],
  [/^!/, "LOGICAL_NOT"],
  // -------------------
  // Whitespace:
  [/^\s+/, null],
  // -------------------
  // Comments:

  // Single-line comments:
  [/^\/\/.*/, null],
  // Single-multi-line comments:
  [/^\/\*[\s\S]*?\*\//, null],
];

/**
 * Lazily pulls a token from a stream.
 */

exports.Tokenizer = class Tokenizer {
  init(input) {
    this.input = input;
    this.cursor = 0;
  }

  EOF() {
    return this.cursor === this.input.length;
  }

  hasMoreTokens() {
    return this.cursor < this.input.length;
  }

  match(regexp, string) {
    const matched = regexp.exec(string);
    if (matched == null) {
      return;
    }
    this.cursor += matched[0].length;
    return matched[0];
  }

  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this.input.slice(this.cursor);

    for (const [regexp, tokenType] of spec) {
      const tokenValue = this.match(regexp, string);

      if (tokenValue == null) {
        continue;
      }

      if (tokenType == null) {
        return this.getNextToken();
      }

      return {
        type: tokenType,
        value: tokenValue,
      };
    }

    throw new SyntaxError(`Unexpected token: ${string[0]}`);
  }
};

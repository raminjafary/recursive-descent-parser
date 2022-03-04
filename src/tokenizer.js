/**
 * Tokenizer spec.
 */
const spec = [
  // -------------------
  // Keywords:
  [/^\blet\b/, "let"],
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
  // -------------------
  // Identifiers:
  [/^\w+/, "IDENTIFIER"],
  // -------------------
  // Assignment operators:
  [/^=/, "SIMPLE_ASSIGN"],
  [/^[\*\+\-\/]=/, "COMPLEX_ASSIGN"],
  // -------------------
  // Math operators:
  [/^[+\-]/, "ADDITIVE_OPERATOR"],
  [/^[*\/]/, "MULTIPLICATIVE_OPERATOR"],
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

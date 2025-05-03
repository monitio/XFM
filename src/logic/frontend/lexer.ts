// The tokens themselves the language uses
export enum TokenType {
	// Literal Types
	Number, // 0
	Identifier, // 1

	// Grouping * Operators
	BinaryOperator, // 2
	Equals, // 3
	OpenParen, // 4
	CloseParen, // 5

  // End of file
  EOF, // 6
}

// Lookup for keywords, known identifiers and symbols
//const KEYWORDS: Record<string, TokenType> = {};

// Represents a single token from the source-code
export interface Token {
	value: string; // Contains a raw value as seen inside the source code
	type: TokenType; // Tagged structure
}

// Returns a token of a given type and value
function token(value = "", type: TokenType): Token {
	return { value, type };
}

// Returns whether the character passed in alphabetic -> [a-zA-Z]
function isalpha(src: string) {
	return src.toUpperCase() != src.toLowerCase();
}

// Returns true if the character is whitespace like -> [\s, \t, \n]
function isskippable(str: string) {
	return str == " "
    || str == "\n"
    || str == "\t"
    || str == "\r";
}


// Return whether the character is a valid integer -> [0-9]
function isint(str: string) {
	const c = str.charCodeAt(0);
	const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
	return c >= bounds[0] && c <= bounds[1];
}

/**
 * Given a string representing source code: Produce tokens and handles
 * possible unidentified characters.
 *
 * - Returns a array of tokens.
 * - Does not modify the incoming string.
 */
export function tokenize(sourceCode: string): Token[] {
  // Replace some characters
  const normalized = sourceCode.replace(/\r/g, "");
	const src = normalized.split("");

  const tokens = new Array<Token>();

	// produce tokens until the EOF is reached.
	while (src.length > 0) {
		// BEGIN PARSING ONE CHARACTER TOKENS
		if (src[0] == "(") {
			tokens.push(token(src.shift(), TokenType.OpenParen));
		} else if (src[0] == ")") {
			tokens.push(token(src.shift(), TokenType.CloseParen));
		} // HANDLE BINARY OPERATORS
		else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/") {
			tokens.push(token(src.shift(), TokenType.BinaryOperator));
		} // Handle Conditional & Assignment Tokens
		else if (src[0] == "=") {
			tokens.push(token(src.shift(), TokenType.Equals));
		} // HANDLE MULTICHARACTER KEYWORDS, TOKENS, IDENTIFIERS ETC...
		else {
			// Handle numeric literals -> Integers
			if (isint(src[0])) {
				let num = "";
				while (src.length > 0 && isint(src[0])) {
					num += src.shift();
				}

				// append new numeric token.
				tokens.push(token(num, TokenType.Number));
			} // Handle Identifier & Keyword Tokens.
			else if (isalpha(src[0])) {
				let ident = "";
				while (src.length > 0 && isalpha(src[0])) {
					ident += src.shift();
				}
				tokens.push(token(ident, TokenType.Identifier));
			} else if (isskippable(src[0])) {
				// Skip uneeded chars.
				src.shift();
			} // Handle unreconized characters.
			// TODO: Impliment better errors and error recovery.
			else {
				console.error(
					"Unreconized character found in source: ",
					src[0].charCodeAt(0),
					src[0]
				);
				Deno.exit(1);
			}
		}
	}

  tokens.push({type: TokenType.EOF, value: "EndOfFile"})
	return tokens;
}

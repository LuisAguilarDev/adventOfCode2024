// El lexer toma la cadena de entrada y la convierte en una lista de tokens utilizando una expresión regular.
// Los tokens en este caso son números, operadores y paréntesis.
function lexer(input: string): string[] {
  const tokens = [];
  const re = /\s*(\d+|\+|\-|\*|\/|\(|\))\s*/g;
  let match;

  while ((match = re.exec(input)) !== null) {
    tokens.push(match[1]);
  }

  return tokens;
}
interface Expressions {
  type: 'BinaryExpression';
  operator: string;
  left: Expressions | Literal;
  right: Expressions | Literal;
}
interface Literal {
  type: 'Literal';
  value: number;
}
//El parser toma la lista de tokens y construye un AST(ABSTRACT SYNTAX TREE o Árbol Sintáctico Abstracto).
function parser(tokens: string[]): Expressions | Literal {
  let current = 0;

  function parseExpression(): Literal | Expressions {
    let left = parseTerm();

    while (
      current < tokens.length &&
      (tokens[current] === '+' || tokens[current] === '-')
    ) {
      const operator = tokens[current++];
      const right = parseTerm();
      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right,
      };
    }

    return left;
  }

  function parseTerm(): Literal | Expressions {
    let left = parseFactor();

    while (
      current < tokens.length &&
      (tokens[current] === '*' || tokens[current] === '/')
    ) {
      const operator = tokens[current++];
      const right = parseFactor();
      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right,
      };
    }

    return left;
  }

  function parseFactor(): Literal | Expressions {
    const token = tokens[current++];

    if (/\d/.test(token)) {
      return {
        type: 'Literal',
        value: Number(token),
      };
    }

    if (token === '(') {
      const expr = parseExpression();
      if (tokens[current++] !== ')') {
        throw new Error('Expected closing parenthesis');
      }
      return expr;
    }

    throw new Error('Unexpected token: ' + token);
  }

  return parseExpression();
}

function operate(ast: Expressions | Literal): number {
  if (ast.type === 'Literal') return ast.value;
  if (!ast.right || !ast.left) return 0;
  if (ast.operator === '+') return operate(ast.left) + operate(ast.right);
  if (ast.operator === '-') return operate(ast.left) - operate(ast.right);
  if (ast.operator === '*') return operate(ast.left) * operate(ast.right);
  return 0;
}

const input = '3 + 4 * (2 - 1)';
const tokens = lexer(input);
const ast = parser(tokens);
console.log(operate(ast));
console.log(JSON.stringify(ast, null, 2));

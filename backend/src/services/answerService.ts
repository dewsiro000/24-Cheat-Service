function removeOuterParentheses(expression: string): string {
  if (!expression.startsWith("(") || !expression.endsWith(")")) {
    return expression;
  }

  let balance = 0;

  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "(") balance++;
    if (expression[i] === ")") balance--;
    if (balance === 0 && i < expression.length - 1) {
      return expression;
    }
  }

  return expression.slice(1, -1);
}

function calculateOperation(num1: number, num2: number, op: string): number {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) throw new Error("Division by zero");
      return num1 / num2;
    default:
      return 0;
  }
}

function calculateSolutions(numbers: number[]): string[] {
  const results: Set<string> = new Set();
  const operators: string[] = ["+", "-", "*", "/"];
  const memo: Map<string, Set<string>> = new Map();

  function findSolutionsRecursive(currentNumsExpr: [number, string][]): void {
    if (currentNumsExpr.length === 1) {
      const [value, expression] = currentNumsExpr[0];
      if (Math.abs(value - 24) < 1e-6) {
        results.add(removeOuterParentheses(expression));
      }
      return;
    }

    const key = currentNumsExpr.map(([num, exp]) => `${num}:${exp}`).join("|");
    if (memo.has(key)) {
      const cachedResults = memo.get(key);
      cachedResults?.forEach((result) => results.add(result));
      return;
    }

    for (let i = 0; i < currentNumsExpr.length; i++) {
      for (let j = 0; j < currentNumsExpr.length; j++) {
        if (i === j) continue;

        const [num1, exp1] = currentNumsExpr[i];
        const [num2, exp2] = currentNumsExpr[j];
        const remaining = currentNumsExpr.filter(
          (_, index) => index !== i && index !== j
        );

        for (const op of operators) {
          try {
            const result = calculateOperation(num1, num2, op);
            const newExpression = `(${exp1}${op}${exp2})`;

            findSolutionsRecursive([...remaining, [result, newExpression]]);
          } catch {
            continue;
          }
        }
      }
    }

    memo.set(key, new Set(results));
  }

  const initialNumsExpr: [number, string][] = numbers.map((num) => [num, String(num)]);
  
  findSolutionsRecursive(initialNumsExpr);

  return results.size > 0 ? Array.from(results) : ["no solution found"];

}

export default calculateSolutions;



/**
 * Evaluates a mathematical expression in Alternative notation.
 * 
 * @param {string} expression - The expression in Alternative notation to evaluate.
 * @returns {number} The result of the expression.
 */
exports.calculate = function (expression) {
  // Split expression by whitespace
  const tokens = expression.split(' ');
  const stack = [];  // Stack to store operands

  // Process each token from right to left
  for (let index = tokens.length - 1; index >= 0; index--) {
    const token = tokens[index];

    // If the token is an operand, convert it to a number and push onto the stack
    if (!isOperator(token)) {
      stack.push(parseFloat(token));
    } else {
      // The token is an operator; perform the operation with the top two operands from the stack
      // Pop the two operands from the stack
      const operand1 = stack.pop();
      const operand2 = stack.pop();

      // Perform the calculation and push the result back onto the stack
      const result = calculate(token, operand1, operand2);
      stack.push(result);
    }
  }

  // The final result is the only value remaining in the stack
  return stack[0];
};

/**
 * Checks if the given token is an operator.
 *
 * @param {string} token - The token to check.
 * @returns {boolean} True if the token is an operator, false otherwise.
 */
function isOperator(token) {
  return ['+', '-', '*', '/'].includes(token);
}

/**
 * Performs a calculation based on the given operator and operands.
 *
 * @param {string} operator - The operator to use.
 * @param {number} operand1 - The first operand.
 * @param {number} operand2 - The second operand.
 * @returns {number} The result of the calculation.
 * @throws {Error} If the operator is invalid.
 */
function calculate(operator, operand1, operand2) {
  switch (operator) {
    case '+': return operand1 + operand2;
    case '-': return operand1 - operand2;
    case '*': return operand1 * operand2;
    case '/': return operand1 / operand2;
    default: throw new Error(`Invalid operator: ${operator}`);
  }
}

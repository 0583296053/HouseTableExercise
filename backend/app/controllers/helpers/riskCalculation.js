const {
  ratio, percentage, ratio2Percentage, percentage2Ratio
} = require('./helpers');

const riskCalculation = (currentValue, loanAmount) => {
  // Calculate risk

  // Calculate ratio of `loanAmount` to `currentValue`
  let risk = ratio(loanAmount, currentValue);

  // Convert the risk ratio to percentage
  risk = ratio2Percentage(ratio(loanAmount, currentValue));

  // Increase the risk if the `loanAmount` is more than 50% of the `currentValue`
  if (percentage(loanAmount, currentValue) > 50) {
    risk += 10;
  }

  // Convert risk to value between 0 and 1
  risk = percentage2Ratio(risk);

  return risk;
};

module.exports = {
  riskCalculation
};

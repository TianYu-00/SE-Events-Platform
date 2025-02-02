export function moneyFormatter(pence) {
  if (pence === null || pence === undefined) {
    // console.error("Pence not provided");
    return "invalid";
  }

  const pounds = (pence / 100).toFixed(2);

  return pounds;
}

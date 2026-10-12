/**
 * Converts numeric INR amount into Indian English Words (Lakh, Crore, Thousand).
 */
export function amountInWords(num: number): string {
  if (isNaN(num) || num <= 0) return "";
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convertTwoDigits(n: number): string {
    if (n < 20) return a[n] || "";
    return `${b[Math.floor(n / 10)]} ${a[n % 10]}`.trim();
  }

  function convertThreeDigits(n: number): string {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    const strHundred = hundred > 0 ? `${a[hundred]} Hundred` : "";
    const strRest = rest > 0 ? convertTwoDigits(rest) : "";
    return [strHundred, strRest].filter(Boolean).join(" ");
  }

  const intPart = Math.floor(num);
  const paise = Math.round((num - intPart) * 100);

  const crore = Math.floor(intPart / 10000000);
  const lakh = Math.floor((intPart % 10000000) / 100000);
  const thousand = Math.floor((intPart % 100000) / 1000);
  const remaining = intPart % 1000;

  const parts: string[] = [];
  if (crore > 0) parts.push(`${convertTwoDigits(crore)} Crore`);
  if (lakh > 0) parts.push(`${convertTwoDigits(lakh)} Lakh`);
  if (thousand > 0) parts.push(`${convertTwoDigits(thousand)} Thousand`);
  if (remaining > 0) parts.push(convertThreeDigits(remaining));

  const words = parts.join(" ").trim();
  const paiseStr = paise > 0 ? ` and ${convertTwoDigits(paise)} Paise` : "";
  return words ? `Rupees ${words}${paiseStr} Only` : "";
}

declare global {
  interface Number {
    toCurrency(): string;
  }
  interface String {
    currencyToNumber(): number;
  }
}

Number.prototype.toCurrency = function (): string {
  const number = this.toString().replace(/\./g, "");
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL",
  };
  const result = new Intl.NumberFormat("pt-BR", options).format(
    parseFloat(isNaN(parseFloat(number)) ? "0" : number) / 100,
  );
  return result;
};

String.prototype.currencyToNumber = function () {
  const numberString = this.replace(/\./g, "")
    .replace(",", "")
    .replace(/[^\d.]/g, "")
    .slice(0, 17);

  return isNaN(Number(numberString)) ? 0 : Number(numberString);
};

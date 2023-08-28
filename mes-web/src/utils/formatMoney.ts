const formatMoney = (money: number): string => {
  if (money < 10000) {
    const result = (money / 10000).toString();
    const dotIndex = result.indexOf(".");
    if (dotIndex === -1) {
      return `${result}万`;
    } else {
      const integerPart = result.substring(0, dotIndex);
      const decimalPart = result.substring(dotIndex + 1, dotIndex + 2);
      return `${integerPart}.${decimalPart}万`;
    }
  } else if (money < 100000000) {
    return `${Math.floor(money / 10000)}万`;
  } else {
    const yi = Math.floor(money / 100000000);
    const wan = Math.floor((money - yi * 100000000) / 10000);
    if (wan === 0) {
      return `${yi}亿`;
    } else {
      return `${yi}亿${wan}万`;
    }
  }
}


export default formatMoney;

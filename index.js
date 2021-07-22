const normalTaxRate = 0.25;
const discountTaxRate = 0.15;
const bargainRate = 0.85;

function calcTax(buyPrice, sellPrice, amount, oneYearQualified, twoYearQualified) {
    const bargainProfit = (buyPrice - (buyPrice * bargainRate)) * amount;
    const marketProfit = (sellPrice - buyPrice) * amount;

    let totalTax;
    if (!oneYearQualified && !twoYearQualified) {
        const bargainTax = bargainProfit * normalTaxRate;
        const marketProfitTax = marketProfit > 0 ? marketProfit * normalTaxRate : 0;
        totalTax = bargainTax + marketProfitTax;
    } else if (oneYearQualified && !twoYearQualified) {
        if (marketProfit < 0) {
            if ((bargainProfit + marketProfit) < 0) {
                totalTax = 0;
            } else {
                totalTax = (bargainProfit + marketProfit) * normalTaxRate;
            }
        } else {
            totalTax = (bargainProfit * normalTaxRate) + (marketProfit * discountTaxRate);
        }
    }
    if (twoYearQualified) {
        if (marketProfit > 0) {
            if (sellPrice < buyPrice) {
                totalTax = Math.min(bargainProfit, marketProfit) * normalTaxRate;
            } else {
                totalTax = (bargainProfit * normalTaxRate) + ((marketProfit - Math.min(marketProfit, bargainProfit)) * discountTaxRate);
            }
        } else {
            totalTax = 0;
        }
    }

    return totalTax;
}

const calcButton = document.getElementById("calc");

calcButton.addEventListener('click', (event) => {
    event.preventDefault();
    const buyPrice = parseFloat(document.getElementById('buyPrice').value);
    const sellPrice = parseFloat(document.getElementById('sellPrice').value);
    const amount = parseFloat(document.getElementById('amount').value);
    const oneYear = document.getElementById('oneYear').checked;
    const twoYear = document.getElementById('twoYear').checked;

    const totalTax = calcTax(buyPrice, sellPrice, amount, oneYear, twoYear);

    const result = document.getElementById('result');
    result.textContent = `총 세금은 $${totalTax} 입니다`;
});
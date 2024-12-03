const form = document.getElementById('currency-form');
const sourceCurrencySelect = document.getElementById('source-currency');
const targetCurrencySelect = document.getElementById('target-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsContainer = document.getElementById('results-container');

const conversionRates = {
    USD: {
        EUR: 0.85,
        INR: 74.5,
        GBP: 0.75,
        JPY: 110.0,
    },
    EUR: {
        USD: 1.18,
        INR: 90.5,
        GBP: 0.88,
        JPY: 129.5,
    },
    INR: {
        USD: 0.013,
        EUR: 0.011,
        GBP: 0.0098,
        JPY: 1.47,
    },
    GBP: {
        USD: 1.33,
        EUR: 1.14,
        INR: 102.3,
        JPY: 147.8,
    },
    JPY: {
        USD: 0.0091,
        EUR: 0.0077,
        INR: 0.68,
        GBP: 0.0068,
    },
};

const populateCurrencyDropdowns = () => {
    const currencies = Object.keys(conversionRates);
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;

        const option2 = option1.cloneNode(true);

        sourceCurrencySelect.appendChild(option1);
        targetCurrencySelect.appendChild(option2);
    });
};

convertBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const sourceCurrency = sourceCurrencySelect.value;
    const targetCurrency = targetCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    // Check if the amount is valid
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount');
        return;
    }

    if (!conversionRates[sourceCurrency] || !conversionRates[sourceCurrency][targetCurrency]) {
        alert('Conversion rate not available');
        return;
    }

    const convertedAmount = amount * conversionRates[sourceCurrency][targetCurrency];

    const resultBox = document.createElement('div');
    resultBox.className = 'result-box';
    resultBox.textContent = `${amount} ${sourceCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}`;

    resultsContainer.appendChild(resultBox);
});

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();

    amountInput.value = '';
    resultsContainer.innerHTML = '';
});
populateCurrencyDropdowns();
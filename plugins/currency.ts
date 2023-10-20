interface CurrencyStore {
    currency: string;
    value: number;
}

interface ChangeCurrencyFunction {
    (currency: string): Promise<void>;
}

export default defineNuxtPlugin(() => {

    const currencyStore = reactive<CurrencyStore>({
        currency: "PLN",
        value: 1
    })

    const changeCurrency:ChangeCurrencyFunction = async (currency: string) => {
        console.log(currency)
        const currencyToLowerCase = currency.toLowerCase();

        const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyToLowerCase}/pln.json`)

        if (!res.ok) {
            currencyStore.currency = currency.toUpperCase();
            currencyStore.value = 1
        }

        const data: { pln: number } = await res.json();

        currencyStore.currency = currency.toUpperCase();
        currencyStore.value = data.pln;
    }

    return {
      provide: {
        currencyStore,
        changeCurrency
      }
    }
  })
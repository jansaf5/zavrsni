import axios from 'axios';


export async function fetchPriceData(name,days){
  let promise=await axios.get("http://localhost:9000/v1/api-calls/getPriceData/"+ name +"/" + days);
  return promise.data;
  
  
}

export async function fetchVolData(name,days){
  let promise=await axios.get("http://localhost:9000/v1/api-calls/getVolumeData/"+ name +"/" + days);
  return promise.data;
  
}

export async function fetchOtherData(name){
  let promise=await axios.get("http://localhost:9000/v1/api-calls/getOtherData/"+ name);
  return promise.data;
  
}

// export async function register(firstName,lastName,email,password){
//   const {data} =axios.post("http://localhost:9000/v1/auth/register/",{
//     firstName,
//     lastName,
//     email,
//     password
//   })
//   return data;
// }

export function rsi(prices, period = 14) {
  if (!Array.isArray(prices) || prices.length <= period) {
    throw new Error("Prices array must be longer than the RSI period.");
  }

  const rsiValues = new Array(prices.length).fill(null);

  for (let i = period; i < prices.length; i++) {
    let gains = 0, losses = 0;

    for (let j = i - period + 1; j <= i; j++) {
      const change = prices[j] - prices[j - 1];
      if (change > 0) gains += change;
      else losses -= change;
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    if (avgLoss === 0) {
      rsiValues[i] = 100;
    } else {
      const rs = avgGain / avgLoss;
      rsiValues[i] = 100 - 100 / (1 + rs);
    }
  }

  return rsiValues;
}



export function simpleMovingAverage(prices) {
    let sma = [];
    let sum = 0;

    for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
        sma.push(sum / (i + 1)); }

    return sma;
}

export function exponentialMovingAverage(prices, smoothing = 2) {
    if (!prices || prices.length === 0) return [];

    let ema = [];
    ema[0] = prices[0]; 

   
    for (let i = 1; i < prices.length; i++) {
        ema[i] = (prices[i] - ema[i - 1]) * (smoothing / (i + 1)) + ema[i - 1];
    }

    return ema;
}

export function generateSignalPoints(prices, dates, rsiBuyThreshold = 30, rsiSellThreshold = 70) {
  const rsiValues = rsi(prices);
  const smaValues = simpleMovingAverage(prices);
  const emaValues = exponentialMovingAverage(prices);

  const buyPoints = [];
  const sellPoints = [];

  for (let i = 0; i < prices.length; i++) {
    if (rsiValues[i] !== null && smaValues[i] !== null && emaValues[i] !== null) {
      const price = prices[i];
      const date = dates[i];

      const buy = rsiValues[i] < rsiBuyThreshold && price > smaValues[i] && price > emaValues[i];
      const sell = rsiValues[i] > rsiSellThreshold && (price < smaValues[i] || price < emaValues[i]);

      if (buy){ 
        buyPoints.push(price);
        sellPoints.push(null);
      }
      if (sell){ 
        sellPoints.push(price );
        buyPoints.push(null);
      }
    }
  }

  return { buyPoints, sellPoints };
}
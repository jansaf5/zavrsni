
 export async function  fetchPriceData(name, days) {

    const dataPromise = await fetch("https://api.coingecko.com/api/v3/coins/" + name + "/market_chart?vs_currency=usd&days=" + days + "&interval=daily");
    const market = await dataPromise.json();
    let temp= market.prices;
    var prices=[];
    var dates=[];
       temp.forEach(element => {
         prices.push(element[1]);
         dates.push(timeConverter(element[0]));
        });
    let data={prices,dates};
    console.log(data.prices);
    console.log(data.dates);
    return data;



  }

  
  export async function  fetchVolData(name, days) {

    const dataPromise = await fetch("https://api.coingecko.com/api/v3/coins/" + name + "/market_chart?vs_currency=usd&days=" + days + "&interval=daily");
    const market = await dataPromise.json();
    let temp= market.total_volumes;
    var volume=[];
    var dates=[];
       temp.forEach(element => {
         volume.push(element[1]);
         dates.push(timeConverter(element[0]));
        });
    let data={volume,dates};
    console.log(data.volume);
    console.log(data.dates);
    return data;



  }

  export function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + '/' + month + '/' + year;
    return time;
  }

export async function fetchOtherData(name){
  const dataPromise=await fetch("https://api.coingecko.com/api/v3/coins/"+name+"?localization=false&market_data=true");
  const obj=await dataPromise.json();
  let id= obj.id;
  let symbol= obj.symbol;
  let symbName=obj.name;
  let hash=obj.hashing_algorithm;
  let desc=obj.description.en;
  let rank=obj.market_cap_rank;
  let price=obj.market_data.current_price.usd;
  let ath=obj.market_data.ath.usd;
  let cap= obj.market_data.market_cap.usd;
  let volume=obj.market_data.total_volume.usd;
  let data={id,symbol,symbName,hash,desc,rank,price,ath,cap,volume};
  console.log(data);
  return data;
}
import { Injectable } from '@nestjs/common';
import { ScriptableLineSegmentContext } from 'chart.js';
import { OtherData, PriceData, VolumeData } from './interfaces';

 
function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = date + '/' + month + '/' + year;
    return time;
  }


@Injectable()
export class ApiCallsService {


    async getPriceData(name: string, days: number) : Promise<PriceData>{
    const dataPromise = await fetch("https://api.coingecko.com/api/v3/coins/" + name + "/market_chart?vs_currency=usd&days=" + days + "&interval=daily");
    const market = await dataPromise.json();
    let temp= market.prices;
    let prices=[];
    let dates=[];
       temp.forEach(element => {
         prices.push(element[1]);
         dates.push(timeConverter(element[0]));
        });
    let data={name,prices,dates};
    return data;
    }

     async getVolumeData(name:string, days:number):Promise<VolumeData> {
        const dataPromise = await fetch("https://api.coingecko.com/api/v3/coins/" + name + "/market_chart?vs_currency=usd&days=" + days + "&interval=daily");
        const market = await dataPromise.json();
        let temp= market.total_volumes;
        let volumes=[];
        let dates=[];
           temp.forEach(element => {
             volumes.push(element[1]);
             dates.push(timeConverter(element[0]));
            });
        return {name,volumes,dates};
        
      }

       async getOtherData(name:string):Promise<OtherData>{
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
        return {id,symbol,symbName,hash,desc,rank,price,ath,cap,volume};
        
      }
}

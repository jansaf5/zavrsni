import { Injectable } from '@nestjs/common';
import { OtherData, PriceData, VolumeData } from './interfaces';
import axios from 'axios';
import { catchError } from 'rxjs';

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = date + '/' + month + '/' + year;
    return time;
}
const api_key=process.env.API_KEY;
const coinHttp = axios.create({
    baseURL: process.env.COIN_API_URI || "https://api.coingecko.com/api/v3/coins/",
    headers: {'x-cg-demo-api-key':api_key}

});



@Injectable()
export class ApiCallsService {
    async getPriceData(name: string, days: number): Promise<PriceData> {
        const dataPromise = await coinHttp.get(name + "/market_chart?vs_currency=usd&days=" + days + "&interval=daily");
        const market = await dataPromise.data;
        const temp = market.prices;
        const prices = [];
        const dates = [];
        temp.forEach(element => {
            prices.push(element[1]);
            dates.push(timeConverter(element[0]));
        });
        console.log({name, prices, dates});
       
        return { name, prices, dates };
        
    }

    async getVolumeData(name: string, days: number): Promise<VolumeData> {
        const dataPromise = await coinHttp.get(name + "/market_chart?vs_currency=usd&days=" + days + "&interval=daily");
        const market = await dataPromise.data;
        const temp = market.total_volumes;
        const volumes = [];
        const dates = [];
        temp.forEach(element => {
            volumes.push(element[1]);
            dates.push(timeConverter(element[0]));
        });
        return { name, volumes, dates };

    }

    async getOtherData(name: string): Promise<OtherData> {
        const dataPromise = await coinHttp.get(name + "?localization=false&market_data=true");
        const obj = await dataPromise.data;

        const id = obj.id;
        const symbol = obj.symbol;
        const symbName = obj.name;
        const hash = obj.hashing_algorithm;
        const desc = obj.description.en;
        const rank = obj.market_cap_rank;
        const price = obj.market_data.current_price.usd;
        const ath = obj.market_data.ath.usd;
        const cap = obj.market_data.market_cap.usd;
        const volume = obj.market_data.total_volume.usd;
        return { id, symbol, symbName, hash, desc, rank, price, ath, cap, volume };

    }
}

export interface PriceData{
    name: string;
    prices: number[];
    dates: string[];
}

export interface VolumeData{
    name:string;
    volumes:number[];
    dates: string[];
}

export interface OtherData{
    id:string;
    symbol: string;
    symbName:string;
    hash:string;
    desc:string;
    rank:string;
    price: string;
    ath:string;
    cap:string;
    volume:string;
}
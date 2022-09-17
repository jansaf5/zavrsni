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

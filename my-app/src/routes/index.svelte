<script>
    import PriceChart from "./PriceChart.svelte"
    import Placeholder from "./Placeholder.svelte";
    import {fetchPriceData,fetchVolData,fetchOtherData} from "../lib/dataFunc.js";
    import Fav from "./Fav.svelte"



    let name="bitcoin"
    let days=30;
    let marketPrice=fetchPriceData(name,days);
    let marketVol=fetchVolData(name,days);
    let marketData= fetchOtherData(name);
    
</script>
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">

<a href="/login">Jump to login</a>
<div class="topnav">
  <a class="active" href="#home">Home</a>
  
</div>



<div class="sidenav">
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#clients">Clients</a>
    <a href="#contact">Contact</a>
    <Fav coin={name}></Fav>
  </div>

  <div class="title">
    <p>Currently looking at {name} in the last {days} days</p>
    <div class="icon">
      <i class="fa-regular fa-star"></i>
    </div>
    <div class="icon">
      <i class="fa-regular fa-trash-can"></i>
    </div>
  </div>

<div class="charts">
{#await marketPrice}
    <Placeholder></Placeholder>
{:then marketPrice}
    <PriceChart prices={marketPrice.prices} dates={marketPrice.dates}/>
{:catch error}
    <Placeholder></Placeholder>
{/await}

{#await marketVol}
    <Placeholder></Placeholder>
{:then marketVol}
    <PriceChart prices={marketVol.volume} dates={marketVol.dates}/>
{:catch error}
    <Placeholder></Placeholder>
{/await}
</div>


{#await marketData}
<div></div>
{:then marketData}
<div class="data-table">
  <table>
    <tr>
      <td>Coin Market Rank:{marketData.rank}</td>
      <td>Coin Current Price:{marketData.price} USD</td>
      <td>Coin All-Time High:{marketData.ath} USD</td>
      <td>Coin Market Cap:{marketData.cap} USD</td>
      <td>Coin Volume:{marketData.volume} </td>
    </tr>
    <tr>
      <td>Coin ID:{marketData.id}</td>
      <td>Coin Symbol:{marketData.symbol}</td>
      <td>Coin Name:{marketData.symbName}</td>
      <td>Coin Hash:{marketData.hash}</td>
    </tr>
  </table>
</div>
{/await}


<style>
  .data-table{
    display: flex;
    justify-content: center;
    align-items:center ;
    padding-left: 200px;
    
  }

  .title{
    display: flex;
    align-content: center;
    justify-content: center;
    padding-left: 200px;
  }
  .charts{
    margin-top: 10px;
  }

.sidenav {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  left: 0;
  background-color: #f1f1f1;
  overflow-x: hidden;
  padding-top: 20px;
  
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration:none;
  font-size: 25px;
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}


@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

/* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
  
  
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}



.icon {
      font-size: 110px;
      display: flex;
      justify-content: center;
      color: #4286f4;
}
</style>
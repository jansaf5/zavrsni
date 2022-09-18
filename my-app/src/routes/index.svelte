<script>
    import PriceChart from "./PriceChart.svelte"
    import Placeholder from "./Placeholder.svelte";
    import {fetchPriceData,fetchVolData,fetchOtherData} from "../lib/dataFunc.js";
    import Fav from "./Fav.svelte"
    import {addFavourite,removeFavourite,getFavourite} from "../lib/apiFunctions";
    import {emailStore} from "../lib/store";
    import { get } from 'svelte/store'
    var favourites=getFavourite();
    var name="bitcoin"
    var days=30
    let marketPrice=fetchPriceData(name,days);
    let marketVol=fetchVolData(name,days);
    let marketData= fetchOtherData(name);


    function newInput() {
    name=document.getElementById("textName").value
    days=document.getElementById("textDays").value
    marketPrice=fetchPriceData(name,days);
    marketVol=fetchVolData(name,days);
    marketData= fetchOtherData(name);
    
  
}
    

    
</script>
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">


<a href="/login">Jump to login</a>

  <div class="sidenav">
    
    {#await favourites }
      <p>Add a favourite!</p>
      {:then favourites}
        {#each favourites as fav}
          <Fav coin={fav}></Fav>
          {/each}
        {/await}

   </div>

  <body>
    <div class="title">
      <p>Currently looking at {name} in the last {days} days</p>
      <form form on:submit|preventDefault={newInput}>
    
        <input id="textName" value={name}>
        <input id="textDays" type=number value={days} min=2 max=365>
        <input type="submit" value="Search">
    </form>
    <div id="buttons">
      <button on:click={addFavourite(name)} class="favButton" id="addFav">Add Favourite</button>
      <button on:click={removeFavourite(name)} class="favButton" id="removeFav">Remove Favourite</button>
    </div>
    </div>
    
    <div class="charts">
    {#await marketPrice}
      <Placeholder></Placeholder>
    {:then marketPrice}
      <PriceChart prices={marketPrice.prices} dates={marketPrice.dates} type={"line"}/>
    {:catch error}
      <div class="er-header">
        <h1>No cryptocurrency found with this name</h1>
        <h2>Check if you typed in the correct name</h2>
      </div>
      <Placeholder></Placeholder>
    {/await}
    
    {#await marketVol}
      <Placeholder></Placeholder>
    {:then marketVol}
      <PriceChart prices={marketVol.volumes} dates={marketVol.dates} type={"bar"}/>
    {:catch error}
      
      <Placeholder></Placeholder>
    {/await}
    </div>
    
    
    {#await marketData}
    <div></div>
    {:then marketData}
    <div class="data-table">
      <div class="data">
        <p>Coin Market Rank:{marketData.rank}</p>
        <p>Coin Current Price:{marketData.price} USD</p>
        <p>Coin All-Time High:{marketData.ath} USD</p>
        <p>Coin Market Cap:{marketData.cap} USD</p>
        <p>Coin Volume:{marketData.volume}</p>
        
      </div>
      <div class="data">
        <p>Coin ID:{marketData.id}</p>
        <p>Coin Symbol:{marketData.symbol}</p>
        <p>Coin Name:{marketData.symbName}</p>
        <p>Coin Hash:{marketData.hash}</p>
      </div>

  
    </div>
    <div>
    <p id="desc">{marketData.desc}</p>
    </div>
    {:catch error}
    <div class="er-header">
      <h2>No data here either</h2>
    </div>
    {/await}
  </body>



<style>
  .er-header{
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-content: center;
  }
  body{
    
    padding-left: 150px;
    
  }
  #addFav{
    background-color: #6ef0c0;
  }
  #removeFav{
    background-color: #f17853;
  }

  .data-table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center ;
    
    
  }
  .data{
    display: flex;
    

  }
  .data p{
    background-color: #e5e4e2;
  border-radius: 5%;
  padding: 5px;
  box-shadow: 5px 5px #333;
  }

  .title{
    display: flex;
    flex-direction: column;
    align-content: center;
    
    text-align: center;
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
  margin-right: 20px;
  
  
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
  display: flex;
  flex-direction: row-reverse;
  
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

.title p{
  text-transform: capitalize;
}

label { display: flex }
input, p { margin: 6px }

#desc{
  background-color: #e5e4e2;
  border-radius: 5%;
  padding: 15px;
  box-shadow: 5px 10px #333;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
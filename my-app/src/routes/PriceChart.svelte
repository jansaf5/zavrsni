<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto/auto.js';
	export let prices,dates,type;
	import {simpleMovingAverage,exponentialMovingAverage,generateSignalPoints} from "../lib/dataFunc.js";

	let { buyPoints, sellPoints } = generateSignalPoints(prices, dates);
	
	let portfolio;
	const data = {
		  labels: dates,
		  datasets: [
			  {
				  label:"Prices",
				  data: prices,
				  backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
				  // hoverOffset: 4,
				  
			  },
			  {
				label:"SMA",
				data: simpleMovingAverage(prices,dates),
				borderColor:"#800080",
				hidden:true,
				borderRadius:10,
				radius:1,
			  },

			  {
				label:"EMA",
				data: exponentialMovingAverage(prices),
				borderColor:"#0000FF",
				hidden:true,
				borderRadius:10,
				radius:1,
			  },
			   {
				label:"Buy Signals",
				data: buyPoints,
				borderColor:"#00FF00",
				type:"scatter",
				pointradius:6,
			},
			{
				label:"Sell Signals",
				data: sellPoints,
				borderColor:"#FF0000",
				type:"scatter",
				pointradius:10,
				
			}
		  ]
	  };
	  const config = {
		  type: type,
		  data: data,
		  options: {
			  borderRadius: '30',
			  responsive: true,
			  cutout: '95%',
			  spacing: 2,
			  plugins: {
				  legend: {
					  position: 'bottom',
					  display: true,
					  labels: {
						  usePointStyle: true,
						  padding: 20,
						  font: {
							  size: 14
						  }
					  }
				  },
				  title: {
					  display: false
					  
				  }
			  }
		  }
	  };
	onMount(()=> {
	  const ctx = portfolio.getContext('2d');
	  // Initialize chart using default config set
	  var myChart = new Chart(ctx, config);
	  
	})
  </script>
  <canvas bind:this={portfolio} width={400} height={400} />

  <style>
	canvas{
		width: 200px;
		height: 200px;
		
		max-height: 400px;
		padding-right: 20px;

	}
  </style>
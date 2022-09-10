<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto/auto.js';
	export let prices,dates,type;
	
	let portfolio;
	const data = {
		  labels: dates,
		  datasets: [
			  {
				  
				  data: prices,
				  backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
				  // hoverOffset: 4,
				  
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
					  display: false,
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
		padding-left: 165px;
		max-height: 400px;
		padding-right: 20px;

	}
  </style>
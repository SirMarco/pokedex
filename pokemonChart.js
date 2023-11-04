
function chart(i, allPokemons) {

  let pokemon = allPokemons[i];
  console.log(pokemon);
  var data = {
    labels: ["HP", "Attack", "Defense", "SP-Attack", "SP-Defense", "Speed"],
    datasets: [{
      label: null,
      data: [pokemon['stats'][0]['base_stat'],
      pokemon['stats'][1]['base_stat'],
      pokemon['stats'][2]['base_stat'],
      pokemon['stats'][3]['base_stat'],
      pokemon['stats'][4]['base_stat'],
      pokemon['stats'][5]['base_stat']],
      backgroundColor: 'lightgrey',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]

  };

  var ctx = document.getElementById("barChart").getContext('2d');
  console.log(ctx);
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      indexAxis: 'y',
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 0
        }
      },
      plugins: {
        tooltip: {
          enabled: false
        },
        legend: {
          display: false
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: 2.4,
              yMax: 2.4,
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
            }
          }
        }
      }
    }
  });
}
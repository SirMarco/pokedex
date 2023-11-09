
function chart(i, allPokemons) {

  let pokemon = allPokemons[i];
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
      backgroundColor: ["#78C850", "#F08030", "#6890F0", "#F8D030", "#F85888", "#7038F8"],
      borderWidth: 1
    }]

  };

  var ctx = document.getElementById("barChart").getContext('2d');
  var myChart = new Chart(ctx, {
    plugins: [ChartDataLabels],
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
          enabled: true
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
        },
        datalabels: {
          color: '#fff',
          labels: {
            title: {
              font: {
                weight: 'light'
              },
            }
          }
        }
      }
    }
  });
}
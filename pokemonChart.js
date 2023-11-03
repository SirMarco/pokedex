// Die Daten für das Balkendiagramm
var data = {
  labels: ["HP", "Attack", "Defense", "Special Attack", "Speed"],
  datasets: [{
    data: [4500, 3200, 5800, 2500, 4900],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};

// Konfigurationsoptionen für das Balkendiagramm
var options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

// Erstellen Sie ein Balkendiagramm im Canvas-Element
var ctx = document.getElementById('barChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: {
    indexAxis: 'y',
  },
  plugins: {
    title: {
      display: 'false',
    }
  }
});
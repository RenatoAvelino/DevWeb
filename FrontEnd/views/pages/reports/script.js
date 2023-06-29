function alterarImagens() {
  const html = document.querySelector('html')
  const imgs = Array.from(document.getElementsByClassName('AmbSoc'))
  const temaAtual = html.classList.contains('dark-mode') ? 'dark' : 'light'

  imgs.forEach((img) => {
    const src = img.src

    if (temaAtual === 'dark' && !src.includes('-white.png')) {
      const newSrc = src.replace('.png', '-white.png')
      img.src = newSrc
    } else if (temaAtual === 'light' && src.includes('-white.png')) {
      const newSrc = src.replace('-white.png', '.png')
      img.src = newSrc
    }
  })
}

window.addEventListener('DOMContentLoaded', function () {
  const moment = window.moment

  const BaseUrl = 'http://localhost:8000'
  const EndPoint = BaseUrl + '/solardata'
  Chart.register(ChartDataLabels)

  function createChart() { 
    fetch(EndPoint)
      .then(response => response.text())
      // Carregue os dados do arquivo CSV usando a biblioteca d3.js
      .then(csvData => {
        var parsedData = d3.csvParse(csvData)
        var data = parsedData

        var formattedDates = []
        var acPowerValues = []

        // Verificar se as datas foram preenchidas no formulário
        var deInput = document.getElementById('de')
        var ateInput = document.getElementById('ate')
      
        if (deInput.value && ateInput.value) {
          var fromDate = moment(deInput.value, 'DD/MM/YYYY').startOf('day').format('YYYY-MM-DD HH:mm')
          var toDate = moment(ateInput.value, 'DD/MM/YYYY').endOf('day').format('YYYY-MM-DD HH:mm')
        } else{
          var lastDate = data[data.length - 1]
          var toDate = moment(lastDate.DATE_TIME, 'YYYY-MM-DD HH:mm')
          var fromDate = toDate.clone().subtract(0, 'day').startOf('day')
        }

        fromDate = new Date(fromDate._d)
        toDate = new Date(toDate._d)

        // Filtrar os dados pelo período selecionado
        data = data.filter(function (d) {
          return moment(d.DATE_TIME).isBetween(fromDate, toDate)
        })

        // Agrupe os dados pela data e calcule a soma da AC_POWER
        var groupedData = d3.group(data, function (d) {
          var formattedDate = moment(d.DATE_TIME).format('YYYY-MM-DD HH:mm')
          formattedDates.push(formattedDate)
          acPowerValues.push(d.AC_POWER)
        })

      // Agrupe os dados pelos valores distintos da data e calcule a soma da AC_POWER
      var groupedData = d3.rollup(data, function (values) {
        return d3.sum(values, function (d) { return d.AC_POWER })
      }, function (d) {
        return moment(d.DATE_TIME).format('YYYY-MM-DD HH:mm')
      })

      var aggregatedData = Array.from(groupedData, function ([key, value]) {
        return { DATE_TIME: key, AC_POWER: value }
      })

      // Extrai as datas e os valores da AC_POWER em arrays separados
      var labels = aggregatedData.map(function (d) { return d.DATE_TIME })
      var values = aggregatedData.map(function (d) { return d.AC_POWER })
    
      // Cria um elemento canvas para renderizar o gráfico
      var canvas = document.createElement('canvas')
      document.getElementById('Graf').appendChild(canvas)

      // Cria o gráfico usando Chart.js
      var ctx = canvas.getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'AC_POWER',
            data: values,
            fill: true, // Preenche o lado interno da curva com a cor da linha
            borderColor: 'rgba(233, 147, 71, 1)',
            backgroundColor: 'rgba(233, 147, 71, 0.4)', // Define a cor de preenchimento do lado interno da curva
            borderWidth: 1,
            pointRadius: 2 // Oculta os pontos na linha principal do gráfico
          }]
        },
        options: {
          scales: {
            x: {
              display: true,
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'DD-MM-YYYY HH:mm',
                displayFormats: {
                  day: 'DD-MM-YYYY HH:mm'
                }
              },
              title: {
                display: true,
                text: 'Período medido'
              }
            },
            y: {
              display: true,
              beginAtZero: true,
              title: {
                display: true,
                text: 'AC Power(W)'
              },
              ticks: {
                callback: function(value) {
                  return value.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                }
              }
            }
          },
          plugins: {
            tooltip: {
              mode: 'nearest', // Exibe o tooltip mais próximo ao posicionar o mouse sobre o gráfico
              intersect: false, // Permite que o tooltip seja exibido mesmo fora dos pontos da linha
              callbacks: {
                label: function(context) {
                  var value = context.parsed.y.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                  return value;
                }
              }
            },
            datalabels: {
              display: false // Oculta os valores da linha
            }
          }
        }
      })

      })
  }
  
  createChart()
})

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

  Chart.register(ChartDataLabels)

  function createChart() {
    var fromDate = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm')
    var toDate = moment().endOf('day').format('YYYY-MM-DD HH:mm')
  
    // Verificar se as datas foram preenchidas no formulário
    var deInput = document.getElementById('de')
    var ateInput = document.getElementById('ate')
  
    if (deInput.value && ateInput.value) {
      fromDate = moment(deInput.value, 'DD/MM/YYYY').startOf('day').format('YYYY-MM-DD HH:mm')
      toDate = moment(ateInput.value, 'DD/MM/YYYY').endOf('day').format('YYYY-MM-DD HH:mm')
    }
  
    // Carregue os dados do arquivo CSV usando a biblioteca d3.js
    d3.csv('/data').then(function (data) {
      // Formate as datas no formato correto
      var parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S')
      var formattedDates = []
      var acPowerValues = []

      data.forEach(function (d) {
        d.DATE_TIME = parseDate(d.DATE_TIME)
        d.AC_POWER = +d.AC_POWER

        formattedDates.push(d.DATE_TIME)
        acPowerValues.push(d.AC_POWER)
      })
      console.log(formattedDates)
      console.log(acPowerValues)
  
      // Extrai as datas e os valores da AC_POWER em arrays separados
      var labels = data.map(function (d) { return moment(d.DATE_TIME).format('HH:mm:ss') })
      var values = data.map(function (d) { return d.AC_POWER })
      console.log(labels)
      console.log(values)
  
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
            fill: false,
            borderColor: 'rgba(233, 147, 71, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'YYYY-MM-DD HH:mm',
                displayFormats: {
                  day: 'YYYY-MM-DD HH:mm'
                }
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'AC Power'
              }
            }
          }
        }
      })
    })
  }
  
  createChart()
})

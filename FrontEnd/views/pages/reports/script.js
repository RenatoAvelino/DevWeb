const moment = window.moment

Chart.register(ChartDataLabels)

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

function createChart() {
  // Carregue os dados do arquivo CSV usando a biblioteca d3.js
  d3.csv('/data').then(function (data) {
    // Formate as datas no formato correto
    var parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S')
    data.forEach(function (d) {
      d.DATE_TIME = parseDate(d.DATE_TIME)
      d.AC_POWER = +d.AC_POWER
    })

    // Agrupe os dados pela data e calcule a soma da AC_POWER
    var groupedData = d3.group(data, function (d) {
      return d.DATE_TIME
    })
    var aggregatedData = Array.from(groupedData, function ([key, values]) {
      return { DATE_TIME: key, AC_POWER: d3.sum(values, function (d) { return d.AC_POWER }) }
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
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
              displayFormats: {
                day: 'YYYY-MM-DD HH:mm:ss'
              }
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    })
  })
}

// Chame as funções createChart() e alterarImagens() quando a página for carregada
window.addEventListener('DOMContentLoaded', function () {
  alterarImagens()
  createChart()
})

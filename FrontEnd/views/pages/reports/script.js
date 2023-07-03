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

  const clickFilterButton = document.getElementById('Filtrar');

  const BaseUrl = 'http://localhost:8000'

  const userId = localStorage.getItem("customerId")
  const EndPoint = BaseUrl + '/solardata/' + userId
  Chart.register(ChartDataLabels)

  function createChart(deInput = 0, ateInput = 0) { 
    fetch(EndPoint)
      .then(response => response.text())
      // Carregue os dados do arquivo CSV usando a biblioteca d3.js
      .then(csvData => {
        var parsedData = d3.csvParse(csvData)
        var data = parsedData

        var acPowerValues = data.map(d => +d.AC_POWER) // Extrai os valores de AC_POWER como números

        // Calcula a soma total da AC_POWER em Watts
        var totalACPower = d3.sum(acPowerValues)

        var firstDateTime = moment(data[0].DATE_TIME, 'YYYY-MM-DD HH:mm')
        var lastDateTime = moment(data[data.length - 1].DATE_TIME, 'YYYY-MM-DD HH:mm')
        var diffHours = lastDateTime.diff(firstDateTime, 'hours')

        // Calcula o KWHTotal
        var KWHTotal = totalACPower * diffHours / 1000

        var formattedDates = []
        var acPowerValues = []
      
        if (deInput != 0 && ateInput != 0) {
          deInput = new Date(deInput)
          ateInput = new Date(ateInput)

          var fromDate = moment(deInput, 'DD/MM/YYYY').add(3, 'hours')
          fromDate = fromDate.startOf('day').format('YYYY-MM-DD HH:mm')
          var toDate = moment(ateInput, 'DD/MM/YYYY').endOf('day').format('YYYY-MM-DD HH:mm')

          fromDate = new Date(fromDate)
          toDate = new Date(toDate)
        } else{
          var lastDate = data[data.length - 1]
          var toDate = moment(lastDate.DATE_TIME, 'YYYY-MM-DD HH:mm')
          var fromDate = toDate.clone().subtract(0, 'day').startOf('day')

          fromDate = new Date(fromDate._d)
          toDate = new Date(toDate._d)
        }

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

      // Obtém o valor total da AC_POWER
      var totalACPower = d3.sum(Array.from(groupedData.values()))

      var diffHours = Math.abs(toDate - fromDate) / 36e5;

      var KWH = totalACPower*diffHours/1000

      atualizarNumbers(KWH, KWHTotal)

      var aggregatedData = Array.from(groupedData, function ([key, value]) {
        return { DATE_TIME: key, AC_POWER: value }
      })

      // Extrai as datas e os valores da AC_POWER em arrays separados
      var labels = aggregatedData.map(function (d) { return d.DATE_TIME })
      var values = aggregatedData.map(function (d) { return d.AC_POWER })
    
      // Cria um elemento canvas para renderizar o gráfico
      var canvas = document.createElement('canvas')
      canvas.setAttribute('id', 'canvas')
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
  

  async function atualizarNumbers(KWH, KWHTotal){
      try{
        const gerado = document.getElementById("Gerado")
        const dinheiro = document.getElementById("Dinheiro")
        const carvao = document.getElementById("Carvao")
        const arvore = document.getElementById("Arvore")
        const co = document.getElementById("CO2")
        
        
        let _co = 0.0426*KWHTotal
        let _carvao = _co/2.86

        let _arvore = Math.round(_co/10)
        
        let _dinheiro = 0.709*KWH

        let _KWH = KWH.toFixed(2) 
        _dinheiro = _dinheiro.toFixed(2)
        _co = _co.toFixed(2)
        _carvao = _carvao.toFixed(2)

        var formatoBrasileiro = {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }

        gerado.innerHTML = parseFloat(_KWH).toLocaleString('pt-BR', formatoBrasileiro)
        dinheiro.innerHTML = parseFloat(_dinheiro).toLocaleString('pt-BR', formatoBrasileiro)
        carvao.innerHTML = parseFloat(_carvao).toLocaleString('pt-BR', formatoBrasileiro)
        arvore.innerHTML = parseFloat(_arvore).toLocaleString('pt-BR', formatoBrasileiro)
        co.innerHTML = parseFloat(_co).toLocaleString('pt-BR', formatoBrasileiro)
    }
    catch (error) {
      console.error('Ocorreu um erro:', error)
    }
  }

  clickFilterButton.addEventListener("click", () => {
    // Verificar se as datas foram preenchidas no formulário
    var deInput = document.getElementById('de')
    var ateInput = document.getElementById('ate')

    var canvas = this.document.getElementById("canvas")
    if(canvas){
      canvas.remove()
    } else{
      console.log("Não existe")
    }

    createChart(deInput.value, ateInput.value)
  })
})

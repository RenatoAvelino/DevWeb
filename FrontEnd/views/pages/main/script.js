document.addEventListener('DOMContentLoaded', () => {
    const BaseUrl = 'http://localhost:8000'

    const name = document.getElementById("name")
    const phone = document.getElementById("phone")
    const cpf = document.getElementById("cpf")
    const address = document.getElementById("address")

    const gerado = document.getElementById("Gerado")
    const dinheiro = document.getElementById("Dinheiro")
    const moment = window.moment
  
    // Obtem variaveis do armazenamento local
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("customerId")

    const endpointUser = BaseUrl + "/customerUser-by-id/" + userId
    const endpointBigNumbers = BaseUrl + '/solardata/' + userId

    const headers = {
      Authorization: token
    }
    
    fetch(endpointUser, { headers })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error(`Status da requisição: ${res.status}`)
        }
      })
      .then(dados => {
        name.innerHTML = dados.name
        phone.innerHTML = dados.phone
        cpf.innerHTML = dados.cpf
        address.innerHTML = dados.address
      })
      .catch(error => {
        console.error(`Erro ao carregar as informações do Usuário: ${error.message}`)
        //window.location.href = "/" // Redirecionar para a página "/"
      })        

    fetch(endpointBigNumbers)
      .then(response => response.text())
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
        
        //----------------------------------------------------------------------------------
        var _dinheiro = 0.709*KWHTotal

        let _KWH = KWHTotal.toFixed(2) 
        _dinheiro = _dinheiro.toFixed(2)

        var formatoBrasileiro = {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }

        gerado.innerHTML = parseFloat(_KWH).toLocaleString('pt-BR', formatoBrasileiro)
        dinheiro.innerHTML = parseFloat(_dinheiro).toLocaleString('pt-BR', formatoBrasileiro)
      })
      .catch(error => {
        console.error(`Erro ao carregar as informações dos Big Numbers: ${error.message}`)
        //window.location.href = "/" // Redirecionar para a página "/"
      })  
})
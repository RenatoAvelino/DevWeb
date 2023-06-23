function addClientesToTable() {
    const BaseUrl = 'http://localhost:8000'
    const token = localStorage.getItem("token")

    const endpointCustomers = BaseUrl + "/get-all-customers"

    const headers = {
        Authorization: token
    }

    const fetchClientes = () => {
        fetch(endpointCustomers, { headers })
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
            throw new Error(`Status da requisição: ${res.status}`)
            }
        })
        .then(dados => {
            console.log(dados)
            const clientes = dados
            const tabelaClientes = document.querySelector("#ClientTable table")
            clientes.forEach(cliente => {
                const row = document.createElement("tr")
                const nomeCol = document.createElement("td")
                const clienteIdCol = document.createElement("td")
                const acoesCol = document.createElement("td")

                nomeCol.innerText = cliente.name
                clienteIdCol.innerText = cliente.id

                const updateLink = document.createElement("a")
                //updateLink.href = "/settings"
                updateLink.className = "btn-link"
                updateLink.innerText = "Update"
                const updateBtn = document.createElement("button")
                updateBtn.type = "submit"
                updateBtn.id = "View"
                updateBtn.appendChild(updateLink)

                const deleteBtn = document.createElement("button")
                deleteBtn.type = "submit"
                deleteBtn.id = "Delete"
                deleteBtn.innerText = "Delete"

                const viewLink = document.createElement("a")
                viewLink.href = "/reports"
                viewLink.className = "btn-link"
                viewLink.innerText = "View"
                const viewBtn = document.createElement("button")
                viewBtn.type = "submit"
                viewBtn.id = "View"
                viewBtn.appendChild(viewLink)

                acoesCol.appendChild(updateBtn)
                acoesCol.appendChild(deleteBtn)
                acoesCol.appendChild(viewBtn)

                row.appendChild(nomeCol)
                row.appendChild(clienteIdCol)
                row.appendChild(acoesCol)

                tabelaClientes.appendChild(row)

                updateBtn.addEventListener('click', function() {
                    const clienteId = cliente.id
                    localStorage.setItem('customerId', clienteId)
                    window.location.href = '/settings'
                })
            })

        })
        .catch(error => {
            console.error(`Erro ao carregar as informações dos clientes: ${error.message}`)
            window.location.href = "/"
        })
    }

    fetchClientes()
}


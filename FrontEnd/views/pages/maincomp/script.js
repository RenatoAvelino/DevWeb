function addClientesToTable() {
  const BaseUrl = 'http://localhost:8000';
  const token = localStorage.getItem("token");

  const endpointCustomers = BaseUrl + "/get-all-customers";

  const headers = {
    Authorization: token
  };

  const fetchClientes = () => {
    fetch(endpointCustomers, { headers })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(`Status da requisição: ${res.status}`);
        }
      })
      .then(dados => {
        const clientes = dados;
        const tabelaClientes = document.querySelector("#ClientTable table");
        clientes.forEach(cliente => {
          const row = document.createElement("tr");
          const nomeCol = document.createElement("td");
          const clienteIdCol = document.createElement("td");
          const acoesCol = document.createElement("td");

          nomeCol.innerText = cliente.name;
          clienteIdCol.innerText = cliente.id;

          const updateLink = document.createElement("a");
          updateLink.className = "btn-link";
          updateLink.innerText = "Update";
          const updateBtn = document.createElement("button");
          updateBtn.type = "submit";
          updateBtn.id = "View";
          updateBtn.appendChild(updateLink);

          const deleteBtn = document.createElement("button");
          deleteBtn.type = "submit";
          deleteBtn.id = "Delete";
          deleteBtn.innerText = "Delete";

          const viewLink = document.createElement("a");
          viewLink.className = "btn-link";
          viewLink.innerText = "View";
          const viewBtn = document.createElement("button");
          viewBtn.type = "submit";
          viewBtn.id = "View";
          viewBtn.appendChild(viewLink);

          acoesCol.appendChild(updateBtn);
          acoesCol.appendChild(deleteBtn);
          acoesCol.appendChild(viewBtn);

          row.appendChild(nomeCol);
          row.appendChild(clienteIdCol);
          row.appendChild(acoesCol);

          tabelaClientes.appendChild(row);

          updateBtn.addEventListener('click', function() {
            const clienteId = cliente.id;
            localStorage.setItem('customerId', clienteId);
            window.location.href = '/settings';
          });

          viewBtn.addEventListener('click', function() {
            const clienteId = cliente.id;
            localStorage.setItem('customerId', clienteId);
            window.location.href = '/reports';
          });

          deleteBtn.addEventListener('click', function() {
            const clienteId = cliente.id;
            localStorage.setItem('customerId', clienteId);
            const endpoint = BaseUrl + '/customerUser-delete/' + clienteId;

            fetch(endpoint, {
              method: 'DELETE',
              headers: headers
            })
              .then(res => {
                if (res.status === 200) {
                  return res.json();
                } else {
                  throw new Error(`Status da requisição: ${res.status}`);
                }
              })
              .then(data => {
                console.log('Usuário deletado com sucesso');
                location.reload();
              })
              .catch(error => {
                console.error(`Erro ao deletar usuário: ${error.message}`);
              });
          });
        });
      })
      .catch(error => {
        console.error(`Erro ao carregar as informações dos clientes: ${error.message}`);
        window.location.href = "/";
      });
  };

  fetchClientes();

  document.getElementById('NewCustomer').addEventListener('click', () => {
    window.location.href = '/NewCustomer';
  });

  const findCustomerInput = document.getElementById('FindCustomer');
  findCustomerInput.addEventListener('keydown', event => {
    if (event.keyCode === 13) { // Verifica se a tecla pressionada é "Enter"
      const searchString = findCustomerInput.value;
      const searchEndpoint = `${BaseUrl}/customerUser-search/${searchString}`;
      fetch(searchEndpoint, { headers })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error(`Status da requisição: ${res.status}`);
          }
        })
        .then(dados => {
          const tabelaClientes = document.querySelector("#ClientTable table");
          tabelaClientes.innerHTML = `
            <tr>
              <th>Nome</th>
              <th>Cliente ID:</th>
              <th>Ações</th>
            </tr>
          `;
          dados.forEach(cliente => {
            const row = document.createElement("tr");
            const nomeCol = document.createElement("td");
            const clienteIdCol = document.createElement("td");
            const acoesCol = document.createElement("td");

            nomeCol.innerText = cliente.name;
            clienteIdCol.innerText = cliente.id;

            const updateLink = document.createElement("a");
            updateLink.className = "btn-link";
            updateLink.innerText = "Update";
            const updateBtn = document.createElement("button");
            updateBtn.type = "submit";
            updateBtn.id = "View";
            updateBtn.appendChild(updateLink);

            const deleteBtn = document.createElement("button");
            deleteBtn.type = "submit";
            deleteBtn.id = "Delete";
            deleteBtn.innerText = "Delete";

            const viewLink = document.createElement("a");
            viewLink.className = "btn-link";
            viewLink.innerText = "View";
            const viewBtn = document.createElement("button");
            viewBtn.type = "submit";
            viewBtn.id = "View";
            viewBtn.appendChild(viewLink);

            acoesCol.appendChild(updateBtn);
            acoesCol.appendChild(deleteBtn);
            acoesCol.appendChild(viewBtn);

            row.appendChild(nomeCol);
            row.appendChild(clienteIdCol);
            row.appendChild(acoesCol);

            tabelaClientes.appendChild(row);

            updateBtn.addEventListener('click', function() {
              const clienteId = cliente.id;
              localStorage.setItem('customerId', clienteId);
              window.location.href = '/settings';
            });

            viewBtn.addEventListener('click', function() {
              const clienteId = cliente.id;
              localStorage.setItem('customerId', clienteId);
              window.location.href = '/reports';
            });

            deleteBtn.addEventListener('click', function() {
              const clienteId = cliente.id;
              localStorage.setItem('customerId', clienteId);
              const endpoint = BaseUrl + '/customerUser-delete/' + clienteId;

              fetch(endpoint, {
                method: 'DELETE',
                headers: headers
              })
                .then(res => {
                  if (res.status === 200) {
                    return res.json();
                  } else {
                    throw new Error(`Status da requisição: ${res.status}`);
                  }
                })
                .then(data => {
                  console.log('Usuário deletado com sucesso');
                  location.reload();
                })
                .catch(error => {
                  console.error(`Erro ao deletar usuário: ${error.message}`);
                });
            });
          });
        })
        .catch(error => {
          console.error(`Erro ao pesquisar clientes: ${error.message}`);
        });
    }
  });
}

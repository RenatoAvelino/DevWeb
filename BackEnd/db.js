const conectar = async () => {
    try {
      if (global.conexao && global.conexao.state != 'disconnected')
        return global.conexao;
  
      const mysql = require('mysql2/promise');
      const con = await mysql.createConnection("mysql://root:password@localhost:3306/followthesolar");
      global.conexao = con;
      return con;
    } catch (error) {
        throw new Error('Não foi possível conectar ao banco de dados.')
      }
  }

module.exports = {conectar}
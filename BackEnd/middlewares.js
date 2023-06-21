require("dotenv-safe").config()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

function verifyJWT(req, res, next) {
    let token = req.headers.authorization // Buscar o token no header

    if (!token) {
      // Se o token não estiver no header, verificar se está no body
      token = req.body.token
    } 
    
    if(!token) {
        // Caso o token não seja encontrado nem no header nem no body
        return res.status(401).json({ error: "Token não fornecido" })
    }
    
    const [scheme, bearerToken] = token.split(" ")

    if (!scheme || !bearerToken || scheme !== "Bearer") {
      // Caso o token não esteja no formato "Bearer"
      return res.status(401).json({ error: "Token com formato inválido" })
    }

    // Remove o prefixo "Bearer " do token
    token = bearerToken
 

    try {
        const decoded = jwt.verify(token, process.env.SECRET)

        if (decoded && decoded.category) {
        const user = {
            id: decoded.userid,
            category: decoded.category
        };
        req.user = user
        next()
        } else {
        res.status(400).json({ error: 'Token JWT inválido' })
        }
    } catch (error) {
        console.error('Erro ao decodificar o token JWT:', error)
        res.status(500).json({ error: 'Erro ao decodificar o token JWT' })
    }
}

// Middleware de autorização para categoria "Admin"
function authorizeAdmin(req, res, next) {
    if (req.user && req.user.category === 'Admin') {
        next()
    } else {
        res.status(403).json({ error: 'Acesso não autorizado' })
    }
}

// Middleware de autorização para categoria "Company"
function authorizeCompany(req, res, next) {
    if (req.user && (req.user.category === 'Company' || req.user.category === 'Admin')) {
        next()
    } else {
        res.status(403).json({ error: 'Acesso não autorizado' })
    }
}

// Middleware de autenticação geral
function authenticate(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.status(401).json({ error: 'Não autenticado' })
    }
}

module.exports = {
    verifyJWT,
    authenticate,
    authorizeCompany,
    authorizeAdmin
}
import jwt from 'jsonwebtoken'

export const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acesso negado. Token não fornecido.' })
  }

  try {
    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET,
    )
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' })
  }
}

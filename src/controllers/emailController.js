import db from '../models/index.js'
import jwt from 'jsonwebtoken'

const { User } = db

export const confirmEmail = async (req, res) => {
  const { token } = req.query

  if (!token) {
    return res.status(400).json({ message: 'Token não fornecido.' })
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decode.userId)

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    user.isEmailConfirmed = true
    await user.save()

    return res.status(200).json({ message: 'E-mail confirmado com sucesso!' })
  } catch {
    return res.status(400).json({ message: 'Token inválido ou expirado.' })
  }
}

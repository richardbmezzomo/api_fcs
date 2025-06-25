import db from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const { User } = db

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas!' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas!' })
    }

    if (!user.isEmailConfirmed) {
      return res
        .status(403)
        .json({ message: 'Confirme seu e-mail para fazer login!' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    })

    return res.json({
      message: 'Login bem-sucedido!',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erro ao fazer login' })
  }
}

import bcrypt from 'bcrypt'

export const hashPassword = async (req, res, next) => {
  const { password } = req.body

  try {
    const saltRounds = 10
    req.body.password = await bcrypt.hash(password, saltRounds)
    next()
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criptografar senha' })
  }
}

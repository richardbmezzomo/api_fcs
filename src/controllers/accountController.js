import db from '../models/index.js'

const { Account } = db

export const createAccount = async (req, res) => {
  try {
    const { name } = req.body
    const userId = req.user.userId

    if (!name) {
      return res.status(400).json({ message: 'O nome da conta é obrigatório.' })
    }

    const existingAccount = await Account.findOne({ where: { name, userId } })

    if (existingAccount) {
      return res
        .status(409)
        .json({ message: 'Já existe uma conta com esse nome!' })
    }

    const newAccount = await Account.create({ name, userId })

    return res.status(201).json({ newAccount })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getAllAccounts = async (req, res) => {
  try {
    const userId = req.user.userId

    const allAccounts = await Account.findAll({ where: { userId } })

    return res.status(201).json({ allAccounts })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getAccountById = async (req, res) => {
  try {
    const userId = req.user.userId
    const { id } = req.params

    const accountById = await Account.findOne({ where: { userId, id } })
    console.log(accountById)

    if (!accountById) {
      return res.status(404).json({ message: 'Conta não encontrada!' })
    }

    return res.status(200).json(accountById)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const updateAccount = async (req, res) => {
  try {
    const userId = req.user.userId
    const { name, id } = req.body

    const account = await Account.findOne({ where: { userId, id } })

    if (!account) {
      return res.status(404).json({ message: 'Conta não encontrada!' })
    }

    account.name = name

    await account.save()
    return res.status(201).json(account)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const deleteAccont = async (req, res) => {
  try {
    const userId = req.user.userId

    const { id } = req.params

    const account = await Account.findOne({ where: { userId, id } })

    if (!account) {
      return req.status(404).json({ message: 'Conta não encontrada!' })
    }

    await account.destroy()

    return res.status(201).json({ message: 'Conta deletada com sucesso!' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

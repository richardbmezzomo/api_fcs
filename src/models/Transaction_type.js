import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const TransactionType = sequelize.define('Transaction_type', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  })
  return TransactionType
}

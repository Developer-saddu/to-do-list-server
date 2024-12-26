module.exports = function (sequelize, DataTypes) {
  const Tasks = sequelize.define(
    "Tasks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      taskName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      remark: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM("PENDING", "COMPLETED"),
        defaultValue: "PENDING"
      }
    },
    {
      sequelize,
      tableName: "Tasks",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        }
      ]
    }
  );

  return Tasks;
};

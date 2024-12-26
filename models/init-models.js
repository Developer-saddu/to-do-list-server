const DataTypes = require("sequelize").DataTypes;
const _SequelizeMeta = require("./SequelizeMeta");
const _tasks = require("./task");

function initModels(sequelize) {
  const SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  const tasks = _tasks(sequelize, DataTypes);

  return {
    SequelizeMeta,
    tasks
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

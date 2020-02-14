
module.exports = (sequelize, DataTypes) => {
  const Scribble = require('./scribble')(sequelize, DataTypes)
  let Process = sequelize.define("Process", {
    scribbleId: {
      type: DataTypes.INTEGER,

      references: {
        model: Scribble,

        // This is the column name of the referenced model
        key: "id"
      }
    },
    title: DataTypes.STRING,
    timeStamp: DataTypes.DATE
  });

  return Process;
};

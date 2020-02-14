module.exports = (sequelize, DataTypes) => {
	const User = require('./user')(sequelize, DataTypes);

	let Scribble = sequelize.define('Scribble', {
		userId: {
			type: DataTypes.INTEGER,

			references: {
				model: User,
				key: 'id'
			}
		},
		actionType: DataTypes.INTEGER,
		lifeCategory: DataTypes.INTEGER,
		emotion: DataTypes.INTEGER,
		liveTime: DataTypes.DATE
	});

	return Scribble;
};

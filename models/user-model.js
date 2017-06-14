
module.exports = function (sequelize, Sequelize) {
	var Creds = sequelize.define('credentials', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
		user_id: { type: Sequelize.INTEGER, notEmpty: true },
		account: { type: Sequelize.STRING, notEmpty: true },
		token: { type: Sequelize.STRING },
		secret: { type: Sequelize.STRING },
		type: { type: Sequelize.STRING }
	}, {
			timestamps: false
		});
	return Creds;
}


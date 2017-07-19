
module.exports = function (sequelize, Sequelize) {
	var User = sequelize.define('users', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
		slug: { type: Sequelize.STRING },
		email: { type: Sequelize.STRING },
		logins: { type: Sequelize.INTEGER },
		latest: { type: Sequelize.INTEGER },
        created: { type: Sequelize.INTEGER },
        updated: { type: Sequelize.INTEGER },
        status: { type: Sequelize.STRING }
	}, {
			timestamps: false
		});
	return User;
}


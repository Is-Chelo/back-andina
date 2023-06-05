const moment = require('moment');
const usersTransform = (user, index) => {
	return {
		index,
		id: user.id,
		rol_name: user.role.name,
		rol_id: user.role.dataValues.id,
		user_name: user.name,
		user_last_name: user.last_name,
		user_date_birth: user.date_birth,
		user_cellphone: user.cellphone,
		user_ci_number: user.ci_number,
		user_email: user.email,
		user_username: user.username,
	};
};
module.exports = {
	usersTransform,
};

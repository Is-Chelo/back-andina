const moment = require('moment');
const usersTransformReport = (user) => {
	return {
		id: user.id,
		user_name: user.name,
		user_last_name: user.last_name,
		user_date_birth: moment(user.date_birth).format('YYYY-MM-DD'),
		user_cellphone: user.cellphone,
		user_ci_number: user.ci_number,
		user_username: user.username,
		rol_name: user.role.name,
	};
};
module.exports = {
	usersTransformReport,
};

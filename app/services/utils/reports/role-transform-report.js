const moment = require('moment');
const roleTransformReport = (role) => {
	return {
		id: role.id,
		name: role.name,
		active: Boolean(role.active),
		created: moment(role.createdAt).format('DD/MM/YYYY HH:mm:ss'),
	};
};



module.exports = {
	roleTransformReport,
};

const moment = require('moment');
const roleTransform = (role, index) => {
	return {
		index,
		id: role.id,
		name: role.name,
		uuid: role.uuid,
		active: Boolean(role.active),
		roleModule: role?.rolmodules ? role?.rolmodules : [],
		created: moment(role.createdAt).format('DD/MM/YYYY HH:mm:ss'),
	};
};

const roleModuleTransform = (roleModule) => {
	const data = {
		id: roleModule.dataValues.id,
		ok_select: roleModule.dataValues.ok_select,
		ok_update: roleModule.dataValues.ok_update,
		ok_insert: roleModule.dataValues.ok_insert,
		ok_delete: roleModule.dataValues.ok_delete,
		module_name: roleModule?.modulo?.name,
		module_url: roleModule?.modulo?.url,
		module_id: roleModule?.modulo?.id,
		module_type: roleModule?.modulo?.type,
	};
	return data;
};

module.exports = {
	roleTransform,
	roleModuleTransform,
};

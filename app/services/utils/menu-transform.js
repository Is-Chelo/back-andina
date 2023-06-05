const moment = require('moment');
const menuTransform = (menu, index) => {
	return {
		index,
		id: menu.modulo.dataValues.id,
		name: menu.modulo.dataValues.name,
		url: menu.modulo.dataValues.url,
		icon: menu.modulo.dataValues.icon,
		type: menu.modulo.dataValues.type,
		path_front: menu.modulo.dataValues.path_front,
	};
};
module.exports = {
	menuTransform,
};

const moment = require('moment');

const moduleTransform = (moduleWithRelation, index) => {
	return {
		index,
		id: moduleWithRelation.id,
		name: moduleWithRelation.name,
		path_front: moduleWithRelation.path_front,
		type: moduleWithRelation.type,
		created: moment(moduleWithRelation.createdAt).format('DD/MM/YYYY HH:mm:ss'),
	};
};
module.exports = {
	moduleTransform,
};

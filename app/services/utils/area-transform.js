const moment = require('moment');
const {coordinadorTransform} = require('./coordinador-transform');
const areaTransform = (area, index = 1) => {
	const coordinador = Object.values(area?.area_coordinadors).map((coodinador, index) => {
		return coordinadorTransform(coodinador.dataValues.coordinador, index + 1);
	});
	return {
		index,
		id: area.id,
		name: area.name,
		active: Boolean(area.active),
		created: moment(area.createdAt).format('DD/MM/YYYY'),
		total_coordinadores: area?.area_coordinadors?.length,
		coordinadors: coordinador,
	};
};
module.exports = {
	areaTransform,
};

const moment = require('moment');
const programTransform = (program, index) => {
	return {
		index,
		id: program.id,
		name: program.name + '   - versión: ' + program.version,
		sede: program.sede,
		version: program.version,
		// name_version: program.name + '   - versión: ' + program.version,
		active: program.active,
		resolution_number: program.resolution_number,
		date_init: program.date_init,
		date_end: program.date_end,
		area_name: program?.area?.dataValues?.name,
		id_area: program?.area?.dataValues?.id,
		total_students: program?.total_matricula,
	};
};
module.exports = {
	programTransform,
};

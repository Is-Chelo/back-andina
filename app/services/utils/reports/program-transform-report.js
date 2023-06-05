const moment = require('moment');
const programTransformReport = (program) => {
	return {
		id: program.id,
		name: program.name,
		sede: program.sede,
		version: program.version,
		date_init: moment(program.date_init).format('DD/MM/YYYY'),
		date_end: moment(program.date_end).format('DD/MM/YYYY'),
		area_name: program?.area?.dataValues?.name,
		active: program.active,
	};
};
module.exports = {
	programTransformReport,
};

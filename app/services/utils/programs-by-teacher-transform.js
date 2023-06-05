const moment = require('moment');
const programsByTeacherTransform = (subject) => {
	return {
		id: subject.id,
		name: subject.name,
		descripcion: subject.descripcion,
		active: subject.active,
		program_id: subject?.program?.dataValues.id,
		program_name: subject?.program?.dataValues.name,
	};
};
module.exports = {
	programsByTeacherTransform,
};

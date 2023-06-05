const moment = require('moment');
const subjectTransformReporte = (subject) => {
	return {
		id: subject.id,
		name: subject.name,
		academics_hours: subject.academics_hours,
		program_name: subject?.program?.dataValues.name,
		teacher_full_name: `${subject?.teacher?.dataValues.person.dataValues.name} ${subject?.teacher?.dataValues.person.dataValues.last_name}`,
		created: moment(subject.created_at).format('DD/MM/YYYY'),
		active: subject.active,
	};
};
module.exports = {
	subjectTransformReporte,
};

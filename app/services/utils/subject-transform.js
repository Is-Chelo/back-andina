const moment = require('moment');
const subjectTransform = (subject, index) => {
	return {
		index,
		id: subject.id,
		name: subject.name,
		academics_hours: subject.academics_hours,
		active: subject.active,
		program_id: subject?.program?.dataValues.id,
		program_name: subject?.program?.dataValues.name,
		teacher_id: subject?.teacher?.dataValues.id,
		teacher_full_name: `${subject?.teacher?.dataValues.person.dataValues.name} ${subject?.teacher?.dataValues.person.dataValues.last_name}`,
		created: moment(subject.created_at).format('DD/MM/YYYY'),
	};
};
module.exports = {
	subjectTransform,
};

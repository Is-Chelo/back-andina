const moment = require('moment');
const teacherTransformReport = (teacherWithRelations) => {
	return {
		id: teacherWithRelations.id,
		person_name: teacherWithRelations?.person?.dataValues.name,
		person_last_name: teacherWithRelations?.person?.dataValues.last_name,
		person_ci_number: teacherWithRelations?.person?.dataValues.ci_number,
		person_date_birth:  moment(teacherWithRelations?.person?.dataValues.date_birth).format('DD/MM/YYYY'),
		person_cellphone: teacherWithRelations?.person?.dataValues.cellphone,
		active: teacherWithRelations.active,
	};
};
module.exports = {
	teacherTransformReport,
};

const moment = require('moment');
const gradesTransform = (grades) => {
	return {
		id: grades.id,
		qualification: grades.qualification,
		average: grades.average,
		approved: grades.approved,
		person_name: grades.student?.dataValues.person?.dataValues.name,
		person_last_name: grades.student?.dataValues.person?.dataValues.last_name,
		person_email: grades.student?.dataValues.person?.dataValues.email,
		person_ci: grades.student?.dataValues.person?.dataValues.ci_number,
		person_full_name: `${grades.student?.dataValues.person?.dataValues.name} ${grades.student?.dataValues.person?.dataValues.last_name}`,
		person_id: grades.student?.dataValues.person?.dataValues.id,
		person_cellphone: grades.student?.dataValues.person?.dataValues.cellphone,
		student_id: grades.student?.dataValues.id,
	};
};
module.exports = {
	gradesTransform,
};

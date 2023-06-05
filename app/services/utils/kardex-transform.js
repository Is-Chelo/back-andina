const moment = require('moment');
const kardexTransform = (grades) => {
	return {
		id: grades.id,
		qualification: grades.qualification,
		approved: grades.approved,
		subject_name: grades?.subject?.name,
		subject_id: grades?.subject?.id,
		program_id: grades?.program?.id,
		program_name: grades?.program?.name,
		matricula_name: `${grades?.matricula?.order} / ${grades?.matricula?.gestion} `,
	};
};
module.exports = {
	kardexTransform,
};

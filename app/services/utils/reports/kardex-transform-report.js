const moment = require('moment');
const kardexTransformReporte = (grades) => {
	return {
		matricula_name: `${grades?.matricula?.order} / ${grades?.matricula?.gestion} `,
		program_name: grades?.program?.name,
		subject_name: grades?.subject?.name,
		qualification: grades.qualification,
		approved: grades.approved ? 'Aprobado' : 'Reprobado',
	};
};
module.exports = {
	kardexTransformReporte,
};

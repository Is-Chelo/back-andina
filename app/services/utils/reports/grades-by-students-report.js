const moment = require('moment');
const gradesTransformReporte = (grades) => {
	return {
		id: grades.id,
		person_full_name: `${grades.student?.dataValues.person?.dataValues.name} ${grades.student?.dataValues.person?.dataValues.last_name}`,
		person_cellphone: grades.student?.dataValues.person?.dataValues.cellphone,
		qualification: grades.qualification,
		approved: grades.approved ? "Aprobado": "Reprobado" ,
	};
};
module.exports = {
	gradesTransformReporte,
};

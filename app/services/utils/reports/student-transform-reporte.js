const moment = require('moment');
const studentTransformReporte = (studentWithRelations) => {
	return {
		id: studentWithRelations.id,
		person_name: studentWithRelations?.person?.dataValues.name,
		person_last_name: studentWithRelations?.person?.dataValues.last_name,
		person_ci_number: studentWithRelations?.person?.dataValues.ci_number,
		person_date_birth: moment(studentWithRelations?.person?.dataValues.date_birth).format('DD/MM/YYYY') ,
		person_cellphone: studentWithRelations?.person?.dataValues.cellphone,
		active: studentWithRelations.active,

	};
};
module.exports = {
	studentTransformReporte,
};

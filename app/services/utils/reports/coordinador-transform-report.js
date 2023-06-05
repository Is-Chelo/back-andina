const moment = require('moment');
const coordinadorReportTransform = (coordinadorWithRelations) => {
	return {
		id: coordinadorWithRelations.id,
		person_name: coordinadorWithRelations?.person?.dataValues.name,
		person_last_name: coordinadorWithRelations?.person?.dataValues.last_name,
		person_ci_number: coordinadorWithRelations?.person?.dataValues.ci_number,
		person_date_birth: moment(coordinadorWithRelations?.person?.dataValues.date_birth).format(
			'DD/MM/YYYY'
		),
		person_cellphone: coordinadorWithRelations?.person?.dataValues.cellphone,
		active: coordinadorWithRelations.active,
	};
};
module.exports = {
	coordinadorReportTransform,
};

const moment = require('moment');
const matriculaTransformReport = (matricula) => {
	// studentWithRelations?.Person?.dataValues.ci_expedition;
	return {
		id: matricula.id,
		student_full_name: `${matricula.student?.dataValues.person?.dataValues.name} ${matricula.student?.dataValues.person?.dataValues.last_name}`,
		program_name: matricula.program?.dataValues.name,
		matricula_gestion: `${matricula.order}/ ${matricula.gestion}`,
		active: Boolean(matricula.active),
		created: moment(matricula.createdAt).format('DD/MM/YYYY'),
	};
};
module.exports = {
	matriculaTransformReport,
};

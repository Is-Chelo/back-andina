const moment = require('moment');
const matriculaTransform = (matricula, index) => {
	// studentWithRelations?.person?.dataValues.ci_expedition;
	return {
		index,
		id: matricula.id,
		person_name: matricula.student?.dataValues.person?.dataValues.name,
		person_last_name: matricula.student?.dataValues.person?.dataValues.last_name,
		student_full_name: `${matricula.student?.dataValues.person?.dataValues.name} ${matricula.student?.dataValues.person?.dataValues.last_name}`,
		student_id: matricula.student?.dataValues.id,
		program_id: matricula.program?.dataValues.id,
		program_name:
			matricula.program?.dataValues.name +
			' - version: ' +
			matricula.program?.dataValues.version,
		matricula_gestion: matricula.gestion,
		active: Boolean(matricula.active),
		created: moment(matricula.createdAt).format('DD/MM/YYYY'),
	};
};
module.exports = {
	matriculaTransform,
};

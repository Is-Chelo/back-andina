const matriculaByStudentTransform = (matricula) => {
	return {
		matricula_id: matricula.id,
		matricula_gestion: matricula.gestion,
		program_id: matricula.program.id,
		program_name: matricula.program.name,
		program_date_init: matricula.program.date_init,
		program_date_end: matricula.program.date_end,
		name_for_front: `${matricula.program.name} ${matricula.order}/${matricula.gestion}`,
	};
};
module.exports = {
	matriculaByStudentTransform,
};

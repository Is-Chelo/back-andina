const subjectsByProgramTransform = (subject) => {
	return {
		subject_id: subject.id,
		subject_name: subject.name,
		subject_descripcion: subject.descripcion,
		subject_active: subject.active,
		// subject_id: program?.Subjects?.dataValues.id,
		// subject_name: program?.Subjects?.dataValues.name,
	};
};
module.exports = {
	subjectsByProgramTransform,
};

const moment = require('moment');
const studentTransform = (studentWithRelations, index) => {
	return {
		index,
		id: studentWithRelations.id,
		student_type_rol: studentWithRelations.person.dataValues.role.dataValues.name,
		student_uuid: studentWithRelations.uuid,
		student_active: studentWithRelations.active,
		student_id_people: studentWithRelations.id_people,
		person_id: studentWithRelations?.person?.dataValues.id,
		person_name: studentWithRelations?.person?.dataValues.name,
		person_last_name: studentWithRelations?.person?.dataValues.last_name,
		person_email: studentWithRelations?.person?.dataValues.email,
		person_ci_number: studentWithRelations?.person?.dataValues.ci_number,
		person_ci_expedition: studentWithRelations?.person?.dataValues.ci_expedition,
		person_date_birth: studentWithRelations?.person?.dataValues.date_birth,
		person_cellphone: studentWithRelations?.person?.dataValues.cellphone,
		person_picture_image: studentWithRelations?.person?.dataValues.picture_image,
		person_username: studentWithRelations?.person?.dataValues.username,
		person_full_name: `${studentWithRelations?.person?.dataValues.name} ${studentWithRelations?.person?.dataValues.last_name}`,
	};
};
module.exports = {
	studentTransform,
};

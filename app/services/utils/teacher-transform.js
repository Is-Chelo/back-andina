const moment = require('moment');
const teacherTransform = (teacherWithRelations, index) => {
	return {
		index,
		id: teacherWithRelations.id,
		teacher_type_rol: teacherWithRelations.person.dataValues.role.dataValues.name,
		teacher_uuid: teacherWithRelations.uuid,
		teacher_academics_hours: teacherWithRelations.academics_hours,
		teacher_active: teacherWithRelations.active,
		teacher_id_people: teacherWithRelations.id_people,
		person_id: teacherWithRelations?.person?.dataValues.id,
		person_name: teacherWithRelations?.person?.dataValues.name,
		person_last_name: teacherWithRelations?.person?.dataValues.last_name,
		person_email: teacherWithRelations?.person?.dataValues.email,
		person_ci_number: teacherWithRelations?.person?.dataValues.ci_number,
		person_ci_expedition: teacherWithRelations?.person?.dataValues.ci_expedition,
		person_date_birth: teacherWithRelations?.person?.dataValues.date_birth,
		person_cellphone: teacherWithRelations?.person?.dataValues.cellphone,
		person_picture_image: teacherWithRelations?.person?.dataValues.picture_image,
		person_username: teacherWithRelations?.person?.dataValues.username,
		person_full_name: `${teacherWithRelations?.person?.dataValues.name} ${teacherWithRelations?.person?.dataValues.last_name}`,
	};
};
module.exports = {
	teacherTransform,
};

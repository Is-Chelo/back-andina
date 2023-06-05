const moment = require('moment');
const coordinadorTransform = (coordinadorWithRelations, index) => {
	return {
		index,
		id: coordinadorWithRelations.id,
		coordinador_type_rol: coordinadorWithRelations.person.dataValues.role.dataValues.name,
		coordinador_uuid: coordinadorWithRelations.uuid,
		coordinador_active: coordinadorWithRelations.active,
		coordinador_id_people: coordinadorWithRelations.id_people,
		person_id: coordinadorWithRelations?.person?.dataValues.id,
		person_name: coordinadorWithRelations?.person?.dataValues.name,
		person_last_name: coordinadorWithRelations?.person?.dataValues.last_name,
		person_email: coordinadorWithRelations?.person?.dataValues.email,
		person_ci_number: coordinadorWithRelations?.person?.dataValues.ci_number,
		person_ci_expedition: coordinadorWithRelations?.person?.dataValues.ci_expedition,
		person_date_birth: coordinadorWithRelations?.person?.dataValues.date_birth,
		person_cellphone: coordinadorWithRelations?.person?.dataValues.cellphone,
		person_picture_image: coordinadorWithRelations?.person?.dataValues.picture_image,
		person_username: coordinadorWithRelations?.person?.dataValues.username,
		person_full_name: `${coordinadorWithRelations?.person?.dataValues.name} ${coordinadorWithRelations?.person?.dataValues.last_name}`,
	};
};
module.exports = {
	coordinadorTransform,
};

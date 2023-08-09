const moment = require('moment');

const teacherContractsTransform = (contract, index = 1) => {
	return {
		index,
		id: contract.id,
		teacher_id: contract.teacher_id,
		teacher_full_name: `${contract.teacher.dataValues.person.dataValues.name} ${contract.teacher.dataValues.person.dataValues.last_name}`,
		date_init: contract.date_init,
		date_end: contract.date_end,
		contract_number: contract.contract_number,
		active: Boolean(contract.active),
	};
};
module.exports = {
	teacherContractsTransform,
};

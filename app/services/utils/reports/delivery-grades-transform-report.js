const moment = require('moment');
const deliveryGradesTransform = (deliveryGradesTransform) => {
	return {
		id: deliveryGradesTransform.id,
		start_time: moment(deliveryGradesTransform.start_time).format('DD/MM/YYYY'),
		close_time: moment(deliveryGradesTransform.close_time).format('DD/MM/YYYY'),
		active: deliveryGradesTransform.active,
	};
};
module.exports = {
	deliveryGradesTransform,
};

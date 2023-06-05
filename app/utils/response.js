const NotFoundResponse = async (message = 'Dato no encontrado') => {
	return {
		status: false,
		statusCode: 404,
		message: [message],
		error: 'Not Found',
	};
};
const BadRequest = (message = 'Dato no encontrado') => {
	return {
		statusCode: 400,
		status: false,
		message: [message],
		error: 'Bad Requets',
	};
};
const InternalServer = (message = 'Error en el servidor') => {
	return {
		statusCode: 500,
		status: false,
		message: [message],
		error: 'Internal Server error',
	};
};

module.exports = {
	NotFoundResponse,
	BadRequest,
	InternalServer,
};

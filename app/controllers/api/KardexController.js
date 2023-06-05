const kardexService = require('../../services/KardexService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async getByStudent(req, res) {
		const userAuth = req.user;
		const {idStudent, idProgram} = req.params;
		const response = await kardexService.kardexByStudent(idStudent,idProgram,userAuth);
		res.status(response.statusCode).json(response);
	},
	async reportAll(req, res) {
		const userAuth = req.user;
		const {idStudent} = req.params;
		const response = await kardexService.reporte(idStudent, userAuth);

		return pdfService.crearPdf(
			res,
			response.data.kardex,
			'Kardex Estudiantil',
			'kardex',
			response.data.student,
			response.data.promedio
		);
	},
};

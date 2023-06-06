const fs = require('fs');
const moment = require('moment');
const {translates} = require('../utils/translates');
const puppeteer = require('puppeteer');

const crearPdf = async (
	res,
	data,
	reporteName = 'Reporte',
	type = 'normal',
	stutendData = {},
	promedioStudent = 0
) => {
	let content = header() + `<center><h4>${reporteName}</h4></center>`;
	const now = new Date();
	let nameFile = reporteName.split(' ').join('-').toLowerCase();
	nameFile += '-' + moment(now).format('YYYY-MM-DD');
	if (type === 'kardex')
		content += headerKardex(
			stutendData.person_full_name,
			stutendData.person_ci_number,
			promedioStudent
		);
	if (type === 'grades')
		content += headerGrades(
			stutendData.person_full_name,
			stutendData.person_ci,
			`${promedioStudent} - ${stutendData.matricula_name}`
		);

	content += buildDataTable(data);

	const browser = await puppeteer.launch({
		headless: 'new',
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	const page = await browser.newPage();

	await page.setContent(content);
	await page.pdf({
		path: `./storage/${nameFile}.pdf`,
		format: 'Letter',
		margin: {bottom: '2cm', left: '1cm'},
	});

	await browser.close();

	// Descargar el archivo PDF
	const filePath = `./storage/${nameFile}.pdf`; // Ruta al archivo PDF generado

	// Verificar si el archivo existe
	if (fs.existsSync(filePath)) {
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', 'attachment; filename=nombre-del-archivo.pdf');

		const fileStream = fs.createReadStream(filePath);
		fileStream.pipe(res);
	} else {
		res.status(404).send('Archivo no encontrado');
	}
};

// const crearPdf = async (
// 	res,
// 	data,
// 	reporteName = 'Reporte',
// 	type = 'normal',
// 	stutendData = {},
// 	promedioStudent = 0
// ) => {
// 	let content = header() + `<center><h4>${reporteName}</h4></center>`;

// 	if (type === 'kardex')
// 		content += headerKardex(
// 			stutendData.person_full_name,
// 			stutendData.person_ci_number,
// 			promedioStudent
// 		);
// 	if (type === 'grades')
// 		content += headerGrades(
// 			stutendData.person_full_name,
// 			stutendData.person_ci,
// 			`${promedioStudent} - ${stutendData.matricula_name}`
// 		);

// 	content += buildDataTable(data);

// 	const options = {
// 		format: 'Letter',
// 		border: {
// 			bottom: '2cm',
// 			left: '1cm',
// 		},
// 	};
// 	const now = new Date();
// 	let nameFile = reporteName.split(' ').join('-').toLowerCase();
// 	nameFile += '-' + moment(now).format('YYYY-MM-DD');

// 	pdf.create(content, options).toFile(`./storage/${nameFile}.pdf`, function (err, result) {
// 		if (err) {
// 			console.log(err);
// 			res.status(500).send('Error al generar el PDF');
// 		} else {
// 			const filePath = result.filename;

// 			res.download(filePath, `${nameFile}.pdf`, function (err) {
// 				if (err) {
// 					console.log(err);
// 					res.status(500).send('Error al descargar el PDF');
// 				}
// 			});
// 		}
// 	});
// };

// TODO: HEADER PARA KARDEX
const headerKardex = (nameStudent, docIden, record) => {
	const content = `<table class="table kardex">
    <tr class="row">
        <td class="col-md-4" style="background-color:#ccc; border-bottom:1px solid #ccc">Nombre del Estudiante:</td>
        <td class="col-md-6" style="border-bottom:1px solid #ccc">${nameStudent}</td>
        <td class="col-md-1" style="border-bottom:1px solid #ccc"></td>
        <td class="col-md-1" style="border-bottom:1px solid #ccc"></td>
    </tr>
    <tr class="row">
        <td class="col-md-2" style="background-color:#ccc">Doc. de Identidad:</td>
        <td class="col-md-1">${docIden}</td>
        <td class="col-md-2" style="background-color:#ccc">Record Academico</td>
        <td class="col-md-1">${record}</td>
    </tr>
</table>`;
	return content;
};
// TODO: HEADER PARA KARDEX
const headerGrades = (nameStudent, docIden, programa) => {
	const content = `<table class="table kardex">
    <tr class="row">
        <td class="col-md-4" style="background-color:#ccc; border-bottom:1px solid #ccc">Nombre del Estudiante:</td>
        <td class="col-md-6" style="border-bottom:1px solid #ccc">${nameStudent}</td>
        <td class="col-md-1" style="border-bottom:1px solid #ccc"></td>
        <td class="col-md-1" style="border-bottom:1px solid #ccc"></td>
    </tr>
    <tr class="row">
        <td class="col-md-2" style="background-color:#ccc">Doc. de Identidad:</td>
        <td class="col-md-1">${docIden}</td>
        <td class="col-md-2" style="background-color:#ccc">Programa:</td>
        <td class="col-md-1">${programa}</td>
    </tr>
</table>`;
	return content;
};

// TODO: ESTE ES EL HEADER CON LOS LOGOS
const header = () => {
	const content = `<!DOCTYPE html>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;300&display=swap" rel="stylesheet">
        <html lang="en">
        <style> .row { width: 100%; margin-left:20px;}
            .col-4 { height: 100px; width: 400px;}
            .col-6 { height: 100px; width: 700px;}
            .col-2 { height: 100px; width: 200px;}
            .logo1 { width: 100%; }
            .logo2 { width: 70%; }
            body{
                font-family: 'Open Sans', sans-serif;
                font-weight: 300;
            }
            .col-md-4 { width: 190px; padding: 10px}
            .col-md-6 { width: 190px; padding: 10px}
            .col-md-2 { width: 150px; padding: 10px}
            .col-md-1 { width: 100px; padding: 10px}
            td{ font-size:12px; }
            th{ font-size:12px; }
            .table{ border:1px solid #ccc;}
            .kardex{
                margin-bottom:60px
            }
        </style>
        <body>
            <div style="width: 100%;">
                <table>
                    <tr class="row">
                        <td class="col-4"><img class="logo1" src="${process.env.HOST}/img/logo-reporte1.png"/></td>
                        <td class="col-6"></td>
                        <td class="col-2">
                            <img class="logo2" src="${process.env.HOST}/img/logo-reportes2.png"/>
                        </td>
                    </tr>
                </table>`;
	return content;
};

// TODO: CREAMOS LA TABLA
const buildDataTable = (datos) => {
	let content = `
      <table class="table"  style="table-layout: fixed; width:95%" >
	  <tr style="width: 100%;">`;
	let totalData;
	if (datos.length !== 0) {
		totalData = Object.values(datos[0]).length;
	} else {
		return;
	}
	const totalPorcent = 100 / totalData;
	Object.entries(datos[0]).forEach((element) => {
		if (typeof element[1] !== 'object') {
			content += `
            <th style="width:${totalPorcent}%; padding-top:10px; padding-bottom:10px"><center>${
				translates[element[0]]
			}</center></th>`;
		}
	});
	content += '</tr>';
	let color;
	for (let i = 0; i < datos.length; i++) {
		content += '<tr>';
		if (i % 2 == 0) color = '#ccc';
		else color = '#fff';

		Object.entries(datos[i]).forEach((element) => {
			if (typeof element[1] !== 'object') {
				if (element[0] === 'active') {
					element[1] = element[1] ? 'Activo' : 'Inactivo';
				}
				content += `<td style="width:${totalPorcent}%; background-color:${color}"><center>${element[1]}</center></td>`;
			}
		});

		content += '</tr>';
	}

	content += '</table>';

	return content;
};

module.exports = {crearPdf};

const promiseExisteIdArreglo = async (arreglo, model) => {
	if (!arreglo) return;
	const promesa = [];
	for (let i = 0; i < arreglo.length; i++) {
		const response = model.findOne({where: {id: arreglo[i], active: true}});
		promesa.push(response);
	}
	const response = await Promise.all(promesa);
	const countNull = response.indexOf(null);
	return countNull;
};
module.exports = {
	promiseExisteIdArreglo,
};

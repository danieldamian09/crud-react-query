export const obtenerClienteAPI = async (id) => {
	try {
		const url = `http://localhost:4000/clientes/${id}`;
		const respuesta = await fetch(url);
		const resultado = await respuesta.json();
		return resultado;
	} catch (error) {
		console.log(error);
	}
};

// Realizar esta peticiones GET con react-query
export const obtenerClientesAPI = async () => {
	try {
		const url = "http://localhost:4000/clientes";
		const respuesta = await fetch(url);
		const resultado = await respuesta.json();
		return resultado;
	} catch (error) {
		console.log(error);
	}
};

export const eliminarClienteAPI = async (id) => {
	try {
		const url = `http://localhost:4000/clientes/${id}`;
		const respuesta = await fetch(url, {
			method: "DELETE",
		});
		const resultado = await respuesta.json();
		return resultado;
	} catch (error) {
		console.log(error);
	}
};

export const crearClienteAPI = async (values) => {
	try {
		const url = "http://localhost:4000/clientes";

		const respuesta = await fetch(url, {
			method: "POST",
			body: JSON.stringify(values),
			headers: {
				"Content-Type": "application/json",
			},
		});
		  await respuesta.json();

	} catch (error) {
		console.log(error);
	}
};

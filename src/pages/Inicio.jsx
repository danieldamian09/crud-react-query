import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";
import { eliminarClienteAPI, obtenerClientesAPI } from '../service/serviceClientes';

function Inicio() {

	const [clientes, setClientes] = useState([]);

	console.log(clientes);

	useEffect(() => {
		obtenerClientesAPI().then(clientes => {
			setClientes(clientes);
		})
	}, []);

	// Realizar esta peticione DELETE con react-query
	const handleEliminar = async (id) => {
		// console.log("Eliminar", id);
		const confirmar = confirm("¿Deseas eliminar este cliente")

		// Realizar el llamado a la API
		if (confirmar) {
			
			eliminarClienteAPI(id)

				// Actualizar el estado
				const arrayClientesActualizado = clientes.filter(cliente => cliente.id !== id)
				setClientes(arrayClientesActualizado)
		}
	}

	return (
		<>
			<h1 className="font-black text-4xl text-blue-900">Clientes</h1>
			<p className=" mt-3">Administra tus clientes</p>

			<table className="w-full mt-5 table-auto shadow bg-white">
				<thead className=" bg-blue-800 text-white">
					<tr>
						<th className="p-2">Nombre</th>
						<th className="p-2">Contacto</th>
						<th className="p-2">Empresa</th>
						<th className="p-2">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{clientes?.map((cliente) => (
						<Cliente 
              key={cliente.id}
							cliente={cliente}
							handleEliminar={handleEliminar}
            />
					))}
				</tbody>
			</table>
		</>
	);
}

export default Inicio;

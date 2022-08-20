import { useQuery, useMutation, useQueryClient} from 'react-query';
import { useParams } from 'react-router-dom';
import Cliente from "../components/Cliente";
import Spinner from '../components/Spinner';
import { eliminarClienteAPI, obtenerClientesAPI } from '../service/serviceClientes';

function Inicio() {

	const queryClient = useQueryClient()

	const { data, isLoading, error } = useQuery("obtenerClientes", obtenerClientesAPI)
	
	const { mutate } = useMutation(eliminarClienteAPI, {
		onSuccess: () => {
			queryClient.invalidateQueries("obtenerClientes")
		}
	})

	// Realizar esta peticione DELETE con react-query
	const handleEliminar = async (id) => {

		const confirmar = confirm("¿Deseas eliminar este cliente")

		if (confirmar) {

			mutate(id)
		}
	}

	return (
		<>
			{isLoading ? (
				<>
					<Spinner />
				</>
			): (
				<>
				<h1 className="font-black text-4xl text-green-400">Clientes</h1>
				<p className=" mt-3">Administra tus clientes</p>
	
				<table className="w-full mt-5 table-auto shadow bg-white">
					<thead className=" bg-green-400 text-white">
						<tr>
							<th className="p-2">Nombre</th>
							<th className="p-2">Contacto</th>
							<th className="p-2">Empresa</th>
							<th className="p-2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((cliente) => (
							<Cliente 
								key={cliente.id}
								cliente={cliente}
								handleEliminar={() => handleEliminar(cliente.id)}
							/>
						))}
					</tbody>
				</table>
				</>
			)}
		</>
	);
}

export default Inicio;

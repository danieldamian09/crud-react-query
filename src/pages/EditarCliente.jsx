import {} from "react-query"
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";
import { obtenerClienteAPI } from '../service/serviceClientes';

function EditarCliente() {
	const { id } = useParams();
	
	const {data, isLoading} = useQuery("obtenerClienteIdFormulario", () => obtenerClienteAPI(id))


	return (
		<>
			<h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
			<p className=" mt-3">
				Utiliza este formulario para editar datos de un cliente
			</p>

			{data.nombre ? (
				<Formulario cliente={data} cargando={isLoading}  /> 
			) : (
				<p>Cliente ID no valido</p>
			)}
		</>
	);
}

export default EditarCliente;

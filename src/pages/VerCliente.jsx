import {useQuery} from "react-query"
import {useParams} from "react-router-dom";
import Spinner from "../components/Spinner";
import { obtenerClienteAPI } from '../service/serviceClientes';

const VerCliente = () => {

	const { id } = useParams();

	const{data, isLoading} = useQuery(["obtenerClienteID", id], () => obtenerClienteAPI(id))


	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : Object.keys(data).length === 0 ? (
				<p>No hay resultados...</p>
			) : (
				<>
					<h1 className="font-black text-4xl text-green-400">
						Ver cliente: {data.nombre}
					</h1>
					<p className=" mt-3">informacion del cliente</p>

					<p className=" text-2xl text-gray-600 mt-10">
						<span className="  text-gray-800 uppercase font-bold">
							Cliente:
						</span>
						{data.nombre}
					</p>
					<p className=" text-2xl text-gray-600 mt-4">
						<span className="  text-gray-800 uppercase font-bold">Email:</span>
						{data.email}
					</p>
					{/* Mostar notas en caso de que existan */}
					{data.telefono && (
						<p className=" text-2xl text-gray-600 mt-4">
							<span className="  text-gray-800 uppercase font-bold">
								Teléfono:
							</span>
							{data.telefono}
						</p>
					)}
					<p className=" text-2xl text-gray-600 mt-4">
						<span className="  text-gray-800 uppercase font-bold">
							Empresa:
						</span>
						{data.empresa}
					</p>
					{/* Mostar notas en caso de que existan */}
					{data.otas && (
						<p className=" text-2xl text-gray-600 mt-4">
							<span className="  text-gray-800 uppercase font-bold">
								Notas:
							</span>
							{data.notas}
						</p>
					)}
				</>
			)}
		</div>
	);
};

export default VerCliente;

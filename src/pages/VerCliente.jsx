import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import Spinner from "../components/Spinner";
import { obtenerClienteAPI } from '../service/serviceClientes';

const VerCliente = () => {
	const [cliente, setCliente] = useState({});
	const [cargando, setCargando] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		obtenerClienteAPI(id).then(cliente => {
			setCliente(cliente);
			setCargando(!cargando);
		}).catch(() => {
			alert("Hubo un error");
			setCargando(!cargando);
		})
	}, []);

	return (
		<div>
			{cargando ? (
				<Spinner />
			) : Object.keys(cliente).length === 0 ? (
				<p>No hay resultados...</p>
			) : (
				<>
					<h1 className="font-black text-4xl text-blue-900">
						Ver cliente: {cliente.nombre}
					</h1>
					<p className=" mt-3">informacion del cliente</p>

					<p className=" text-2xl text-gray-600 mt-10">
						<span className="  text-gray-800 uppercase font-bold">
							Cliente:
						</span>
						{cliente.nombre}
					</p>
					<p className=" text-2xl text-gray-600 mt-4">
						<span className="  text-gray-800 uppercase font-bold">Email:</span>
						{cliente.email}
					</p>
					{/* Mostar notas en caso de que existan */}
					{cliente.telefono && (
						<p className=" text-2xl text-gray-600 mt-4">
							<span className="  text-gray-800 uppercase font-bold">
								Teléfono:
							</span>
							{cliente.telefono}
						</p>
					)}
					<p className=" text-2xl text-gray-600 mt-4">
						<span className="  text-gray-800 uppercase font-bold">
							Empresa:
						</span>
						{cliente.empresa}
					</p>
					{/* Mostar notas en caso de que existan */}
					{cliente.otas && (
						<p className=" text-2xl text-gray-600 mt-4">
							<span className="  text-gray-800 uppercase font-bold">
								Notas:
							</span>
							{cliente.notas}
						</p>
					)}
				</>
			)}
		</div>
	);
};

export default VerCliente;

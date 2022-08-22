import {useMutation, useQueryClient} from "react-query";
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {object} from "yup";
import {
	actualizarClienteAPI,
	crearClienteAPI,
} from "../service/serviceClientes";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

function Formulario({ cliente }) {
	
	const queryClient = useQueryClient();

	const mutationPost = useMutation(crearClienteAPI, {
		onSuccess: () => {
			queryClient.invalidateQueries("obtenerClientes");
		},
	});

	const mutationPut = useMutation(actualizarClienteAPI, {
		onSuccess: () => {
			queryClient.invalidateQueries("obtenerClientes");
		},
	});

	// para redirecionar al usuario
	const navigate = useNavigate();

	// validaciones
	const nuevoClienteSchema = Yup.object().shape({
		nombre: Yup.string()
			.min(3, "El nombre es muy corto")
			.max(20, "El nombre es muy largo")
			.required("El nombre del cliente es Obligatorio"),
		empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
		email: Yup.string()
			.email("Email no valido")
			.required("El email es Obligatorio"),
		telefono: Yup.number()
			.typeError("Numero no es valido")
			.integer("Numero no valido")
			.positive("Numero no valido"),
	});

	// Realizar esta peticion post con React-Query
	const handleSubmit = (values) => {
		console.log(values);

		const {id} = cliente;

		// Validar si es post o put
		if (id) {
			mutationPut.mutate({id, values});
		} else {
			mutationPost.mutate(values);
		}

		navigate("/clientes");
	};

	return mutationPost.isLoading ? (
		<Spinner />
	) : (
		<div className=" bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
			<h1 className=" text-gray-600 font-bold text-xl uppercase text-center">
				{cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
			</h1>

			{/* Declaras el estado inicial del formulario */}
			<Formik
				initialValues={{
					nombre: cliente?.nombre ?? "",
					empresa: cliente?.empresa ?? "",
					email: cliente?.email ?? "",
					telefono: cliente?.telefono ?? "",
					notas: cliente?.notas ?? "",
				}}
				enableReinitialize={true}
				onSubmit={(values, {resetForm}) => {
					handleSubmit(values);
					// reset formulario (es asincrono para esperar la respuesta de la API)
					resetForm();
				}}
				validationSchema={nuevoClienteSchema}
			>
				{({errors, touched}) => {
					//? console.log(data)
					return (
						<Form className="mt-10">
							<div className="mb-4">
								<label htmlFor="nombre" className=" text-gray-800">
									Nombre:
								</label>
								<Field
									type="text"
									name="nombre"
									className=" mt-2 block w-full p-3 bg-gray-50"
									id="nombre"
									placeholder="Nombre del cliente"
								/>
								{errors.nombre && touched.nombre ? (
									<Alerta>{errors.nombre}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="empresa" className=" text-gray-800">
									Empresa:
								</label>
								<Field
									type="text"
									name="empresa"
									className=" mt-2 block w-full p-3 bg-gray-50"
									id="empresa"
									placeholder="Empresa del cliente"
								/>
								{errors.empresa && touched.empresa ? (
									<Alerta>{errors.empresa}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="email" className=" text-gray-800">
									Email:
								</label>
								<Field
									type="email"
									name="email"
									className=" mt-2 block w-full p-3 bg-gray-50"
									id="email"
									placeholder="Email del cliente"
								/>
								{errors.email && touched.email ? (
									<Alerta>{errors.email}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="telefono" className=" text-gray-800">
									Teléfono:
								</label>
								<Field
									type="tel"
									name="telefono"
									className=" mt-2 block w-full p-3 bg-gray-50"
									id="telefono"
									placeholder="Teléfono del cliente"
								/>
								{errors.telefono && touched.telefono ? (
									<Alerta>{errors.telefono}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="notas" className=" text-gray-800">
									Notas:
								</label>
								<Field
									as="textarea"
									name="notas"
									type="text"
									className=" mt-2 block w-full p-3 bg-gray-50 h-40"
									id="notas"
									placeholder="Notas del cliente"
								/>
							</div>
							<input
								type="submit"
								value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
								className=" mt-5 w-full bg-green-400 p-3 text-white uppercase font-bold text-lg"
							/>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}

// Valores por default
Formulario.defaultProps = {
	cliente: {},
	cargando: false,
};

export default Formulario;

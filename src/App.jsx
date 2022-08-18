import {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout";
import Inicio from "./pages/Inicio";
import NuevoCliente from "./pages/NuevoCliente";
import EditarCliente from "./pages/EditarCliente";
import VerCliente from "./pages/VerCliente";
import Pruebas from "./pages/Pruebas";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/clientes" element={<Layout />}>
					<Route index element={<Inicio />} />
					<Route path="nuevo" element={<NuevoCliente />} />
					<Route path="editar/:id" element={<EditarCliente />} />
					<Route path=":id" element={<VerCliente />} />
					<Route path="pruebas" element={<Pruebas />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

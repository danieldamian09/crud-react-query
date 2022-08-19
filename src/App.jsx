import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout";
import Inicio from "./pages/Inicio";
import NuevoCliente from "./pages/NuevoCliente";
import EditarCliente from "./pages/EditarCliente";
import VerCliente from "./pages/VerCliente";
import Pruebas from "./pages/Pruebas";

const queryClient = new QueryClient

function App() {
	return (
		<QueryClientProvider client={queryClient}>
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
				<ReactQueryDevtools />
		</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Recipe from './pages/Recipe';

import './global.scss';
import Overview from './pages/Overview';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/",
		element: <Overview/>,
	},
	{
		path: "/recipe/:id",
		element: <Recipe/>,
	}
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}></RouterProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

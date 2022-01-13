import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/App.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from "./contexts/AuthContext"
import { QueryClient, QueryClientProvider } from "react-query"
import SimpleReactLightbox from 'simple-react-lightbox'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 2,
            cacheTime: 1000 * 60 * 60 * 4,
        },
    },
});

ReactDOM.render(
	<React.StrictMode>

        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthContextProvider>
                    <SimpleReactLightbox>

                        <App />

                    </SimpleReactLightbox>
                </AuthContextProvider>
            </BrowserRouter>
        </QueryClientProvider>

	</React.StrictMode>,
    
	document.getElementById('root')
)

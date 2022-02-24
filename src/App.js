import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Web3Page from './Web3Page.js';

window.onload = function() {
	localStorage.clear();
};

function App() {
	const getLibrary = (provider) => {
		const library = new Web3Provider(provider, 'any');
		library.pollingInterval = 15000;
		return library;
	};

	return (
		<Web3ReactProvider getLibrary={getLibrary}>
				<Web3Page />
		</Web3ReactProvider>
	);
}

export default App;
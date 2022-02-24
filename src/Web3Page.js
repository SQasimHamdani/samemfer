import {useWeb3React} from '@web3-react/core';
import { injected, walletlink } from './Helpers/connectors';
import { getContract } from './Helpers/contractInfo';
import React from 'react';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';



const Web3Page = () => {
	
    //connector, library, chainId, account, activate, deactivate
    const {library , account , activate , deactivate } =  useWeb3React();
	const [mintNumber, setMintNumber] = useState(1)
	const [supply, setSupply] = useState('1');
	const [error, setError] = useState('');
	
	//web3react
	const mint = async () => {
		try {
			const myContractSigner = getContract(library, account);
			const ethervalue = String("0.01" * mintNumber);
			const response = await myContractSigner.mint(mintNumber, {value: ethers.utils.parseEther(ethervalue)});
			console.log(response);
		} catch (err) {
            
            if ( err?.code === 4001) {
                // console.log("User Declined Payment")
                setError("User Declined Payment");
            }
            
            if ( err?.error?.code === -32000) {
                // console.log("You have Insufficient Balance")
                setError("You have Insufficient Balance");
            }
        
        }
	};
    useEffect(() => {
		fetchData();})


	async function fetchData() {
		if (account) {
			  try {
				const myContractSigner = getContract(library, account);
				const sup = await myContractSigner.totalSupply();
				setSupply(String(sup));
			  }catch (err) {
            
				setError(err?.error?.message)
			
			}
			}
		}
	const freeMint = async () => {
		try {
			const myContractSigner = getContract(library, account);
			const response = await myContractSigner.freeMint(mintNumber);
			console.log(response);
		} catch (err) {
            
            if ( err?.code === 4001) {
                // console.log("User Declined Payment")
                setError("User Declined Payment");
            }
            
            if ( err?.error?.code === -32000) {
                // console.log("You have Insufficient Balance")
                setError("You have Insufficient Balance");
            } else {
				if (err?.error?.message)
					setError(err?.error?.message);
				else
					setError(err?.message);
			}
        
        }
	};

	const disconnect = () => {
		try {
			deactivate();
		} catch (ex) {
			console.log(ex);
		}
	};
	async function decreaseMintNumber() {
		if (mintNumber > 1)
			setMintNumber(mintNumber -1);
	  };
	  async function increaseMintNumber() {
		const max = supply < 2000 ? 3 : 10021 - supply;
		if (mintNumber < max)
			setMintNumber(mintNumber + 1);
		};
	//web3react metamask
	const connectMetamaskSimple = async () => {
		try {
			console.log(await activate(injected));
		} catch (ex) {
			console.log(ex);
		}
	};

	// //web3react coinbase
	// const connectCoinbaseSimple = async () => {
	// 	try {
	// 		await activate(walletlink);
	// 	} catch (ex) {
	// 		console.log(ex);
	// 	}
	// };
	
	return (
		<div className="container">
			<div className="row">
				<div className="col-12"> 
					<img className="image_set" src="../images/logo.jpg" alt="entree" /> 
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<img className="image_blck image_banner" src="../images/main_image.gif" alt="lol" />
				</div>
				{account ? 
					<p>You're connected with {account}</p> 
					: ''
				}
				<div>
					<div className="mint-info"> <span className="mint_btn minted-description red-description"><a className="glow-on-hover" href="https://opensea.io/collection/samfers">Check on OpenSea</a></span> </div>
					<div> 
						{account ?
							<h3 type='color:red;'>Supply  <span>{supply}</span>/10021</h3> 
						: 
							''
                        }
							
					</div>
				</div> 
				{!account ? 
					<div>
						<button className="glow-on-hover" onClick={connectMetamaskSimple}> Connect with Metamask </button>
					</div> 
				:
					<div>
						<button onClick={disconnect}> Disconnect </button>
						<div>
							<button onClick={decreaseMintNumber}>-</button>
							<button>{mintNumber}</button>
							<button onClick={increaseMintNumber}>+</button>
						</div> 
						{ supply< 2000 ? 
							<button onClick={freeMint}> Freemint </button> 
						: 
							<span>Freemint is off</span> 
						} 
						{error ?
							<h3 className="bg-danger text-light">{error}</h3> 
						: 
							''
						} 
						{ supply < 10021 && supply> 1999 ?
							<button onClick={mint}> MINT </button> 
						:
							<h3>Mint is off</h3>
						} 
				</div> 
				} 
			</div>
			<div className="row">
                <p>#Samemfers generated entirely from copy-pasting drawing by sarbshi. this project is in the public domain feel free to use #Samemfers any way u want (we are mFers, we don't care)</p>
                <span className="minted-description mint_verify red-description">
                    <a href="https://etherscan.io/address/0xec139f62e9d1d275db05c85c248e9dcb09cbf012">VERIFIED CONTRACT</a>
                </span> 
			</div>
		</div>
	);
};
export default Web3Page;

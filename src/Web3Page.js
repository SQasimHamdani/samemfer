import {useWeb3React} from '@web3-react/core';
import { injected, walletlink } from './Helpers/connectors';
import { getContract } from './Helpers/contractInfo';
import React from 'react';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';



const Web3Page = () => {
	// let values;
	
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
        }
        catch (err) {
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
        fetchData();
    })

	async function fetchData() {
		if (account) {
            try {
                const myContractSigner = getContract(library, account);
                const sup = await myContractSigner.totalSupply();
                setSupply(String(sup));
            }
            catch (err) {
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
				<div className="col-sm-12 pt-3 pb-5"> 
					<img className="image_set" src="../images/logo.jpg" alt="entree" /> 
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12 col-md-7">
					<img className="image_blck image_banner" src="../images/main_image.gif" alt="lol" />
				</div>
				<div className="col-sm-12 col-md-5 text-center mob_se">
					
					<div>
                        <div className="mint-info">
                            <span className="mint_btn minted-description red-description">
                                <a className="glow-on-hover" target={"_blank"} href="https://opensea.io/collection/samfers">Check on OpenSea</a>
                            </span>
                        </div>
						<div> 
							{account ?
								<h3 type='color:red;'> <span>{supply}</span>/10021</h3> 
							: 
								''
                            }	
                        </div>
                        {account ? 
                            <p className='wallet_address'>You're connected with {account}</p> 
                            : ''
                        }
					</div> 
					{!account ? 
						<div>
							<button className="glow-on-hover" onClick={connectMetamaskSimple}>Connect Metamask</button>
						</div> 
					:
						<div>
							<button className="glow-on-hover" onClick={disconnect}> Disconnect </button>
							<div className="minted_btn">
								<button className="glow-on-hover mint_width" onClick={decreaseMintNumber}>-</button>
                                { supply > 1999 && supply < 10021 ? 
                                    <button className="glow-on-hover minted_width" onClick={mint}> Mint {mintNumber}</button> 
                                    : 
                                    <>
                                        <button className="glow-on-hover minted_width" onClick={freeMint}>Freemint {mintNumber} </button> 
                                    </>
                                } 
                                <button className="glow-on-hover mint_width" onClick={increaseMintNumber}>+</button>
                            </div> 
                            { supply > 1999 && supply < 10021 ? 
                                ""
                            : 
                                <span className='d-block'>Unlimited mint (3 per transactions)</span>
                            } 

							{error ?
								<h3 className="bg-danger text-light p-3 rounded">{error}</h3> 
							: 
								''
							} 
						</div> 
					}
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12 mob_para">
                    <p>We are the Samemfer coming from a parralel metaverse. We heard about #mfer vibe in your metaverse, so we travelled all the way from our metaverse to vibe with u ! Our Sartoshi settled an agreement with your Sartoshi: 10% to Sartoshi, 10% to Unicef and 100%  royalties to #mfer charity to help UKRAINE <img className='footer_images' src="../images/ukraine.svg"/>
                        <br></br>
                        #Samemfers are generated entirely from copy-pasting drawing by sartoshi. This project is in the public domain feel free to use #Samemfers in any way u want (we are mFers, we don't care)</p>
                    

                    <br></br>
                    <p><strong>FAQs</strong></p>
                    <br></br>
                    <p> <strong>Q: WHAT ARE SAMEMFERS?</strong>
                        <br></br>
                            SAMEMFERS ARE EXACT SAME MFERS COMING FROM A PARALLEL MFER METAVERSE DIMENSION TO VIBE WITH ALL MFERS IN THE SPACE
                            <br></br>
                    <br></br>
                      <strong> Q: WHO RUNS THE PROJECT?</strong>
                        <br></br>
                            YOU ARE THE  PROJECT AND YOU'RE THE SAME MFERS AS THE MFERS,
                            <br></br>
                    <br></br>
                      <strong>  Q: CHARITY ?</strong>
                    <br></br>
                        WE’RE JOINING FORCES TO HELP UKRAINE, 100% ROYALTIES GOING TO MFER CHARITY, 10% OF MINT TO UNICEF, 10% TO SARTOSHI
                        <br></br>
                        <br></br>
                      <strong> Q: WHAT'S NEXT?</strong>
                        <br></br>
                        AS THE MFERS, YOU'LL DECIDE WHAT'S NEXT, CAUSE YOU'RE THE SAMEMFERS AND YOU OWN THE PROJECT
                        <br></br>
                        <br></br>
                        <strong>Q: WHAT ARE THE ROYALTIES FOR THIS COLLECTION?</strong>
                        <br></br>
                        100% ROYALTIES TO HELP UKRAINE CURRENT SITUATION. ALL ROYALTIES GOING TO MFER CHARITY</p>
                    <span className="minted-description mint_verify red-description">
                        <a href="https://etherscan.io/address/0xec139f62e9d1d275db05c85c248e9dcb09cbf012">VERIFIED CONTRACT</a>
                    </span> 

                    <a target="_blank" href="https://twitter.com/same_mfer"> <img className='' src="https://img.icons8.com/color/58/000000/twitter-circled--v4.png"/></a>
                    <a target="_blank" href="https://opensea.io/collection/samfers"> <img className='footer_images' src="../images/opensea.svg"/></a>

				</div>
			</div>
		</div>
	);
};
export default Web3Page;

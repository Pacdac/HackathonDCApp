import useOnClickOutside from '../../../../hooks/useOnClickoutside';
import React, { useRef, useState } from 'react';
import urlExist from "url-exist"
import styled from 'styled-components';
import { tokenListJSON, commonTokenListJSON } from '../../../../Data/tokenList';

const ModalOverlay = styled.div`
	background: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	right: 0;
	transform-origin: center center;
    z-index: 10;
`;

const ModalConent = styled.div`
	position: absolute;
	top: 40%;
	right: 50%;
	transform: translate(50%, -50%);
	color: #fff;
	background-color: #191b1f;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	width: 500px;
	max-width: 400px;
	border-radius: 0.375rem;
	border: 1px solid #2c2f36;
	h3 {
		margin: 0.25rem 0;
		color: #fff;
	}
	.close {
		cursor: pointer;
		color: #9ca3af;
		&:hover {
			color: #fff;
		}
	}
	@media only screen and (max-width: 600px) {
		width: 98%;
		margin-left: 1%;
		padding-bottom: 2%;
		max-width: inherit;
		transform: unset;
		left: 0;
		right: 0;
		bottom: 0px;
	}
`;

const ChooseAssets = styled.button`
	padding: 0.5rem 1rem;
	background-color: #000;
	border-radius: 0.5rem;
	font-size: 1rem;
	line-height: 1.5rem;
	cursor: pointer;
	border: 0;
	color: #e5e7eb;
	&:hover {
		color: #f3f4f6;
		background: #1f2937;
	}
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 0.5rem;
	padding: 1rem;
	margin-bottom: 1rem;
`;

const ChooseAsset = styled.button`
	text-transform: capitalize;
	width: 100%;
	cursor: pointer;
    background-color: transparent;
    border:0;
    color: #fff;
	padding: 0.5rem 1rem;
	font-size: 1rem;
 	position relative;
	text-align:left;
    display: flex;
    align-items: center;
	img {
		position relative;
		bottom:0;
		right:0;
		margin-right: 1rem;
	}
    .asset_info {
        p{
            margin:0;
    		font-size: 1rem;
            color:#6B7280;
        }
        .symbol {
            color:#4B5563;
            margin-top:0.25rem;
		   	font-size: 0.75rem;
        }
    }
	&:hover {
		color: #fff;
        background: #22252a;
        .asset_info {
            p{
                color: #fff;
            }
            .symbol {
                color:#757575;
            }
        }
	}
`;

const AssetSearchWrapper = styled.div`
	position: relative;
	margin-bottom: 0.5rem;
	margin: 0rem 1rem 1rem 1rem;
	.search_icon {
		position: absolute;
		top: 12px;
		left: 15px;
		color: #868c97;
	}
`;

const AssetSearch = styled.input`
	border: 0px;
	padding: 1rem 3.5rem;
	border-radius: 0.25rem;
	color: #fff;
	width: 100%;
	font-size: 1rem;
	background-color: transparent;
	border: 1px solid #515256;
	&:focus {
		border: 1px solid #fff;
	}
`;

const AssetWrapper = styled.div`
	height: 40vh;
	overflow-y: scroll;
	border-top: 1px solid #333;
	@media only screen and (max-width: 600px) {
		height: 50vh;
	}
`;

const CommonBases = styled.div`
	margin: 1rem;
	h4 {
		margin: 0;
		margin-bottom: 0.5rem;
		color: #686869;
		font-weight: 400;
		font-size: 0.875rem;
	}
`;

const CommonBase = styled.button`
	border-radius: 0.375rem;
	padding: 0.25rem 0.5rem;
	border: 1px solid #333;
	display: flex;
	align-items: center;
	background-color: transparent;
	color: #757575;
	cursor: pointer;
	img {
		margin-right: 0.5rem;
	}
	&:hover {
		border-color: #fff;
		color: #fff !important;
	}
`;

const CommonBasesWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	> button {
		margin-right: 0.25rem;
	}
`;

const Assets = tokenListJSON;

const CommonAssets = commonTokenListJSON;


async function checkImageURL(address) {
    const trustwalletURL = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/' + address + '/logo.png';
    if (await urlExist(trustwalletURL)){
        return trustwalletURL;
    } else {
        return "/images/logo.png";
    }
}

function merge(...arrays) {
    const merged = {};
    arrays.forEach(data =>
        data.forEach(o => Object.assign(merged[o.address] ??= {}, o))
    );
    return Object.values(merged);
}

const TokenSelector = (props) => {
    let fullAssets = Assets;
    const [searchInput, setSearchInput] = useState('');
    const [foundTokens, setfoundTokens] = useState(fullAssets);
    const [showModal, setShowModal] = React.useState(false);
    const modalRef = useRef();
        useOnClickOutside(modalRef, () => setShowModal(false));

        const [selectedTokenSymbol, setSelectedTokenSymbol] = useState("select token");
        const [selectedTokenImageURL, setSelectedTokenImageURL] = useState("/images/logo.png");

    if (typeof window !== 'undefined') {
        
        if (localStorage.getItem("local-tokens") !== null) {
            fullAssets = merge(JSON.parse(localStorage.getItem("local-tokens")), Assets);
        }
        
        const filter = async (e) => {
            const keyword = e.target.value;

            if (keyword !== '' && !keyword.startsWith('0x')) {
                const results = fullAssets.filter((token) => {
                    return token.name.toLowerCase().includes(keyword.toLowerCase()) || token.symbol.toLowerCase().includes(keyword.toLowerCase());
                });
                setfoundTokens(results);
            } else if (keyword.startsWith('0x')) {            
                const results = fullAssets.filter((token) => {
                    return token.address.toLowerCase().includes(keyword.toLowerCase());
                });
                if (results.length === 0) {
                    //get token image
                    const tokenImage = await checkImageURL(keyword);
                    const url = 'https://api.pancakeswap.info/api/v2/tokens/' + keyword;
                    fetch(url)
                        .then((response) => response.json())
                        .then((data) => {
                            const token = {
                                name: data.data.name,
                                symbol: data.data.symbol,
                                address: keyword,
                                chainId: 56,
                                image: tokenImage,
                                custom: "import"
                            };
                            setfoundTokens([token]);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    setfoundTokens(results);
                }

            } else {
                setfoundTokens(fullAssets);
                // If the text field is empty, show all tokens
            }
            setSearchInput(keyword);
        };    

        return (
            <div>
                <ChooseAssets onClick={() => setShowModal(true)}><img src={selectedTokenImageURL} width="25px" height="25px"></img>  {selectedTokenSymbol}</ChooseAssets>            

                {showModal && (
                    <ModalOverlay>
                        <ModalConent ref={modalRef}>
                            <ModalHeader>
                                <h3>Select a Token</h3>
                                <div className="close" onClick={() => setShowModal(false)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </div>
                            </ModalHeader>

                            <AssetSearchWrapper>
                                <AssetSearch
                                    value={searchInput}
                                    onChange={filter}
                                    type="search"
                                    placeholder="Search name or paste address"
                                />

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="search_icon"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </AssetSearchWrapper>

                            {!searchInput && (
                                <>
                                <CommonBases>
                                    <h4>Common Tokens</h4>
                                    <CommonBasesWrapper>
                                        {CommonAssets.map((asset) => (
                                            <CommonBase key={asset.symbol} onClick={() => {
                                                setShowModal(false);
                                                setSelectedTokenSymbol(asset.symbol);
                                                setSelectedTokenImageURL(asset.image);
                                                props.setToken(asset.address);
                                                if (props.setDecimals){
                                                    props.setDecimals(asset.decimals);
                                                }
                                            }}>
                                                <img src={asset.image} width="20px" height="20px" />
                                                {asset.name}
                                            </CommonBase>
                                        ))}
                                    </CommonBasesWrapper>
                                </CommonBases>

                                </>
                            )}

                            <AssetWrapper>
                            
                                {foundTokens.map((wallet, index) => (
                                    <ChooseAsset key={index} onClick={() => {
                                        setShowModal(false);
                                        setSelectedTokenSymbol(wallet.symbol);
                                        setSelectedTokenImageURL(wallet.image);
                                        props.setToken(wallet.address);
                                        if (props.setDecimals){
                                            props.setDecimals(wallet.decimals);
                                        }
                                        if (wallet.custom !== undefined){
                                            const items = JSON.parse(localStorage.getItem("local-tokens"));
                                            if (items != null) {
                                                var count = 0;
                                                items.forEach(element => {
                                                    if (element.address === wallet.address) {
                                                        count = 1;
                                                    }           
                                                });
                                                if (count === 0) {
                                                    items.push((({ custom, ...o }) => o)(wallet));
                                                    localStorage.setItem("local-tokens", JSON.stringify(items));
                                                }
                                            } else {
                                                localStorage.setItem("local-tokens", JSON.stringify([(({ custom, ...o }) => o)(wallet)]));
                                            }
                                        }
                                    }}>
                                        <img src={wallet.image} width="25px" height="25px" />
                                        <div className="asset_info">
                                            <p>{wallet.name}</p>
                                            <p className="symbol">{wallet.symbol}</p>
                                        </div>
                                    </ChooseAsset>
                                ))}
                            </AssetWrapper>
                        </ModalConent>
                    </ModalOverlay>
                )}
            </div>
        );
    }
};

export default TokenSelector;
var contractAddr = '0x75267ac1d32FEefb1e9d4272FE4e9BCB5E908558';
var contractAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_exchangeRouterAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_exchangeFactoryAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "DCACreationTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "AddedNewDCA",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_period",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalOccurences",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountPerOccurrence",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_tokenIn",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokenOut",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_fee5Decimals",
				"type": "uint256"
			}
		],
		"name": "addNewDCAToUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "DCACreationTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "DeletedDCA",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_startDate",
				"type": "uint256"
			}
		],
		"name": "deleteUserDCA",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_DCAStartDate",
				"type": "uint256"
			}
		],
		"name": "executeSingleUserDCA",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newFee5Decimals",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_DCAStartDate",
				"type": "uint256"
			}
		],
		"name": "modifyDCAFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "DCACreationTimestamp",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalOccurence",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "currentOccurence",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "occurrenceTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "nextOccurrenceTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "estimatedMinimumAmountOut",
				"type": "uint256"
			}
		],
		"name": "OccurenceExecuted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newExchangeFactoryAddress",
				"type": "address"
			}
		],
		"name": "setExchangeFactoryAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newExchangeRouterAddress",
				"type": "address"
			}
		],
		"name": "setExchangeRouterAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getExchangeFactoryAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getExchangeRouterAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mapDCA",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "periodDays",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalOccurences",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentOccurence",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountPerOccurence",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "tokenIn",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenOut",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenInLockedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fee5Decimals",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let currentUser;
let trade = {};
let selection;
let tokens;

// App initialization
async function initialize() {

	// Login Functionality
	const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
	currentUser = accounts[0];
	if (currentUser) {
		document.getElementById("top-connect-wallet-button").innerText = "Connected";
		document.getElementById("main-connect-wallet-button").innerText = "Add new DCA";
		await getDCAs(currentUser);
		await getOccurencesToExecute();
	}
}

// Login
async function login() {
	try {
		// Validate is user is logged in
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        currentUser = accounts[0];
		if (!currentUser) {
			await getDCAs(currentUser);
			await getOccurencesToExecute();
		}

		// Update UI
		document.getElementById("top-connect-wallet-button").innerText = "Connected";
		document.getElementById("main-connect-wallet-button").innerText = "Add new DCA";
	} catch (error) {
		console.log(error);
	}
}


async function addNewDCA() {
	const web3 = new Web3(ethereum);
	const contractInstance = await new web3.eth.Contract(contractAbi, contractAddr);

	let occurence = document.getElementById("occurence").value;
	let occurencesNumber = document.getElementById("number-of-occurences").value;
	let amountIn = BigNumber(document.getElementById("from-amount").value * 10 ** 18); //trade.from.decimals
	//let tokenIn = trade.from.address;
	//let tokenOut = trade.to.address;
	let fees = document.getElementById("fees").value * 1000;
	contractInstance.methods.addNewDCAToUser(
		occurence,
		occurencesNumber,
		amountIn,
		"0x0000000000000000000000000000000000000000",
		"0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
		fees)
		.send({
			from: currentUser,
			value: occurencesNumber * amountIn
		});
}

async function getDCAs(user) {
	const web3 = new Web3(ethereum);
	const contractInstance = await new web3.eth.Contract(contractAbi, contractAddr);

	let parent = document.getElementById("my-dca-table");

	await db.collection('moralis/events/DcappTestnetCreation')
		.where('userAddress', '==', user)
		.get()
		.then(snapshot => {
			snapshot.forEach(val => {
				contractInstance.methods.mapDCA(
					user,
					val.data().DCACreationTimestamp)
					.call().then(async function (DCAproperties) {
						let tr = document.createElement("tr");
						tr.classList.add('my-dca-row');
						$(tr).attr('data-bs-toggle', 'collapse');
						$(tr).attr('data-bs-target', '#collapse-' + val.data().DCACreationTimestamp);
						if (DCAproperties.currentOccurence == 0) {
							tr.classList.add('deleted-dca');
						}
		
						let td_periodDays = document.createElement("td");
						if (DCAproperties.periodDays == 1) {
							td_periodDays.innerHTML = DCAproperties.periodDays + ' day';
						} else {
							td_periodDays.innerHTML = DCAproperties.periodDays + ' days';
						}
						tr.appendChild(td_periodDays);
		
						let td_currentOccurence = document.createElement("td");
						td_currentOccurence.innerHTML = DCAproperties.currentOccurence + "/" + DCAproperties.totalOccurences;
						tr.appendChild(td_currentOccurence);

						[tokenInDecimals, tokenInSymbol] = await getTokenDecimalsAndSymbol(DCAproperties.tokenIn);
						let td_amountPerOccurence = document.createElement("td");
						td_amountPerOccurence.innerHTML = DCAproperties.amountPerOccurence / (10 ** tokenInDecimals);
						tr.appendChild(td_amountPerOccurence);
		
						[tokenOutDecimals, tokenOutSymbol] = await getTokenDecimalsAndSymbol(DCAproperties.tokenOut);
						let td_tokens = document.createElement("td");
						td_tokens.innerHTML = await tokenInSymbol + " → " + await tokenOutSymbol;
						tr.appendChild(td_tokens);
		
						let td_deleteDCA = document.createElement("td");
						if (DCAproperties.currentOccurence != 0) {
							td_deleteDCA.innerHTML = "<button class='delete-button' onclick='deleteDCA(" + val.data().DCACreationTimestamp + ")'>Delete</button>";
						}
						tr.appendChild(td_deleteDCA);
		
						parent.appendChild(tr);
		
						let tr2 = document.createElement("tr");
						tr2.classList.add('collapse', 'accordion-collapse');
						$(tr2).attr('id', 'collapse-' + val.data().DCACreationTimestamp);
						$(tr2).attr('data-bs-parent', '.table');
						$(tr2).html("<td colspan='5'><div class='d-flex justify-content-center'><div class='spinner-border text-light' role='status'><span class='sr-only'></span></div></div></td>");
						parent.appendChild(tr2);
		
						$(tr).on('click', tr, function () { getChart("0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", tokenInSymbol, "0xe9e7cea3dedca5984780bafc599bd69add087d56", tokenOutSymbol, tokenOutDecimals, user, val.data().DCACreationTimestamp); });
						// TO CHANGE -> $(tr).on('click', tr, function() { getChart(DCAproperties.tokenIn, tokenInSymbol, DCAproperties.tokenOut, tokenOutSymbol, tokenOutDecimals, user, val.data().DCACreationTimestamp); });
					});
			});
		});
}

function getTokenDecimalsAndSymbol(address) {
	if (address == 0x0000000000000000000000000000000000000000) {
		return [18, "BNB"];
	} else {
		return fetch("https://deep-index.moralis.io/api/v2/erc20/metadata?chain=bsc%20testnet&addresses=" + address , {
			headers: {
				Accept: "application/json",
				"X-Api-Key": "UaGBgwAezgu9EdW3hFgsV3dAv1LvPXbdJ6Nk61wIU0DlW9erVh7RQjh2CiBFzIM3"
			}
		})
		.then((response) => response.json())
		.then((data) => {
			return [data[0].decimals, data[0].symbol];
		});
	}
}

async function deleteDCA(timestamp) {
	const web3 = new Web3(ethereum);
	const contractInstance = await new web3.eth.Contract(contractAbi, contractAddr);

	contractInstance.methods.deleteUserDCA(
		timestamp)
		.send({
			from: currentUser
		});
}

// App initialization
initialize();

// Login buttons
document.getElementById("top-connect-wallet-button").onclick = login;
document.getElementById("main-connect-wallet-button").onclick = login;

// DCA button
document.getElementById("main-connect-wallet-button").onclick = addNewDCA;


async function getPair(tokenA, tokenB) {
	const web3 = new Web3(ethereum);

	let _hexadem = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5';
	let _factory = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
	let [token0, token1] = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];

	let abiEncoded1 = web3.eth.abi.encodeParameters(['address', 'address'], [token0, token1]);
	abiEncoded1 = abiEncoded1.split("0".repeat(24)).join("");
	let salt = web3.utils.soliditySha3(abiEncoded1);
	let abiEncoded2 = web3.eth.abi.encodeParameters(['address', 'bytes32'], [_factory, salt]);
	abiEncoded2 = abiEncoded2.split("0".repeat(24)).join("").substr(2);
	let pair = '0x' + Web3.utils.soliditySha3('0xff' + abiEncoded2, _hexadem).substr(26);
	return pair;
}

function getDaysRange(unix_timestamp) {
	var currentDate = new Date();
	var timestampDate = new Date(unix_timestamp * 1000);
	var firstDate = new Date('January 1, 1970 00:00:00');
	var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	var diffDays1 = Math.trunc(Math.abs((timestampDate.getTime() - firstDate.getTime()) / (oneDay)));
	var diffDays2 = Math.trunc(Math.abs((currentDate.getTime() - firstDate.getTime()) / (oneDay)));
	return [diffDays1, diffDays2];
}

function getChart(tokenA, tokenASymbol, tokenB, tokenBSymbol, tokenBDecimals, userAddress, unix_timestamp) {
	var [firstDate, lastDate] = getDaysRange(unix_timestamp);

	getOccurences(userAddress, unix_timestamp, tokenBDecimals).then(val => {

		var arr = Array.from({ length: 24 }, (v, k) => Math.round(firstDate + ((lastDate - firstDate) * k / 23)));

		var occurences = [];
		for (const occurence in val[0]) {
			arr.push(val[0][occurence][1]);
			occurences.push([Date.parse(new Date(val[0][occurence][2])).toString("MM/dd/yyyy"), val[0][occurence][3]]);
		}
		

		var unique = Array.from(new Set(arr));
		unique.sort(function (a, b) {
			return a - b;
		});

		var totalEstimatedMinimumAmountOut = val[1];

		getPair(tokenA, tokenB).then(pair => {

			var query = unique.map(function (x) { return pair + "-" + x });
			let queryString = "[";
			for (const i of query) {
				if (i == query[0]) {
					queryString = queryString + "\"" + i;
				} else {
					queryString = queryString + "\",\"" + i;
				}
			}
			queryString = queryString + "\"]";
			fetch("https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2", {
				"referrer": "https://bsc.streamingfast.io/",
				"referrerPolicy": "strict-origin-when-cross-origin",
				"body": "{\"query\":\"\\n  query pairDayDatasByIdsQuery($pairIds: [String]) {\\n    pairDayDatas(where: { id_in: $pairIds }, orderBy: date, orderDirection: desc) {\\n      id\\n      date\\n      reserve0\\n      reserve1\\n      reserveUSD\\n      pairAddress {\\n        token0 {\\n          id\\n        }\\n        token1 {\\n          id\\n        }\\n      }\\n    }\\n  }\\n\",\"variables\":{\"pairIds\": " + queryString + "},\"operationName\":\"pairDayDatasByIdsQuery\"}",
				"method": "POST",
				"mode": "cors",
				"credentials": "omit"
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data.data.pairDayDatas);
					var dates = [];
					var prices = [];
					for (const i in data.data.pairDayDatas) {
						dates.push(Date.parse(new Date(data.data.pairDayDatas[i].date * 1000)).toString("MM/dd/yyyy"));
						prices.push(Number(data.data.pairDayDatas[i].reserve0) / Number(data.data.pairDayDatas[i].reserve1));
					}
					var estimatedAmountOutDiv = "<p>Minimum<nobr> amount<nobr> received:<nobr> " + totalEstimatedMinimumAmountOut + "<nobr> " + tokenBSymbol + " <span id='tooltip-" + unix_timestamp + "' class='bi bi-question-circle' data-toggle='tooltip' data-bs-placement='bottom' title='This amount corresponds to the sum of the minimum estimates of all past occurrences, i.e. the minimum amount received on your wallet to date'></span></p>";
					var withoutDCAAmountDiv = "<p>Without DCA, would be: " + prices[0] * occurences.length + " " + tokenBSymbol + "</p>";

					// enabe tooltip
					$(function () {
						$('[data-toggle="tooltip"]').tooltip()
						document.getElementById('tooltip-' + unix_timestamp).setAttribute('data-bs-original-title', 'New Tooltip Title');
					})

					$('#collapse-' + unix_timestamp).html("<canvas id='chart-" + unix_timestamp + "' width='400' height='400'></canvas>" + estimatedAmountOutDiv + withoutDCAAmountDiv);
					const priceChart = new Chart($('#chart-' + unix_timestamp), {
						type: 'line',
						data: {
							labels: dates.reverse(),
							datasets: [{
								label: tokenBSymbol + ' / ' + tokenASymbol,
								data: prices,
								borderWidth: 1,
								borderColor: 'rgba(255, 99, 132, 1)'
							},
							{
								label: 'Occurences',
								type: 'scatter',
								data: occurences,
								borderColor: 'rgba(90, 240, 90, 1)',
								borderWidth: '3'
							}]
						}
					});
				});
		});
	});
}

async function getOccurences(userAddress, DCACreationTimestamp, tokenBDecimals) {
	var totalEstimatedMinimumAmountOut = 0;
	let occurences = [];
	return await db.collection('moralis/events/DcappTestnetExecution')
		.where('userAddress', '==', userAddress)
		.where('DCACreationTimestamp', '==', DCACreationTimestamp)
		.get()
		.then(snapshot => {
			snapshot.forEach(occurence => {
				var currentOccurence = occurence.data().currentOccurence;
				var occurrenceTimestamp = new Date(occurence.data().occurrenceTimestamp * 1000);
				var estimatedMinimumAmountOut = Number(occurence.data().estimatedMinimumAmountOut) / 10 ** tokenBDecimals;
				totalEstimatedMinimumAmountOut += estimatedMinimumAmountOut;
		
				var firstDate = new Date('January 1, 1970 00:00:00');
				var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
				var occurenceDate = Math.trunc(Math.abs((occurrenceTimestamp.getTime() - firstDate.getTime()) / (oneDay)));
		
				occurences.push([currentOccurence, occurenceDate, occurrenceTimestamp, estimatedMinimumAmountOut]);
			});
			return [occurences, totalEstimatedMinimumAmountOut];
		});
}

async function getOccurencesToExecute() {
	const web3 = new Web3(ethereum);
	const contractInstance = await new web3.eth.Contract(contractAbi, contractAddr);

	var lastOccurences = {};

	return await db.collection('moralis/events/DcappTestnetExecution')
	.where('nextOccurrenceTimestamp', '>', '0')
	.get()
	.then(snapshot => {
		snapshot.forEach(occurence => {
			lastOccurences[[occurence.data().userAddress, occurence.data().DCACreationTimestamp]] = occurence.data().nextOccurrenceTimestamp;
		});
		let parent = document.getElementById("occurences-table");

		Object.keys(lastOccurences).forEach(function(key) {
			const userAddress = key.split(',')[0];
			const DCAStartDate = key.split(',')[1];
			contractInstance.methods.mapDCA(
				userAddress,
				DCAStartDate)
				.call().then(async function (DCAproperties) {
					let tr = document.createElement("tr");

					let td_occurenceDate = document.createElement("td");
					td_occurenceDate.innerHTML = new Date(lastOccurences[key] * 1000).toLocaleString('en-US');
					tr.appendChild(td_occurenceDate);

					[tokenInDecimals, tokenInSymbol] = await getTokenDecimalsAndSymbol(DCAproperties.tokenIn);
					let td_earnings = document.createElement("td");
					td_earnings.innerHTML = ((DCAproperties.fee5Decimals * 10 ** -5) * DCAproperties.amountPerOccurence / (10 ** tokenInDecimals)).toString() + " " + tokenInSymbol;
					tr.appendChild(td_earnings);

					let td_button = document.createElement("td");
					td_button.innerHTML = "<button class='execute-button' onclick='executeOccurence(\"" + userAddress + "\", " + DCAStartDate + ")'>Execute</button>";
					tr.appendChild(td_button);

					parent.appendChild(tr);
				});
		});
	});
}

async function executeOccurence(userAddress, DCAStartDate) {
	const web3 = new Web3(ethereum);
	const contractInstance = await new web3.eth.Contract(contractAbi, contractAddr);

	contractInstance.methods.executeSingleUserDCA(
		userAddress, DCAStartDate)
		.send({
			from: currentUser
		});
}

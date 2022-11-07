// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

struct userDCAData {
    uint periodDays;
    uint totalOccurences;
    uint currentOccurence;
    uint amountPerOccurence;
    address tokenIn;
    address tokenOut;
    uint tokenInLockedAmount;
    address[] swapPath;
    uint fee5Decimals;
}

//import pancakeswap router
interface IPancakeRouter01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH);
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);

    function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}

interface IPancakeRouter02 is IPancakeRouter01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountETH);
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}

interface IPancakeFactory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function allPairs(uint) external view returns (address pair);
    function allPairsLength() external view returns (uint);

    function createPair(address tokenA, address tokenB) external returns (address pair);

    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}

//main contract
contract DCApp{
    /*
        Optimization ideas :
            - Remove constant variable and just directly use the values
                Seems to save a little gas, about 20 each time
    */
    mapping (address => mapping( uint => userDCAData)) public mapDCA;

    //address of the pancakeswap v2 router
    address private constant PANCAKEV2ROUTER = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
    //address of the pancakeswap v2 factory
    address private constant PANCAKEV2FACTORY = 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73;

    //address of the pancakeswap v2 router ON TESTNET
    address private constant PANCAKEV2ROUTERTESTNET = 0xD99D1c33F9fC3444f8101754aBC46c52416550D1;
    //address of the pancakeswap v2 factory ON TESTNET
    address private constant PANCAKEV2FACTORYTESTNET = 0x6725F303b657a9451d8BA641348b6761A6CC7a17;

    //address of WBNB token.  This is needed because some times it is better to trade through WBNB. 
    address private constant WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

    //-------------REPLACE WBNBTestNet BY WBNB FOR THE MAIN CHAIN-----------
    address private constant WBNBTestNet = 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd;

    event addedNewDCA(uint timestamp, address userAddress);
    event occurenceExecuted(uint timestamp, address indexed userAddress, uint totalOccurence, uint currentOccurence);
    event deletedDCA(uint timestamp, address userAddress);   

    function addNewDCAToUser(uint _period, uint _totalOccurences, uint _amountPerOccurrence, address _tokenIn, address _tokenOut, uint _fee10Decimals)
                 external payable {
        //Add a DCA to the calling user and lock the necessary funds on the contract
        //The funds can be unlocked at all time be cancelling the DCA
        //If one of the two address is address(0), its BNB
        //TODO :
        // - Security checks

        uint timestamp = block.timestamp;

        require(_period * _totalOccurences * _amountPerOccurrence > 0, 
                "Error: DCA Period, Total Occurences and Amount Per Occurence must be all greater than 0");
        require(mapDCA[msg.sender][timestamp].periodDays == 0, "Error: Retry in a few seconds");

        //Register the DCA for this user
        mapDCA[msg.sender][timestamp] = userDCAData(_period, _totalOccurences, 0, _amountPerOccurrence, _tokenIn, _tokenOut,
                                                    _totalOccurences * _amountPerOccurrence, buildSwapPath(_tokenIn, _tokenOut), _fee10Decimals);

        if (_tokenIn != address(0)) {
            //Require the user to approve the transfer beforehand
            IERC20(_tokenIn).transferFrom(msg.sender, address(this), _totalOccurences * _amountPerOccurrence);
        }
        else {
            require(msg.value >= _totalOccurences * _amountPerOccurrence, "Error: You did not sent enough BNB");
        }

        emit addedNewDCA(timestamp, msg.sender);

        executeSingleUserDCA(msg.sender, timestamp);
    }

    function deleteUserDCA(uint _startDate) external {
        /*Delete a DCA to free the storage and earn back gas and transfer back to the user the remaining amount 
            address(0) as the IN our OUT token mean that it is BNB
            TODO : 
             - Security checks
            Should be deletable by :
                -The user at any time
        */ 

        userDCAData memory userDCA = mapDCA[msg.sender][_startDate];
        require(userDCA.periodDays > 0, "Error: This DCA does not exist");
        delete mapDCA[msg.sender][_startDate];

        if (userDCA.tokenIn != address(0)) {
            IERC20(userDCA.tokenIn).transfer(msg.sender, userDCA.tokenInLockedAmount);
        }
        else {
            (bool success, ) =msg.sender.call{value: userDCA.tokenInLockedAmount}("");
            require(success, "BNB Transfer failed.");
        }

        emit deletedDCA(_startDate, msg.sender);
    }

    function executeSingleUserDCA(address user, uint DCAStartDate ) public {

        /*  Execute a single occurence of a single DCA for the user
            Find the right one by the user address and startDate value, which should be unique for each DCA of this user
            It implies that we must know this exact value i.e. querying it after creating the DCA, and stocking it on our servers
            This function should be call by our server every automatically, depending on the period of the DCA
            Steps :
             - Security checks
               - The DCA must exist
               - The current date must be around startDate + period * currentOccurence - margin 
               - The currentOccurence number should be lower than the totalOccurence (i.e. not completed)
             - Modify the userDCAData state to reflect the operation (need to do it 1st to avoir re-entrency attacks)
                - Increment the number of occurence
                - Modify the lockedAmount of each token
             - Swap the defined amount of tokens, minus the fee, with the swap() function 
             - Send the fee to the address that executed this function
             TODO: 
        */
        userDCAData memory userDCA = mapDCA[user][DCAStartDate];

        require(userDCA.periodDays > 0, "Error: This DCA does not exist");
        require(userDCA.totalOccurences > userDCA.currentOccurence, "Error: DCA has already been completed, the user has to retrieve its tokens");
        require(block.timestamp > DCAStartDate + userDCA.periodDays * /*86400*/ 1  * (userDCA.currentOccurence + 1) - 1800,
                                                                                     "Error: Too soon to execute this DCA");

        mapDCA[user][DCAStartDate].currentOccurence = userDCA.currentOccurence + 1;

        uint amountOut = IPancakeRouter02(PANCAKEV2ROUTERTESTNET)
                            .getAmountsOut(userDCA.amountPerOccurence, userDCA.swapPath)[userDCA.swapPath.length - 1];

        mapDCA[user][DCAStartDate].tokenInLockedAmount = userDCA.tokenInLockedAmount - userDCA.amountPerOccurence;

        uint amountWithoutFees = ((userDCA.amountPerOccurence * 100000) * (100000 - userDCA.fee5Decimals)) / 10000000000;
        swap(userDCA.tokenIn, userDCA.tokenOut, userDCA.swapPath, amountWithoutFees, amountOut, user);

        IERC20(userDCA.tokenIn).transfer(msg.sender, userDCA.amountPerOccurence - amountWithoutFees);
        emit occurenceExecuted(DCAStartDate, user, userDCA.totalOccurences, userDCA.currentOccurence + 1);
    }   

    function swap(address _tokenIn, address _tokenOut, address[] memory path, uint256 _amountIn, uint256 _amountOutMin, address userAddress) private {
        /*
            Swap _tokenIn for _tokenOut using the PancakeSwap RouterV2 contract
            If _tokenIn is an ERC20 it first gives _amountIn allowance to the router to do the swap
            Then it calls the appropriate function for the swap
            The called PancakeSwap function depends on the nature of _tokenIn and _tokenOut, if one of them is BNB or not
        */

        //Case 1: Both tokens are ERC20 tokens
        if (_tokenIn != address(0) && _tokenOut != address(0)) {
            IERC20(_tokenIn).approve(PANCAKEV2ROUTERTESTNET, _amountIn);
            IPancakeRouter02(PANCAKEV2ROUTERTESTNET).swapExactTokensForTokensSupportingFeeOnTransferTokens
                                                        (_amountIn, _amountOutMin, path, userAddress, block.timestamp);
        }
        //Case 2: _tokenIn is BNB
        else if (_tokenIn == address(0)) {
            IPancakeRouter02(PANCAKEV2ROUTERTESTNET).swapExactETHForTokensSupportingFeeOnTransferTokens{value: _amountIn}
                                                        (_amountOutMin, path,  userAddress, block.timestamp);
        }
        //Case 3: _tokenOut is BNB
        else if (_tokenOut == address(0)) {
            IERC20(_tokenIn).approve(PANCAKEV2ROUTERTESTNET, _amountIn);
            IPancakeRouter02(PANCAKEV2ROUTERTESTNET).swapExactTokensForETHSupportingFeeOnTransferTokens
                                                        (_amountIn, _amountOutMin, path,  userAddress, block.timestamp);
        }
    }

    function buildSwapPath(address _tokenIn, address _tokenOut) private pure returns (address[] memory){
        /*
            Check if the swap is possible on PancakeSwap and return the swap path if it is
            If the IN or OUT token is BNB, its part of the path is set to the WBNB address because
                it is how PancakeSwap swap functions work
            Otherwise the swap path go throught WBNB as it seems to be cheaper (?)
            Might not be interesting to check if the pair currently exist ? Would lower gas fee and does not
            block the user from retrieving their tokens --- DONE ---
        */
        address[] memory path;
        
        //Case 1 : The IN token is BNB
        if (_tokenIn == address(0)) {
            path = new address[](2);
            path[0] = WBNBTestNet;
            path[1] = _tokenOut;
        }
        //Case 2 : The OUT token is BNB
        else if (_tokenOut == address(0)) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = WBNBTestNet;
        }
        //Case 3 : Both token are ERC20 but swapping throught WBNB is possible
        else if (_tokenIn == WBNBTestNet || _tokenOut == WBNBTestNet) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = WBNBTestNet;
            path[2] = _tokenOut;
        }          
        


        return path;
    }
}
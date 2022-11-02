@@ -1,278 +1,283 @@
// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./Struct.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

//main contract
contract DCApp{

    mapping (address => mapping( uint => userDCAData)) public mapDCA;
    //address of the pancakeswap v2 router
    address private constant PANCAKEV2ROUTER = 0x10ED43C718714eb63d5aA57B78B54704E256024E;

    //address of WBNB token.  This is needed because some times it is better to trade through WBNB. 
    address private constant WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

    function swap(address _tokenIn, address _tokenOut, uint256 _amountIn, uint256 _amountOutMin, address _to) private {
      
        //first we need to transfer the amount in tokens from the msg.sender to this contract
        //this contract will have the amount of in tokens
        //IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
    
        //next we need to allow the uniswapv2 router to spend the token we just sent to this contract
        //by calling IERC20 approve you allow the uniswap contract to spend the tokens in this contract 
        IERC20(_tokenIn).approve(PANCAKEV2ROUTER, _amountIn);

        //path is an array of addresses.
        //this path array will have 3 addresses [tokenIn, WBNB, tokenOut]
        //the if statement below takes into account if token in or token out is WBNB.  then the path is only 2 addresses
        address[] memory path;
        if (_tokenIn == WBNB || _tokenOut == WBNB) {
          path = new address[](2);
          path[0] = _tokenIn;
          path[1] = _tokenOut;
        } else {
          path = new address[](3);
          path[0] = _tokenIn;
          path[1] = WBNB;
          path[2] = _tokenOut;
        }
        //then we will call swapExactTokensForTokensSupportingFeeOnTransferTokens
        //for the deadline we will pass in block.timestamp
        //the deadline is the latest time the trade is valid for
        IPancakeRouter02(PANCAKEV2ROUTER).swapExactTokensForTokensSupportingFeeOnTransferTokens(_amountIn, _amountOutMin, path, _to, block.timestamp);
    }
    
       
    function getAmountOutMin(address _tokenIn, address _tokenOut, uint256 _amountIn) private view returns (uint256) {
       //this function will return the minimum amount from a swap
       //input the 3 parameters below and it will return the minimum amount out
       //this is needed for the swap function above
       //path is an array of addresses.
       //this path array will have 3 addresses [tokenIn, WBNB, tokenOut]
       //the if statement below takes into account if token in or token out is WBNB.  then the path is only 2 addresses
        address[] memory path;
        if (_tokenIn == WBNB || _tokenOut == WBNB) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = WBNB;
            path[2] = _tokenOut;
        }
        
        uint256[] memory amountOutMins = IPancakeRouter02(PANCAKEV2ROUTER).getAmountsOut(_amountIn, path);
        return amountOutMins[path.length -1];  
    }  

    function addNewDCAToUser(uint _period, uint _totalOccurences, uint _amountPerOccurrence, address _tokenIn, address _tokenOut)
                 external returns (uint) {
        //Add a DCA to the calling user and lock the necessary funds on the contract
        //The funds can be unlocked at all time be cancelling the DCA
        //TODO :
        // - Security checks

        //Transfer the tokens to this contract
        uint timestamp = block.timestamp;
        
        require(_period > 0, "Error: DCA Period must be greater than 0");
        require(mapDCA[msg.sender][timestamp].periodDays == 0, "Error: Retry in a few seconds");
        
        //Register the DCA for this user
        mapDCA[msg.sender][timestamp] = userDCAData(_period, _totalOccurences, 0, _amountPerOccurrence, _tokenIn, _tokenOut,
                                                    _totalOccurences * _amountPerOccurrence, 0);

        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _totalOccurences * _amountPerOccurrence);
        
        

        return timestamp;
    }

    function deleteUserDCA(uint _startDate) public {
        /*Delete a DCA to free the storage and earn back gas
            Transfer back to the user the remaining amount 
            TODO : 
             - Security checks
             - Lock Data (all the DCA of this user) while being modified
             - Transfer the funds back to the user
            Should be deletable by :
                -The user at any time
        */ 

        userDCAData memory userDCA = mapDCA[msg.sender][_startDate];
        require(userDCA.periodDays > 0, "Error: This DCA does not exist");
        delete mapDCA[msg.sender][_startDate];
        IERC20(userDCA.tokenIn).transfer(msg.sender, userDCA.tokenInLockedAmount);
        IERC20(userDCA.tokenOut).transfer(msg.sender, userDCA.tokenOutLockedAmount);

    }

    function executeSingleUserDCA(address user, uint DCAStartDate ) public {

        /* Execute a single occurence of a single DCA for the user
            Find the right one by the startDate value, which should be unique for each DCA of this user
            It implies that we must know this exact value i.e. querying it after creating the DCA, and stocking it on our servers
            Would mainly be called by our server with web3.js, so the user does not have to worry about it

            Steps :
             - Security checks
               - The msg.sender address need to be ours (?)
               - The current date must be around startDate + period * currentOccurence +- margin (maybe a margin of about an hour or so)
               - The currentOccurence number should be lower than the totalOccurence 
             - Modify the userDCAData state to reflect the operation (need to do it 1st to avoir re-entrency attacks)
             - Swap the defined amount of tokens with the swap() function
        */
        userDCAData memory userDCA = mapDCA[user][DCAStartDate];

        require(userDCA.periodDays > 0, "Error: This DCA does not exist");
        require(userDCA.totalOccurences > userDCA.currentOccurence, "Error: DCA has already been completed, the user has to retrieve its tokens");
        require(block.timestamp > DCAStartDate + userDCA.periodDays * 86400 * (userDCA.currentOccurence + 1) - 1800, "Error: Too soon to execute this DCA");

        mapDCA[user][DCAStartDate].currentOccurence = userDCA.currentOccurence + 1;

        uint amountOut = getAmountOutMin(userDCA.tokenIn, userDCA.tokenOut, userDCA.amountPerOccurence);

        mapDCA[user][DCAStartDate].tokenInLockedAmount = userDCA.tokenInLockedAmount - userDCA.amountPerOccurence;
        mapDCA[user][DCAStartDate].tokenOutLockedAmount = userDCA.tokenOutLockedAmount + amountOut;

        swap(userDCA.tokenIn, userDCA.tokenOut, userDCA.amountPerOccurence, amountOut, address(this));

       
    }   

}
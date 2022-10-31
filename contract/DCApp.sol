// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Struct.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/*
interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}
*/

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


    mapping (address => userDCAData[]) public mapDCA;
    //address of the pancakeswap v2 router
    address private constant PANCAKEV2ROUTER = 0x10ED43C718714eb63d5aA57B78B54704E256024E;

    //address of WBNB token.  This is needed because some times it is better to trade through WBNB. 
    address private constant WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    

    function swap(address _tokenIn, address _tokenOut, uint256 _amountIn, uint256 _amountOutMin, address _to) private {
      
        //first we need to transfer the amount in tokens from the msg.sender to this contract
        //this contract will have the amount of in tokens
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
    
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
    
       //this function will return the minimum amount from a swap
       //input the 3 parameters below and it will return the minimum amount out
       //this is needed for the swap function above
    function getAmountOutMin(address _tokenIn, address _tokenOut, uint256 _amountIn) private view returns (uint256) {

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

    function addNewDCAToUser(uint _frequency, uint _totalOccurences, uint _amountPerOccurrence, address _tokenIn, address _tokenOut) external {
        //Add a DCA to the user and lock the necessary funds on the contract
        //The funds can be unlocked at all time be cancelling the DCA
        //TODO :
        // - Security check
        // - Take the tokenIn funds into the contract
        //      - Call the tokenIn contract to do the transfer to this contract

        //Transfer the tokens to this contract
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _totalOccurences * _amountPerOccurrence);
        //Register the DCA for this user
        mapDCA[msg.sender].push(  userDCAData(_frequency, _totalOccurences, 0, block.timestamp, _amountPerOccurrence, _tokenIn, _tokenOut,
                                    _totalOccurences * _amountPerOccurrence, 0) );
    }

    function deleteUserDCA(address user, uint _startDate) public {
        /*Delete a DCA to free the storage and earn back gas
            Transfer back to the user the remaining amount 
            TODO : 
             - Security checks
             - Lock Data (all the DCA of this user) while being modified
             - Transfer the funds back to the user
            Should be deletable by :
                -The user at any time
                -Anyone if the DCA has been completed (?)
        */ 

        //Find the right DCA to delete by looking at the startDate
        uint indexToDelete = findDCAByStartDate(user, _startDate);

        //Save key information before deleting
        userDCAData[] memory userDCAs = mapDCA[user];
        uint tokenInLockedAmount = userDCAs[indexToDelete].tokenInLockedAmount;
        uint tokenOutLockedAmount = userDCAs[indexToDelete].tokenOutLockedAmount;
        address tokenIn = userDCAs[indexToDelete].tokenIn;
        address tokenOut = userDCAs[indexToDelete].tokenOut;

        //The array does not need to be ordered, so we can juste put the last element at the
        // id to be deleted, then pop() the array to free space
        mapDCA[user][indexToDelete] = userDCAs[userDCAs.length - 1];
        mapDCA[user].pop();

        //Transfer back the remaining locked funds of the initial token
        IERC20(tokenIn).transfer(user, tokenInLockedAmount);
        IERC20(tokenOut).transfer(user, tokenOutLockedAmount);

    }

    function executeSingleUserDCA(address user, uint DCAStartDate ) public {

        /* Execute a single occurence of a single DCA for the user
            Find the right one by the startDate value, which should be unique for each DCA of this user
            It implies that we must know this exact value i.e. querying it after creating the DCA, and stocking it on our servers
            Would mainly be called by our server with web3.js, so the user does not have to worry about it

            Steps :
             - Security checks
               - The msg.sender address need to be ours
               - The current date must be around startDate + frequency * currentOccurence +- margin (maybe a margin of about an hour or so)
               - The currentOccurence number should be lower than the totalOccurence 
             - Modify the userDCAData state to reflect the operation (need to do it 1st to avoir re-entrency attacks)
             - Swap the defined amount of tokens with the swap() function
        */
    }

    function findDCAByStartDate(address user, uint DCAStartDate) private view returns (uint256)  {
        /*  
            Find the DCA for an user
            Return the index of the first one, as they should be unique
            In the case where two DCA got the same startDate, the second one in the array won't be 
                accessible until the first one is deleted
            As such, it doesn't represent a problem, as an ordinary user shouldn't face this problem
        */

        uint indexToDelete;
        userDCAData[] memory userDCADataMemory = mapDCA[user];

        for (uint i = 0; i< userDCADataMemory.length; i++) {
            if (userDCADataMemory[i].startDate == DCAStartDate ) {
                return indexToDelete;
            }
        }
        revert("No DCA started at that date");
    }

}

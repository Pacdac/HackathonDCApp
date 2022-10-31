// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

struct userData {
    uint frequency;
    uint totalOccurences;
    uint currentOccurence;
    uint startDate;
    uint amountPerOccurence;
    address tokenIn;
    address tokenOut;
    uint tokenInLockedAmount;
    uint tokenOutLockedAmount;
}

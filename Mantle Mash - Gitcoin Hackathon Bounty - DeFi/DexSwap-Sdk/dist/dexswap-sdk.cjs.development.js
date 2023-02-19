'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var JSBI = _interopDefault(require('jsbi'));
var invariant = _interopDefault(require('tiny-invariant'));
var warning = _interopDefault(require('tiny-warning'));
var address = require('@ethersproject/address');
var _Big = _interopDefault(require('big.js'));
var toFormat = _interopDefault(require('toformat'));
var _Decimal = _interopDefault(require('decimal.js-light'));
var solidity = require('@ethersproject/solidity');
var ethers = require('ethers');
var contracts = require('@ethersproject/contracts');
var networks$2 = require('@ethersproject/networks');
var providers = require('@ethersproject/providers');
var abi$2 = require('@ethersproject/abi');
var fetch = _interopDefault(require('node-fetch'));

var PERMISSIVE_MULTICALL_ABI = [
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct PermissiveMulticall.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "aggregate",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				internalType: "bytes[]",
				name: "returnData",
				type: "bytes[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct PermissiveMulticall.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "aggregateWithPermissiveness",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "data",
						type: "bytes"
					}
				],
				internalType: "struct PermissiveMulticall.CallOutcome[]",
				name: "callOutcomes",
				type: "tuple[]"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var stakingRewardsDistributionFactory = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_rewardTokensValidatorAddress",
				type: "address"
			},
			{
				internalType: "address",
				name: "_stakableTokenValidatorAddress",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "deployedAt",
				type: "address"
			}
		],
		name: "DistributionCreated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_rewardTokensAddresses",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "_stakableTokenAddress",
				type: "address"
			},
			{
				internalType: "uint256[]",
				name: "_rewardAmounts",
				type: "uint256[]"
			},
			{
				internalType: "uint64",
				name: "_startingTimestamp",
				type: "uint64"
			},
			{
				internalType: "uint64",
				name: "_endingTimestmp",
				type: "uint64"
			},
			{
				internalType: "bool",
				name: "_locked",
				type: "bool"
			},
			{
				internalType: "uint256",
				name: "_stakingCap",
				type: "uint256"
			}
		],
		name: "createDistribution",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "distributions",
		outputs: [
			{
				internalType: "contract ERC20StakingRewardsDistribution",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getDistributionsAmount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "rewardTokensValidator",
		outputs: [
			{
				internalType: "contract IRewardTokensValidator",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_rewardTokensValidatorAddress",
				type: "address"
			}
		],
		name: "setRewardTokensValidator",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_stakableTokenValidatorAddress",
				type: "address"
			}
		],
		name: "setStakableTokenValidator",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "stakableTokenValidator",
		outputs: [
			{
				internalType: "contract IStakableTokenValidator",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var stakingRewardsDistribution = [
	{
		anonymous: false,
		inputs: [
		],
		name: "Canceled",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "claimer",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		name: "Claimed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address[]",
				name: "rewardsTokenAddresses",
				type: "address[]"
			},
			{
				indexed: false,
				internalType: "address",
				name: "stakableTokenAddress",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256[]",
				name: "rewardsAmounts",
				type: "uint256[]"
			},
			{
				indexed: false,
				internalType: "uint64",
				name: "startingTimestamp",
				type: "uint64"
			},
			{
				indexed: false,
				internalType: "uint64",
				name: "endingTimestamp",
				type: "uint64"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "locked",
				type: "bool"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "stakingCap",
				type: "uint256"
			}
		],
		name: "Initialized",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		name: "Recovered",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "staker",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Staked",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "withdrawer",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Withdrawn",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "claimedReward",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "consolidatedRewardsPerStakedToken",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "earnedRewards",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "endingTimestamp",
		outputs: [
			{
				internalType: "uint64",
				name: "",
				type: "uint64"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "initialized",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "lastConsolidationTimestamp",
		outputs: [
			{
				internalType: "uint64",
				name: "",
				type: "uint64"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "locked",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "recoverableUnassignedReward",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "rewardAmount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "rewardPerStakedToken",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "rewardTokens",
		outputs: [
			{
				internalType: "contract ERC20",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "secondsDuration",
		outputs: [
			{
				internalType: "uint64",
				name: "",
				type: "uint64"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "stakableToken",
		outputs: [
			{
				internalType: "contract ERC20",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "stakedTokenAmount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "stakedTokensOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "stakingCap",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "startingTimestamp",
		outputs: [
			{
				internalType: "uint64",
				name: "",
				type: "uint64"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "totalClaimedRewards",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalStakedTokensAmount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getRewardTokens",
		outputs: [
			{
				internalType: "contract ERC20[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_claimer",
				type: "address"
			}
		],
		name: "getClaimedRewards",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_rewardTokenAddresses",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "_stakableTokenAddress",
				type: "address"
			},
			{
				internalType: "uint256[]",
				name: "_rewardAmounts",
				type: "uint256[]"
			},
			{
				internalType: "uint64",
				name: "_startingTimestamp",
				type: "uint64"
			},
			{
				internalType: "uint64",
				name: "_endingTimestamp",
				type: "uint64"
			},
			{
				internalType: "bool",
				name: "_locked",
				type: "bool"
			},
			{
				internalType: "uint256",
				name: "_stakingCap",
				type: "uint256"
			}
		],
		name: "initialize",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "cancel",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "recoverUnassignedRewards",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "stake",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256"
			}
		],
		name: "withdraw",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256[]",
				name: "_amounts",
				type: "uint256[]"
			},
			{
				internalType: "address",
				name: "_recipient",
				type: "address"
			}
		],
		name: "claim",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_recipient",
				type: "address"
			}
		],
		name: "claimAll",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_recipient",
				type: "address"
			}
		],
		name: "exit",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "consolidateReward",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_staker",
				type: "address"
			}
		],
		name: "claimableRewards",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var TokenRegistryAbi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "listId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "listName",
				type: "string"
			}
		],
		name: "AddList",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "listId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "AddToken",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "listId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "RemoveToken",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_listName",
				type: "string"
			}
		],
		name: "addList",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_listId",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "_tokens",
				type: "address[]"
			}
		],
		name: "addTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_trader",
				type: "address"
			},
			{
				internalType: "address[]",
				name: "_assetAddresses",
				type: "address[]"
			}
		],
		name: "getExternalBalances",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_listId",
				type: "uint256"
			}
		],
		name: "getTokens",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_tokens",
				type: "address[]"
			}
		],
		name: "getTokensData",
		outputs: [
			{
				internalType: "string[]",
				name: "names",
				type: "string[]"
			},
			{
				internalType: "string[]",
				name: "symbols",
				type: "string[]"
			},
			{
				internalType: "uint256[]",
				name: "decimals",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_listId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_start",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_end",
				type: "uint256"
			}
		],
		name: "getTokensRange",
		outputs: [
			{
				internalType: "address[]",
				name: "tokensRange",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_listId",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_token",
				type: "address"
			}
		],
		name: "isTokenActive",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "listCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_listId",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "_tokens",
				type: "address[]"
			}
		],
		name: "removeTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "tcrs",
		outputs: [
			{
				internalType: "uint256",
				name: "listId",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "listName",
				type: "string"
			},
			{
				internalType: "uint256",
				name: "activeTokenCount",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var mainnet = {
	deployer: "0x0000000000000000000000000000000000000000",
	factory: "0x0000000000000000000000000000000000000000",
	feeReceiver: "0x0000000000000000000000000000000000000000",
	feeSetter: "0x0000000000000000000000000000000000000000"
};
var mantle_testnet = {
	deployer: "0xE29556338838e8Eaf1D46bC26bC040BAAb5F7bcD",
	factory: "0x43d22291B20352263816e3636D9c83DE23c7c0b0",
	feeSetter: "0x8664BBB0a740C84Cd80Cf6861DAB0C4F25d52310",
	feeReceiver: "0xEf452f96b07a3AE99D98fcB72B8e71031993C4A5"
};
var mumbai = {
	deployer: "0xb365862307F66a03F7128815f10A1B5d3Ba1fE68",
	factory: "0xc75aE86d9F9d8C150b4bFf9A8Fb77481B0611a56",
	feeSetter: "0x3296EB8EA6B25743Cda1596c6089Cc9B4ee795FE",
	feeReceiver: "0xaAeE131AE13069a92Bf5F1FceF2327da8802DbFC"
};

var mainnet$1 = {
	router: "0x0000000000000000000000000000000000000000"
};
var mantle_testnet$1 = {
	router: "0x575D6Cc373391048fb9ef14bf4deB811dE386b64"
};
var mumbai$1 = {
	router: "0x755c8d2DC0c5F391BB4ED72d42098b43Dae6cba5"
};

var _FACTORY_ADDRESS, _ROUTER_ADDRESS, _STAKING_REWARDS_FACT, _TOKEN_REGISTRY_ADDRE, _DEXSWAP_TOKEN_LIST_I, _SOLIDITY_TYPE_MAXIMA, _PERMISSIVE_MULTICALL;

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
  ChainId[ChainId["MANTLE_TESTNET"] = 5001] = "MANTLE_TESTNET";
  ChainId[ChainId["MUMBAI"] = 80001] = "MUMBAI";
})(exports.ChainId || (exports.ChainId = {}));

(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(exports.TradeType || (exports.TradeType = {}));

(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(exports.Rounding || (exports.Rounding = {}));

var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
var FACTORY_ADDRESS = (_FACTORY_ADDRESS = {}, _FACTORY_ADDRESS[exports.ChainId.MAINNET] = mainnet.factory, _FACTORY_ADDRESS[exports.ChainId.MANTLE_TESTNET] = mantle_testnet.factory, _FACTORY_ADDRESS[exports.ChainId.MUMBAI] = mumbai.factory, _FACTORY_ADDRESS);
var ROUTER_ADDRESS = (_ROUTER_ADDRESS = {}, _ROUTER_ADDRESS[exports.ChainId.MAINNET] = mainnet$1.router, _ROUTER_ADDRESS[exports.ChainId.MANTLE_TESTNET] = mantle_testnet$1.router, _ROUTER_ADDRESS[exports.ChainId.MUMBAI] = mumbai$1.router, _ROUTER_ADDRESS);
var STAKING_REWARDS_FACTORY_ADDRESS = (_STAKING_REWARDS_FACT = {}, _STAKING_REWARDS_FACT[exports.ChainId.MAINNET] = '0x0000000000000000000000000000000000001234', _STAKING_REWARDS_FACT[exports.ChainId.MANTLE_TESTNET] = '0x0000000000000000000000000000000000001234', _STAKING_REWARDS_FACT[exports.ChainId.MUMBAI] = '0x0000000000000000000000000000000000001234', _STAKING_REWARDS_FACT);
var TOKEN_REGISTRY_ADDRESS = (_TOKEN_REGISTRY_ADDRE = {}, _TOKEN_REGISTRY_ADDRE[exports.ChainId.MAINNET] = '0x93DB90445B76329e9ed96ECd74e76D8fbf2590d8', _TOKEN_REGISTRY_ADDRE[exports.ChainId.MANTLE_TESTNET] = '0x3e7C79EF335F55b2E57C80731a68cAB9dB280453', _TOKEN_REGISTRY_ADDRE[exports.ChainId.MUMBAI] = '0x63Aa6D1462165bDfb1b50415f5fe70Ded49E5d35', _TOKEN_REGISTRY_ADDRE);
var DEXSWAP_TOKEN_LIST_ID = (_DEXSWAP_TOKEN_LIST_I = {}, _DEXSWAP_TOKEN_LIST_I[exports.ChainId.MAINNET] = 1, _DEXSWAP_TOKEN_LIST_I[exports.ChainId.MANTLE_TESTNET] = 1, _DEXSWAP_TOKEN_LIST_I[exports.ChainId.MUMBAI] = 1, _DEXSWAP_TOKEN_LIST_I);
var INIT_CODE_HASH = '0x9cc6182b292e7e920520a70ff99748b19f30f51e4a384dc34cf9f7b10d936440';
var MINIMUM_LIQUIDITY = /*#__PURE__*/JSBI.BigInt(1000); // exports for internal consumption

var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
var THREE = /*#__PURE__*/JSBI.BigInt(3);
var FIVE = /*#__PURE__*/JSBI.BigInt(5);
var TEN = /*#__PURE__*/JSBI.BigInt(10);
var _25 = /*#__PURE__*/JSBI.BigInt(25);
var SECONDS_IN_YEAR = /*#__PURE__*/JSBI.BigInt(31536000);
var _30 = /*#__PURE__*/JSBI.BigInt(30);
var _100 = /*#__PURE__*/JSBI.BigInt(100);
var _1000 = /*#__PURE__*/JSBI.BigInt(1000);
var _10000 = /*#__PURE__*/JSBI.BigInt(10000);
var defaultSwapFee = _25;
var defaultProtocolFeeDenominator = FIVE;

(function (SolidityType) {
  SolidityType["uint8"] = "uint8";
  SolidityType["uint256"] = "uint256";
})(exports.SolidityType || (exports.SolidityType = {}));

var SOLIDITY_TYPE_MAXIMA = (_SOLIDITY_TYPE_MAXIMA = {}, _SOLIDITY_TYPE_MAXIMA[exports.SolidityType.uint8] = /*#__PURE__*/JSBI.BigInt('0xff'), _SOLIDITY_TYPE_MAXIMA[exports.SolidityType.uint256] = /*#__PURE__*/JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'), _SOLIDITY_TYPE_MAXIMA);
var PERMISSIVE_MULTICALL_ADDRESS = (_PERMISSIVE_MULTICALL = {}, _PERMISSIVE_MULTICALL[exports.ChainId.MAINNET] = '0x0946f567d0ed891e6566c1da8e5093517f43571d', _PERMISSIVE_MULTICALL[exports.ChainId.MANTLE_TESTNET] = '0xA8fD29EbbfbC21bc274FedE5Aa5C5D3cedc43f2C', _PERMISSIVE_MULTICALL[exports.ChainId.MUMBAI] = '0xBE134FCAB1141485a7cD9Cc952172E0AcA9Ed46D', _PERMISSIVE_MULTICALL);

function validateSolidityTypeInstance(value, solidityType) {
  !JSBI.greaterThanOrEqual(value, ZERO) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
  !JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
} // warns if addresses are not checksummed

function validateAndParseAddress(address$1) {
  try {
    var checksummedAddress = address.getAddress(address$1);
    "development" !== "production" ? warning(address$1 === checksummedAddress, address$1 + " is not checksummed.") : void 0;
    return checksummedAddress;
  } catch (error) {
      invariant(false, address$1 + " is not a valid address.")  ;
  }
}
function parseBigintIsh(bigintIsh) {
  return bigintIsh instanceof JSBI ? bigintIsh : typeof bigintIsh === 'bigint' ? JSBI.BigInt(bigintIsh.toString()) : JSBI.BigInt(bigintIsh);
} // mock the on-chain sqrt function

function sqrt(y) {
  validateSolidityTypeInstance(y, exports.SolidityType.uint256);
  var z = ZERO;
  var x;

  if (JSBI.greaterThan(y, THREE)) {
    z = y;
    x = JSBI.add(JSBI.divide(y, TWO), ONE);

    while (JSBI.lessThan(x, z)) {
      z = x;
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), TWO);
    }
  } else if (JSBI.notEqual(y, ZERO)) {
    z = ONE;
  }

  return z;
} // given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item

function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ?  invariant(false, 'MAX_SIZE_ZERO')  : void 0; // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize

  !(items.length <= maxSize) ?  invariant(false, 'ITEMS_SIZE')  : void 0; // short circuit first item add

  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize; // short circuit if full and the additional item does not come before the last item

    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }

    var lo = 0,
        hi = items.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;

      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

// see https://stackoverflow.com/a/41102306
var CAN_SET_PROTOTYPE = ('setPrototypeOf' in Object);
/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */

var InsufficientReservesError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InsufficientReservesError, _Error);

  function InsufficientReservesError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.isInsufficientReservesError = true;
    _this.name = _this.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof InsufficientReservesError ? this.constructor : void 0).prototype);
    return _this;
  }

  return InsufficientReservesError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Indicates that the input amount is too small to produce any amount of output. I.e. the amount of input sent is less
 * than the price of a single unit of output after fees.
 */

var InsufficientInputAmountError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(InsufficientInputAmountError, _Error2);

  function InsufficientInputAmountError() {
    var _this2;

    _this2 = _Error2.call(this) || this;
    _this2.isInsufficientInputAmountError = true;
    _this2.name = _this2.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this2), (this instanceof InsufficientInputAmountError ? this.constructor : void 0).prototype);
    return _this2;
  }

  return InsufficientInputAmountError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var _Currency$NATIVE_CURR;
/**
 * A currency is any fungible financial instrument on the target chain.
 *
 * The only instances of the base class `Currency` are native currencies such as Ether for Ethereum,
 * SPOA for the Sokol testnet and xDAI for xDAI.
 */

var Currency = /*#__PURE__*/function () {
  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  function Currency(decimals, symbol, name) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), exports.SolidityType.uint8);
    this.decimals = decimals;
    this.symbol = symbol;
    this.name = name;
  }

  Currency.isNative = function isNative(currency) {
    return Object.values(Currency.NATIVE_CURRENCY).indexOf(currency) >= 0;
  };

  Currency.getNative = function getNative(chainId) {
    return Currency.NATIVE_CURRENCY[chainId];
  };

  return Currency;
}(); // fiat currencies used to represent countervalues

Currency.USD = /*#__PURE__*/new Currency(18, 'USD', 'US dollar'); // Native currencies for deployment chains

Currency.ETHER = /*#__PURE__*/new Currency(18, 'ETH', 'Ether');
Currency.BIT = /*#__PURE__*/new Currency(18, 'BIT', 'BIT');
Currency.NATIVE_CURRENCY = (_Currency$NATIVE_CURR = {}, _Currency$NATIVE_CURR[exports.ChainId.MAINNET] = Currency.ETHER, _Currency$NATIVE_CURR[exports.ChainId.MANTLE_TESTNET] = Currency.BIT, _Currency$NATIVE_CURR[exports.ChainId.MUMBAI] = Currency.ETHER, _Currency$NATIVE_CURR);
var USD = Currency.USD;
var ETHER = Currency.ETHER;
var BIT = Currency.BIT;

var _Token$WETH, _Token$DEZU, _Token$ZONU, _Token$ZGEM, _Token$WBTC, _Token$USDC, _Token$USDT, _Token$WBNB, _Token$NATIVE_CURRENC;
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */

var Token = /*#__PURE__*/function (_Currency) {
  _inheritsLoose(Token, _Currency);

  function Token(chainId, address, decimals, symbol, name) {
    var _this;

    _this = _Currency.call(this, decimals, symbol, name) || this;
    _this.chainId = chainId;
    _this.address = validateAndParseAddress(address);
    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */


  var _proto = Token.prototype;

  _proto.equals = function equals(other) {
    // short circuit on reference equality
    if (this === other) {
      return true;
    }

    return this.chainId === other.chainId && this.address === other.address;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  ;

  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(this.address !== other.address) ?  invariant(false, 'ADDRESSES')  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };

  Token.getNativeWrapper = function getNativeWrapper(chainId) {
    return Token.NATIVE_CURRENCY_WRAPPER[chainId];
  };

  Token.isNativeWrapper = function isNativeWrapper(token) {
    return Token.NATIVE_CURRENCY_WRAPPER[token.chainId].equals(token);
  };

  return Token;
}(Currency);
Token.WETH = (_Token$WETH = {}, _Token$WETH[exports.ChainId.MAINNET] = /*#__PURE__*/new Token(exports.ChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'), _Token$WETH[exports.ChainId.MANTLE_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.MANTLE_TESTNET, '0x707f2fE56A440E766bec41aBC9fc8695567D0ceA', 18, 'WETH', 'Wrapped Ether'), _Token$WETH[exports.ChainId.MUMBAI] = /*#__PURE__*/new Token(exports.ChainId.MUMBAI, '0x2c57C73542a23dA327699D288757CFb41f71855f', 18, 'WETH', 'Wrapped Ether'), _Token$WETH);
Token.DEZU = (_Token$DEZU = {}, _Token$DEZU[exports.ChainId.MANTLE_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.MANTLE_TESTNET, '0xCab6D79dD732779f081B5868AAb1e64F357e90A9', 8, 'DEZU', 'DexSwapZonu'), _Token$DEZU[exports.ChainId.MUMBAI] = /*#__PURE__*/new Token(exports.ChainId.MUMBAI, '0x7FB56986974896ed4203857bAFf15Cb89cf082Cd', 8, 'DEZU', 'DexSwapZonu'), _Token$DEZU);
Token.ZONU = (_Token$ZONU = {}, _Token$ZONU[exports.ChainId.MANTLE_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.MANTLE_TESTNET, '0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361', 18, 'ZONU', 'ZoNulet'), _Token$ZONU[exports.ChainId.MUMBAI] = /*#__PURE__*/new Token(exports.ChainId.MUMBAI, '0x9C3a2429A288dBEA75C819Fd18C0b35a0C3E1361', 18, 'ZONU', 'ZoNulet'), _Token$ZONU);
Token.ZGEM = (_Token$ZGEM = {}, _Token$ZGEM[exports.ChainId.MANTLE_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.MANTLE_TESTNET, '0x8104B78e614a32ac4C5Cb54941a6B3b27143AbdB', 18, 'ZGEM', 'ZonuGem'), _Token$ZGEM[exports.ChainId.MUMBAI] = /*#__PURE__*/new Token(exports.ChainId.MUMBAI, '0x8104B78e614a32ac4C5Cb54941a6B3b27143AbdB', 18, 'ZGEM', 'ZonuGem'), _Token$ZGEM);
Token.WBTC = (_Token$WBTC = {}, _Token$WBTC[exports.ChainId.MANTLE_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.MANTLE_TESTNET, '0x777638AB212Fab2F1D1202DedCC7f18D2c527b50', 8, 'WBTC', 'Wrapped BTC'), _Token$WBTC[exports.ChainId.MUMBAI] = /*#__PURE__*/new Token(exports.ChainId.MUMBAI, '0xE77B1Dc85edE199bf3dAA85D0958F2F966788af5', 8, 'WBTC', 'Wrapped BTC'), _Token$WBTC);
Token.USDC = (_Token$USDC = {}, _Token$USDC[exports.ChainId.MANTLE_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.MANTLE_TESTNET, '0x97830fa9e74C5a596C8994C37f9e92cBc42560B3', 8, 'USDC', 'USDC'), _Token$USDC[exports.ChainId.MUMBAI] = /*#__PURE__*/new Token(exports.ChainId.MUMBAI, '0x530BEb0F943c4f23c95473F59Fe5fa9aF3eAA5A7', 8, 'USDC', 'USDC'), _Token$USDC);
Token.USDT = (_Token$USDT = {}, _Token$USDT[exports.ChainId.MANTLE_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.MANTLE_TESTNET, '0xc75aE86d9F9d8C150b4bFf9A8Fb77481B0611a56', 8, 'USDT', 'USDT'), _Token$USDT[exports.ChainId.MUMBAI] = /*#__PURE__*/new Token(exports.ChainId.MUMBAI, '0x181e4AB46e2b6A6a262B1bA261ffd324BBA7C9f5', 8, 'USDT', 'USDT'), _Token$USDT);
Token.WBNB = (_Token$WBNB = {}, _Token$WBNB[exports.ChainId.MANTLE_TESTNET] = /*#__PURE__*/new Token(exports.ChainId.MANTLE_TESTNET, '0xD711d6Ee5cD88d8E33536a4b2918605B084F1A03', 8, 'WBNB', 'WBNB'), _Token$WBNB[exports.ChainId.MUMBAI] = /*#__PURE__*/new Token(exports.ChainId.MUMBAI, '0xEB82D57081e600dc4f3a0877D04f4099ed641757', 8, 'WBNB', 'WBNB'), _Token$WBNB);
Token.NATIVE_CURRENCY_WRAPPER = (_Token$NATIVE_CURRENC = {}, _Token$NATIVE_CURRENC[exports.ChainId.MAINNET] = Token.WETH[exports.ChainId.MAINNET], _Token$NATIVE_CURRENC[exports.ChainId.MANTLE_TESTNET] = Token.WETH[exports.ChainId.MANTLE_TESTNET], _Token$NATIVE_CURRENC[exports.ChainId.MUMBAI] = Token.WETH[exports.ChainId.MUMBAI], _Token$NATIVE_CURRENC);
/**
 * Compares two currencies for equality
 */

function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
} // reexport for convenience

var WETH = Token.WETH;
var WBNB = Token.WBNB;
var WBTC = Token.WBTC;
var USDC = Token.USDC;
var USDT = Token.USDT;
var DEZU = Token.DEZU;
var ZONU = Token.ZONU;
var ZGEM = Token.ZGEM;

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[exports.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[exports.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[exports.Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[exports.Rounding.ROUND_DOWN] = 0, _toFixedRounding[exports.Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[exports.Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = ONE;
    }

    this.numerator = parseBigintIsh(numerator);
    this.denominator = parseBigintIsh(denominator);
  } // performs floor division


  var _proto = Fraction.prototype;

  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };

  _proto.add = function add(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.subtract = function subtract(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.lessThan = function lessThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.equalTo = function equalTo(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.multiply = function multiply(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.divide = function divide(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(significantDigits) ?  invariant(false, significantDigits + " is not an integer.")  : void 0;
    !(significantDigits > 0) ?  invariant(false, significantDigits + " is not positive.")  : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(decimalPlaces) ?  invariant(false, decimalPlaces + " is not an integer.")  : void 0;
    !(decimalPlaces >= 0) ?  invariant(false, decimalPlaces + " is negative.")  : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  };

  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    } // remainder after floor division

  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }]);

  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);

  // amount _must_ be raw, i.e. in the native representation
  function CurrencyAmount(currency, amount) {
    var _this;

    var parsedAmount = parseBigintIsh(amount);
    validateSolidityTypeInstance(parsedAmount, exports.SolidityType.uint256);
    _this = _Fraction.call(this, parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals))) || this;
    _this.currency = currency;
    return _this;
  }
  /**
   * Helper that calls the constructor with the ETHER currency
   * @param amount ether amount in wei
   */


  CurrencyAmount.nativeCurrency = function nativeCurrency(amount, chainId) {
    var nativeCurrency = Currency.getNative(chainId);
    !!!nativeCurrency ?  invariant(false, 'NO_NATIVE_CURRENCY')  : void 0;
    return new CurrencyAmount(nativeCurrency, amount);
  }
  /**
   * Helper that calls the constructor with the USD currency
   * @param amount amount of usd experessed in wei (with 18 decimals resolution)
   */
  ;

  CurrencyAmount.usd = function usd(amount) {
    return new CurrencyAmount(USD, amount);
  };

  var _proto = CurrencyAmount.prototype;

  _proto.add = function add(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    return _Fraction.prototype.toSignificant.call(this, significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    !(decimalPlaces <= this.currency.decimals) ?  invariant(false, 'DECIMALS')  : void 0;
    return _Fraction.prototype.toFixed.call(this, decimalPlaces, format, rounding);
  };

  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    Big$1.DP = this.currency.decimals;
    return new Big$1(this.numerator.toString()).div(this.denominator.toString()).toFormat(format);
  };

  _createClass(CurrencyAmount, [{
    key: "raw",
    get: function get() {
      return this.numerator;
    }
  }]);

  return CurrencyAmount;
}(Fraction);

var TokenAmount = /*#__PURE__*/function (_CurrencyAmount) {
  _inheritsLoose(TokenAmount, _CurrencyAmount);

  // amount _must_ be raw, i.e. in the native representation
  function TokenAmount(token, amount) {
    var _this;

    _this = _CurrencyAmount.call(this, token, amount) || this;
    _this.token = token;
    return _this;
  }

  var _proto = TokenAmount.prototype;

  _proto.add = function add(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.subtract(this.raw, other.raw));
  };

  return TokenAmount;
}(CurrencyAmount);

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);

  // denominator and numerator _must_ be raw, i.e. in the native representation
  function Price(baseCurrency, quoteCurrency, denominator, numerator) {
    var _this;

    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(TEN, JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(TEN, JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }

  Price.fromRoute = function fromRoute(route) {
    var prices = [];

    for (var _iterator = _createForOfIteratorHelperLoose(route.pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      prices.push(route.path[i].equals(pair.token0) ? new Price(pair.reserve0.currency, pair.reserve1.currency, pair.reserve0.raw, pair.reserve1.raw) : new Price(pair.reserve1.currency, pair.reserve0.currency, pair.reserve1.raw, pair.reserve0.raw));
    }

    return prices.slice(1).reduce(function (accumulator, currentValue) {
      return accumulator.multiply(currentValue);
    }, prices[0]);
  };

  var _proto = Price.prototype;

  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  };

  _proto.multiply = function multiply(other) {
    !currencyEquals(this.quoteCurrency, other.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    var fraction = _Fraction.prototype.multiply.call(this, other);

    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  } // performs floor division on overflow
  ;

  _proto.quote = function quote(currencyAmount) {
    !currencyEquals(currencyAmount.currency, this.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    if (this.quoteCurrency instanceof Token) {
      return new TokenAmount(this.quoteCurrency, _Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
    }

    return CurrencyAmount.nativeCurrency(_Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient, exports.ChainId.MAINNET);
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    return this.adjusted.toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }

    return this.adjusted.toFixed(decimalPlaces, format, rounding);
  };

  _createClass(Price, [{
    key: "raw",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }, {
    key: "adjusted",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);

  return Price;
}(Fraction);

var _RoutablePlatform, _RoutablePlatform2;
var UNISWAP_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
var UNISWAP_ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
/**
 * A platform to which DEXSWAP can route through.
 */

var RoutablePlatform = /*#__PURE__*/function () {
  function RoutablePlatform(name, factoryAddress, routerAddress, initCodeHash, defaultSwapFee) {
    this.name = name;
    this.factoryAddress = factoryAddress;
    this.routerAddress = routerAddress;
    this.initCodeHash = initCodeHash;
    this.defaultSwapFee = defaultSwapFee;
  }

  var _proto = RoutablePlatform.prototype;

  _proto.supportsChain = function supportsChain(chainId) {
    return !!this.factoryAddress[chainId];
  };

  return RoutablePlatform;
}();
RoutablePlatform.DEXSWAP = /*#__PURE__*/new RoutablePlatform('DexSwap', FACTORY_ADDRESS, ROUTER_ADDRESS, INIT_CODE_HASH, defaultSwapFee);
RoutablePlatform.UNISWAP = /*#__PURE__*/new RoutablePlatform('Uniswap', (_RoutablePlatform = {}, _RoutablePlatform[exports.ChainId.MAINNET] = UNISWAP_FACTORY_ADDRESS, _RoutablePlatform), (_RoutablePlatform2 = {}, _RoutablePlatform2[exports.ChainId.MAINNET] = UNISWAP_ROUTER_ADDRESS, _RoutablePlatform2), '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f', _30);

var _INITIAL_CACHE_STATE, _PAIR_ADDRESS_CACHE;
var INITIAL_CACHE_STATE = (_INITIAL_CACHE_STATE = {}, _INITIAL_CACHE_STATE[exports.ChainId.MAINNET] = {}, _INITIAL_CACHE_STATE[exports.ChainId.MANTLE_TESTNET] = {}, _INITIAL_CACHE_STATE[exports.ChainId.MUMBAI] = {}, _INITIAL_CACHE_STATE);
var PAIR_ADDRESS_CACHE = (_PAIR_ADDRESS_CACHE = {}, _PAIR_ADDRESS_CACHE[RoutablePlatform.DEXSWAP.name] = /*#__PURE__*/_extends({}, INITIAL_CACHE_STATE), _PAIR_ADDRESS_CACHE);
var Pair = /*#__PURE__*/function () {
  function Pair(tokenAmountA, tokenAmountB, swapFee, protocolFeeDenominator, platform, liquidityMiningCampaigns) {
    if (platform === void 0) {
      platform = RoutablePlatform.DEXSWAP;
    }

    if (liquidityMiningCampaigns === void 0) {
      liquidityMiningCampaigns = [];
    }

    this.swapFee = defaultSwapFee;
    this.protocolFeeDenominator = defaultProtocolFeeDenominator;
    !(tokenAmountA.token.chainId === tokenAmountB.token.chainId) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    this.platform = platform ? platform : RoutablePlatform.DEXSWAP;
    var liquidityTokenAddress = Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token, platform);
    this.liquidityToken = new Token(tokenAmounts[0].token.chainId, liquidityTokenAddress, 18, 'DEZU', 'DexSwap Zonu');
    this.protocolFeeDenominator = protocolFeeDenominator ? protocolFeeDenominator : defaultProtocolFeeDenominator;
    this.tokenAmounts = tokenAmounts;
    this.swapFee = swapFee ? swapFee : platform.defaultSwapFee;
    this.liquidityMiningCampaigns = liquidityMiningCampaigns;
  }
  /**
   * Returns true if the two pairs are equivalent, i.e. have the same address (calculated using create2).
   * @param other other pair to compare
   */


  var _proto = Pair.prototype;

  _proto.equals = function equals(other) {
    // short circuit on reference equality
    if (this === other) {
      return true;
    }

    return this.liquidityToken.address === other.liquidityToken.address;
  };

  Pair.getAddress = function getAddress(tokenA, tokenB, platform) {
    var _PAIR_ADDRESS_CACHE2, _PAIR_ADDRESS_CACHE2$, _PAIR_ADDRESS_CACHE2$2, _PAIR_ADDRESS_CACHE2$3;

    if (platform === void 0) {
      platform = RoutablePlatform.DEXSWAP;
    }

    var tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks

    var chainId = tokenA.chainId;
    !platform.supportsChain(chainId) ?  invariant(false, 'INVALID_PLATFORM_CHAIN_ID')  : void 0;

    if (((_PAIR_ADDRESS_CACHE2 = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE2 === void 0 ? void 0 : (_PAIR_ADDRESS_CACHE2$ = _PAIR_ADDRESS_CACHE2[platform.name]) === null || _PAIR_ADDRESS_CACHE2$ === void 0 ? void 0 : (_PAIR_ADDRESS_CACHE2$2 = _PAIR_ADDRESS_CACHE2$[chainId]) === null || _PAIR_ADDRESS_CACHE2$2 === void 0 ? void 0 : (_PAIR_ADDRESS_CACHE2$3 = _PAIR_ADDRESS_CACHE2$2[tokens[0].address]) === null || _PAIR_ADDRESS_CACHE2$3 === void 0 ? void 0 : _PAIR_ADDRESS_CACHE2$3[tokens[1].address]) === undefined) {
      var _PAIR_ADDRESS_CACHE3, _PAIR_ADDRESS_CACHE3$, _PAIR_ADDRESS_CACHE3$2, _extends2, _extends3, _extends4, _extends5;

      PAIR_ADDRESS_CACHE = _extends({}, PAIR_ADDRESS_CACHE, (_extends5 = {}, _extends5[platform.name] = _extends({}, PAIR_ADDRESS_CACHE[platform.name], (_extends4 = {}, _extends4[chainId] = _extends({}, PAIR_ADDRESS_CACHE[platform.name][chainId], (_extends3 = {}, _extends3[tokens[0].address] = _extends({}, (_PAIR_ADDRESS_CACHE3 = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE3 === void 0 ? void 0 : (_PAIR_ADDRESS_CACHE3$ = _PAIR_ADDRESS_CACHE3[platform.name]) === null || _PAIR_ADDRESS_CACHE3$ === void 0 ? void 0 : (_PAIR_ADDRESS_CACHE3$2 = _PAIR_ADDRESS_CACHE3$[chainId]) === null || _PAIR_ADDRESS_CACHE3$2 === void 0 ? void 0 : _PAIR_ADDRESS_CACHE3$2[tokens[0].address], (_extends2 = {}, _extends2[tokens[1].address] = address.getCreate2Address(platform.factoryAddress[chainId], solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [tokens[0].address, tokens[1].address])]), platform.initCodeHash), _extends2)), _extends3)), _extends4)), _extends5));
    }

    return PAIR_ADDRESS_CACHE[platform.name][chainId][tokens[0].address][tokens[1].address];
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  ;

  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  ;

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  _proto.priceOf = function priceOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pair.
   */
  ;

  _proto.reserveOf = function reserveOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.reserve0 : this.reserve1;
  };

  _proto.getOutputAmount = function getOutputAmount(inputAmount) {
    !this.involvesToken(inputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO)) {
      throw new InsufficientReservesError();
    }

    var inputReserve = this.reserveOf(inputAmount.token);
    var outputReserve = this.reserveOf(inputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var inputAmountWithFee = JSBI.multiply(inputAmount.raw, JSBI.subtract(_10000, parseBigintIsh(this.swapFee)));
    var numerator = JSBI.multiply(inputAmountWithFee, outputReserve.raw);
    var denominator = JSBI.add(JSBI.multiply(inputReserve.raw, _10000), inputAmountWithFee);
    var outputAmount = new TokenAmount(inputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.divide(numerator, denominator));

    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.swapFee, this.protocolFeeDenominator)];
  };

  _proto.getInputAmount = function getInputAmount(outputAmount) {
    !this.involvesToken(outputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO) || JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOf(outputAmount.token).raw)) {
      throw new InsufficientReservesError();
    }

    var outputReserve = this.reserveOf(outputAmount.token);
    var inputReserve = this.reserveOf(outputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var numerator = JSBI.multiply(JSBI.multiply(inputReserve.raw, outputAmount.raw), _10000);
    var denominator = JSBI.multiply(JSBI.subtract(outputReserve.raw, outputAmount.raw), JSBI.subtract(_10000, parseBigintIsh(this.swapFee)));
    var inputAmount = new TokenAmount(outputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.add(JSBI.divide(numerator, denominator), ONE));
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.swapFee, this.protocolFeeDenominator)];
  };

  _proto.getLiquidityMinted = function getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB) {
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    !(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1)) ?  invariant(false, 'TOKEN')  : void 0;
    var liquidity;

    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY);
    } else {
      var amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), this.reserve0.raw);
      var amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), this.reserve1.raw);
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1;
    }

    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return new TokenAmount(this.liquidityToken, liquidity);
  };

  _proto.getLiquidityValue = function getLiquidityValue(token, totalSupply, liquidity, feeOn, kLast) {
    if (feeOn === void 0) {
      feeOn = false;
    }

    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'TOTAL_SUPPLY')  : void 0;
    !liquidity.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    !JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var totalSupplyAdjusted;

    if (!feeOn) {
      totalSupplyAdjusted = totalSupply;
    } else {
      !!!kLast ?  invariant(false, 'K_LAST')  : void 0;
      var kLastParsed = parseBigintIsh(kLast);

      if (!JSBI.equal(kLastParsed, ZERO)) {
        var rootK = sqrt(JSBI.multiply(this.reserve0.raw, this.reserve1.raw));
        var rootKLast = sqrt(kLastParsed);

        if (JSBI.greaterThan(rootK, rootKLast)) {
          var numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast));
          var denominator = JSBI.add(JSBI.multiply(rootK, parseBigintIsh(this.protocolFeeDenominator)), rootKLast);
          var feeLiquidity = JSBI.divide(numerator, denominator);
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(this.liquidityToken, feeLiquidity));
        } else {
          totalSupplyAdjusted = totalSupply;
        }
      } else {
        totalSupplyAdjusted = totalSupply;
      }
    }

    return new TokenAmount(token, JSBI.divide(JSBI.multiply(liquidity.raw, this.reserveOf(token).raw), totalSupplyAdjusted.raw));
  };

  _createClass(Pair, [{
    key: "token0Price",
    get: function get() {
      return new Price(this.token0, this.token1, this.tokenAmounts[0].raw, this.tokenAmounts[1].raw);
    }
    /**
     * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
     */

  }, {
    key: "token1Price",
    get: function get() {
      return new Price(this.token1, this.token0, this.tokenAmounts[1].raw, this.tokenAmounts[0].raw);
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.token0.chainId;
    }
  }, {
    key: "token0",
    get: function get() {
      return this.tokenAmounts[0].token;
    }
  }, {
    key: "token1",
    get: function get() {
      return this.tokenAmounts[1].token;
    }
  }, {
    key: "reserve0",
    get: function get() {
      return this.tokenAmounts[0];
    }
  }, {
    key: "reserve1",
    get: function get() {
      return this.tokenAmounts[1];
    }
  }]);

  return Pair;
}();

var Route = /*#__PURE__*/function () {
  function Route(pairs, input, output) {
    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !pairs.every(function (pair) {
      return pair.chainId === pairs[0].chainId;
    }) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !pairs.every(function (pair) {
      return pair.platform === pairs[0].platform;
    }) ?  invariant(false, 'PLATFORM')  : void 0;
    !(input instanceof Token && pairs[0].involvesToken(input) || Currency.isNative(input) && pairs[0].involvesToken(Token.getNativeWrapper(pairs[0].chainId))) ?  invariant(false, 'INPUT')  : void 0;
    !(typeof output === 'undefined' || output instanceof Token && pairs[pairs.length - 1].involvesToken(output) || Currency.isNative(output) && pairs[pairs.length - 1].involvesToken(Token.getNativeWrapper(pairs[0].chainId))) ?  invariant(false, 'OUTPUT')  : void 0;
    var path = [input instanceof Token ? input : Token.getNativeWrapper(pairs[0].chainId)];

    for (var _iterator = _createForOfIteratorHelperLoose(pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      var currentInput = path[i];
      !(currentInput.equals(pair.token0) || currentInput.equals(pair.token1)) ?  invariant(false, 'PATH')  : void 0;

      var _output = currentInput.equals(pair.token0) ? pair.token1 : pair.token0;

      path.push(_output);
    }

    this.pairs = pairs;
    this.path = path;
    this.midPrice = Price.fromRoute(this);
    this.input = input;
    this.output = output !== null && output !== void 0 ? output : path[path.length - 1];
  }

  _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pairs[0].chainId;
    }
  }]);

  return Route;
}();

var _100_PERCENT = /*#__PURE__*/new Fraction(_100);

var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);

  function Percent() {
    return _Fraction.apply(this, arguments) || this;
  }

  var _proto = Percent.prototype;

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }

    return this.multiply(_100_PERCENT).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }

    return this.multiply(_100_PERCENT).toFixed(decimalPlaces, format, rounding);
  };

  return Percent;
}(Fraction);

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */

function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var exactQuote = midPrice.raw.multiply(inputAmount.raw); // calculate slippage := (exactQuote - outputAmount) / exactQuote

  var slippage = exactQuote.subtract(outputAmount.raw).divide(exactQuote);
  return new Percent(slippage.numerator, slippage.denominator);
} // comparator function that allows sorting trades by their output amounts, in decreasing order, and then input amounts
// in increasing order. i.e. the best trades have the most outputs for the least inputs and are sorted first


function inputOutputComparator(a, b) {
  // must have same input and output token for comparison
  !currencyEquals(a.inputAmount.currency, b.inputAmount.currency) ?  invariant(false, 'INPUT_CURRENCY')  : void 0;
  !currencyEquals(a.outputAmount.currency, b.outputAmount.currency) ?  invariant(false, 'OUTPUT_CURRENCY')  : void 0;

  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      return 0;
    } // trade A requires less input than trade B, so A should come first


    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
} // extension of the input output comparator that also considers other dimensions of the trade in ranking them

function tradeComparator(a, b) {
  var ioComp = inputOutputComparator(a, b);

  if (ioComp !== 0) {
    return ioComp;
  } // consider lowest slippage next, since these are less likely to fail


  if (a.priceImpact.lessThan(b.priceImpact)) {
    return -1;
  } else if (a.priceImpact.greaterThan(b.priceImpact)) {
    return 1;
  } // finally consider the number of hops since each hop costs gas


  return a.route.path.length - b.route.path.length;
}
/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */

function wrappedAmount(currencyAmount, chainId) {
  if (currencyAmount instanceof TokenAmount) return currencyAmount;
  if (Currency.isNative(currencyAmount.currency)) return new TokenAmount(Token.getNativeWrapper(chainId), currencyAmount.raw);
    invariant(false, 'CURRENCY')  ;
}

function wrappedCurrency(currency, chainId) {
  if (currency instanceof Token) return currency;
  if (Currency.isNative(currency)) return Token.getNativeWrapper(chainId);
    invariant(false, 'CURRENCY')  ;
}
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */


var Trade = /*#__PURE__*/function () {
  function Trade(route, amount, tradeType) {
    this.chainId = route.chainId;
    var amounts = new Array(route.path.length);
    var nextPairs = new Array(route.pairs.length);

    if (tradeType === exports.TradeType.EXACT_INPUT) {
      !currencyEquals(amount.currency, route.input) ?  invariant(false, 'INPUT')  : void 0;
      amounts[0] = wrappedAmount(amount, route.chainId);

      for (var i = 0; i < route.path.length - 1; i++) {
        var pair = route.pairs[i];

        var _pair$getOutputAmount = pair.getOutputAmount(amounts[i]),
            outputAmount = _pair$getOutputAmount[0],
            nextPair = _pair$getOutputAmount[1];

        amounts[i + 1] = outputAmount;
        nextPairs[i] = nextPair;
      }
    } else {
      !currencyEquals(amount.currency, route.output) ?  invariant(false, 'OUTPUT')  : void 0;
      amounts[amounts.length - 1] = wrappedAmount(amount, route.chainId);

      for (var _i = route.path.length - 1; _i > 0; _i--) {
        var _pair = route.pairs[_i - 1];

        var _pair$getInputAmount = _pair.getInputAmount(amounts[_i]),
            inputAmount = _pair$getInputAmount[0],
            _nextPair = _pair$getInputAmount[1];

        amounts[_i - 1] = inputAmount;
        nextPairs[_i - 1] = _nextPair;
      }
    }

    this.route = route;
    this.tradeType = tradeType;
    this.inputAmount = tradeType === exports.TradeType.EXACT_INPUT ? amount : Currency.isNative(route.input) ? CurrencyAmount.nativeCurrency(amounts[0].raw, this.chainId) : amounts[0];
    this.outputAmount = tradeType === exports.TradeType.EXACT_OUTPUT ? amount : Currency.isNative(route.output) ? CurrencyAmount.nativeCurrency(amounts[amounts.length - 1].raw, this.chainId) : amounts[amounts.length - 1];
    this.executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.raw, this.outputAmount.raw);
    this.nextMidPrice = Price.fromRoute(new Route(nextPairs, route.input));
    this.priceImpact = computePriceImpact(route.midPrice, this.inputAmount, this.outputAmount);
    this.platform = this.route.pairs[0].platform;
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */


  Trade.exactIn = function exactIn(route, amountIn) {
    return new Trade(route, amountIn, exports.TradeType.EXACT_INPUT);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route route of the exact out trade
   * @param amountOut the amount returned by the trade
   */
  ;

  Trade.exactOut = function exactOut(route, amountOut) {
    return new Trade(route, amountOut, exports.TradeType.EXACT_OUTPUT);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  var _proto = Trade.prototype;

  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_OUTPUT) {
      return this.outputAmount;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(this.outputAmount.raw).quotient;
      return this.outputAmount instanceof TokenAmount ? new TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut) : CurrencyAmount.nativeCurrency(slippageAdjustedAmountOut, this.chainId);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_INPUT) {
      return this.inputAmount;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(this.inputAmount.raw).quotient;
      return this.inputAmount instanceof TokenAmount ? new TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn) : CurrencyAmount.nativeCurrency(slippageAdjustedAmountIn, this.chainId);
    }
  }
  /**
   * Given a list of pairs, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactIn = function bestTradeExactIn(pairs, currencyAmountIn, currencyOut, _temp, // used in recursion.
  currentPairs, originalAmountIn, bestTrades) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$maxNumResults = _ref.maxNumResults,
        maxNumResults = _ref$maxNumResults === void 0 ? 3 : _ref$maxNumResults,
        _ref$maxHops = _ref.maxHops,
        maxHops = _ref$maxHops === void 0 ? 3 : _ref$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountIn === void 0) {
      originalAmountIn = currencyAmountIn;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountIn === currencyAmountIn || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountIn instanceof TokenAmount ? currencyAmountIn.token.chainId : currencyOut instanceof Token ? currencyOut.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountIn = wrappedAmount(currencyAmountIn, chainId);
    var tokenOut = wrappedCurrency(currencyOut, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountIn.token) && !pair.token1.equals(amountIn.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountOut = void 0;

      try {
        ;

        var _pair$getOutputAmount2 = pair.getOutputAmount(amountIn);

        amountOut = _pair$getOutputAmount2[0];
      } catch (error) {
        // input too low
        if (error.isInsufficientInputAmountError) {
          continue;
        }

        throw error;
      } // we have arrived at the output token, so this is the final trade of one of the paths


      if (amountOut.token.equals(tokenOut)) {
        sortedInsert(bestTrades, new Trade(new Route([].concat(currentPairs, [pair]), originalAmountIn.currency, currencyOut), originalAmountIn, exports.TradeType.EXACT_INPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops

        Trade.bestTradeExactIn(pairsExcludingThisPair, amountOut, currencyOut, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [].concat(currentPairs, [pair]), originalAmountIn, bestTrades);
      }
    }

    return bestTrades;
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pairs, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountOut used in recursion; the original value of the currencyAmountOut parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactOut = function bestTradeExactOut(pairs, currencyIn, currencyAmountOut, _temp2, // used in recursion.
  currentPairs, originalAmountOut, bestTrades) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$maxNumResults = _ref2.maxNumResults,
        maxNumResults = _ref2$maxNumResults === void 0 ? 3 : _ref2$maxNumResults,
        _ref2$maxHops = _ref2.maxHops,
        maxHops = _ref2$maxHops === void 0 ? 3 : _ref2$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountOut === void 0) {
      originalAmountOut = currencyAmountOut;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountOut === currencyAmountOut || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountOut instanceof TokenAmount ? currencyAmountOut.token.chainId : currencyIn instanceof Token ? currencyIn.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountOut = wrappedAmount(currencyAmountOut, chainId);
    var tokenIn = wrappedCurrency(currencyIn, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountOut.token) && !pair.token1.equals(amountOut.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountIn = void 0;

      try {
        ;

        var _pair$getInputAmount2 = pair.getInputAmount(amountOut);

        amountIn = _pair$getInputAmount2[0];
      } catch (error) {
        // not enough liquidity in this pair
        if (error.isInsufficientReservesError) {
          continue;
        }

        throw error;
      } // we have arrived at the input token, so this is the first trade of one of the paths


      if (amountIn.token.equals(tokenIn)) {
        sortedInsert(bestTrades, new Trade(new Route([pair].concat(currentPairs), currencyIn, originalAmountOut.currency), originalAmountOut, exports.TradeType.EXACT_OUTPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops

        Trade.bestTradeExactOut(pairsExcludingThisPair, currencyIn, amountIn, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [pair].concat(currentPairs), originalAmountOut, bestTrades);
      }
    }

    return bestTrades;
  };

  return Trade;
}();

var PricedTokenAmount = /*#__PURE__*/function (_CurrencyAmount) {
  _inheritsLoose(PricedTokenAmount, _CurrencyAmount);

  // amount _must_ be raw, i.e. in the native representation
  function PricedTokenAmount(token, amount) {
    var _this;

    _this = _CurrencyAmount.call(this, token, amount) || this;
    _this.token = token;
    return _this;
  }

  _createClass(PricedTokenAmount, [{
    key: "nativeCurrencyAmount",
    get: function get() {
      return new CurrencyAmount(this.token.price.quoteCurrency, this.raw);
    }
  }]);

  return PricedTokenAmount;
}(CurrencyAmount);

var _MINIMUM_STAKED_AMOUN;

var MINIMUM_STAKED_AMOUNT_NATIVE_CURRENCY = (_MINIMUM_STAKED_AMOUN = {}, _MINIMUM_STAKED_AMOUN[exports.ChainId.MAINNET] = /*#__PURE__*/CurrencyAmount.nativeCurrency( /*#__PURE__*/ethers.utils.parseUnits('0.1', Token.getNative(exports.ChainId.MAINNET).decimals).toString(), exports.ChainId.MAINNET), _MINIMUM_STAKED_AMOUN[exports.ChainId.MANTLE_TESTNET] = /*#__PURE__*/CurrencyAmount.nativeCurrency( /*#__PURE__*/ethers.utils.parseUnits('1000', Token.getNative(exports.ChainId.MANTLE_TESTNET).decimals).toString(), exports.ChainId.MANTLE_TESTNET), _MINIMUM_STAKED_AMOUN[exports.ChainId.MUMBAI] = /*#__PURE__*/CurrencyAmount.nativeCurrency( /*#__PURE__*/ethers.utils.parseUnits('1000', Token.getNative(exports.ChainId.MUMBAI).decimals).toString(), exports.ChainId.MUMBAI), _MINIMUM_STAKED_AMOUN);
var LiquidityMiningCampaign = /*#__PURE__*/function () {
  function LiquidityMiningCampaign(startsAt, endsAt, targetedPair, rewards, staked, locked, stakingCap, address) {
    !JSBI.lessThan(parseBigintIsh(startsAt), parseBigintIsh(endsAt)) ?  invariant(false, 'INCONSISTENT_DATES')  : void 0;
    !staked.token.equals(targetedPair.liquidityToken) ?  invariant(false, 'STAKED_LP_TOKEN')  : void 0;

    for (var _iterator = _createForOfIteratorHelperLoose(rewards), _step; !(_step = _iterator()).done;) {
      var reward = _step.value;
      !(staked.token.chainId === reward.token.chainId) ?  invariant(false, 'CHAIN_ID')  : void 0;
    }

    this.chainId = staked.token.chainId;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
    this.rewards = rewards;
    this.targetedPair = targetedPair;
    this.staked = staked;
    this.duration = JSBI.subtract(parseBigintIsh(endsAt), parseBigintIsh(startsAt));
    this.locked = locked;
    this.stakingCap = stakingCap;
    this.address = address;
  }

  _createClass(LiquidityMiningCampaign, [{
    key: "remainingDistributionPercentage",
    get: function get() {
      var now = JSBI.BigInt(Math.floor(Date.now() / 1000));
      var jsbiStartsAt = parseBigintIsh(this.startsAt);
      var jsbiEndsAt = parseBigintIsh(this.endsAt);
      if (JSBI.lessThan(now, jsbiStartsAt)) return new Percent('100', '100');
      if (JSBI.greaterThanOrEqual(now, jsbiEndsAt)) return new Percent('0', '100');
      return new Percent(JSBI.subtract(jsbiEndsAt, now), this.duration);
    }
  }, {
    key: "remainingRewards",
    get: function get() {
      var remainingDistributionPercentage = this.remainingDistributionPercentage;
      return this.rewards.map(function (reward) {
        return new PricedTokenAmount(reward.token, remainingDistributionPercentage.multiply(reward.raw).toFixed(0));
      });
    }
  }, {
    key: "apy",
    get: function get() {
      var remainingRewards = this.remainingRewards;
      var stakedValueNativeCurrency = this.staked.nativeCurrencyAmount;

      if (stakedValueNativeCurrency.lessThan(MINIMUM_STAKED_AMOUNT_NATIVE_CURRENCY[this.chainId])) {
        stakedValueNativeCurrency = MINIMUM_STAKED_AMOUNT_NATIVE_CURRENCY[this.chainId];
      }

      var cumulativeRemainingRewardAmountNativeCurrency = remainingRewards.reduce(function (accumulator, remainingRewardAmount) {
        return accumulator.add(remainingRewardAmount.nativeCurrencyAmount);
      }, CurrencyAmount.nativeCurrency('0', this.chainId));
      var yieldInPeriod = cumulativeRemainingRewardAmountNativeCurrency.divide(stakedValueNativeCurrency);
      var annualizationMultiplier = new Fraction(SECONDS_IN_YEAR.toString(), this.duration.toString());
      var rawApy = yieldInPeriod.multiply(annualizationMultiplier);
      return new Percent(rawApy.numerator, rawApy.denominator);
    }
  }, {
    key: "currentlyActive",
    get: function get() {
      return JSBI.lessThanOrEqual(parseBigintIsh(this.startsAt), JSBI.BigInt(Math.floor(Date.now() / 1000)));
    }
  }]);

  return LiquidityMiningCampaign;
}();

/**
 * Represents an ERC20 token and its price, expressed in any given currency.
 */

var PricedToken = /*#__PURE__*/function (_Token) {
  _inheritsLoose(PricedToken, _Token);

  function PricedToken(chainId, address, decimals, price, symbol, name) {
    var _this;

    !(price.baseCurrency.symbol === symbol && price.baseCurrency.decimals === decimals) ?  invariant(false, 'TOKEN')  : void 0;
    _this = _Token.call(this, chainId, address, decimals, symbol, name) || this;
    _this.price = price;
    return _this;
  }

  return PricedToken;
}(Token);

function toHex(currencyAmount) {
  return "0x" + currencyAmount.raw.toString(16);
}

var ZERO_HEX = '0x0';
/**
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
 */

var Router = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Router() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */


  Router.swapCallParameters = function swapCallParameters(trade, options) {
    var nativeCurrency = Currency.getNative(trade.chainId);
    var etherIn = trade.inputAmount.currency === nativeCurrency;
    var etherOut = trade.outputAmount.currency === nativeCurrency; // the router does not support both ether in and out

    !!(etherIn && etherOut) ?  invariant(false, 'ETHER_IN_OUT')  : void 0;
    !(!('ttl' in options) || options.ttl > 0) ?  invariant(false, 'TTL')  : void 0;
    var to = validateAndParseAddress(options.recipient);
    var amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage));
    var amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage));
    var path = trade.route.path.map(function (token) {
      return token.address;
    });
    var deadline = 'ttl' in options ? "0x" + (Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16) : "0x" + options.deadline.toString(16);
    var useFeeOnTransfer = Boolean(options.feeOnTransfer);
    var methodName;
    var args;
    var value;

    switch (trade.tradeType) {
      case exports.TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer ? 'swapExactETHForTokensSupportingFeeOnTransferTokens' : 'swapExactETHForTokens'; // (uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = useFeeOnTransfer ? 'swapExactTokensForETHSupportingFeeOnTransferTokens' : 'swapExactTokensForETH'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = useFeeOnTransfer ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens' : 'swapExactTokensForTokens'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        }

        break;

      case exports.TradeType.EXACT_OUTPUT:
        !!useFeeOnTransfer ?  invariant(false, 'EXACT_OUT_FOT')  : void 0;

        if (etherIn) {
          methodName = 'swapETHForExactTokens'; // (uint amountOut, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = 'swapTokensForExactETH'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = 'swapTokensForExactTokens'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        }

        break;
    }

    return {
      methodName: methodName,
      args: args,
      value: value
    };
  };

  return Router;
}();

// A type of promise-like that resolves synchronously and supports only one observer
const _Pact = /*#__PURE__*/(function() {
	function _Pact() {}
	_Pact.prototype.then = function(onFulfilled, onRejected) {
		const result = new _Pact();
		const state = this.s;
		if (state) {
			const callback = state & 1 ? onFulfilled : onRejected;
			if (callback) {
				try {
					_settle(result, 1, callback(this.v));
				} catch (e) {
					_settle(result, 2, e);
				}
				return result;
			} else {
				return this;
			}
		}
		this.o = function(_this) {
			try {
				const value = _this.v;
				if (_this.s & 1) {
					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
				} else if (onRejected) {
					_settle(result, 1, onRejected(value));
				} else {
					_settle(result, 2, value);
				}
			} catch (e) {
				_settle(result, 2, e);
			}
		};
		return result;
	};
	return _Pact;
})();

// Settles a pact synchronously
function _settle(pact, state, value) {
	if (!pact.s) {
		if (value instanceof _Pact) {
			if (value.s) {
				if (state & 1) {
					state = value.s;
				}
				value = value.v;
			} else {
				value.o = _settle.bind(null, pact, state);
				return;
			}
		}
		if (value && value.then) {
			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
			return;
		}
		pact.s = state;
		pact.v = value;
		const observer = pact.o;
		if (observer) {
			observer(pact);
		}
	}
}

function _isSettledPact(thenable) {
	return thenable instanceof _Pact && thenable.s & 1;
}

// Asynchronously iterate through an object that has a length property, passing the index as the first argument to the callback (even as the length property changes)
function _forTo(array, body, check) {
	var i = -1, pact, reject;
	function _cycle(result) {
		try {
			while (++i < array.length && (!check || !check())) {
				result = body(i);
				if (result && result.then) {
					if (_isSettledPact(result)) {
						result = result.v;
					} else {
						result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
						return;
					}
				}
			}
			if (pact) {
				_settle(pact, 1, result);
			} else {
				pact = result;
			}
		} catch (e) {
			_settle(pact || (pact = new _Pact()), 2, e);
		}
	}
	_cycle();
	return pact;
}

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

// Asynchronously iterate through an object's values
// Uses for...of if the runtime supports it, otherwise iterates until length on a copy
function _forOf(target, body, check) {
	if (typeof target[_iteratorSymbol] === "function") {
		var iterator = target[_iteratorSymbol](), step, pact, reject;
		function _cycle(result) {
			try {
				while (!(step = iterator.next()).done && (!check || !check())) {
					result = body(step.value);
					if (result && result.then) {
						if (_isSettledPact(result)) {
							result = result.v;
						} else {
							result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
							return;
						}
					}
				}
				if (pact) {
					_settle(pact, 1, result);
				} else {
					pact = result;
				}
			} catch (e) {
				_settle(pact || (pact = new _Pact()), 2, e);
			}
		}
		_cycle();
		if (iterator.return) {
			var _fixup = function(value) {
				try {
					if (!step.done) {
						iterator.return();
					}
				} catch(e) {
				}
				return value;
			};
			if (pact && pact.then) {
				return pact.then(_fixup, function(e) {
					throw _fixup(e);
				});
			}
			_fixup();
		}
		return pact;
	}
	// No support for Symbol.iterator
	if (!("length" in target)) {
		throw new TypeError("Object is not iterable");
	}
	// Handle live collections properly
	var values = [];
	for (var i = 0; i < target.length; i++) {
		values.push(target[i]);
	}
	return _forTo(values, function(i) { return body(values[i]); }, check);
}

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

var contractName = "IDexSwapPair";
var abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "blockTimestampLast",
				type: "uint32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "swapFee",
		outputs: [
			{
				internalType: "uint32",
				name: "",
				type: "uint32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "swap",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint32",
				name: "",
				type: "uint32"
			}
		],
		name: "setSwapFee",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var metadata = "{\"compiler\":{\"version\":\"0.6.12+commit.27d51765\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"Burn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0In\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1In\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0Out\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1Out\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"Swap\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint112\",\"name\":\"reserve0\",\"type\":\"uint112\"},{\"indexed\":false,\"internalType\":\"uint112\",\"name\":\"reserve1\",\"type\":\"uint112\"}],\"name\":\"Sync\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"DOMAIN_SEPARATOR\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MINIMUM_LIQUIDITY\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"PERMIT_TYPEHASH\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"burn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"factory\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getReserves\",\"outputs\":[{\"internalType\":\"uint112\",\"name\":\"reserve0\",\"type\":\"uint112\"},{\"internalType\":\"uint112\",\"name\":\"reserve1\",\"type\":\"uint112\"},{\"internalType\":\"uint32\",\"name\":\"blockTimestampLast\",\"type\":\"uint32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"initialize\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"kLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"mint\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"liquidity\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"nonces\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"permit\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"price0CumulativeLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"price1CumulativeLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"\",\"type\":\"uint32\"}],\"name\":\"setSwapFee\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"skim\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0Out\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1Out\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"swap\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"swapFee\",\"outputs\":[{\"internalType\":\"uint32\",\"name\":\"\",\"type\":\"uint32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"sync\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"token0\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"token1\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"project:/contracts/interfaces/IDexSwapPair.sol\":\"IDexSwapPair\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"project:/contracts/interfaces/IDexSwapPair.sol\":{\"keccak256\":\"0xec2b8d41787a541201152e8e32da765594cb6de0347b27798a7c50d7ef1b8ab8\",\"license\":\"GPL-3.0\",\"urls\":[\"bzz-raw://32b84d8f197d9e568d4b9c0dd5df55cae37aa211d57a47628423d95b35d40cb1\",\"dweb:/ipfs/QmTzx9C3dfDvFfRxe4zjeV8M8rGTmgcXn9NzxoonwjfYxN\"]}},\"version\":1}";
var bytecode = "0x";
var deployedBytecode = "0x";
var immutableReferences = {
};
var sourceMap = "";
var deployedSourceMap = "";
var source = "// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.5.0;\n\ninterface IDexSwapPair {\n    event Approval(address indexed owner, address indexed spender, uint value);\n    event Transfer(address indexed from, address indexed to, uint value);\n\n    function name() external pure returns (string memory);\n    function symbol() external pure returns (string memory);\n    function decimals() external pure returns (uint8);\n    function totalSupply() external view returns (uint);\n    function balanceOf(address owner) external view returns (uint);\n    function allowance(address owner, address spender) external view returns (uint);\n\n    function approve(address spender, uint value) external returns (bool);\n    function transfer(address to, uint value) external returns (bool);\n    function transferFrom(address from, address to, uint value) external returns (bool);\n\n    function DOMAIN_SEPARATOR() external view returns (bytes32);\n    function PERMIT_TYPEHASH() external pure returns (bytes32);\n    function nonces(address owner) external view returns (uint);\n\n    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;\n\n    event Mint(address indexed sender, uint amount0, uint amount1);\n    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);\n    event Swap(\n        address indexed sender,\n        uint amount0In,\n        uint amount1In,\n        uint amount0Out,\n        uint amount1Out,\n        address indexed to\n    );\n    event Sync(uint112 reserve0, uint112 reserve1);\n\n    function MINIMUM_LIQUIDITY() external pure returns (uint);\n    function factory() external view returns (address);\n    function token0() external view returns (address);\n    function token1() external view returns (address);\n    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);\n    function price0CumulativeLast() external view returns (uint);\n    function price1CumulativeLast() external view returns (uint);\n    function kLast() external view returns (uint);\n    function swapFee() external view returns (uint32);\n\n    function mint(address to) external returns (uint liquidity);\n    function burn(address to) external returns (uint amount0, uint amount1);\n    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;\n    function skim(address to) external;\n    function sync() external;\n\n    function initialize(address, address) external;\n    function setSwapFee(uint32) external;\n}";
var sourcePath = "/mnt/e/ZooHarmony-EthDenver/dexs-router-a5/contracts/interfaces/IDexSwapPair.sol";
var ast = {
	absolutePath: "project:/contracts/interfaces/IDexSwapPair.sol",
	exportedSymbols: {
		IDexSwapPair: [
			6447
		]
	},
	id: 6448,
	license: "GPL-3.0",
	nodeType: "SourceUnit",
	nodes: [
		{
			id: 6197,
			literals: [
				"solidity",
				">=",
				"0.5",
				".0"
			],
			nodeType: "PragmaDirective",
			src: "36:24:16"
		},
		{
			abstract: false,
			baseContracts: [
			],
			contractDependencies: [
			],
			contractKind: "interface",
			documentation: null,
			fullyImplemented: false,
			id: 6447,
			linearizedBaseContracts: [
				6447
			],
			name: "IDexSwapPair",
			nodeType: "ContractDefinition",
			nodes: [
				{
					anonymous: false,
					documentation: null,
					id: 6205,
					name: "Approval",
					nodeType: "EventDefinition",
					parameters: {
						id: 6204,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6199,
								indexed: true,
								mutability: "mutable",
								name: "owner",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6205,
								src: "106:21:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6198,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "106:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6201,
								indexed: true,
								mutability: "mutable",
								name: "spender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6205,
								src: "129:23:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6200,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "129:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6203,
								indexed: false,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6205,
								src: "154:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6202,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "154:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "105:60:16"
					},
					src: "91:75:16"
				},
				{
					anonymous: false,
					documentation: null,
					id: 6213,
					name: "Transfer",
					nodeType: "EventDefinition",
					parameters: {
						id: 6212,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6207,
								indexed: true,
								mutability: "mutable",
								name: "from",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6213,
								src: "186:20:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6206,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "186:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6209,
								indexed: true,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6213,
								src: "208:18:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6208,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "208:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6211,
								indexed: false,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6213,
								src: "228:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6210,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "228:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "185:54:16"
					},
					src: "171:69:16"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "06fdde03",
					id: 6218,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "name",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6214,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "259:2:16"
					},
					returnParameters: {
						id: 6217,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6216,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6218,
								src: "285:13:16",
								stateVariable: false,
								storageLocation: "memory",
								typeDescriptions: {
									typeIdentifier: "t_string_memory_ptr",
									typeString: "string"
								},
								typeName: {
									id: 6215,
									name: "string",
									nodeType: "ElementaryTypeName",
									src: "285:6:16",
									typeDescriptions: {
										typeIdentifier: "t_string_storage_ptr",
										typeString: "string"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "284:15:16"
					},
					scope: 6447,
					src: "246:54:16",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "95d89b41",
					id: 6223,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "symbol",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6219,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "320:2:16"
					},
					returnParameters: {
						id: 6222,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6221,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6223,
								src: "346:13:16",
								stateVariable: false,
								storageLocation: "memory",
								typeDescriptions: {
									typeIdentifier: "t_string_memory_ptr",
									typeString: "string"
								},
								typeName: {
									id: 6220,
									name: "string",
									nodeType: "ElementaryTypeName",
									src: "346:6:16",
									typeDescriptions: {
										typeIdentifier: "t_string_storage_ptr",
										typeString: "string"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "345:15:16"
					},
					scope: 6447,
					src: "305:56:16",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "313ce567",
					id: 6228,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "decimals",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6224,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "383:2:16"
					},
					returnParameters: {
						id: 6227,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6226,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6228,
								src: "409:5:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 6225,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "409:5:16",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "408:7:16"
					},
					scope: 6447,
					src: "366:50:16",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "18160ddd",
					id: 6233,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "totalSupply",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6229,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "441:2:16"
					},
					returnParameters: {
						id: 6232,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6231,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6233,
								src: "467:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6230,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "467:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "466:6:16"
					},
					scope: 6447,
					src: "421:52:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "70a08231",
					id: 6240,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "balanceOf",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6236,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6235,
								mutability: "mutable",
								name: "owner",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6240,
								src: "497:13:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6234,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "497:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "496:15:16"
					},
					returnParameters: {
						id: 6239,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6238,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6240,
								src: "535:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6237,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "535:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "534:6:16"
					},
					scope: 6447,
					src: "478:63:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "dd62ed3e",
					id: 6249,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "allowance",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6245,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6242,
								mutability: "mutable",
								name: "owner",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6249,
								src: "565:13:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6241,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "565:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6244,
								mutability: "mutable",
								name: "spender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6249,
								src: "580:15:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6243,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "580:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "564:32:16"
					},
					returnParameters: {
						id: 6248,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6247,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6249,
								src: "620:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6246,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "620:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "619:6:16"
					},
					scope: 6447,
					src: "546:80:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "095ea7b3",
					id: 6258,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "approve",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6254,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6251,
								mutability: "mutable",
								name: "spender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6258,
								src: "649:15:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6250,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "649:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6253,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6258,
								src: "666:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6252,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "666:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "648:29:16"
					},
					returnParameters: {
						id: 6257,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6256,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6258,
								src: "696:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 6255,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "696:4:16",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "695:6:16"
					},
					scope: 6447,
					src: "632:70:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "a9059cbb",
					id: 6267,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "transfer",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6263,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6260,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6267,
								src: "725:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6259,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "725:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6262,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6267,
								src: "737:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6261,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "737:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "724:24:16"
					},
					returnParameters: {
						id: 6266,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6265,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6267,
								src: "767:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 6264,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "767:4:16",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "766:6:16"
					},
					scope: 6447,
					src: "707:66:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "23b872dd",
					id: 6278,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "transferFrom",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6274,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6269,
								mutability: "mutable",
								name: "from",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6278,
								src: "800:12:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6268,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "800:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6271,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6278,
								src: "814:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6270,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "814:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6273,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6278,
								src: "826:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6272,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "826:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "799:38:16"
					},
					returnParameters: {
						id: 6277,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6276,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6278,
								src: "856:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bool",
									typeString: "bool"
								},
								typeName: {
									id: 6275,
									name: "bool",
									nodeType: "ElementaryTypeName",
									src: "856:4:16",
									typeDescriptions: {
										typeIdentifier: "t_bool",
										typeString: "bool"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "855:6:16"
					},
					scope: 6447,
					src: "778:84:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "3644e515",
					id: 6283,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "DOMAIN_SEPARATOR",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6279,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "893:2:16"
					},
					returnParameters: {
						id: 6282,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6281,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6283,
								src: "919:7:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 6280,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "919:7:16",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "918:9:16"
					},
					scope: 6447,
					src: "868:60:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "30adf81f",
					id: 6288,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "PERMIT_TYPEHASH",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6284,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "957:2:16"
					},
					returnParameters: {
						id: 6287,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6286,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6288,
								src: "983:7:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 6285,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "983:7:16",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "982:9:16"
					},
					scope: 6447,
					src: "933:59:16",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "7ecebe00",
					id: 6295,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "nonces",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6291,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6290,
								mutability: "mutable",
								name: "owner",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6295,
								src: "1013:13:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6289,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1013:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1012:15:16"
					},
					returnParameters: {
						id: 6294,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6293,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6295,
								src: "1051:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6292,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1051:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1050:6:16"
					},
					scope: 6447,
					src: "997:60:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "d505accf",
					id: 6312,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "permit",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6310,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6297,
								mutability: "mutable",
								name: "owner",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6312,
								src: "1079:13:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6296,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1079:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6299,
								mutability: "mutable",
								name: "spender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6312,
								src: "1094:15:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6298,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1094:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6301,
								mutability: "mutable",
								name: "value",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6312,
								src: "1111:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6300,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1111:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6303,
								mutability: "mutable",
								name: "deadline",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6312,
								src: "1123:13:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6302,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1123:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6305,
								mutability: "mutable",
								name: "v",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6312,
								src: "1138:7:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 6304,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "1138:5:16",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6307,
								mutability: "mutable",
								name: "r",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6312,
								src: "1147:9:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 6306,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1147:7:16",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6309,
								mutability: "mutable",
								name: "s",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6312,
								src: "1158:9:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 6308,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "1158:7:16",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1078:90:16"
					},
					returnParameters: {
						id: 6311,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1177:0:16"
					},
					scope: 6447,
					src: "1063:115:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					anonymous: false,
					documentation: null,
					id: 6320,
					name: "Mint",
					nodeType: "EventDefinition",
					parameters: {
						id: 6319,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6314,
								indexed: true,
								mutability: "mutable",
								name: "sender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6320,
								src: "1195:22:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6313,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1195:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6316,
								indexed: false,
								mutability: "mutable",
								name: "amount0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6320,
								src: "1219:12:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6315,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1219:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6318,
								indexed: false,
								mutability: "mutable",
								name: "amount1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6320,
								src: "1233:12:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6317,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1233:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1194:52:16"
					},
					src: "1184:63:16"
				},
				{
					anonymous: false,
					documentation: null,
					id: 6330,
					name: "Burn",
					nodeType: "EventDefinition",
					parameters: {
						id: 6329,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6322,
								indexed: true,
								mutability: "mutable",
								name: "sender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6330,
								src: "1263:22:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6321,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1263:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6324,
								indexed: false,
								mutability: "mutable",
								name: "amount0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6330,
								src: "1287:12:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6323,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1287:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6326,
								indexed: false,
								mutability: "mutable",
								name: "amount1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6330,
								src: "1301:12:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6325,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1301:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6328,
								indexed: true,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6330,
								src: "1315:18:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6327,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1315:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1262:72:16"
					},
					src: "1252:83:16"
				},
				{
					anonymous: false,
					documentation: null,
					id: 6344,
					name: "Swap",
					nodeType: "EventDefinition",
					parameters: {
						id: 6343,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6332,
								indexed: true,
								mutability: "mutable",
								name: "sender",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6344,
								src: "1360:22:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6331,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1360:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6334,
								indexed: false,
								mutability: "mutable",
								name: "amount0In",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6344,
								src: "1392:14:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6333,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1392:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6336,
								indexed: false,
								mutability: "mutable",
								name: "amount1In",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6344,
								src: "1416:14:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6335,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1416:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6338,
								indexed: false,
								mutability: "mutable",
								name: "amount0Out",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6344,
								src: "1440:15:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6337,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1440:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6340,
								indexed: false,
								mutability: "mutable",
								name: "amount1Out",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6344,
								src: "1465:15:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6339,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1465:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6342,
								indexed: true,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6344,
								src: "1490:18:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6341,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1490:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1350:164:16"
					},
					src: "1340:175:16"
				},
				{
					anonymous: false,
					documentation: null,
					id: 6350,
					name: "Sync",
					nodeType: "EventDefinition",
					parameters: {
						id: 6349,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6346,
								indexed: false,
								mutability: "mutable",
								name: "reserve0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6350,
								src: "1531:16:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 6345,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1531:7:16",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6348,
								indexed: false,
								mutability: "mutable",
								name: "reserve1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6350,
								src: "1549:16:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 6347,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1549:7:16",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1530:36:16"
					},
					src: "1520:47:16"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "ba9a7a56",
					id: 6355,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "MINIMUM_LIQUIDITY",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6351,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1599:2:16"
					},
					returnParameters: {
						id: 6354,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6353,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6355,
								src: "1625:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6352,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1625:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1624:6:16"
					},
					scope: 6447,
					src: "1573:58:16",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "c45a0155",
					id: 6360,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "factory",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6356,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1652:2:16"
					},
					returnParameters: {
						id: 6359,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6358,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6360,
								src: "1678:7:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6357,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1678:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1677:9:16"
					},
					scope: 6447,
					src: "1636:51:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "0dfe1681",
					id: 6365,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "token0",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6361,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1707:2:16"
					},
					returnParameters: {
						id: 6364,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6363,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6365,
								src: "1733:7:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6362,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1733:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1732:9:16"
					},
					scope: 6447,
					src: "1692:50:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "d21220a7",
					id: 6370,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "token1",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6366,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1762:2:16"
					},
					returnParameters: {
						id: 6369,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6368,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6370,
								src: "1788:7:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6367,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "1788:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1787:9:16"
					},
					scope: 6447,
					src: "1747:50:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "0902f1ac",
					id: 6379,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "getReserves",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6371,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1822:2:16"
					},
					returnParameters: {
						id: 6378,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6373,
								mutability: "mutable",
								name: "reserve0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6379,
								src: "1848:16:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 6372,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1848:7:16",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6375,
								mutability: "mutable",
								name: "reserve1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6379,
								src: "1866:16:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint112",
									typeString: "uint112"
								},
								typeName: {
									id: 6374,
									name: "uint112",
									nodeType: "ElementaryTypeName",
									src: "1866:7:16",
									typeDescriptions: {
										typeIdentifier: "t_uint112",
										typeString: "uint112"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6377,
								mutability: "mutable",
								name: "blockTimestampLast",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6379,
								src: "1884:25:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint32",
									typeString: "uint32"
								},
								typeName: {
									id: 6376,
									name: "uint32",
									nodeType: "ElementaryTypeName",
									src: "1884:6:16",
									typeDescriptions: {
										typeIdentifier: "t_uint32",
										typeString: "uint32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1847:63:16"
					},
					scope: 6447,
					src: "1802:109:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "5909c0d5",
					id: 6384,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "price0CumulativeLast",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6380,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "1945:2:16"
					},
					returnParameters: {
						id: 6383,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6382,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6384,
								src: "1971:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6381,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "1971:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "1970:6:16"
					},
					scope: 6447,
					src: "1916:61:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "5a3d5493",
					id: 6389,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "price1CumulativeLast",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6385,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2011:2:16"
					},
					returnParameters: {
						id: 6388,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6387,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6389,
								src: "2037:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6386,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2037:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2036:6:16"
					},
					scope: 6447,
					src: "1982:61:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "7464fc3d",
					id: 6394,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "kLast",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6390,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2062:2:16"
					},
					returnParameters: {
						id: 6393,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6392,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6394,
								src: "2088:4:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6391,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2088:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2087:6:16"
					},
					scope: 6447,
					src: "2048:46:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "54cf2aeb",
					id: 6399,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "swapFee",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6395,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2115:2:16"
					},
					returnParameters: {
						id: 6398,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6397,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6399,
								src: "2141:6:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint32",
									typeString: "uint32"
								},
								typeName: {
									id: 6396,
									name: "uint32",
									nodeType: "ElementaryTypeName",
									src: "2141:6:16",
									typeDescriptions: {
										typeIdentifier: "t_uint32",
										typeString: "uint32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2140:8:16"
					},
					scope: 6447,
					src: "2099:50:16",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "6a627842",
					id: 6406,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "mint",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6402,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6401,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6406,
								src: "2169:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6400,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2169:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2168:12:16"
					},
					returnParameters: {
						id: 6405,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6404,
								mutability: "mutable",
								name: "liquidity",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6406,
								src: "2199:14:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6403,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2199:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2198:16:16"
					},
					scope: 6447,
					src: "2155:60:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "89afcb44",
					id: 6415,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "burn",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6409,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6408,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6415,
								src: "2234:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6407,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2234:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2233:12:16"
					},
					returnParameters: {
						id: 6414,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6411,
								mutability: "mutable",
								name: "amount0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6415,
								src: "2264:12:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6410,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2264:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6413,
								mutability: "mutable",
								name: "amount1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6415,
								src: "2278:12:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6412,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2278:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2263:28:16"
					},
					scope: 6447,
					src: "2220:72:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "022c0d9f",
					id: 6426,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "swap",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6424,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6417,
								mutability: "mutable",
								name: "amount0Out",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6426,
								src: "2311:15:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6416,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2311:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6419,
								mutability: "mutable",
								name: "amount1Out",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6426,
								src: "2328:15:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6418,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "2328:4:16",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6421,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6426,
								src: "2345:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6420,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2345:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6423,
								mutability: "mutable",
								name: "data",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6426,
								src: "2357:19:16",
								stateVariable: false,
								storageLocation: "calldata",
								typeDescriptions: {
									typeIdentifier: "t_bytes_calldata_ptr",
									typeString: "bytes"
								},
								typeName: {
									id: 6422,
									name: "bytes",
									nodeType: "ElementaryTypeName",
									src: "2357:5:16",
									typeDescriptions: {
										typeIdentifier: "t_bytes_storage_ptr",
										typeString: "bytes"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2310:67:16"
					},
					returnParameters: {
						id: 6425,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2386:0:16"
					},
					scope: 6447,
					src: "2297:90:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "bc25cf77",
					id: 6431,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "skim",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6429,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6428,
								mutability: "mutable",
								name: "to",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6431,
								src: "2406:10:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6427,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2406:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2405:12:16"
					},
					returnParameters: {
						id: 6430,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2426:0:16"
					},
					scope: 6447,
					src: "2392:35:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "fff6cae9",
					id: 6434,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "sync",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6432,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2445:2:16"
					},
					returnParameters: {
						id: 6433,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2456:0:16"
					},
					scope: 6447,
					src: "2432:25:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "485cc955",
					id: 6441,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "initialize",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6439,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6436,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6441,
								src: "2483:7:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6435,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2483:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6438,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6441,
								src: "2492:7:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6437,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "2492:7:16",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2482:18:16"
					},
					returnParameters: {
						id: 6440,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2509:0:16"
					},
					scope: 6447,
					src: "2463:47:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "d6d788c3",
					id: 6446,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "setSwapFee",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6444,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6443,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6446,
								src: "2535:6:16",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint32",
									typeString: "uint32"
								},
								typeName: {
									id: 6442,
									name: "uint32",
									nodeType: "ElementaryTypeName",
									src: "2535:6:16",
									typeDescriptions: {
										typeIdentifier: "t_uint32",
										typeString: "uint32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "2534:8:16"
					},
					returnParameters: {
						id: 6445,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "2551:0:16"
					},
					scope: 6447,
					src: "2515:37:16",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				}
			],
			scope: 6448,
			src: "62:2492:16"
		}
	],
	src: "36:2518:16"
};
var legacyAST = {
	attributes: {
		absolutePath: "project:/contracts/interfaces/IDexSwapPair.sol",
		exportedSymbols: {
			IDexSwapPair: [
				6447
			]
		},
		license: "GPL-3.0"
	},
	children: [
		{
			attributes: {
				literals: [
					"solidity",
					">=",
					"0.5",
					".0"
				]
			},
			id: 6197,
			name: "PragmaDirective",
			src: "36:24:16"
		},
		{
			attributes: {
				abstract: false,
				baseContracts: [
					null
				],
				contractDependencies: [
					null
				],
				contractKind: "interface",
				documentation: null,
				fullyImplemented: false,
				linearizedBaseContracts: [
					6447
				],
				name: "IDexSwapPair",
				scope: 6448
			},
			children: [
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Approval"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "owner",
										overrides: null,
										scope: 6205,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6198,
											name: "ElementaryTypeName",
											src: "106:7:16"
										}
									],
									id: 6199,
									name: "VariableDeclaration",
									src: "106:21:16"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "spender",
										overrides: null,
										scope: 6205,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6200,
											name: "ElementaryTypeName",
											src: "129:7:16"
										}
									],
									id: 6201,
									name: "VariableDeclaration",
									src: "129:23:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 6205,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6202,
											name: "ElementaryTypeName",
											src: "154:4:16"
										}
									],
									id: 6203,
									name: "VariableDeclaration",
									src: "154:10:16"
								}
							],
							id: 6204,
							name: "ParameterList",
							src: "105:60:16"
						}
					],
					id: 6205,
					name: "EventDefinition",
					src: "91:75:16"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Transfer"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "from",
										overrides: null,
										scope: 6213,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6206,
											name: "ElementaryTypeName",
											src: "186:7:16"
										}
									],
									id: 6207,
									name: "VariableDeclaration",
									src: "186:20:16"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 6213,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6208,
											name: "ElementaryTypeName",
											src: "208:7:16"
										}
									],
									id: 6209,
									name: "VariableDeclaration",
									src: "208:18:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 6213,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6210,
											name: "ElementaryTypeName",
											src: "228:4:16"
										}
									],
									id: 6211,
									name: "VariableDeclaration",
									src: "228:10:16"
								}
							],
							id: 6212,
							name: "ParameterList",
							src: "185:54:16"
						}
					],
					id: 6213,
					name: "EventDefinition",
					src: "171:69:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "06fdde03",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "name",
						overrides: null,
						scope: 6447,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6214,
							name: "ParameterList",
							src: "259:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6218,
										stateVariable: false,
										storageLocation: "memory",
										type: "string",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "string",
												type: "string"
											},
											id: 6215,
											name: "ElementaryTypeName",
											src: "285:6:16"
										}
									],
									id: 6216,
									name: "VariableDeclaration",
									src: "285:13:16"
								}
							],
							id: 6217,
							name: "ParameterList",
							src: "284:15:16"
						}
					],
					id: 6218,
					name: "FunctionDefinition",
					src: "246:54:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "95d89b41",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "symbol",
						overrides: null,
						scope: 6447,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6219,
							name: "ParameterList",
							src: "320:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6223,
										stateVariable: false,
										storageLocation: "memory",
										type: "string",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "string",
												type: "string"
											},
											id: 6220,
											name: "ElementaryTypeName",
											src: "346:6:16"
										}
									],
									id: 6221,
									name: "VariableDeclaration",
									src: "346:13:16"
								}
							],
							id: 6222,
							name: "ParameterList",
							src: "345:15:16"
						}
					],
					id: 6223,
					name: "FunctionDefinition",
					src: "305:56:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "313ce567",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "decimals",
						overrides: null,
						scope: 6447,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6224,
							name: "ParameterList",
							src: "383:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6228,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 6225,
											name: "ElementaryTypeName",
											src: "409:5:16"
										}
									],
									id: 6226,
									name: "VariableDeclaration",
									src: "409:5:16"
								}
							],
							id: 6227,
							name: "ParameterList",
							src: "408:7:16"
						}
					],
					id: 6228,
					name: "FunctionDefinition",
					src: "366:50:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "18160ddd",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "totalSupply",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6229,
							name: "ParameterList",
							src: "441:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6233,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6230,
											name: "ElementaryTypeName",
											src: "467:4:16"
										}
									],
									id: 6231,
									name: "VariableDeclaration",
									src: "467:4:16"
								}
							],
							id: 6232,
							name: "ParameterList",
							src: "466:6:16"
						}
					],
					id: 6233,
					name: "FunctionDefinition",
					src: "421:52:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "70a08231",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "balanceOf",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "owner",
										overrides: null,
										scope: 6240,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6234,
											name: "ElementaryTypeName",
											src: "497:7:16"
										}
									],
									id: 6235,
									name: "VariableDeclaration",
									src: "497:13:16"
								}
							],
							id: 6236,
							name: "ParameterList",
							src: "496:15:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6240,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6237,
											name: "ElementaryTypeName",
											src: "535:4:16"
										}
									],
									id: 6238,
									name: "VariableDeclaration",
									src: "535:4:16"
								}
							],
							id: 6239,
							name: "ParameterList",
							src: "534:6:16"
						}
					],
					id: 6240,
					name: "FunctionDefinition",
					src: "478:63:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "dd62ed3e",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "allowance",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "owner",
										overrides: null,
										scope: 6249,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6241,
											name: "ElementaryTypeName",
											src: "565:7:16"
										}
									],
									id: 6242,
									name: "VariableDeclaration",
									src: "565:13:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "spender",
										overrides: null,
										scope: 6249,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6243,
											name: "ElementaryTypeName",
											src: "580:7:16"
										}
									],
									id: 6244,
									name: "VariableDeclaration",
									src: "580:15:16"
								}
							],
							id: 6245,
							name: "ParameterList",
							src: "564:32:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6249,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6246,
											name: "ElementaryTypeName",
											src: "620:4:16"
										}
									],
									id: 6247,
									name: "VariableDeclaration",
									src: "620:4:16"
								}
							],
							id: 6248,
							name: "ParameterList",
							src: "619:6:16"
						}
					],
					id: 6249,
					name: "FunctionDefinition",
					src: "546:80:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "095ea7b3",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "approve",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "spender",
										overrides: null,
										scope: 6258,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6250,
											name: "ElementaryTypeName",
											src: "649:7:16"
										}
									],
									id: 6251,
									name: "VariableDeclaration",
									src: "649:15:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 6258,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6252,
											name: "ElementaryTypeName",
											src: "666:4:16"
										}
									],
									id: 6253,
									name: "VariableDeclaration",
									src: "666:10:16"
								}
							],
							id: 6254,
							name: "ParameterList",
							src: "648:29:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6258,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 6255,
											name: "ElementaryTypeName",
											src: "696:4:16"
										}
									],
									id: 6256,
									name: "VariableDeclaration",
									src: "696:4:16"
								}
							],
							id: 6257,
							name: "ParameterList",
							src: "695:6:16"
						}
					],
					id: 6258,
					name: "FunctionDefinition",
					src: "632:70:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "a9059cbb",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "transfer",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 6267,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6259,
											name: "ElementaryTypeName",
											src: "725:7:16"
										}
									],
									id: 6260,
									name: "VariableDeclaration",
									src: "725:10:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 6267,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6261,
											name: "ElementaryTypeName",
											src: "737:4:16"
										}
									],
									id: 6262,
									name: "VariableDeclaration",
									src: "737:10:16"
								}
							],
							id: 6263,
							name: "ParameterList",
							src: "724:24:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6267,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 6264,
											name: "ElementaryTypeName",
											src: "767:4:16"
										}
									],
									id: 6265,
									name: "VariableDeclaration",
									src: "767:4:16"
								}
							],
							id: 6266,
							name: "ParameterList",
							src: "766:6:16"
						}
					],
					id: 6267,
					name: "FunctionDefinition",
					src: "707:66:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "23b872dd",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "transferFrom",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "from",
										overrides: null,
										scope: 6278,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6268,
											name: "ElementaryTypeName",
											src: "800:7:16"
										}
									],
									id: 6269,
									name: "VariableDeclaration",
									src: "800:12:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 6278,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6270,
											name: "ElementaryTypeName",
											src: "814:7:16"
										}
									],
									id: 6271,
									name: "VariableDeclaration",
									src: "814:10:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 6278,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6272,
											name: "ElementaryTypeName",
											src: "826:4:16"
										}
									],
									id: 6273,
									name: "VariableDeclaration",
									src: "826:10:16"
								}
							],
							id: 6274,
							name: "ParameterList",
							src: "799:38:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6278,
										stateVariable: false,
										storageLocation: "default",
										type: "bool",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bool",
												type: "bool"
											},
											id: 6275,
											name: "ElementaryTypeName",
											src: "856:4:16"
										}
									],
									id: 6276,
									name: "VariableDeclaration",
									src: "856:4:16"
								}
							],
							id: 6277,
							name: "ParameterList",
							src: "855:6:16"
						}
					],
					id: 6278,
					name: "FunctionDefinition",
					src: "778:84:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "3644e515",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "DOMAIN_SEPARATOR",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6279,
							name: "ParameterList",
							src: "893:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6283,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 6280,
											name: "ElementaryTypeName",
											src: "919:7:16"
										}
									],
									id: 6281,
									name: "VariableDeclaration",
									src: "919:7:16"
								}
							],
							id: 6282,
							name: "ParameterList",
							src: "918:9:16"
						}
					],
					id: 6283,
					name: "FunctionDefinition",
					src: "868:60:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "30adf81f",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "PERMIT_TYPEHASH",
						overrides: null,
						scope: 6447,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6284,
							name: "ParameterList",
							src: "957:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6288,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 6285,
											name: "ElementaryTypeName",
											src: "983:7:16"
										}
									],
									id: 6286,
									name: "VariableDeclaration",
									src: "983:7:16"
								}
							],
							id: 6287,
							name: "ParameterList",
							src: "982:9:16"
						}
					],
					id: 6288,
					name: "FunctionDefinition",
					src: "933:59:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "7ecebe00",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "nonces",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "owner",
										overrides: null,
										scope: 6295,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6289,
											name: "ElementaryTypeName",
											src: "1013:7:16"
										}
									],
									id: 6290,
									name: "VariableDeclaration",
									src: "1013:13:16"
								}
							],
							id: 6291,
							name: "ParameterList",
							src: "1012:15:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6295,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6292,
											name: "ElementaryTypeName",
											src: "1051:4:16"
										}
									],
									id: 6293,
									name: "VariableDeclaration",
									src: "1051:4:16"
								}
							],
							id: 6294,
							name: "ParameterList",
							src: "1050:6:16"
						}
					],
					id: 6295,
					name: "FunctionDefinition",
					src: "997:60:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "d505accf",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "permit",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "owner",
										overrides: null,
										scope: 6312,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6296,
											name: "ElementaryTypeName",
											src: "1079:7:16"
										}
									],
									id: 6297,
									name: "VariableDeclaration",
									src: "1079:13:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "spender",
										overrides: null,
										scope: 6312,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6298,
											name: "ElementaryTypeName",
											src: "1094:7:16"
										}
									],
									id: 6299,
									name: "VariableDeclaration",
									src: "1094:15:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "value",
										overrides: null,
										scope: 6312,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6300,
											name: "ElementaryTypeName",
											src: "1111:4:16"
										}
									],
									id: 6301,
									name: "VariableDeclaration",
									src: "1111:10:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "deadline",
										overrides: null,
										scope: 6312,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6302,
											name: "ElementaryTypeName",
											src: "1123:4:16"
										}
									],
									id: 6303,
									name: "VariableDeclaration",
									src: "1123:13:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "v",
										overrides: null,
										scope: 6312,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 6304,
											name: "ElementaryTypeName",
											src: "1138:5:16"
										}
									],
									id: 6305,
									name: "VariableDeclaration",
									src: "1138:7:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "r",
										overrides: null,
										scope: 6312,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 6306,
											name: "ElementaryTypeName",
											src: "1147:7:16"
										}
									],
									id: 6307,
									name: "VariableDeclaration",
									src: "1147:9:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "s",
										overrides: null,
										scope: 6312,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 6308,
											name: "ElementaryTypeName",
											src: "1158:7:16"
										}
									],
									id: 6309,
									name: "VariableDeclaration",
									src: "1158:9:16"
								}
							],
							id: 6310,
							name: "ParameterList",
							src: "1078:90:16"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6311,
							name: "ParameterList",
							src: "1177:0:16"
						}
					],
					id: 6312,
					name: "FunctionDefinition",
					src: "1063:115:16"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Mint"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "sender",
										overrides: null,
										scope: 6320,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6313,
											name: "ElementaryTypeName",
											src: "1195:7:16"
										}
									],
									id: 6314,
									name: "VariableDeclaration",
									src: "1195:22:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount0",
										overrides: null,
										scope: 6320,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6315,
											name: "ElementaryTypeName",
											src: "1219:4:16"
										}
									],
									id: 6316,
									name: "VariableDeclaration",
									src: "1219:12:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount1",
										overrides: null,
										scope: 6320,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6317,
											name: "ElementaryTypeName",
											src: "1233:4:16"
										}
									],
									id: 6318,
									name: "VariableDeclaration",
									src: "1233:12:16"
								}
							],
							id: 6319,
							name: "ParameterList",
							src: "1194:52:16"
						}
					],
					id: 6320,
					name: "EventDefinition",
					src: "1184:63:16"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Burn"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "sender",
										overrides: null,
										scope: 6330,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6321,
											name: "ElementaryTypeName",
											src: "1263:7:16"
										}
									],
									id: 6322,
									name: "VariableDeclaration",
									src: "1263:22:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount0",
										overrides: null,
										scope: 6330,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6323,
											name: "ElementaryTypeName",
											src: "1287:4:16"
										}
									],
									id: 6324,
									name: "VariableDeclaration",
									src: "1287:12:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount1",
										overrides: null,
										scope: 6330,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6325,
											name: "ElementaryTypeName",
											src: "1301:4:16"
										}
									],
									id: 6326,
									name: "VariableDeclaration",
									src: "1301:12:16"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 6330,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6327,
											name: "ElementaryTypeName",
											src: "1315:7:16"
										}
									],
									id: 6328,
									name: "VariableDeclaration",
									src: "1315:18:16"
								}
							],
							id: 6329,
							name: "ParameterList",
							src: "1262:72:16"
						}
					],
					id: 6330,
					name: "EventDefinition",
					src: "1252:83:16"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Swap"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "sender",
										overrides: null,
										scope: 6344,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6331,
											name: "ElementaryTypeName",
											src: "1360:7:16"
										}
									],
									id: 6332,
									name: "VariableDeclaration",
									src: "1360:22:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount0In",
										overrides: null,
										scope: 6344,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6333,
											name: "ElementaryTypeName",
											src: "1392:4:16"
										}
									],
									id: 6334,
									name: "VariableDeclaration",
									src: "1392:14:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount1In",
										overrides: null,
										scope: 6344,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6335,
											name: "ElementaryTypeName",
											src: "1416:4:16"
										}
									],
									id: 6336,
									name: "VariableDeclaration",
									src: "1416:14:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount0Out",
										overrides: null,
										scope: 6344,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6337,
											name: "ElementaryTypeName",
											src: "1440:4:16"
										}
									],
									id: 6338,
									name: "VariableDeclaration",
									src: "1440:15:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "amount1Out",
										overrides: null,
										scope: 6344,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6339,
											name: "ElementaryTypeName",
											src: "1465:4:16"
										}
									],
									id: 6340,
									name: "VariableDeclaration",
									src: "1465:15:16"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 6344,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6341,
											name: "ElementaryTypeName",
											src: "1490:7:16"
										}
									],
									id: 6342,
									name: "VariableDeclaration",
									src: "1490:18:16"
								}
							],
							id: 6343,
							name: "ParameterList",
							src: "1350:164:16"
						}
					],
					id: 6344,
					name: "EventDefinition",
					src: "1340:175:16"
				},
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "Sync"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "reserve0",
										overrides: null,
										scope: 6350,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 6345,
											name: "ElementaryTypeName",
											src: "1531:7:16"
										}
									],
									id: 6346,
									name: "VariableDeclaration",
									src: "1531:16:16"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "reserve1",
										overrides: null,
										scope: 6350,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 6347,
											name: "ElementaryTypeName",
											src: "1549:7:16"
										}
									],
									id: 6348,
									name: "VariableDeclaration",
									src: "1549:16:16"
								}
							],
							id: 6349,
							name: "ParameterList",
							src: "1530:36:16"
						}
					],
					id: 6350,
					name: "EventDefinition",
					src: "1520:47:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "ba9a7a56",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "MINIMUM_LIQUIDITY",
						overrides: null,
						scope: 6447,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6351,
							name: "ParameterList",
							src: "1599:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6355,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6352,
											name: "ElementaryTypeName",
											src: "1625:4:16"
										}
									],
									id: 6353,
									name: "VariableDeclaration",
									src: "1625:4:16"
								}
							],
							id: 6354,
							name: "ParameterList",
							src: "1624:6:16"
						}
					],
					id: 6355,
					name: "FunctionDefinition",
					src: "1573:58:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "c45a0155",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "factory",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6356,
							name: "ParameterList",
							src: "1652:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6360,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6357,
											name: "ElementaryTypeName",
											src: "1678:7:16"
										}
									],
									id: 6358,
									name: "VariableDeclaration",
									src: "1678:7:16"
								}
							],
							id: 6359,
							name: "ParameterList",
							src: "1677:9:16"
						}
					],
					id: 6360,
					name: "FunctionDefinition",
					src: "1636:51:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "0dfe1681",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "token0",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6361,
							name: "ParameterList",
							src: "1707:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6365,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6362,
											name: "ElementaryTypeName",
											src: "1733:7:16"
										}
									],
									id: 6363,
									name: "VariableDeclaration",
									src: "1733:7:16"
								}
							],
							id: 6364,
							name: "ParameterList",
							src: "1732:9:16"
						}
					],
					id: 6365,
					name: "FunctionDefinition",
					src: "1692:50:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "d21220a7",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "token1",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6366,
							name: "ParameterList",
							src: "1762:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6370,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6367,
											name: "ElementaryTypeName",
											src: "1788:7:16"
										}
									],
									id: 6368,
									name: "VariableDeclaration",
									src: "1788:7:16"
								}
							],
							id: 6369,
							name: "ParameterList",
							src: "1787:9:16"
						}
					],
					id: 6370,
					name: "FunctionDefinition",
					src: "1747:50:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "0902f1ac",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "getReserves",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6371,
							name: "ParameterList",
							src: "1822:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "reserve0",
										overrides: null,
										scope: 6379,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 6372,
											name: "ElementaryTypeName",
											src: "1848:7:16"
										}
									],
									id: 6373,
									name: "VariableDeclaration",
									src: "1848:16:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "reserve1",
										overrides: null,
										scope: 6379,
										stateVariable: false,
										storageLocation: "default",
										type: "uint112",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint112",
												type: "uint112"
											},
											id: 6374,
											name: "ElementaryTypeName",
											src: "1866:7:16"
										}
									],
									id: 6375,
									name: "VariableDeclaration",
									src: "1866:16:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "blockTimestampLast",
										overrides: null,
										scope: 6379,
										stateVariable: false,
										storageLocation: "default",
										type: "uint32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint32",
												type: "uint32"
											},
											id: 6376,
											name: "ElementaryTypeName",
											src: "1884:6:16"
										}
									],
									id: 6377,
									name: "VariableDeclaration",
									src: "1884:25:16"
								}
							],
							id: 6378,
							name: "ParameterList",
							src: "1847:63:16"
						}
					],
					id: 6379,
					name: "FunctionDefinition",
					src: "1802:109:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "5909c0d5",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "price0CumulativeLast",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6380,
							name: "ParameterList",
							src: "1945:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6384,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6381,
											name: "ElementaryTypeName",
											src: "1971:4:16"
										}
									],
									id: 6382,
									name: "VariableDeclaration",
									src: "1971:4:16"
								}
							],
							id: 6383,
							name: "ParameterList",
							src: "1970:6:16"
						}
					],
					id: 6384,
					name: "FunctionDefinition",
					src: "1916:61:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "5a3d5493",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "price1CumulativeLast",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6385,
							name: "ParameterList",
							src: "2011:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6389,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6386,
											name: "ElementaryTypeName",
											src: "2037:4:16"
										}
									],
									id: 6387,
									name: "VariableDeclaration",
									src: "2037:4:16"
								}
							],
							id: 6388,
							name: "ParameterList",
							src: "2036:6:16"
						}
					],
					id: 6389,
					name: "FunctionDefinition",
					src: "1982:61:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "7464fc3d",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "kLast",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6390,
							name: "ParameterList",
							src: "2062:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6394,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6391,
											name: "ElementaryTypeName",
											src: "2088:4:16"
										}
									],
									id: 6392,
									name: "VariableDeclaration",
									src: "2088:4:16"
								}
							],
							id: 6393,
							name: "ParameterList",
							src: "2087:6:16"
						}
					],
					id: 6394,
					name: "FunctionDefinition",
					src: "2048:46:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "54cf2aeb",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "swapFee",
						overrides: null,
						scope: 6447,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6395,
							name: "ParameterList",
							src: "2115:2:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6399,
										stateVariable: false,
										storageLocation: "default",
										type: "uint32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint32",
												type: "uint32"
											},
											id: 6396,
											name: "ElementaryTypeName",
											src: "2141:6:16"
										}
									],
									id: 6397,
									name: "VariableDeclaration",
									src: "2141:6:16"
								}
							],
							id: 6398,
							name: "ParameterList",
							src: "2140:8:16"
						}
					],
					id: 6399,
					name: "FunctionDefinition",
					src: "2099:50:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "6a627842",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "mint",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 6406,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6400,
											name: "ElementaryTypeName",
											src: "2169:7:16"
										}
									],
									id: 6401,
									name: "VariableDeclaration",
									src: "2169:10:16"
								}
							],
							id: 6402,
							name: "ParameterList",
							src: "2168:12:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "liquidity",
										overrides: null,
										scope: 6406,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6403,
											name: "ElementaryTypeName",
											src: "2199:4:16"
										}
									],
									id: 6404,
									name: "VariableDeclaration",
									src: "2199:14:16"
								}
							],
							id: 6405,
							name: "ParameterList",
							src: "2198:16:16"
						}
					],
					id: 6406,
					name: "FunctionDefinition",
					src: "2155:60:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "89afcb44",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "burn",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 6415,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6407,
											name: "ElementaryTypeName",
											src: "2234:7:16"
										}
									],
									id: 6408,
									name: "VariableDeclaration",
									src: "2234:10:16"
								}
							],
							id: 6409,
							name: "ParameterList",
							src: "2233:12:16"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "amount0",
										overrides: null,
										scope: 6415,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6410,
											name: "ElementaryTypeName",
											src: "2264:4:16"
										}
									],
									id: 6411,
									name: "VariableDeclaration",
									src: "2264:12:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "amount1",
										overrides: null,
										scope: 6415,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6412,
											name: "ElementaryTypeName",
											src: "2278:4:16"
										}
									],
									id: 6413,
									name: "VariableDeclaration",
									src: "2278:12:16"
								}
							],
							id: 6414,
							name: "ParameterList",
							src: "2263:28:16"
						}
					],
					id: 6415,
					name: "FunctionDefinition",
					src: "2220:72:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "022c0d9f",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "swap",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "amount0Out",
										overrides: null,
										scope: 6426,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6416,
											name: "ElementaryTypeName",
											src: "2311:4:16"
										}
									],
									id: 6417,
									name: "VariableDeclaration",
									src: "2311:15:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "amount1Out",
										overrides: null,
										scope: 6426,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6418,
											name: "ElementaryTypeName",
											src: "2328:4:16"
										}
									],
									id: 6419,
									name: "VariableDeclaration",
									src: "2328:15:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 6426,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6420,
											name: "ElementaryTypeName",
											src: "2345:7:16"
										}
									],
									id: 6421,
									name: "VariableDeclaration",
									src: "2345:10:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "data",
										overrides: null,
										scope: 6426,
										stateVariable: false,
										storageLocation: "calldata",
										type: "bytes",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes",
												type: "bytes"
											},
											id: 6422,
											name: "ElementaryTypeName",
											src: "2357:5:16"
										}
									],
									id: 6423,
									name: "VariableDeclaration",
									src: "2357:19:16"
								}
							],
							id: 6424,
							name: "ParameterList",
							src: "2310:67:16"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6425,
							name: "ParameterList",
							src: "2386:0:16"
						}
					],
					id: 6426,
					name: "FunctionDefinition",
					src: "2297:90:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "bc25cf77",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "skim",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "to",
										overrides: null,
										scope: 6431,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6427,
											name: "ElementaryTypeName",
											src: "2406:7:16"
										}
									],
									id: 6428,
									name: "VariableDeclaration",
									src: "2406:10:16"
								}
							],
							id: 6429,
							name: "ParameterList",
							src: "2405:12:16"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6430,
							name: "ParameterList",
							src: "2426:0:16"
						}
					],
					id: 6431,
					name: "FunctionDefinition",
					src: "2392:35:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "fff6cae9",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "sync",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6432,
							name: "ParameterList",
							src: "2445:2:16"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6433,
							name: "ParameterList",
							src: "2456:0:16"
						}
					],
					id: 6434,
					name: "FunctionDefinition",
					src: "2432:25:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "485cc955",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "initialize",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6441,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6435,
											name: "ElementaryTypeName",
											src: "2483:7:16"
										}
									],
									id: 6436,
									name: "VariableDeclaration",
									src: "2483:7:16"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6441,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6437,
											name: "ElementaryTypeName",
											src: "2492:7:16"
										}
									],
									id: 6438,
									name: "VariableDeclaration",
									src: "2492:7:16"
								}
							],
							id: 6439,
							name: "ParameterList",
							src: "2482:18:16"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6440,
							name: "ParameterList",
							src: "2509:0:16"
						}
					],
					id: 6441,
					name: "FunctionDefinition",
					src: "2463:47:16"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "d6d788c3",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "setSwapFee",
						overrides: null,
						scope: 6447,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6446,
										stateVariable: false,
										storageLocation: "default",
										type: "uint32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint32",
												type: "uint32"
											},
											id: 6442,
											name: "ElementaryTypeName",
											src: "2535:6:16"
										}
									],
									id: 6443,
									name: "VariableDeclaration",
									src: "2535:6:16"
								}
							],
							id: 6444,
							name: "ParameterList",
							src: "2534:8:16"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6445,
							name: "ParameterList",
							src: "2551:0:16"
						}
					],
					id: 6446,
					name: "FunctionDefinition",
					src: "2515:37:16"
				}
			],
			id: 6447,
			name: "ContractDefinition",
			src: "62:2492:16"
		}
	],
	id: 6448,
	name: "SourceUnit",
	src: "36:2518:16"
};
var compiler = {
	name: "solc",
	version: "0.6.12+commit.27d51765.Emscripten.clang"
};
var networks = {
};
var schemaVersion = "3.4.11";
var updatedAt = "2023-02-14T04:26:25.733Z";
var devdoc = {
	kind: "dev",
	methods: {
	},
	version: 1
};
var userdoc = {
	kind: "user",
	methods: {
	},
	version: 1
};
var IDexSwapPair = {
	contractName: contractName,
	abi: abi,
	metadata: metadata,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	immutableReferences: immutableReferences,
	sourceMap: sourceMap,
	deployedSourceMap: deployedSourceMap,
	source: source,
	sourcePath: sourcePath,
	ast: ast,
	legacyAST: legacyAST,
	compiler: compiler,
	networks: networks,
	schemaVersion: schemaVersion,
	updatedAt: updatedAt,
	devdoc: devdoc,
	userdoc: userdoc
};

var contractName$1 = "IDexSwapFactory";
var abi$1 = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "token0",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "token1",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "pair",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "PairCreated",
		type: "event"
	},
	{
		inputs: [
		],
		name: "INIT_CODE_PAIR_HASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "pure",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "feeTo",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "protocolFeeDenominator",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "feeToSetter",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			}
		],
		name: "getPair",
		outputs: [
			{
				internalType: "address",
				name: "pair",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "allPairs",
		outputs: [
			{
				internalType: "address",
				name: "pair",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
		],
		name: "allPairsLength",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function",
		constant: true
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			}
		],
		name: "createPair",
		outputs: [
			{
				internalType: "address",
				name: "pair",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "setFeeTo",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "setFeeToSetter",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint8",
				name: "_protocolFee",
				type: "uint8"
			}
		],
		name: "setProtocolFee",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "pair",
				type: "address"
			},
			{
				internalType: "uint32",
				name: "swapFee",
				type: "uint32"
			}
		],
		name: "setSwapFee",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var metadata$1 = "{\"compiler\":{\"version\":\"0.6.12+commit.27d51765\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token0\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token1\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"pair\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"PairCreated\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"INIT_CODE_PAIR_HASH\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"allPairs\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"pair\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"allPairsLength\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"tokenA\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"tokenB\",\"type\":\"address\"}],\"name\":\"createPair\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"pair\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"feeTo\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"feeToSetter\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"tokenA\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"tokenB\",\"type\":\"address\"}],\"name\":\"getPair\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"pair\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"protocolFeeDenominator\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"setFeeTo\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"setFeeToSetter\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"_protocolFee\",\"type\":\"uint8\"}],\"name\":\"setProtocolFee\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"pair\",\"type\":\"address\"},{\"internalType\":\"uint32\",\"name\":\"swapFee\",\"type\":\"uint32\"}],\"name\":\"setSwapFee\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"project:/contracts/interfaces/IDexSwapFactory.sol\":\"IDexSwapFactory\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"project:/contracts/interfaces/IDexSwapFactory.sol\":{\"keccak256\":\"0xa79d86ae6f04f42c7b9c810b7b4f9762a47378fede1fbf78c4771a5a17a5661c\",\"license\":\"GPL-3.0\",\"urls\":[\"bzz-raw://81a94e32d75e2eb2da2326f9c789dc7d0814e293e4fef7701afd3beb72341078\",\"dweb:/ipfs/Qmb8skLLqT5xk99wD4nJQhXceeHRvVDboJ5gQbaUnA1igC\"]}},\"version\":1}";
var bytecode$1 = "0x";
var deployedBytecode$1 = "0x";
var immutableReferences$1 = {
};
var sourceMap$1 = "";
var deployedSourceMap$1 = "";
var source$1 = "// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.5.0;\n\ninterface IDexSwapFactory {\n    event PairCreated(address indexed token0, address indexed token1, address pair, uint);\n\n    function INIT_CODE_PAIR_HASH() external pure returns (bytes32);\n    function feeTo() external view returns (address);\n    function protocolFeeDenominator() external view returns (uint8);\n    function feeToSetter() external view returns (address);\n\n    function getPair(address tokenA, address tokenB) external view returns (address pair);\n    function allPairs(uint) external view returns (address pair);\n    function allPairsLength() external view returns (uint);\n\n    function createPair(address tokenA, address tokenB) external returns (address pair);\n\n    function setFeeTo(address) external;\n    function setFeeToSetter(address) external;\n    function setProtocolFee(uint8 _protocolFee) external;\n    function setSwapFee(address pair, uint32 swapFee) external;\n}";
var sourcePath$1 = "/mnt/e/ZooHarmony-EthDenver/dexs-router-a5/contracts/interfaces/IDexSwapFactory.sol";
var ast$1 = {
	absolutePath: "project:/contracts/interfaces/IDexSwapFactory.sol",
	exportedSymbols: {
		IDexSwapFactory: [
			6195
		]
	},
	id: 6196,
	license: "GPL-3.0",
	nodeType: "SourceUnit",
	nodes: [
		{
			id: 6112,
			literals: [
				"solidity",
				">=",
				"0.5",
				".0"
			],
			nodeType: "PragmaDirective",
			src: "36:24:15"
		},
		{
			abstract: false,
			baseContracts: [
			],
			contractDependencies: [
			],
			contractKind: "interface",
			documentation: null,
			fullyImplemented: false,
			id: 6195,
			linearizedBaseContracts: [
				6195
			],
			name: "IDexSwapFactory",
			nodeType: "ContractDefinition",
			nodes: [
				{
					anonymous: false,
					documentation: null,
					id: 6122,
					name: "PairCreated",
					nodeType: "EventDefinition",
					parameters: {
						id: 6121,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6114,
								indexed: true,
								mutability: "mutable",
								name: "token0",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6122,
								src: "112:22:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6113,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "112:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6116,
								indexed: true,
								mutability: "mutable",
								name: "token1",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6122,
								src: "136:22:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6115,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "136:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6118,
								indexed: false,
								mutability: "mutable",
								name: "pair",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6122,
								src: "160:12:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6117,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "160:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6120,
								indexed: false,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6122,
								src: "174:4:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6119,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "174:4:15",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "111:68:15"
					},
					src: "94:86:15"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "5855a25a",
					id: 6127,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "INIT_CODE_PAIR_HASH",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6123,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "214:2:15"
					},
					returnParameters: {
						id: 6126,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6125,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6127,
								src: "240:7:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_bytes32",
									typeString: "bytes32"
								},
								typeName: {
									id: 6124,
									name: "bytes32",
									nodeType: "ElementaryTypeName",
									src: "240:7:15",
									typeDescriptions: {
										typeIdentifier: "t_bytes32",
										typeString: "bytes32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "239:9:15"
					},
					scope: 6195,
					src: "186:63:15",
					stateMutability: "pure",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "017e7e58",
					id: 6132,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "feeTo",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6128,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "268:2:15"
					},
					returnParameters: {
						id: 6131,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6130,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6132,
								src: "294:7:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6129,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "294:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "293:9:15"
					},
					scope: 6195,
					src: "254:49:15",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "2ff7042a",
					id: 6137,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "protocolFeeDenominator",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6133,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "339:2:15"
					},
					returnParameters: {
						id: 6136,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6135,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6137,
								src: "365:5:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 6134,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "365:5:15",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "364:7:15"
					},
					scope: 6195,
					src: "308:64:15",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "094b7415",
					id: 6142,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "feeToSetter",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6138,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "397:2:15"
					},
					returnParameters: {
						id: 6141,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6140,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6142,
								src: "423:7:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6139,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "423:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "422:9:15"
					},
					scope: 6195,
					src: "377:55:15",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "e6a43905",
					id: 6151,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "getPair",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6147,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6144,
								mutability: "mutable",
								name: "tokenA",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6151,
								src: "455:14:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6143,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "455:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6146,
								mutability: "mutable",
								name: "tokenB",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6151,
								src: "471:14:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6145,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "471:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "454:32:15"
					},
					returnParameters: {
						id: 6150,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6149,
								mutability: "mutable",
								name: "pair",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6151,
								src: "510:12:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6148,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "510:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "509:14:15"
					},
					scope: 6195,
					src: "438:86:15",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "1e3dd18b",
					id: 6158,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "allPairs",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6154,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6153,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6158,
								src: "547:4:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6152,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "547:4:15",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "546:6:15"
					},
					returnParameters: {
						id: 6157,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6156,
								mutability: "mutable",
								name: "pair",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6158,
								src: "576:12:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6155,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "576:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "575:14:15"
					},
					scope: 6195,
					src: "529:61:15",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "574f2ba3",
					id: 6163,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "allPairsLength",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6159,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "618:2:15"
					},
					returnParameters: {
						id: 6162,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6161,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6163,
								src: "644:4:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint256",
									typeString: "uint256"
								},
								typeName: {
									id: 6160,
									name: "uint",
									nodeType: "ElementaryTypeName",
									src: "644:4:15",
									typeDescriptions: {
										typeIdentifier: "t_uint256",
										typeString: "uint256"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "643:6:15"
					},
					scope: 6195,
					src: "595:55:15",
					stateMutability: "view",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "c9c65396",
					id: 6172,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "createPair",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6168,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6165,
								mutability: "mutable",
								name: "tokenA",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6172,
								src: "676:14:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6164,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "676:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6167,
								mutability: "mutable",
								name: "tokenB",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6172,
								src: "692:14:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6166,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "692:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "675:32:15"
					},
					returnParameters: {
						id: 6171,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6170,
								mutability: "mutable",
								name: "pair",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6172,
								src: "726:12:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6169,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "726:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "725:14:15"
					},
					scope: 6195,
					src: "656:84:15",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "f46901ed",
					id: 6177,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "setFeeTo",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6175,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6174,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6177,
								src: "764:7:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6173,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "764:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "763:9:15"
					},
					returnParameters: {
						id: 6176,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "781:0:15"
					},
					scope: 6195,
					src: "746:36:15",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "a2e74af6",
					id: 6182,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "setFeeToSetter",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6180,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6179,
								mutability: "mutable",
								name: "",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6182,
								src: "811:7:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6178,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "811:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "810:9:15"
					},
					returnParameters: {
						id: 6181,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "828:0:15"
					},
					scope: 6195,
					src: "787:42:15",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "4e91f811",
					id: 6187,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "setProtocolFee",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6185,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6184,
								mutability: "mutable",
								name: "_protocolFee",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6187,
								src: "858:18:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint8",
									typeString: "uint8"
								},
								typeName: {
									id: 6183,
									name: "uint8",
									nodeType: "ElementaryTypeName",
									src: "858:5:15",
									typeDescriptions: {
										typeIdentifier: "t_uint8",
										typeString: "uint8"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "857:20:15"
					},
					returnParameters: {
						id: 6186,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "886:0:15"
					},
					scope: 6195,
					src: "834:53:15",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				},
				{
					body: null,
					documentation: null,
					functionSelector: "9e68ceb8",
					id: 6194,
					implemented: false,
					kind: "function",
					modifiers: [
					],
					name: "setSwapFee",
					nodeType: "FunctionDefinition",
					overrides: null,
					parameters: {
						id: 6192,
						nodeType: "ParameterList",
						parameters: [
							{
								constant: false,
								id: 6189,
								mutability: "mutable",
								name: "pair",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6194,
								src: "912:12:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_address",
									typeString: "address"
								},
								typeName: {
									id: 6188,
									name: "address",
									nodeType: "ElementaryTypeName",
									src: "912:7:15",
									stateMutability: "nonpayable",
									typeDescriptions: {
										typeIdentifier: "t_address",
										typeString: "address"
									}
								},
								value: null,
								visibility: "internal"
							},
							{
								constant: false,
								id: 6191,
								mutability: "mutable",
								name: "swapFee",
								nodeType: "VariableDeclaration",
								overrides: null,
								scope: 6194,
								src: "926:14:15",
								stateVariable: false,
								storageLocation: "default",
								typeDescriptions: {
									typeIdentifier: "t_uint32",
									typeString: "uint32"
								},
								typeName: {
									id: 6190,
									name: "uint32",
									nodeType: "ElementaryTypeName",
									src: "926:6:15",
									typeDescriptions: {
										typeIdentifier: "t_uint32",
										typeString: "uint32"
									}
								},
								value: null,
								visibility: "internal"
							}
						],
						src: "911:30:15"
					},
					returnParameters: {
						id: 6193,
						nodeType: "ParameterList",
						parameters: [
						],
						src: "950:0:15"
					},
					scope: 6195,
					src: "892:59:15",
					stateMutability: "nonpayable",
					virtual: false,
					visibility: "external"
				}
			],
			scope: 6196,
			src: "62:891:15"
		}
	],
	src: "36:917:15"
};
var legacyAST$1 = {
	attributes: {
		absolutePath: "project:/contracts/interfaces/IDexSwapFactory.sol",
		exportedSymbols: {
			IDexSwapFactory: [
				6195
			]
		},
		license: "GPL-3.0"
	},
	children: [
		{
			attributes: {
				literals: [
					"solidity",
					">=",
					"0.5",
					".0"
				]
			},
			id: 6112,
			name: "PragmaDirective",
			src: "36:24:15"
		},
		{
			attributes: {
				abstract: false,
				baseContracts: [
					null
				],
				contractDependencies: [
					null
				],
				contractKind: "interface",
				documentation: null,
				fullyImplemented: false,
				linearizedBaseContracts: [
					6195
				],
				name: "IDexSwapFactory",
				scope: 6196
			},
			children: [
				{
					attributes: {
						anonymous: false,
						documentation: null,
						name: "PairCreated"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "token0",
										overrides: null,
										scope: 6122,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6113,
											name: "ElementaryTypeName",
											src: "112:7:15"
										}
									],
									id: 6114,
									name: "VariableDeclaration",
									src: "112:22:15"
								},
								{
									attributes: {
										constant: false,
										indexed: true,
										mutability: "mutable",
										name: "token1",
										overrides: null,
										scope: 6122,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6115,
											name: "ElementaryTypeName",
											src: "136:7:15"
										}
									],
									id: 6116,
									name: "VariableDeclaration",
									src: "136:22:15"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "pair",
										overrides: null,
										scope: 6122,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6117,
											name: "ElementaryTypeName",
											src: "160:7:15"
										}
									],
									id: 6118,
									name: "VariableDeclaration",
									src: "160:12:15"
								},
								{
									attributes: {
										constant: false,
										indexed: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6122,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6119,
											name: "ElementaryTypeName",
											src: "174:4:15"
										}
									],
									id: 6120,
									name: "VariableDeclaration",
									src: "174:4:15"
								}
							],
							id: 6121,
							name: "ParameterList",
							src: "111:68:15"
						}
					],
					id: 6122,
					name: "EventDefinition",
					src: "94:86:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "5855a25a",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "INIT_CODE_PAIR_HASH",
						overrides: null,
						scope: 6195,
						stateMutability: "pure",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6123,
							name: "ParameterList",
							src: "214:2:15"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6127,
										stateVariable: false,
										storageLocation: "default",
										type: "bytes32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "bytes32",
												type: "bytes32"
											},
											id: 6124,
											name: "ElementaryTypeName",
											src: "240:7:15"
										}
									],
									id: 6125,
									name: "VariableDeclaration",
									src: "240:7:15"
								}
							],
							id: 6126,
							name: "ParameterList",
							src: "239:9:15"
						}
					],
					id: 6127,
					name: "FunctionDefinition",
					src: "186:63:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "017e7e58",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "feeTo",
						overrides: null,
						scope: 6195,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6128,
							name: "ParameterList",
							src: "268:2:15"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6132,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6129,
											name: "ElementaryTypeName",
											src: "294:7:15"
										}
									],
									id: 6130,
									name: "VariableDeclaration",
									src: "294:7:15"
								}
							],
							id: 6131,
							name: "ParameterList",
							src: "293:9:15"
						}
					],
					id: 6132,
					name: "FunctionDefinition",
					src: "254:49:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "2ff7042a",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "protocolFeeDenominator",
						overrides: null,
						scope: 6195,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6133,
							name: "ParameterList",
							src: "339:2:15"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6137,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 6134,
											name: "ElementaryTypeName",
											src: "365:5:15"
										}
									],
									id: 6135,
									name: "VariableDeclaration",
									src: "365:5:15"
								}
							],
							id: 6136,
							name: "ParameterList",
							src: "364:7:15"
						}
					],
					id: 6137,
					name: "FunctionDefinition",
					src: "308:64:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "094b7415",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "feeToSetter",
						overrides: null,
						scope: 6195,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6138,
							name: "ParameterList",
							src: "397:2:15"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6142,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6139,
											name: "ElementaryTypeName",
											src: "423:7:15"
										}
									],
									id: 6140,
									name: "VariableDeclaration",
									src: "423:7:15"
								}
							],
							id: 6141,
							name: "ParameterList",
							src: "422:9:15"
						}
					],
					id: 6142,
					name: "FunctionDefinition",
					src: "377:55:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "e6a43905",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "getPair",
						overrides: null,
						scope: 6195,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "tokenA",
										overrides: null,
										scope: 6151,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6143,
											name: "ElementaryTypeName",
											src: "455:7:15"
										}
									],
									id: 6144,
									name: "VariableDeclaration",
									src: "455:14:15"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "tokenB",
										overrides: null,
										scope: 6151,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6145,
											name: "ElementaryTypeName",
											src: "471:7:15"
										}
									],
									id: 6146,
									name: "VariableDeclaration",
									src: "471:14:15"
								}
							],
							id: 6147,
							name: "ParameterList",
							src: "454:32:15"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "pair",
										overrides: null,
										scope: 6151,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6148,
											name: "ElementaryTypeName",
											src: "510:7:15"
										}
									],
									id: 6149,
									name: "VariableDeclaration",
									src: "510:12:15"
								}
							],
							id: 6150,
							name: "ParameterList",
							src: "509:14:15"
						}
					],
					id: 6151,
					name: "FunctionDefinition",
					src: "438:86:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "1e3dd18b",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "allPairs",
						overrides: null,
						scope: 6195,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6158,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6152,
											name: "ElementaryTypeName",
											src: "547:4:15"
										}
									],
									id: 6153,
									name: "VariableDeclaration",
									src: "547:4:15"
								}
							],
							id: 6154,
							name: "ParameterList",
							src: "546:6:15"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "pair",
										overrides: null,
										scope: 6158,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6155,
											name: "ElementaryTypeName",
											src: "576:7:15"
										}
									],
									id: 6156,
									name: "VariableDeclaration",
									src: "576:12:15"
								}
							],
							id: 6157,
							name: "ParameterList",
							src: "575:14:15"
						}
					],
					id: 6158,
					name: "FunctionDefinition",
					src: "529:61:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "574f2ba3",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "allPairsLength",
						overrides: null,
						scope: 6195,
						stateMutability: "view",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6159,
							name: "ParameterList",
							src: "618:2:15"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6163,
										stateVariable: false,
										storageLocation: "default",
										type: "uint256",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint",
												type: "uint256"
											},
											id: 6160,
											name: "ElementaryTypeName",
											src: "644:4:15"
										}
									],
									id: 6161,
									name: "VariableDeclaration",
									src: "644:4:15"
								}
							],
							id: 6162,
							name: "ParameterList",
							src: "643:6:15"
						}
					],
					id: 6163,
					name: "FunctionDefinition",
					src: "595:55:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "c9c65396",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "createPair",
						overrides: null,
						scope: 6195,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "tokenA",
										overrides: null,
										scope: 6172,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6164,
											name: "ElementaryTypeName",
											src: "676:7:15"
										}
									],
									id: 6165,
									name: "VariableDeclaration",
									src: "676:14:15"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "tokenB",
										overrides: null,
										scope: 6172,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6166,
											name: "ElementaryTypeName",
											src: "692:7:15"
										}
									],
									id: 6167,
									name: "VariableDeclaration",
									src: "692:14:15"
								}
							],
							id: 6168,
							name: "ParameterList",
							src: "675:32:15"
						},
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "pair",
										overrides: null,
										scope: 6172,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6169,
											name: "ElementaryTypeName",
											src: "726:7:15"
										}
									],
									id: 6170,
									name: "VariableDeclaration",
									src: "726:12:15"
								}
							],
							id: 6171,
							name: "ParameterList",
							src: "725:14:15"
						}
					],
					id: 6172,
					name: "FunctionDefinition",
					src: "656:84:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "f46901ed",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "setFeeTo",
						overrides: null,
						scope: 6195,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6177,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6173,
											name: "ElementaryTypeName",
											src: "764:7:15"
										}
									],
									id: 6174,
									name: "VariableDeclaration",
									src: "764:7:15"
								}
							],
							id: 6175,
							name: "ParameterList",
							src: "763:9:15"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6176,
							name: "ParameterList",
							src: "781:0:15"
						}
					],
					id: 6177,
					name: "FunctionDefinition",
					src: "746:36:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "a2e74af6",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "setFeeToSetter",
						overrides: null,
						scope: 6195,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "",
										overrides: null,
										scope: 6182,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6178,
											name: "ElementaryTypeName",
											src: "811:7:15"
										}
									],
									id: 6179,
									name: "VariableDeclaration",
									src: "811:7:15"
								}
							],
							id: 6180,
							name: "ParameterList",
							src: "810:9:15"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6181,
							name: "ParameterList",
							src: "828:0:15"
						}
					],
					id: 6182,
					name: "FunctionDefinition",
					src: "787:42:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "4e91f811",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "setProtocolFee",
						overrides: null,
						scope: 6195,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "_protocolFee",
										overrides: null,
										scope: 6187,
										stateVariable: false,
										storageLocation: "default",
										type: "uint8",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint8",
												type: "uint8"
											},
											id: 6183,
											name: "ElementaryTypeName",
											src: "858:5:15"
										}
									],
									id: 6184,
									name: "VariableDeclaration",
									src: "858:18:15"
								}
							],
							id: 6185,
							name: "ParameterList",
							src: "857:20:15"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6186,
							name: "ParameterList",
							src: "886:0:15"
						}
					],
					id: 6187,
					name: "FunctionDefinition",
					src: "834:53:15"
				},
				{
					attributes: {
						body: null,
						documentation: null,
						functionSelector: "9e68ceb8",
						implemented: false,
						isConstructor: false,
						kind: "function",
						modifiers: [
							null
						],
						name: "setSwapFee",
						overrides: null,
						scope: 6195,
						stateMutability: "nonpayable",
						virtual: false,
						visibility: "external"
					},
					children: [
						{
							children: [
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "pair",
										overrides: null,
										scope: 6194,
										stateVariable: false,
										storageLocation: "default",
										type: "address",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "address",
												stateMutability: "nonpayable",
												type: "address"
											},
											id: 6188,
											name: "ElementaryTypeName",
											src: "912:7:15"
										}
									],
									id: 6189,
									name: "VariableDeclaration",
									src: "912:12:15"
								},
								{
									attributes: {
										constant: false,
										mutability: "mutable",
										name: "swapFee",
										overrides: null,
										scope: 6194,
										stateVariable: false,
										storageLocation: "default",
										type: "uint32",
										value: null,
										visibility: "internal"
									},
									children: [
										{
											attributes: {
												name: "uint32",
												type: "uint32"
											},
											id: 6190,
											name: "ElementaryTypeName",
											src: "926:6:15"
										}
									],
									id: 6191,
									name: "VariableDeclaration",
									src: "926:14:15"
								}
							],
							id: 6192,
							name: "ParameterList",
							src: "911:30:15"
						},
						{
							attributes: {
								parameters: [
									null
								]
							},
							children: [
							],
							id: 6193,
							name: "ParameterList",
							src: "950:0:15"
						}
					],
					id: 6194,
					name: "FunctionDefinition",
					src: "892:59:15"
				}
			],
			id: 6195,
			name: "ContractDefinition",
			src: "62:891:15"
		}
	],
	id: 6196,
	name: "SourceUnit",
	src: "36:917:15"
};
var compiler$1 = {
	name: "solc",
	version: "0.6.12+commit.27d51765.Emscripten.clang"
};
var networks$1 = {
};
var schemaVersion$1 = "3.4.11";
var updatedAt$1 = "2023-02-14T07:35:24.305Z";
var networkType = "ethereum";
var devdoc$1 = {
	kind: "dev",
	methods: {
	},
	version: 1
};
var userdoc$1 = {
	kind: "user",
	methods: {
	},
	version: 1
};
var IDexSwapFactory = {
	contractName: contractName$1,
	abi: abi$1,
	metadata: metadata$1,
	bytecode: bytecode$1,
	deployedBytecode: deployedBytecode$1,
	immutableReferences: immutableReferences$1,
	sourceMap: sourceMap$1,
	deployedSourceMap: deployedSourceMap$1,
	source: source$1,
	sourcePath: sourcePath$1,
	ast: ast$1,
	legacyAST: legacyAST$1,
	compiler: compiler$1,
	networks: networks$1,
	schemaVersion: schemaVersion$1,
	updatedAt: updatedAt$1,
	networkType: networkType,
	devdoc: devdoc$1,
	userdoc: userdoc$1
};

var ERC20Abi = [
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var _TOKEN_DATA_CACHE, _TOKEN_LOGO_URI_CACHE;
var TOKEN_DATA_CACHE = (_TOKEN_DATA_CACHE = {}, _TOKEN_DATA_CACHE[exports.ChainId.MAINNET] = {
  '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A': {
    decimals: 9,
    symbol: 'DGD',
    name: 'DigixDAO'
  } // DGD

}, _TOKEN_DATA_CACHE);
var TOKEN_LOGO_URI_CACHE = (_TOKEN_LOGO_URI_CACHE = {}, _TOKEN_LOGO_URI_CACHE[exports.ChainId.MAINNET] = {}, _TOKEN_LOGO_URI_CACHE[exports.ChainId.MANTLE_TESTNET] = {}, _TOKEN_LOGO_URI_CACHE[exports.ChainId.MUMBAI] = {}, _TOKEN_LOGO_URI_CACHE);
/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */

var Fetcher = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Fetcher() {}
  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   */


  Fetcher.fetchTokenData = function fetchTokenData(chainId, address, provider) {
    try {
      var _temp3 = function _temp3() {
        return new Token(chainId, address, tokenData.decimals, tokenData.symbol, tokenData.name);
      };

      if (provider === undefined) provider = providers.getDefaultProvider(networks$2.getNetwork(chainId));
      var tokenData;

      var _temp4 = function () {
        var _TOKEN_DATA_CACHE$cha;

        if (TOKEN_DATA_CACHE === null || TOKEN_DATA_CACHE === void 0 ? void 0 : (_TOKEN_DATA_CACHE$cha = TOKEN_DATA_CACHE[chainId]) === null || _TOKEN_DATA_CACHE$cha === void 0 ? void 0 : _TOKEN_DATA_CACHE$cha[address]) {
          tokenData = TOKEN_DATA_CACHE[chainId][address];
        } else {
          var multicall = new contracts.Contract(PERMISSIVE_MULTICALL_ADDRESS[chainId], PERMISSIVE_MULTICALL_ABI, provider);
          var erc20Interface = new contracts.Contract(address, ERC20Abi, provider)["interface"];
          var symbolFunction = erc20Interface.getFunction('symbol()');
          var nameFunction = erc20Interface.getFunction('name()');
          var decimalsFunction = erc20Interface.getFunction('decimals()');
          return Promise.resolve(multicall.aggregate([[address, erc20Interface.encodeFunctionData(symbolFunction)], [address, erc20Interface.encodeFunctionData(nameFunction)], [address, erc20Interface.encodeFunctionData(decimalsFunction)]])).then(function (result) {
            tokenData = {
              symbol: erc20Interface.decodeFunctionResult(symbolFunction, result.returnData[0])[0],
              name: erc20Interface.decodeFunctionResult(nameFunction, result.returnData[1])[0],
              decimals: erc20Interface.decodeFunctionResult(decimalsFunction, result.returnData[2])[0]
            };
            TOKEN_DATA_CACHE[chainId][address] = tokenData;
          });
        }
      }();

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetch on-chain, information on multiple given ERC20 token addresses, using the given ethers provider
   * (or a default one if not provided). The results are cached for efficient subsequent accesses.
   * @param chainId chain of the token
   * @param addresses addresses of the tokens for which the data is needed
   * @param provider provider used to fetch the token
   */
  ;

  Fetcher.fetchMultipleTokensData = function fetchMultipleTokensData(chainId, addresses, provider) {
    try {
      if (provider === undefined) provider = providers.getDefaultProvider(networks$2.getNetwork(chainId));

      var _addresses$reduce = addresses.reduce(function (accumulator, address, _currentIndex, _array) {
        var _TOKEN_DATA_CACHE$cha2;

        if (TOKEN_DATA_CACHE === null || TOKEN_DATA_CACHE === void 0 ? void 0 : (_TOKEN_DATA_CACHE$cha2 = TOKEN_DATA_CACHE[chainId]) === null || _TOKEN_DATA_CACHE$cha2 === void 0 ? void 0 : _TOKEN_DATA_CACHE$cha2[address]) {
          var cachedToken = TOKEN_DATA_CACHE[chainId][address];
          accumulator.previouslyCachedTokens.push(new Token(chainId, address, cachedToken.decimals, cachedToken.symbol, cachedToken.name));
        } else {
          accumulator.missingTokens.push(address);
        }

        return accumulator;
      }, {
        previouslyCachedTokens: [],
        missingTokens: []
      }),
          previouslyCachedTokens = _addresses$reduce.previouslyCachedTokens,
          missingTokens = _addresses$reduce.missingTokens;

      var tokenData = previouslyCachedTokens;

      var _temp6 = function () {
        if (missingTokens.length > 0) {
          var erc20Interface = new abi$2.Interface(ERC20Abi);
          var getSymbolFunction = erc20Interface.getFunction('symbol()');
          var getNameFunction = erc20Interface.getFunction('name()');
          var getDecimalsFunction = erc20Interface.getFunction('decimals()');
          var multicall = new contracts.Contract(PERMISSIVE_MULTICALL_ADDRESS[chainId], PERMISSIVE_MULTICALL_ABI, provider);
          var aggregatedCalls = missingTokens.reduce(function (accumulator, address, _currentIndex, _array) {
            accumulator.push([address, erc20Interface.encodeFunctionData(getSymbolFunction)]);
            accumulator.push([address, erc20Interface.encodeFunctionData(getNameFunction)]);
            accumulator.push([address, erc20Interface.encodeFunctionData(getDecimalsFunction)]);
            return accumulator;
          }, []);
          return Promise.resolve(multicall.aggregateWithPermissiveness(aggregatedCalls)).then(function (result) {
            var returnData = result[1];
            missingTokens.forEach(function (address, index) {
              var _returnData$slice = returnData.slice(index * 3, index * 3 + 3),
                  wrappedSymbol = _returnData$slice[0],
                  wrappedName = _returnData$slice[1],
                  wrappedDecimals = _returnData$slice[2];

              if (!wrappedSymbol.success || !wrappedName.success || !wrappedDecimals.success) {
                console.warn("could not fetch ERC20 data for address " + address);
                return;
              }

              try {
                tokenData.push(new Token(chainId, address, erc20Interface.decodeFunctionResult(getDecimalsFunction, wrappedDecimals.data)[0], erc20Interface.decodeFunctionResult(getSymbolFunction, wrappedSymbol.data)[0], erc20Interface.decodeFunctionResult(getNameFunction, wrappedName.data)[0]));
              } catch (error) {
                console.error("error decoding ERC20 data for address " + address);
              }
            });
          });
        }
      }();

      return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {
        return tokenData;
      }) : tokenData);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchPairData = function fetchPairData(tokenA, tokenB, provider, platform) {
    try {
      if (provider === undefined) provider = providers.getDefaultProvider(networks$2.getNetwork(tokenA.chainId));
      if (platform === undefined) platform = RoutablePlatform.DEXSWAP;
      !(tokenA.chainId === tokenB.chainId) ? "development" !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
      var address = Pair.getAddress(tokenA, tokenB, platform);
      return Promise.resolve(new contracts.Contract(address, IDexSwapPair.abi, provider).getReserves()).then(function (_ref) {
        var reserves0 = _ref[0],
            reserves1 = _ref[1];
        var balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
        var tokenAmountA = new TokenAmount(tokenA, balances[0]);
        var tokenAmountB = new TokenAmount(tokenB, balances[1]);
        var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
        ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
        var liquidityToken = new Token(tokenAmounts[0].token.chainId, Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token, platform), 18, 'DXS', 'DXswap');
        var _BigInt = JSBI.BigInt;
        return Promise.resolve(new contracts.Contract(liquidityToken.address, IDexSwapPair.abi, provider).swapFee()).then(function (_Contract$swapFee) {
          var swapFee = _BigInt.call(JSBI, _Contract$swapFee);

          var _BigInt2 = JSBI.BigInt;
          return Promise.resolve(new contracts.Contract(FACTORY_ADDRESS[tokenAmountA.token.chainId], IDexSwapFactory.abi, provider).protocolFeeDenominator()).then(function (_Contract$protocolFee) {
            var protocolFeeDenominator = _BigInt2.call(JSBI, _Contract$protocolFee);

            return new Pair(tokenAmountA, tokenAmountB, swapFee, protocolFeeDenominator);
          });
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches swap fee information from a liquidity token of a token pair
   * @param liquidityToken the liquidity token from which the swap fee info will be fetched
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchSwapFee = function fetchSwapFee(liquidityToken, provider) {
    try {
      if (provider === undefined) provider = providers.getDefaultProvider(networks$2.getNetwork(liquidityToken.chainId));
      var _BigInt4 = JSBI.BigInt;
      return Promise.resolve(new contracts.Contract(liquidityToken.address, IDexSwapPair.abi, provider).swapFee()).then(function (_Contract$swapFee2) {
        var _BigInt3$call = _BigInt4.call(JSBI, _Contract$swapFee2);

        return Promise.resolve(new contracts.Contract(FACTORY_ADDRESS[liquidityToken.chainId], IDexSwapFactory.abi, provider).feeToSetter()).then(function (_Contract$feeToSetter) {
          return {
            fee: _BigInt3$call,
            owner: _Contract$feeToSetter
          };
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches swap fee information from liquidity tokens of token pairs
   * @param liquidityToken the liquidity tokens from which the swap fee info will be fetched
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchSwapFees = function fetchSwapFees(liquidityTokens, provider) {
    try {
      if (provider === undefined) provider = providers.getDefaultProvider(networks$2.getNetwork(liquidityTokens[0].chainId));
      var multicall = new contracts.Contract(PERMISSIVE_MULTICALL_ADDRESS[liquidityTokens[0].chainId], PERMISSIVE_MULTICALL_ABI, provider);
      var factoryContract = new contracts.Contract(FACTORY_ADDRESS[liquidityTokens[0].chainId], IDexSwapFactory.abi, provider);
      var liquidityTokenContract = new contracts.Contract(liquidityTokens[0].address, IDexSwapPair.abi, provider);
      var calls = [];
      calls.push({
        address: factoryContract.address,
        callData: factoryContract["interface"].encodeFunctionData(factoryContract["interface"].getFunction('feeToSetter()'))
      });

      for (var tokenPairsIndex = 0; tokenPairsIndex < liquidityTokens.length; tokenPairsIndex++) {
        calls.push({
          address: liquidityTokens[tokenPairsIndex].address,
          callData: liquidityTokenContract["interface"].encodeFunctionData(liquidityTokenContract["interface"].getFunction('swapFee()'))
        });
      }

      return Promise.resolve(multicall.aggregate(calls.map(function (call) {
        return [call.address, call.callData];
      }))).then(function (result) {
        var owner = factoryContract["interface"].decodeFunctionResult(factoryContract["interface"].getFunction('feeToSetter()'), result.returnData[0])[0];
        var fees = [];

        for (var resultIndex = 1; resultIndex < result.returnData.length; resultIndex++) {
          fees.push({
            fee: JSBI.BigInt(liquidityTokenContract["interface"].decodeFunctionResult(liquidityTokenContract["interface"].getFunction('swapFee()'), result.returnData[resultIndex])[0]),
            owner: owner
          });
        }

        return fees;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches swap fee information of all registered token pairs from factory
   * @param chainId the chainId of the network to fecth the swap fees
   * @param swapFeesCache a cache of already fetched fees to be skiped
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchAllSwapFees = function fetchAllSwapFees(chainId, swapFeesCache, provider) {
    if (swapFeesCache === void 0) {
      swapFeesCache = {};
    }

    try {
      var _this2 = this;

      if (provider === undefined) provider = providers.getDefaultProvider(networks$2.getNetwork(chainId));
      var multicall = new contracts.Contract(PERMISSIVE_MULTICALL_ADDRESS[chainId], PERMISSIVE_MULTICALL_ABI, provider);
      var factoryContract = new contracts.Contract(FACTORY_ADDRESS[chainId], IDexSwapFactory.abi, provider);
      return Promise.resolve(factoryContract.allPairsLength()).then(function (allPairsLength) {
        var allSwapPairs = {}; // Get first token pairs from cache

        var tokenPairsCache = Object.keys(swapFeesCache);
        var tokenPairsToFetch = [];

        for (var tokenPaisCacheIndex = 0; tokenPaisCacheIndex < tokenPairsCache.length; tokenPaisCacheIndex++) {
          allSwapPairs[tokenPairsCache[tokenPaisCacheIndex]] = {
            fee: swapFeesCache[tokenPairsCache[tokenPaisCacheIndex]].fee,
            owner: swapFeesCache[tokenPairsCache[tokenPaisCacheIndex]].owner
          };
        } // Get rest of the token pairs that are not cached


        var calls = [];

        for (var pairIndex = tokenPairsCache.length; pairIndex < allPairsLength; pairIndex++) {
          calls.push({
            address: factoryContract.address,
            callData: factoryContract["interface"].encodeFunctionData(factoryContract["interface"].getFunction('allPairs(uint)'), [pairIndex])
          });
        }

        return Promise.resolve(multicall.aggregate(calls.map(function (call) {
          return [call.address, call.callData];
        }))).then(function (result) {
          for (var resultIndex = 0; resultIndex < result.returnData.length; resultIndex++) {
            var tokenPairAddress = factoryContract["interface"].decodeFunctionResult(factoryContract["interface"].getFunction('allPairs(uint256)'), result.returnData[resultIndex])[0];
            tokenPairsToFetch.push(new Token(chainId, tokenPairAddress, 18, 'DXS', 'DXswap'));
          } // Fetch the pairs that we dont have the fee and owner


          return Promise.resolve(_this2.fetchSwapFees(tokenPairsToFetch, provider)).then(function (swapFeesFetched) {
            for (var tokenPairsToFetchIndex = 0; tokenPairsToFetchIndex < tokenPairsToFetch.length; tokenPairsToFetchIndex++) {
              allSwapPairs[tokenPairsToFetch[tokenPairsToFetchIndex].address] = swapFeesFetched[tokenPairsToFetchIndex];
            }

            return allSwapPairs;
          });
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches protocol fee information from the token pair factory
   * @param chainId the chainId of the network to fecth the protocol fee
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchProtocolFee = function fetchProtocolFee(chainId, provider) {
    try {
      if (provider === undefined) provider = providers.getDefaultProvider(networks$2.getNetwork(chainId));
      return Promise.resolve(new contracts.Contract(FACTORY_ADDRESS[chainId], IDexSwapFactory.abi, provider)).then(function (factoryContract) {
        return Promise.resolve(factoryContract.protocolFeeDenominator()).then(function (feeDenominator) {
          return Promise.resolve(factoryContract.feeTo()).then(function (feeReceiver) {
            return {
              feeDenominator: feeDenominator,
              feeReceiver: feeReceiver
            };
          });
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches the default DXdao token list from the token registry scheme.
   * @param chainId the chainId of the network to fecth the protocol fee
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchDxDaoTokenList = function fetchDxDaoTokenList(chainId, provider) {
    try {
      var _this4 = this;

      if (provider === undefined) provider = providers.getDefaultProvider(networks$2.getNetwork(chainId));
      var tokenRegistryContract = new contracts.Contract(TOKEN_REGISTRY_ADDRESS[chainId], TokenRegistryAbi, provider);
      return Promise.resolve(tokenRegistryContract.getTokens(DEXSWAP_TOKEN_LIST_ID[chainId])).then(function (tokenAddresses) {
        return Promise.resolve(_this4.fetchMultipleTokensData(chainId, tokenAddresses, provider)).then(function (tokens) {
          function _temp8() {
            return {
              name: 'DXswap default token list',
              tokens: tokenList
            };
          }

          var tokenList = [];

          var _temp7 = _forOf(tokens, function (token) {
            var _push = tokenList.push,
                _token$symbol = token.symbol,
                _token$decimals = token.decimals,
                _token$name = token.name,
                _token$address = token.address;
            return Promise.resolve(_this4.fetchTokenLogoUri(token)).then(function (_this3$fetchTokenLogo) {
              _push.call(tokenList, {
                chainId: chainId,
                address: _token$address,
                name: _token$name,
                decimals: _token$decimals,
                symbol: _token$symbol,
                logoURI: _this3$fetchTokenLogo
              });
            });
          });

          return _temp7 && _temp7.then ? _temp7.then(_temp8) : _temp8(_temp7);
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  Fetcher.fetchTokenLogoUri = function fetchTokenLogoUri(token) {
    try {
      var _temp11 = function _temp11() {
        return TOKEN_LOGO_URI_CACHE[_chainId][token.address.toLowerCase()];
      };

      var _this6 = this;

      var _chainId = token.chainId;

      if (_chainId !== exports.ChainId.MAINNET && _chainId !== exports.ChainId.MANTLE_TESTNET && _chainId !== exports.ChainId.MUMBAI) {
        return Promise.resolve(''); // token logos not fully supported for testnets
      }

      var _temp12 = function () {
        if (Object.keys(TOKEN_LOGO_URI_CACHE[_chainId]).length === 0) {
          return Promise.resolve(_this6.populateTokenLogoCache(_chainId)).then(function () {});
        }
      }();

      return Promise.resolve(_temp12 && _temp12.then ? _temp12.then(_temp11) : _temp11(_temp12));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  Fetcher.populateTokenLogoCache = function populateTokenLogoCache(chainId) {
    try {
      if (chainId !== exports.ChainId.MAINNET && chainId !== exports.ChainId.MANTLE_TESTNET && chainId !== exports.ChainId.MUMBAI) {
        return Promise.resolve();
      }

      var tokenListURL = '';

      if (chainId == exports.ChainId.MAINNET) {
        tokenListURL = 'https://tokens.coingecko.com/uniswap/all.json'; // coingecko list used for mainnet
      } else {
        tokenListURL = 'https://raw.githubusercontent.com/Agin-DropDisco/dexswapcore/main/DexSwapTokenList.json';
      }

      return Promise.resolve(fetch(tokenListURL)).then(function (response) {
        if (!response.ok) {
          console.warn("could not fetch token list at " + tokenListURL);
          return;
        }

        return Promise.resolve(response.json()).then(function (_ref2) {
          var tokens = _ref2.tokens;
          TOKEN_LOGO_URI_CACHE[chainId] = tokens.reduce(function (cache, token) {
            cache[token.address.toLowerCase()] = token.logoURI;
            return cache;
          }, {});
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  Fetcher.getCachedTokenLogo = function getCachedTokenLogo(token) {
    var chainId = token.chainId;

    if (chainId !== exports.ChainId.MAINNET && chainId !== exports.ChainId.MANTLE_TESTNET && chainId !== exports.ChainId.MUMBAI) {
      return '';
    }

    return TOKEN_LOGO_URI_CACHE[chainId][token.address.toLowerCase()] || '';
  };

  return Fetcher;
}();

exports.JSBI = JSBI;
exports.BIT = BIT;
exports.Currency = Currency;
exports.CurrencyAmount = CurrencyAmount;
exports.DEXSWAP_TOKEN_LIST_ID = DEXSWAP_TOKEN_LIST_ID;
exports.DEZU = DEZU;
exports.ETHER = ETHER;
exports.FACTORY_ADDRESS = FACTORY_ADDRESS;
exports.FIVE = FIVE;
exports.Fetcher = Fetcher;
exports.Fraction = Fraction;
exports.INIT_CODE_HASH = INIT_CODE_HASH;
exports.InsufficientInputAmountError = InsufficientInputAmountError;
exports.InsufficientReservesError = InsufficientReservesError;
exports.LiquidityMiningCampaign = LiquidityMiningCampaign;
exports.MINIMUM_LIQUIDITY = MINIMUM_LIQUIDITY;
exports.ONE = ONE;
exports.PERMISSIVE_MULTICALL_ABI = PERMISSIVE_MULTICALL_ABI;
exports.PERMISSIVE_MULTICALL_ADDRESS = PERMISSIVE_MULTICALL_ADDRESS;
exports.Pair = Pair;
exports.Percent = Percent;
exports.Price = Price;
exports.PricedToken = PricedToken;
exports.PricedTokenAmount = PricedTokenAmount;
exports.ROUTER_ADDRESS = ROUTER_ADDRESS;
exports.RoutablePlatform = RoutablePlatform;
exports.Route = Route;
exports.Router = Router;
exports.SECONDS_IN_YEAR = SECONDS_IN_YEAR;
exports.SOLIDITY_TYPE_MAXIMA = SOLIDITY_TYPE_MAXIMA;
exports.STAKING_REWARDS_DISTRIBUTION_ABI = stakingRewardsDistribution;
exports.STAKING_REWARDS_FACTORY_ABI = stakingRewardsDistributionFactory;
exports.STAKING_REWARDS_FACTORY_ADDRESS = STAKING_REWARDS_FACTORY_ADDRESS;
exports.TEN = TEN;
exports.THREE = THREE;
exports.TOKEN_REGISTRY_ABI = TokenRegistryAbi;
exports.TOKEN_REGISTRY_ADDRESS = TOKEN_REGISTRY_ADDRESS;
exports.TWO = TWO;
exports.Token = Token;
exports.TokenAmount = TokenAmount;
exports.Trade = Trade;
exports.USD = USD;
exports.USDC = USDC;
exports.USDT = USDT;
exports.WBNB = WBNB;
exports.WBTC = WBTC;
exports.WETH = WETH;
exports.ZERO = ZERO;
exports.ZERO_ADDRESS = ZERO_ADDRESS;
exports.ZGEM = ZGEM;
exports.ZONU = ZONU;
exports._100 = _100;
exports._1000 = _1000;
exports._10000 = _10000;
exports._25 = _25;
exports._30 = _30;
exports.currencyEquals = currencyEquals;
exports.defaultProtocolFeeDenominator = defaultProtocolFeeDenominator;
exports.defaultSwapFee = defaultSwapFee;
exports.inputOutputComparator = inputOutputComparator;
exports.parseBigintIsh = parseBigintIsh;
exports.tradeComparator = tradeComparator;
//# sourceMappingURL=dexswap-sdk.cjs.development.js.map

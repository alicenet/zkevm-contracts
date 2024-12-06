import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-dependency-compiler";
import "@cuonghx.gu-tech/hardhat-gcp-kms-signer-plugin";

import {HardhatUserConfig} from "hardhat/config";

const DEFAULT_MNEMONIC = "test test test test test test test test test test test junk";

/*
 * You need to export an object to set up your config
 * Go to https://hardhat.org/config/ to learn more
 */

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const gcpKmsConfigs = [
    {
        projectId: process.env.GCP_PROJECT_ID || "",
        locationId: process.env.GCP_LOCATION_ID || "",
        keyRingId: process.env.GCP_KEY_RING_ID || "",
        keyId: process.env.GCP_KEY_ID || "",
        versionId: process.env.GCP_KEY_VERSION_ID || "1",
    },
];

const config: HardhatUserConfig = {
    dependencyCompiler: {
        paths: [
            "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol",
            "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol",
            "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol",
        ], // ,
        // keep: true
    },
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
            {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 0,
                    },
                    evmVersion: "shanghai",
                },
            },
            {
                version: "0.6.11",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
            {
                version: "0.5.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
        ],
        overrides: {
            "contracts/v2/PolygonRollupManager.sol": {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 0,
                    },
                    evmVersion: "shanghai",
                }, // try yul optimizer
            },
            "contracts/v2/PolygonZkEVMBridgeV2.sol": {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 0,
                    },
                    evmVersion: "shanghai",
                },
            },
            "contracts/v2/newDeployments/PolygonRollupManagerNotUpgraded.sol": {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 0,
                    },
                    evmVersion: "shanghai",
                }, // try yul optimizer
            },
            "contracts/v2/mocks/PolygonRollupManagerMock.sol": {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 10,
                    },
                    evmVersion: "shanghai",
                }, // try yul optimizer
            },
            // Should have the same optimizations than the RollupManager to verify
            "contracts/v2/lib/PolygonTransparentProxy.sol": {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 0,
                    },
                    evmVersion: "shanghai",
                }, // try yul optimizer
            },
            "contracts/v2/utils/ClaimCompressor.sol": {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                    evmVersion: "shanghai",
                    //viaIR: true,
                },
            },
        },
    },
    networks: {
        mainnet: {
            url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_PROJECT_ID}`,
            accounts: [process.env.MAINNET_PK || "0x0000000000000000000000000000000000000000000000000000000000000000"],
            gcpKmsConfigs,
        },
        ropsten: {
            url: process.env.ROPSTEN_PROVIDER
                ? process.env.ROPSTEN_PROVIDER
                : `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            accounts: {
                mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 20,
            },
            gcpKmsConfigs,
        },
        goerli: {
            url: process.env.GOERLI_PROVIDER
                ? process.env.GOERLI_PROVIDER
                : `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            accounts: {
                mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 20,
            },
            gcpKmsConfigs,
        },
        rinkeby: {
            url: process.env.RINKEBY_PROVIDER
                ? process.env.RINKEBY_PROVIDER
                : `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            accounts: {
                mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 20,
            },
            gcpKmsConfigs,
        },
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_PROJECT_ID}`,
            accounts: [process.env.SEPOLIA_PK || "0x0000000000000000000000000000000000000000000000000000000000000000"],
            gcpKmsConfigs,
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            accounts: {
                mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 20,
            },
            gcpKmsConfigs,
        },
        hardhat: {
            initialDate: "0",
            allowUnlimitedContractSize: true,
            initialBaseFeePerGas: 0,
            accounts: {
                mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 20,
            },
            gcpKmsConfigs,
        },
        alicenetTestnet: {
            url: "https://api.staging.alice.net",
            gas: "auto",
            gasMultiplier: 2,
            gasPrice: "auto",
            accounts: [
                process.env.ALICENET_TESTNET_PK || "0x0000000000000000000000000000000000000000000000000000000000000000",
            ],
            gcpKmsConfigs,
        },
        polygonZKEVMTestnet: {
            url: "https://rpc.cardona.zkevm-rpc.com",
            accounts: {
                mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 20,
            },
            gcpKmsConfigs,
        },
        polygonZKEVMMainnet: {
            url: "https://zkevm-rpc.com",
            accounts: {
                mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 20,
            },
            gcpKmsConfigs,
        },
        zkevmDevnet: {
            url: "http://123:123:123:123:123",
            accounts: {
                mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 20,
            },
            gcpKmsConfigs,
        },
    },
    gasReporter: {
        enabled: !!process.env.REPORT_GAS,
        outputFile: process.env.REPORT_GAS_FILE ? "./gas_report.md" : undefined,
        noColors: !!process.env.REPORT_GAS_FILE,
    },
    etherscan: {
        apiKey: {
            polygonZKEVMTestnet: `${process.env.ETHERSCAN_ZKEVM_API_KEY}`,
            polygonZKEVMMainnet: `${process.env.ETHERSCAN_ZKEVM_API_KEY}`,
            goerli: `${process.env.ETHERSCAN_API_KEY}`,
            sepolia: `${process.env.ETHERSCAN_API_KEY}`,
            mainnet: `${process.env.ETHERSCAN_API_KEY}`,
            zkevmDevnet: `${process.env.ETHERSCAN_API_KEY}`,
            alicenetTestnet: "0000000000000000000000000000000000",
        },
        customChains: [
            {
                network: "alicenetTestnet",
                chainId: 10042,
                urls: {
                    apiURL: "https://block-explorer.staging.alice.net/api",
                    browserURL: "https://block-explorer.staging.alice.net",
                },
            },
            {
                network: "polygonZKEVMMainnet",
                chainId: 1101,
                urls: {
                    apiURL: "https://api-zkevm.polygonscan.com/api",
                    browserURL: "https://zkevm.polygonscan.com/",
                },
            },
            {
                network: "polygonZKEVMTestnet",
                chainId: 2442,
                urls: {
                    apiURL: "https://explorer-ui.cardona.zkevm-rpc.com/api",
                    browserURL: "https://explorer-ui.cardona.zkevm-rpc.com",
                },
            },
            {
                network: "zkevmDevnet",
                chainId: 123,
                urls: {
                    apiURL: "http://123:123:123:123:123/api",
                    browserURL: "http://123:123:123:123:123",
                },
            },
        ],
    },
};

export default config;

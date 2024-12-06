/* eslint-disable no-await-in-loop, no-use-before-define, no-lonely-if */
/* eslint-disable no-console, no-inner-declarations, no-undef, import/no-unresolved */
import * as dotenv from "dotenv";
import "../helpers/utils";
import path = require("path");
import fs = require("fs");
import {ethers} from "hardhat";
dotenv.config({path: path.resolve(__dirname, "../../.env")});
const pathOutputPath = path.join(__dirname, "./deploy_output.json");
const pathRollupOutputPath = path.join(__dirname, "./create_rollup_output.json");
const genesisPath = path.join(__dirname, "./genesis.json");
const createRollupParametersPath = path.join(__dirname, "./create_rollup_parameters.json");

async function main() {
    if (!fs.existsSync(pathOutputPath)) {
        throw new Error("Deploy output json not found");
    }

    const deployOutput = require(pathOutputPath);

    if (!fs.existsSync(pathRollupOutputPath)) {
        throw new Error("Rollup deploy output json not found");
    }
    const rollupOutput = require(pathRollupOutputPath);

    if (!fs.existsSync(genesisPath)) {
        throw new Error("Genesis file not found");
    }
    const genesis = require(genesisPath);

    if (!fs.existsSync(createRollupParametersPath)) {
        throw new Error("Create rollup parameters file not found");
    }
    const createRollupParameters = require(createRollupParametersPath);
    const currentProvider = ethers.getDefaultProvider(process.env.HARDHAT_NETWORK!);

    fs.writeFileSync(
        path.join(__dirname, "./fullInfo.json"),
        JSON.stringify(
            {
                zkEVMAddress: rollupOutput.rollupAddress,
                rollupManagerAddress: deployOutput.polygonRollupManagerAddress,
                dataCommitteeAddress: rollupOutput.polygonDataCommitteeAddress,
                exitRootAddress: deployOutput.polygonZkEVMGlobalExitRootAddress,
                bridgeAddress: deployOutput.polygonZkEVMBridgeAddress,
                sequencerAddress: createRollupParameters.trustedSequencer,
                aggregatorAddress: deployOutput.trustedAggregator,
                deploymentBlockNumber: deployOutput.deploymentRollupManagerBlockNumber,
                L2ChainID: createRollupParameters.chainID,
                genesis: {
                    l1Config: {
                        chainId: parseInt((await currentProvider.getNetwork()).chainId.toString(), 10),
                        polygonZkEVMAddress: rollupOutput.rollupAddress,
                        polygonRollupManagerAddress: deployOutput.polygonRollupManagerAddress,
                        polTokenAddress: deployOutput.polTokenAddress,
                        polygonZkEVMGlobalExitRootAddress: deployOutput.polygonZkEVMGlobalExitRootAddress,
                    },
                    rollupCreationBlockNumber: rollupOutput.createRollupBlockNumber,
                    rollupManagerCreationBlockNumber: deployOutput.deploymentRollupManagerBlockNumber,
                    root: genesis.root,
                    genesis: genesis.genesis,
                },
            },
            null,
            2
        )
    );
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});

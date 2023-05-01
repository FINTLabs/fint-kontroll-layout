import {startLayout} from "@fintlabs/flais-podium-layout";

console.log("LAYOUT_CONFIGURATION_URI =", process.env.LAYOUT_CONFIGURATION_URI)
startLayout(
    process.env.LAYOUT_CONFIGURATION_URI
    || `${process.cwd()}/pods.json`
);
import {startLayout} from "@fintlabs/flais-podium-layout";

startLayout(
    process.env.LAYOUT_CONFIGURATION_URI
    || `${process.cwd()}/pods.json`
);
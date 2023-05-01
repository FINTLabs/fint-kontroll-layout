import {startLayout} from "@fintlabs/flais-podium-layout";

const layoutConfigurationUri = process.env.LAYOUT_CONFIGURATION_URI || `${process.cwd()}/pods.json`;

startLayout(layoutConfigurationUri);
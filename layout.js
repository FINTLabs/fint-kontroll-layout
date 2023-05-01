const {startLayout} = require("@fintlabs/flais-podium-layout");

startLayout(
    process.env['LAYOUT_CONFIGURATION_URI']
    || `${process.cwd()}/pods-local.json`
);
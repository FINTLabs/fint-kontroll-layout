import {DefaultOptions, startLayout} from "@fintlabs/flais-podium-layout";

const podsFile = process.env.PODS_FILE || `${process.cwd()}/pods.json`;

startLayout(new DefaultOptions("fint-kontroll-layout",  podsFile));
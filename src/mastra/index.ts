import { Mastra } from "@mastra/core";

import { weatherAgent } from "./agents/weather";
import { dota2Agent} from "./agents/Dota2";


export const mastra = new Mastra({
    agents: { weatherAgent, dota2Agent },
});

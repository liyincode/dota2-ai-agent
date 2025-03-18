import {createTool} from "@mastra/core/tools";
import {z} from "zod"


export const dota2Tool = createTool({
    id: "get-dota2-info",
    description: "Get Dota 2 match information",
    inputSchema: z.object({
        query: z.string().describe("match id"),
    }),
    outputSchema: z.object({
        match_id: z.number(),
        duration: z.object({
            seconds: z.number(),
            formatted: z.string()
        }),
        winner: z.string(),
        teams: z.object({
            radiant: z.object({
                win: z.boolean(),
                players: z.array(z.object({
                    account_id: z.union([z.number(), z.string()]),
                    hero_id: z.number(),
                    kills: z.number(),
                    deaths: z.number(),
                    assists: z.number()
                }))
            }),
            dire: z.object({
                win: z.boolean(),
                players: z.array(z.object({
                    account_id: z.union([z.number(), z.string()]),
                    hero_id: z.number(),
                    kills: z.number(),
                    deaths: z.number(),
                    assists: z.number()
                }))
            })
        })
    }),
    execute: async ({context}) => {
        return await getDota2Match(context.query);
    },
})

const getDota2Match = async (matchId: string) => {
    const url = `https://api.opendota.com/api/matches/${matchId}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
        match_id: data.match_id,
        duration: {
            seconds: data.duration,
            formatted: `${Math.floor(data.duration / 60)}:${String(data.duration % 60).padStart(2, '0')}`
        },
        winner: data.radiant_win ? "Radiant" : "Dire",
        teams: {
            radiant: {
                win: data.radiant_win,
                players: data.players
                    .filter(player => player.player_slot < 128)
                    .map(player => ({
                        account_id: player.account_id || "null",
                        hero_id: player.hero_id,
                        kills: player.kills,
                        deaths: player.deaths,
                        assists: player.assists
                    }))
            },
            dire: {
                win: !data.radiant_win,
                players: data.players
                    .filter(player => player.player_slot >= 128)
                    .map(player => ({
                        account_id: player.account_id || "null",
                        hero_id: player.hero_id,
                        kills: player.kills,
                        deaths: player.deaths,
                        assists: player.assists
                    }))
            }
        }
    };


};

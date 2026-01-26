import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

//Crear el servidor MCP
const server = new McpServer({
        name: "servidor-mcp-monedas",
        version: '1.0.0'
});

server.registerTool(
    "convertir_monedas",
    {
        title: "Convertir Monedas",
        description: "Devuelve el valor actual de la moneda que necesitas (USD, EUR, etc)",
        inputSchema: {
            currency: z.string.min(1, "Debes indicar la moneda")
        },
    },   
        async ({currency}) => {
            const urls = `https://cdn.moneyconvert.net/api/latest.json`;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Error al acceder a la info del api ");
            }

            const data = await response.json();
            const value = data.rates[currency.toUpperCase()]

            if(!value){
                throw new error("No se encontro la moneda"+currency)

            }

            return {
                content: [
                    {
                        type: "text",
                        text: `El valor actual de ${currency.toUpperCase()} es: ${value}`
                    }
                ]
            }

        }

    )
    
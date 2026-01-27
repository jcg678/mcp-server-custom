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
            currency: z.string().min(1, "Debes indicar la moneda")
        },
    },   
        async ({currency}) => {
            const url = `https://cdn.moneyconvert.net/api/latest.json`;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Error al acceder a la info del api ");
            }

            const data = await response.json();
            const value = data.rates[currency.toUpperCase()]

            if(!value){
                throw new Error("No se encontro la moneda"+currency)

            }

            return {
                content: [
                    {
                        type: "text",
                        text: `El valor actual de ${currency.toUpperCase()} es: ${value} la base es USD`
                    }
                ]
            }

        }

    )
    

    server.registerTool(
    "conversor_tipo_cambio",
    {
        title: "Convertir una cifra de moneda a otra",
        description: "Devuelve el valor de una moneda frente a otra)",
        inputSchema: {
           origin: z.string().length(3, "Debe ser un valor ISO que represente una moneda"),
           destination:  z.string().length(3, "Debe ser un valor ISO que represente una moneda"),
           amount:z.number()
        },
    },   
        async ({origin, destination, amount}) => {
            const url = `https://cdn.moneyconvert.net/api/latest.json`;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Error al acceder a la info del api ");
            }

            const data = await response.json();
            const {base, rates} = data;

            if(!base || !rates){
                throw new Error("No se encontro la moneda"+currency)

            }

            let rate;

            if(origin === base){
                rate = rates[destination];
            }else{
                const inverse = rates[origin];
                rate = rates[destination] / inverse;
                
            }

            const value_converted = amount * rate;

            return {
                content: [
                    {
                        type: "text",
                        text: `${amount} ${origin} = ${value_converted.toFixed(2)} ${destination} (Tasa: ${rate.toFixed(5)}), Moneda Base: ${base} `
                    }
                ]
            }

        }

    )

    const transport = new StdioServerTransport();
    await server.connect(transport);
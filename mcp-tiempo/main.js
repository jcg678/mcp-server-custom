import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

//Crear el servidor MCP
const server = new McpServer({
        name: "servidor-mcp-tiempo",
        version: '1.0.0'
});

server.registerTool(
    "el_tiempo_de_una_ciudad",
    {
        title: "Coseguir el clima actual de una ciudad",
        description: "Devuelve todos los datos del clima para la ciudad que queramos",
        inputSchema: {
            city: z.string().min(2, "Indica una ciudad valida")
        }
    },
    async({city})=>{
        const geoURL =`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
        const geoReponse = await fetch(geoURL);

        if(!geoReponse){
            throw new Error("Error al buscar la ciudad");
        }

        const geoData = await geoReponse.json();

        if(!geoData.results || !geoData.results.length === 0 ){
            throw new Error("No existe la ciudad");
        }

        let  {latitude, longitude} = geoData.results[0];

        const datageoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation&current=temperature_2m,precipitation`

        const wheatherReponse = await fetch(datageoUrl);

        if(!wheatherReponse.ok){
            throw new Error("Error al sacar el clima de la ciudad")
        }

        const weatherData = await wheatherReponse.json();

        return {
            content:[{
                type: "text",
                text: JSON.stringify(weatherData, null,2)
            }]
        }
    }
)
   



const transport = new StdioServerTransport();
    await server.connect(transport);
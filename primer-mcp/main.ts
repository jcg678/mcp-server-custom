import {McpServer, ResourceTemplate} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";

//crear un servidor MCP 
const servidor = new McpServer({
    name: "servidor-mcp-javier-dev",
    version: '1.0.0'
});

//Crear un herramienta
servidor.registerTool("multiplicar",
    {title: "Herramienta de multiplicar numeros", 
     description: "Pasale dos número y te los multiplica",
     inputSchema: {
        numero1:z.number(),
        numero2: z.number(),
    }
    },
     async ({numero1, numero2}) => {

        if(typeof numero1 !== "number" || typeof numero2 !== "number"){
            throw new Error("Los numeros no son numeros");
        }
        return {
            content:[
                {
                    type: "text",
                    text: String(numero1 * numero2)
                }
            ]
         
        };
    }
    
);


//recurso dinamico
servidor.registerResource(
    "saludar",
    new ResourceTemplate("saludar://{nombre}", {list:undefined}),
    {title: "Recurso para saludar", description: "Pidele un saludo"},
    async(url,{nombre} )=>{
        if(typeof nombre !== "string" ){
             throw new Error("El nombre no es correcto");
        }

        return {
            contents:[
                {uri:url.href,
                 text: `Hola saludos terricola ${nombre}`   
                }
            ]
        }
    }
)

const transporte = new StdioServerTransport();
await servidor.connect(transporte)
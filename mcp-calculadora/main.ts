import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

//Crear el servidor MCP
const server = new McpServer({
        name: "servidor-mcp-calculadora",
        version: '1.0.0'
});

//crear las herramientas
server.registerTool("sumar",
        {
                title: "Suma dos números",
                description: "Recibe dos numeros y devuelve su suma",
                inputSchema: {n1: z.number(),n2: z.number()}
        },
        async({n1,n2})=>{
                let operation:string = String(n1+n2);

                return {
                        content: [
                                {
                                        type: "text",
                                        text: operation
                                }
                        ]
                }
        }
)


server.registerTool("restar",
        {
                title: "Resta dos números",
                description: "Recibe dos numeros y devuelve su resta",
                inputSchema: {n1: z.number(),n2: z.number()}
        },
        async({n1,n2})=>{
                let operation:string = String(n1-n2);

                return {
                        content: [
                                {
                                        type: "text",
                                        text: operation
                                }
                        ]
                }
        }
)


server.registerTool("mutiplicar",
        {
                title: "Resta dos números",
                description: "Recibe dos numeros y devuelve su multiplicacion",
                inputSchema: {n1: z.number(),n2: z.number()}
        },
        async({n1,n2})=>{
                let operation:string = String(n1*n2);

                return {
                        content: [
                                {
                                        type: "text",
                                        text: operation
                                }
                        ]
                }
        }
)

server.registerTool("restar",
        {
                title: "Resta dos números",
                description: "Recibe dos numeros y devuelve su resta",
                inputSchema: {n1: z.number(),n2: z.number()}
        },
        async({n1,n2})=>{
                let operation:string = String(n1-n2);

                return {
                        content: [
                                {
                                        type: "text",
                                        text: operation
                                }
                        ]
                }
        }
)


server.registerTool("dividir",
        {
                title: "Divide dos números",
                description: "Recibe dos numeros y devuelve su division",
                inputSchema: {n1: z.number(),n2: z.number()}
        },
        async({n1,n2})=>{
                let operation:string = String(n1/n2);

                return {
                        content: [
                                {
                                        type: "text",
                                        text: operation
                                }
                        ]
                }
        }
)


server.registerTool("resto_division",
        {
                title: "Sacar el resto de una división de dos números",
                description: "Recibe dos numeros, los divide y devuelve su resto",
                inputSchema: {n1: z.number(),n2: z.number()}
        },
        async({n1,n2})=>{
                let operation:string = String(n1%n2);

                return {
                        content: [
                                {
                                        type: "text",
                                        text: operation
                                }
                        ]
                }
        }
)
//crear el mcp a la IA
const transporte = new StdioServerTransport();
await server.connect(transporte)
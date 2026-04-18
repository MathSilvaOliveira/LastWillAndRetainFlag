import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log(" Subscriber conectado");
  console.log(" Monitorando alertas...\n");
  
  client.subscribe("estufa/alertas", { qos: 1 });
  client.subscribe("estufa/umidade", { qos: 1 });
});

client.on("message", (topic, message) => {
  const data = JSON.parse(message.toString());
  
  if (topic === "estufa/alertas") {
    console.log(" ALERTA RECEBIDO:");
    console.log("   Tipo:", data.alerta);
    console.log("   Sensor:", data.sensor);
    console.log("   Status:", data.status);
    console.log("   Hora:", data.timestamp);
  } else if (topic === "estufa/umidade") {
    console.log(" Dados de umidade: ", data.valor + data.unidade);
  }
  
  console.log("---");
});

client.on("error", (error) => {
  console.error("Erro:", error);
});

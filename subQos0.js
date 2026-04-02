import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("SUB [Temp Ambiente]: conectado");
  client.subscribe("estufa/temp/ambiente", { qos: 0 });
});

client.on("message", (topic, msg) => {
  const data = JSON.parse(msg.toString());
  console.log(`[${data.timestamp}] Temp Ambiente: ${data.valor}${data.unidade}`);
});
import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883", {
  clientId: "monitor_criogenico"
});

client.on("connect", () => {
  console.log(" SUB: conectado");
  console.log(" Aguardando mensagens RETIDAS...");
  
  client.subscribe("criogenica/status", { qos: 1 });
});

client.on("message", (topic, message, packet) => {
  const data = JSON.parse(message.toString());
  
  // packet.retain indica se a mensagem foi retida
  if (packet.retain) {
    console.log(" Mensagem RETIDA recebida automaticamente:");
  } else {
    console.log(" Mensagem nova recebida:");
  }
  
  console.log(`Tópico: ${topic}`);
  console.log(`Dados:`, data);
  console.log("---");
});

client.on("error", (error) => {
  console.error("Erro:", error);
});

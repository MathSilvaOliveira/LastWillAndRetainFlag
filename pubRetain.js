import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("PUB com RETAIN FLAG: conectado");

  const statusMsg = JSON.stringify({
    sensor: "temperatura_criogenica",
    valor: -100,
    unidade: "°C",
    timestamp: new Date().toISOString(),
    status: "ativo"
  });

  client.publish("criogenica/status", statusMsg, { 
    qos: 1, 
    retain: true
  }, () => {
    console.log(" Mensagem publicada COM RETAIN FLAG");
    console.log(" Qualquer novo subscriber receberá essa mensagem automaticamente!");
    client.end();
  });
});

client.on("error", (error) => {
  console.error("Erro:", error);
});

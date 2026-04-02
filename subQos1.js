import mqtt from "mqtt";

const options = {
  clientId: "irrigacao_controller", 
  clean: false                      
};

const client = mqtt.connect("mqtt://localhost:1883", options);

client.on("connect", (connack) => {
  console.log(`SUB [Nível Água]: conectado (Sessão recuperada: ${connack.sessionPresent})`);
  client.subscribe("estufa/agua/nivel", { qos: 1 });
});

client.on("message", (topic, msg) => {
  const data = JSON.parse(msg.toString());
  console.log(`[${data.timestamp}] Nível Reservatório: ${data.valor}${data.unidade}`);


  if (data.valor < 20) {
    console.log(" ALERTA: Nível crítico — acionar bomba!");
  }
});
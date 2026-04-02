import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Sensor 2 [Nível Água]: conectado");

  setInterval(() => {
    const payload = JSON.stringify({
      sensor: "nivel_reservatorio",
      valor: +(Math.random() * 100).toFixed(1),
      unidade: "%",
      timestamp: new Date().toISOString(),
    });

    client.publish("estufa/agua/nivel", payload, { qos: 1 });
    console.log("PUB enviado:", payload);
  }, 3000); 
});

client.on("packetsend", (packet) => {
  if (packet.cmd === "publish") {
    console.log("Aguardando PUBACK do broker...");
  }
});
import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Sensor 1 [Temp Ambiente]: conectado");

  setInterval(() => {
    const payload = JSON.stringify({
      sensor: "temp_ambiente",
      valor: +(20 + Math.random() * 10).toFixed(2),
      unidade: "°C",
      timestamp: new Date().toISOString(),
    });

    client.publish("estufa/temp/ambiente", payload, { qos: 0 });
    console.log("PUB enviado:", payload);
  }, 5000);
});
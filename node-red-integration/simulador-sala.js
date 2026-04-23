import mqtt from "mqtt";

const client = mqtt.connect("mqtts://18d29bc228a34d55853272df48d5ea29.s1.eu.hivemq.cloud:8883", {
  clientId: "temperatura" + Math.random().toString(16).slice(2, 8),
  username: "Teste",
  password: "Teste@123",
});

client.on("connect", () => {
  console.log("Simulador SALA conectado ao HiveMQ");

  setInterval(() => {
    const temperatura = (20 + Math.random() * 10).toFixed(1);
    client.publish(
      "casa/sala/temperatura",
      JSON.stringify({
        dispositivo: "sensor_sala",
        valor: parseFloat(temperatura),
        unidade: "°C",
        timestamp: new Date().toISOString(),
      }),
      { qos: 1 }
    );
    console.log(`Sala temperatura: ${temperatura}°C`);

    const luminosidade = Math.floor(100 + Math.random() * 900);
    client.publish(
      "casa/sala/luminosidade",
      JSON.stringify({
        dispositivo: "sensor_sala",
        valor: luminosidade,
        unidade: "lux",
        timestamp: new Date().toISOString(),
      }),
      { qos: 1 }
    );
    console.log(`Sala luminosidade: ${luminosidade} lux`);
  }, 3000);
});

client.on("error", (err) => console.error("Erro:", err));
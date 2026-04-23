import mqtt from "mqtt";

const client = mqtt.connect("mqtts://18d29bc228a34d55853272df48d5ea29.s1.eu.hivemq.cloud:8883", {
  clientId: "temperatura" + Math.random().toString(16).slice(2, 8),
  username: "Teste",
  password: "Teste@123",
});

client.on("connect", () => {
  console.log("Simulador QUARTO conectado ao HiveMQ");

  setInterval(() => {
    const temperatura = (18 + Math.random() * 7).toFixed(1);
    client.publish(
      "casa/quarto/temperatura",
      JSON.stringify({
        dispositivo: "sensor_quarto",
        valor: parseFloat(temperatura),
        unidade: "°C",
        timestamp: new Date().toISOString(),
      }),
      { qos: 1 }
    );
    console.log(`🌡️  Quarto temperatura: ${temperatura}°C`);

    const umidade = (40 + Math.random() * 40).toFixed(1);
    client.publish(
      "casa/quarto/umidade",
      JSON.stringify({
        dispositivo: "sensor_quarto",
        valor: parseFloat(umidade),
        unidade: "%",
        timestamp: new Date().toISOString(),
      }),
      { qos: 1 }
    );
    console.log(`Quarto umidade: ${umidade}%`);
  }, 4000); // publica a cada 4 segundos
});

client.on("error", (err) => console.error("Erro:", err));
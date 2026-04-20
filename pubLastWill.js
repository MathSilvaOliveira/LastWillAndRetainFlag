import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883", {
  clientId: "sensor_umidade",
  
  will: {
    topic: "estufa/alertas",
    payload: JSON.stringify({
      alerta: "CONEXÃO PERDIDA",
      sensor: "umidade",
      timestamp: new Date().toISOString(),
      status: "desconectado"
    }),
    qos: 1,
    retain: false
  }
});

client.on("connect", () => {
  console.log("Publisher conectado");
  console.log(" Last Will configurado: será publicado se desconectar!");
  console.log(" Mantenha conectado... Pressione Ctrl+C para desconectar abruptamente");

  setInterval(() => {
    const msg = JSON.stringify({
      sensor: "umidade",
      valor: (40 + Math.random() * 30).toFixed(1),
      unidade: "%",
      timestamp: new Date().toISOString()
    });
    
    client.publish("estufa/umidade", msg, { qos: 1 });
    console.log("Dados enviados:", msg);
  }, 3000);
});

client.on("error", (error) => {
  console.error("Erro:", error);
});

// Ctrl+C → queda inesperada → LWT dispara
process.on("SIGINT", () => {
  console.log("\n Simulando QUEDA ABRUPTA (LWT será publicado)...");
  process.exit(1);
});

// kill <PID> → desconexão limpa → LWT NÃO dispara
process.on("SIGTERM", () => {
  console.log("\n Desconectando normalmente (LWT não será publicado)...");
  client.end(false, () => {
    console.log("Desconectado!");
    process.exit(0);
  });
});

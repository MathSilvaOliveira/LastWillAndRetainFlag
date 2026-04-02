import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883", {
  clientId: "extintor_controller",
  clean: false
});

const recebidas = new Set();

client.on("connect", () => {
  console.log("SUB Sensor 3 [Incêndio]: conectado");

  client.subscribe("estufa/alerta/incendio", { qos: 2 }, () => {
    console.log("SUB inscrito em estufa/alerta/incendio QoS2");
  });
});

client.on("message", (topic, msg) => {
  const mensagem = msg.toString();

  if (recebidas.has(mensagem)) {
    console.log("❌ DUPLICADA:", mensagem);
  } else {
    recebidas.add(mensagem);
    console.log("✅ ALERTA RECEBIDO:", mensagem);
    console.log("🚨 Acionando sistema de extinção automática!");
  }
});
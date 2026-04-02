import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

const alertas = ["fumaça detectada", "fogo confirmado", "temperatura crítica"];

client.on("connect", () => {
  console.log("PUB Sensor 3 [Incêndio]: conectado");

  let i = 0;

  const enviar = () => {
    const msg = `alerta-${i}: ${alertas[i]}`;

    client.publish("estufa/alerta/incendio", msg, { qos: 2 }, () => {
      console.log("PUB enviou:", msg);
    });

    i++;

    if (i < alertas.length) {
      setTimeout(enviar, 1000);
    } else {
      console.log("PUB finalizou");
      client.end();
    }
  };

  enviar();
});
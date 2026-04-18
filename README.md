# MQTT: Last Will and Testament (LWT) e Retain Flag

## Last Will and Testament (LWT)

###  O que é
O **Last Will and Testament (LWT)** é uma mensagem configurada pelo cliente no momento da conexão com o broker MQTT.  
Caso o cliente se desconecte de forma **inesperada** (queda de energia, perda de rede, falha), o broker publica automaticamente essa mensagem em um tópico definido.

---

### Quando usar
Utilize LWT quando for necessário **monitorar a disponibilidade de dispositivos**:

- Sensores IoT (online/offline)
- Dispositivos industriais
- Sistemas de monitoramento remoto
- Qualquer cenário onde falhas precisam ser detectadas rapidamente

---

### Impactos no sistema IoT real

#### Vantagens
- Permite detectar falhas automaticamente
- Melhora a confiabilidade do sistema
- Possibilita ações automáticas (alertas, redundância, fallback)

#### Cuidados
- Só é acionado em **desconexões inesperadas**
- Não é enviado se o cliente encerrar corretamente a conexão
- Depende da configuração correta no momento da conexão

---

## Retain Flag

### O que é
O **Retain Flag** é uma propriedade de uma mensagem MQTT que indica ao broker que ele deve **armazenar o último valor publicado em um tópico**.

Quando um novo cliente se inscreve nesse tópico, ele recebe imediatamente essa última mensagem, mesmo que ela tenha sido enviada no passado.

---

### Quando usar
Utilize Retain quando for necessário manter o **estado atual de um dispositivo ou sistema**:

- Último valor de sensores (temperatura, umidade, etc.)
- Estado de dispositivos (ligado/desligado)
- Configurações ou parâmetros do sistema

---

### Impactos no sistema IoT real

#### Vantagens
- Novos clientes recebem dados imediatamente
- Evita necessidade de esperar uma nova publicação
- Ideal para sistemas baseados em estado (stateful)

#### Cuidados
- Apenas **uma mensagem por tópico** é armazenada
- Pode entregar dados desatualizados se não houver atualização frequente
- Pode causar inconsistências se mal gerenciado

---

## Diferença

- **LWT**: usado para indicar falha ou desconexão inesperada de um cliente  
- **Retain Flag**: usado para manter o último estado conhecido de um tópico  

---


Em sistemas IoT reais, é comum combinar os dois:

- Publicar status "online" com retain
- Configurar LWT para publicar "offline" também com retain

Isso garante que qualquer cliente sempre saiba o estado atual do dispositivo.
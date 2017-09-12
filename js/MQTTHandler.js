var mqttClient = null;
var uniqeUserId = null;

function onMQTTConnect()
{
    console.log("onConnect");
    HTML_connectionEstablished(uniqeUserId);
}

function onMQTTConnectionLost(responseObject)
{
    if (responseObject.errorCode !== 0)
    {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

function onMQTTMessageArrived(message)
{
    console.log("onMessageArrived:" + message.payloadString);
    HTML_showIncomingMessage(message.payloadString);
}

function MQTT_Connect()
{
    uniqeUserId = TOOL_GenerateUUID();
    console.log(uniqeUserId);

    /* MQTT Operations. */
    mqttClient = new Paho.MQTT.Client(MQTT_BROKER, Number(MQTT_PORT), uniqeUserId);
    mqttClient.onConnectionLost = onMQTTConnectionLost;
    mqttClient.onMessageArrived = onMQTTMessageArrived;
    mqttClient.onSuccess = onMQTTConnect;

    var mqttOptions = {
        onSuccess : onMQTTConnect
    };

    if(MQTT_USER !== "" && MQTT_PASS !== "")
    {
        mqttOptions = {
            onSuccess: onMQTTConnect,
            userName : MQTT_USER,
            password : MQTT_PASS
        };
    }

    mqttClient.connect(mqttOptions);

    return mqttClient;
}

function MQTT_Subscribe(topic)
{
    console.log("MQTT_Subscribe " + topic);
    if(mqttClient)
    {
        mqttClient.subscribe(topic);
    }
}

function MQTT_Publish(topic, payload)
{
    var message = new Paho.MQTT.Message(payload);
    message.destinationName = topic;
    mqttClient.send(message);
}
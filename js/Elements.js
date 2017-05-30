
function HTML_connectionEstablished(uuid)
{
    $("#connectionDiv").html("Connected to MQTT Broker.<br>Unique ID : " + uuid);
    $('#subpubDiv').removeClass("hidden");
    $('#messageDiv').removeClass("hidden");
}

function HTML_showIncomingMessage(payload)
{
    $("#messageDiv").html("<b>Received</b> : " + payload);
}

$('#subButton').click(function(){
    MQTT_Subscribe($("#subText").val());
});

$('#pubButton').click(function(){
    MQTT_Publish($("#pubTopicText").val(), $("#pubMessageText").val());
});
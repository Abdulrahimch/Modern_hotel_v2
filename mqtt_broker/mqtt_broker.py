import paho.mqtt.client as mqtt
import time
import json

#
# vehicle_name = "vehiclepi01"
# commands_topic = "vehicles/{}/commands".format(vehicle_name)
# processed_commands_topic = "vehicles/{}/executedcommands".format(vehicle_name)
topic = 'abooodch/dilhayat/#'


class LoopControl:
    is_last_command_processed = False


def on_connect(client, userdata, flags, rc):
    print("Result from connect: {}".format(
        mqtt.connack_string(rc)))
    # Check whether the result form connect is the CONNACK_ACCEPTED connack code
    if rc == mqtt.CONNACK_ACCEPTED:
        # Subscribe to the commands topic filter
        client.subscribe(topic, qos=2)


def on_message(client, userdata, msg):
    print("Received message payload: {0}".format(str(msg.payload)))
    command_name = build_command_message(msg.payload)
    topic = msg.topic
    print('Hello from Python broker')
    print('the topic is: ', topic)
    publish_command(client, command_name, topic)


def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed with QoS: {}".format(granted_qos[0]))


def build_command_message(commad_message):
    command_build = json.loads(commad_message)

    return command_build


def publish_command(client, command_name, topic):
    command_message = build_command_message(
        command_name)
    result = client.publish(topic=topic,
                            payload=command_message, qos=2)
    client.loop()
    time.sleep(1)
    return result

if __name__ == "__main__":
    client = mqtt.Client(protocol=mqtt.MQTTv311)
    client.on_connect = on_connect
    client.on_subscribe = on_subscribe
    client.on_message = on_message
    client.connect(host='localhost', port=1883, keepalive=10)


    while LoopControl.is_last_command_processed == False:
        # Process messages and the commands every 500 milliseconds
        client.loop()
        time.sleep(0.5)
    client.disconnect()
    client.loop()
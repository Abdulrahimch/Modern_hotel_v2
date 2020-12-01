FROM python:3.7-alpine

COPY ./requirements.txt /requirements.txt

RUN pip install -r /requirements.txt

COPY ./mqtt_broker.py /mqtt_broker.py

EXPOSE 1883

CMD  python3 mqtt_broker.py


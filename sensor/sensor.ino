// IR SENSOR need 5V - Gnd - A0(as digital input)
// CONNECTIONS
// 1 : Blanc
// 2 : Violet
// 3 : Vert

const int sensorIN = A0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(sensorIN, INPUT);
}

void loop() {
  Serial.write(digitalRead(sensorIN));
  delay(100);
}

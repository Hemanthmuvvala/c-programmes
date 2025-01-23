// LED pins connected to digital pins
int led = 11;
int led1 = 10;
int led2 = 9;
int led3 = 6;
int led4 = 5;
int ldr = A2; // LDR pin connected to analog pin "A2"
int x1 = 0, x2 = 0, x3 = 0, x4 = 0, x5 = 0;

void setup() {
  Serial.begin(9600);

  // Initialize LED pins as outputs
  pinMode(led, OUTPUT);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);

  // Initialize IR sensor pins as inputs
  pinMode(2, INPUT);
  pinMode(4, INPUT);
  pinMode(7, INPUT);
  pinMode(8, INPUT);

  // Initialize LDR pin as input
  pinMode(ldr, INPUT);
}

void loop() {
  int ldrStatus = analogRead(ldr); // Read LDR output value
  Serial.println(ldrStatus);
  delay(100); // Slight delay to avoid Serial Monitor flooding

  if (ldrStatus <= 100) { // If it's dark
    // IR Sensor 1 CODE
    if (digitalRead(2) == LOW) { // If IR Sensor 1 detects an object
      x1 = 0;
      x2 = 1;
      digitalWrite(led, HIGH);
      digitalWrite(led1, HIGH);
      delay(100); // 100 ms delay
    } else {
      if (x1 == 0) {
        digitalWrite(led, HIGH);
        analogWrite(led, 42); // Dim the LED to 42 brightness
        delay(50);
      }
      if (x2 == 1) {
        digitalWrite(led1, HIGH);
        analogWrite(led1, 42);
        delay(50);
      }
    }

    // IR Sensor 2 CODE
    if (digitalRead(4) == LOW) { // If IR Sensor 2 detects an object
      x2 = 0;
      x3 = 1;
      digitalWrite(led1, HIGH);
      digitalWrite(led2, HIGH);
      delay(100); // 100 ms delay
    } else {
      if (x2 == 0) {
        digitalWrite(led1, HIGH);
        analogWrite(led1, 42);
        delay(50);
      }
      if (x3 == 1) {
        digitalWrite(led2, HIGH);
        analogWrite(led2, 42);
        delay(50);
      }
    }

    // IR Sensor 3 CODE
    if (digitalRead(7) == LOW) { // If IR Sensor 3 detects an object
      x3 = 0;
      x4 = 1;
      digitalWrite(led2, HIGH);
      digitalWrite(led3, HIGH);
      delay(100); // 100 ms delay
    } else {
      if (x3 == 0) {
        digitalWrite(led2, HIGH);
        analogWrite(led2, 42);
        delay(50);
      }
      if (x4 == 1) {
        digitalWrite(led3, HIGH);
        analogWrite(led3, 42);
        delay(50);
      }
    }

    // IR Sensor 4 CODE
    if (digitalRead(8) == LOW) { // If IR Sensor 4 detects an object
      x4 = 0;
      x5 = 1;
      digitalWrite(led3, HIGH);
      digitalWrite(led4, HIGH);
      delay(100); // 100 ms delay
    } else {
      if (x4 == 0) {
        digitalWrite(led3, HIGH);
        analogWrite(led3, 42);
        delay(50);
      }
      if (x5 == 1) {
        digitalWrite(led4, HIGH);
        analogWrite(led4, 42);
        delay(50);
      }
    }
  } else { // If it's bright
    // Turn off all LEDs
    digitalWrite(led, LOW);
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
    digitalWrite(led3, LOW);
    digitalWrite(led4, LOW);
  }
}

// LED pins connected to digital pins
int led = 11;
int led1 = 10;
int led2 = 9;
int led3 = 6;
int led4 = 5;
int ldr = A2; // LDR pin connected to analog pin "A2"

// IR sensor pins
int ir1 = 2;
int ir2 = 4;
int ir3 = 7;
int ir4 = 8;

void setup() {
  Serial.begin(9600);
  
  // Initialize LED pins as outputs
  pinMode(led, OUTPUT);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  
  // Initialize LDR and IR sensor pins
  pinMode(ldr, INPUT);
  pinMode(ir1, INPUT);
  pinMode(ir2, INPUT);
  pinMode(ir3, INPUT);
  pinMode(ir4, INPUT);
}

void loop() {
  int ldrStatus = analogRead(ldr); // Read LDR output value
  Serial.println(ldrStatus);
  delay(100);

  if (ldrStatus <= 100) { // If it's dark
    // Check if any IR sensor detects motion
    bool motionDetected = (digitalRead(ir1) == 0 || digitalRead(ir2) == 0 || digitalRead(ir3) == 0 || digitalRead(ir4) == 0);

    if (motionDetected) {
      // Turn all LEDs to full brightness
      digitalWrite(led, HIGH);
      digitalWrite(led1, HIGH);
      digitalWrite(led2, HIGH);
      digitalWrite(led3, HIGH);
      digitalWrite(led4, HIGH);
    } else {
      // Dim all LEDs when no motion is detected
      analogWrite(led, 42);  // Dim LED
      analogWrite(led1, 42);
      analogWrite(led2, 42);
      analogWrite(led3, 42);
      analogWrite(led4, 42);
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

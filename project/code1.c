// Pin Definitions
const int ledPins[] = {11, 10, 9, 6, 5}; // LED pins
const int irPins[] = {2, 4, 7, 8};       // IR sensor pins
const int ldrPin = A2;                   // LDR pin

// Variables to track LED states
int x[5] = {0, 0, 0, 0, 0};  // Track LED states (off=0, on=1)

// Setup function
void setup() {
  Serial.begin(9600);

  // Initialize LED pins as outputs
  for (int i = 0; i < 5; i++) {
    pinMode(ledPins[i], OUTPUT);
  }

  // Initialize IR sensor pins as inputs
  for (int i = 0; i < 4; i++) {
    pinMode(irPins[i], INPUT);
  }

  // Initialize LDR pin as input
  pinMode(ldrPin, INPUT);
}

// Helper function to handle the LED control based on IR sensor and state
void controlLEDs(int sensorIndex) {
  int led1 = sensorIndex;
  int led2 = sensorIndex + 1;
  
  // If IR sensor detects an object (sensor reads LOW)
  if (digitalRead(irPins[sensorIndex]) == 0) {
    x[led1] = 0;
    x[led2] = 1;
    digitalWrite(ledPins[led1], HIGH);
    digitalWrite(ledPins[led2], HIGH);
    delay(100); // 100 ms delay to simulate the quick activation
  }
  // If IR sensor does not detect an object
  else {
    if (x[led1] == 0) {
      digitalWrite(ledPins[led1], HIGH);
      analogWrite(ledPins[led1], 255 / 6); // Dim the LED to 42 brightness
      delay(50); // Small delay for a smooth dimming effect
    }
    if (x[led2] == 1) {
      digitalWrite(ledPins[led2], HIGH);
      analogWrite(ledPins[led2], 255 / 6);
      delay(50);
    }
  }
}

// Main loop
void loop() {
  int ldrStatus = analogRead(ldrPin); // Read LDR value
  Serial.println(ldrStatus);
  delay(1);  // Small delay to ensure stable readings

  if (ldrStatus <= 100) {  // If it's dark
    // Process each IR sensor
    for (int i = 0; i < 4; i++) {
      controlLEDs(i);  // Control LEDs based on the sensor index
    }
  } 
  else {  // If it's bright, turn off all LEDs
    for (int i = 0; i < 5; i++) {
      digitalWrite(ledPins[i], LOW);
    }
  }
}

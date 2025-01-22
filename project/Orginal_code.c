Log in

Sign up
You said:
/* Smart Street Light System 
   using IR Sensor, LDR and Arduino
   www.Electroduino.com */
// LED positive pin connected to Digital pins
int led = 11;
int led1 = 10;
int led2 = 9;
int led3 = 6;
int led4 = 5;
int ldr = A2; // LDR pin connected to Analog pin "A2"
int x1, x2, x3, x4,x5;

void setup()
{
 Serial.begin (9600);
 // initialize LED pins as an output
 pinMode (led,OUTPUT);
 pinMode (led1,OUTPUT);
 pinMode (led2,OUTPUT);
 pinMode (led3,OUTPUT);
 pinMode (led4,OUTPUT);
 // initialize LED Pin as an input
 pinMode (ldr,INPUT);
}
void loop()
{
 int ldrStatus = analogRead (ldr); // Read LDR output value
 Serial.println (ldrStatus);
 delay(1);
 if (ldrStatus <=100)
  {
// IR  Sensor 1 CODE
//*******************    
   if (digitalRead(2)== 0) // Read IR Senso 1 value
    {
     x1=0;
     x2=1;
     digitalWrite(led,HIGH);
     digitalWrite(led1,HIGH);
     delay(100);// micro second
    }
   else
    {
     if(x1==0)
      {
       digitalWrite(led,HIGH);
       analogWrite(led,255/6);
       delay(50);
      }
     if(x2==1)
      {
       digitalWrite(led1,HIGH);
       analogWrite(led1,255/6);
       delay(50);
      }
    }
// IR  Sensor 2 CODE
//*******************
   if (digitalRead(4)== 0) // Read IR Senso 2 value
    {
     x2=0;
     x3=1;
     digitalWrite(led1,HIGH);
     digitalWrite(led2,HIGH);
     delay(100);// micro second
    }
   else
    {
     if(x2==0)
      {
       digitalWrite(led1,HIGH);
       analogWrite(led1,255/6);
       delay(50);
      }
     if(x3==1)
      {
       digitalWrite(led2,HIGH);
       analogWrite(led2,255/6);
       delay(50);
      }
    }
 // IR  Sensor 3 CODE
//*******************
   if (digitalRead(7)== 0)// Read IR Senso 3 value
    {
     x3=0;
     x4=1;
     digitalWrite(led2,HIGH);
     digitalWrite(led3,HIGH);
     delay(100);// micro second
    }
   else
    {
     if(x3==0)
      {
       digitalWrite(led2,HIGH);
       analogWrite(led2,255/6);
       delay(50);
      }
     if(x4==1)
      {
       digitalWrite(led3,HIGH);
       analogWrite(led3,255/6);
       delay(50);
      }
    }
 // IR  Sensor 4 CODE
//*******************
   if (digitalRead(8)== 0) // Read IR Senso 4 value
    {
     x4=0;
     x5=1;
     digitalWrite(led3,HIGH);
     digitalWrite(led4,HIGH);
     delay(100);// micro second
    }
   else
    {
     if(x4==0)
      {
       digitalWrite(led3,HIGH);
       analogWrite(led3,255/6);
       delay(50);
      }
     if(x5==1)
      {
       digitalWrite(led4,HIGH);
       analogWrite(led4,255/6);
       delay(50);
      }
     }
  }
 else
 {
  digitalWrite(led, LOW);
  digitalWrite(led1, LOW);
  digitalWrite(led2, LOW);
  digitalWrite(led3, LOW);
  digitalWrite(led4, LOW);
  }
 }what might be the output of the code

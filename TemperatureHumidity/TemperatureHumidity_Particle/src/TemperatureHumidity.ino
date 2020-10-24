/*
 * Project TemperatureHumidity
 * Description: Simple Project to get the Temperature and Humidity using Grove sensor
 * Author: Varun Nandyal
 * Date: 10/24/2020
 */

#include "Grove_Temperature_And_Humidity_Sensor.h"

DHT dht(D2);

float temp, humidity;
double temp_dbl, humidity_dbl;

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  Serial.begin(9600);

  dht.begin();

  Particle.variable("temp", temp_dbl);
  Particle.variable("humidity", humidity_dbl);
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  // The core of your code will likely live here.
  float temp, humidity;

  temp = dht.getTempFarenheit();
  humidity = dht.getHumidity();

  temp_dbl = temp;
  humidity_dbl = humidity;

  delay(1000);
}
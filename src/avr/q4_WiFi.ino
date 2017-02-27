/*
 * tsarkisan: Q4 Capstone
 * Base version of aRest API
 * Lyckades få gamla Arduino Wifi-skölden arbetar med Mega 2560
*/

#include <SPI.h>
#include <WiFi.h>
#include <aREST.h>

#define LISTEN_PORT 80

char ssid[] = "TheRelm"; 
char pass[] = "9784653696";   
int keyIndex = 0;

int status = WL_IDLE_STATUS;

// Create aREST instance
aREST rest = aREST();

// Initialize the WiFi server library
WiFiServer server(LISTEN_PORT);

// Variables to be exposed to the API
int temperature;
int humidity;
float ph;
float ec;


void setup() {

  // Start Serial
  Serial.begin(115200);

  // Init variabler och utsätt dem till REST API
  temperature = 24;
  humidity = 40;
  ph = 7.80;
  ec = 400.00;
  
  // Skapa REST variabler: Det första argumentet är url rop 
  rest.variable("temperature",&temperature);
  rest.variable("humidity",&humidity);
  rest.variable("PH", &ph);
  rest.variable("EC", &ec);
  

  rest.function("led",ledControl);

  // Give name and ID to device (ID should be 6 characters long)
  rest.set_id("008");
  rest.set_name("mega_h2O");

  // Function to be exposed
  rest.function("led",ledControl);

  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if ( fv != "1.1.0" )
    Serial.println("Please upgrade the firmware");

  // Attempt to connect to Wifi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // Wait 10 seconds for connection
    delay(10000);
  }

  // Start the server
  server.begin();

  // Print out the status
  printWifiStatus();
}


void loop() {

  // listen for incoming clients
  WiFiClient client = server.available();
  rest.handle(client);

}

// Custom function accessible by the API
int ledControl(String command) {

  // Get state from command
  int state = command.toInt();

  digitalWrite(13,state);
  return 1;
}

void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}


---
layout: default
title: Firmware
has_children: true
permalink: firmware
nav_order: 3
font_awesome: "fas fa-microchip"
---


# <i class="{{ page.font_awesome }}"></i> {{ page.title }}
{: .no_toc }


An object-oriented approach to doing pressure control. Hopefully things are modular and can be swapped in an out for different controllers and valve setups.


## Dependencies

### Hardware
- An arduino-compatible microcontroller (confirmed working on Arduino Mega and Teensy 3.5)

### Software
- Various Arduino Libraries
    - [EEPROMAnything Library](https://github.com/collin80/EEPROMAnything) by collin80
    - [Button Library](https://github.com/madleech/Button) by madleech
    - [LiquidCrystal_I2C](https://github.com/fdebrabander/Arduino-LiquidCrystal-I2C-library) by fdebrabander
    - [EasyLCD Library](https://github.com/cbteeple/EasyLCD) by cbteeple (that's me!)
    
## Installation
[Download the Firmware / Python Interface](https://github.com/cbteeple/pressure_controller){: .btn .btn-primary}

## Usage
### Settings Locations
- Firmware is located in "**_pressure_control_firmware_**"
- Harware configurations are located in the "**_config_**" folder
- Sensor configurations are located in the "**_config/sensors_**" folder 


### Install the Firmware on an MCU
1. Open the firmware in the Arduino IDE.
2. Choose a configuration file (in the "**config**" folder), where you set the # of valves, pins, etc.
3. Change the number of valves in "**allSettings.h**" in the "**trajectories**" class _(sorry, this is suboptimal and will be fixed eventually)_
4. Choose what type of communication you want to use
    - Arduino Mega: It's only capable of serial (no need to change any settings)
    - Teensy 3.x: You can select between serial vs. native USB (HID). Do this in the Arduino IDE's "**Tools**" >> "**USB Type**" menu.
5. Flash the firmware to your microcontroller (confirmed working on Arduino Mega and Teensy 3.5)




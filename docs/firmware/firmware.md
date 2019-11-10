---
layout: default
title: Firmware
has_children: true
permalink: firmware
nav_order: 3
font_awesome: "fas fa-microchip"
---


# <i class="{{ page.font_awesome }}"></i> How to use this package
{: .no_toc }


## Settings Locations
- Firmware is located in "**_pressure_control_firmware_**"
- Harware configurations are located in the "**_config_**" folder
- Sensor configurations are located in the "**_config/sensors_**" folder 


## Install the Firmware on an MCU
1. Open the firmware in the Arduino IDE.
2. Choose a configuration file (in the "**config**" folder), where you set the # of valves, pins, etc.
3. Change the number of valves in "**allSettings.h**" in the "**trajectories**" class _(sorry, this is suboptimal and will be fixed eventually)_
4. Flash the firmware to your microcontroller (confirmed working on Arduino Mega and Teensy 3.5)




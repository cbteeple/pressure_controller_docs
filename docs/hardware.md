---
layout: default
title: Hardware
permalink: /hardware
nav_order: 2
font_awesome: "fas fa-tools"
---

# <i class="{{ page.font_awesome }}"></i> {{ page.title }}
{: .no_toc }


## Subsystems
{: .no_toc }

1. TOC
{:toc}

---


## Valves

For smooth pressure control, I chose the [EFB-1DV-24-L](https://www.clippard.com/part/EFB-1DV-24-L) proportional fill/bleed valve assembly from Clippard Minimatic. Each valve in the pair can handle high flows at reasonable operating pressures (100 liters/min at 50 PSI). They run at 24 V, but can only handle 60 PSI of back-pressure before they crack.


For the input shutoff valve, I chose to use the [E215E-2C024](https://www.clippard.com/part/E215E-2C024) 2-way Valve from Clippard. The valve can withstand high back-pressure with reasonable flow rates (150 PSI with 70 L/min). These also run at 24 V.

To drive all the valves, I am using one mosfet per valve as switches. The valves are then modulated in a smooth way using pulse width modulation (PWM).


<img alt="I use the EFB-1DV-24-L proportional fill/bleed valve pair for smooth pressure control"
     src="https://www.clippard.com/static/images/cache/c9/c924a28f45d860109d2f34f2be4c404a828404bf-900.jpg"
     class="gallery gallery-80" >
<img alt="I use the E215E-2C024 2-way valves for the input shutoff valve"
     src="https://www.clippard.com/static/images/cache/ec/ec3d6db01f234367b91b9c4bf862776762acf738-900.jpg"
     class="gallery gallery-20" >



## Sensors
### Main Control Sensors
The pressure control system features 10 channels, requiring 10 pressure sensors, each of which needs to be capable of measuring pressure up to ~ 35 PSI, and vacuum down to -14.5 PSI (full vacuum).

After a lot of searching I found the [Honeywell SSCSNBN030PDAC5](https://www.digikey.com/products/en?keywords=480-5507-ND) differential pressure sensor. This sensor measures ±30 PSI over a voltage range of 0.25 V ~ 4.25 V, and we can extend the top end of the range slightly since we can measure up to 5 volts (the accuracy just gets worse as we move past the top of the measurement voltage range). The sensor is abundant and inexpensive at the time of writing, but has a **HUGE** footprint on a PCB.

### Input Shutoff Sensor
An addition to the pressure control system in v3.4 is an input shutoff valve for the high-pressure line. The main control valves can only take ~ 60 PSI of back pressure before they break, so we need to prevent anything higher from being supplied. The input shutoff utilizes a positive-pressure sensor to measure the input pressure and shut off the flow if it gets too high.

For this, I chose the [Honeywell SSCDANN150PGAA5](https://www.digikey.com/products/en?keywords=480-5203-ND) vented gauge pressure sensor. It can measure up to 150 PSI (more than we should ever be supplying), and has the typical 0.5 V - 4.5 V output range.


## Microcontroller
I used the [Teensy 3.5](https://www.pjrc.com/store/teensy35.html) MCU because it's 32 bits with a built-in floating point unit for super fast floating point math (good for real-time control). It also has enough pins 


## Custom Printed Circuit Board
I built a custom circuit PCB to breakout signals to my various sensors and solenoid drivers. 

### General Design
This board is designed to be relatively space-efficient while still being modular. It also has everything set up to break out every signal from the Teensy 3.5 to potentially be used later if necessary. This results in a relatively large board, but it was fairly cheap to get it fabricated by [OSH Park](https://oshpark.com/shared_projects/FJrbEXym).


<img alt="Top view of the PCB"
     src="{{ "assets/img/board_rev3-4_top.png" | absolute_url }}"
     class="gallery gallery-50" />
<img alt="Bottom view of the PCB"
     src="{{ "assets/img/board_rev3-4_bot.png" | absolute_url }}"
     class="gallery gallery-50" />

![The populated PCB]({{ "assets/img/board_rev3-4_populated.jpg" | absolute_url }})


### Electrical Components

All of the electronic components used on this board can be found on [Digikey](https://www.digikey.com/). 

[<i class="fas fa-file-excel"></i> Download Electronics BOM]( {{ "assets/files/Ctrl-P_Electronics.xls" | absolute_url }} ){: .btn .btn-green}


| Part Description                                           | Digikey P/N         | Qty  | Price Each |
|:-----------------------------------------------------------|:--------------------|:----:|-----------:|
| **Motor Drivers**                                          |                     |      |            |
| Power Barrel Connector Jack 2.10mm ID, 5.50mm OD           | CP-059AH-ND         | 1    | $0.89      |
| Slide Switch SPDT Through Hole                             | 679-1877-ND         | 1    | $4.39      |
| N-Channel 40V 450mA (Ta) 1W (Tc) Through Hole TO-92-3      | TN0104N3-G-ND       | 20   | $0.90      |
|                                                            |                     |      |            |
| **MCU Power**                                              |                     |      |            |
| Teensy 3.5 32-Bit MCU Eval Board                           | 1568-1443-ND        | 1    | $26.25     |
| DC-to-DC Converter, Input 8V - 36V, Output 5V 1A           | 102-5018-ND         | 1    | $2.96      |
| Green 572nm LED Indication - Discrete 2.1V 1206            | 516-3233-1-ND       | 1    | $0.53      |
| 150 Ohms ±1% 0.125W, 1/8W Chip Resistor 0805               | RHM150AHCT-ND       | 1    | $0.17      |
| 4.7 kOhms ±1% 0.125W, 1/8W Chip Resistor 0805              | 311-4.70KCRCT-ND    | 2    | $0.10      |
|                                                            |                     |      |            |
| **Sensors**                                                |                     |      |            |
| Pressure Sensor ±30PSI Differential, 0.25 V ~ 4.25 V 4-SIP | 480-5507-ND         | 10   | $27.50     |
| Pressure Sensor 150PSI Vented Gauge, 0.5 V ~ 4.5 V 8-DIP   | 480-5203-ND         | 1    | $23.82     |
| 10 kOhms ±0.1% 0.25W, 1/4W Chip Resistor 0805              | P20708CT-ND         | 11   | $0.30      |
| 20 kOhms ±0.1% 0.25W, 1/4W Chip Resistor 0805              | P20740CT-ND         | 11   | $0.30      |
|                                                            |                     |      |            |
| **Connectors**                                             |                     |      |            |
| Through Hole 2 pin 0.100" (2.54mm)                         | WM4800-ND	           | 2    | $0.84      |
| Receptacle 2 pin 0.100" (2.54mm)                           | WM2900-ND           | 2    | $0.27      |
| Through Hole 3 pin 0.100" (2.54mm)                         | WM4801-ND           | 10   | $0.80      |
| Receptacle 3 pin 0.100" (2.54mm)                           | WM2901-ND           | 10   | $0.23      |
| Tactile Button                                             | CKN9085CT-ND        | 3    | $0.31      |
|                                                            |                     |      |            |
| **Pin Headers (For Teensy)**                               |                     |      |            |
| Surface Mount 6 pins (2x3) 0.100" (2.54mm)                 | 609-5381-1-ND       | 1    | $0.35      |
| Surface Mount 8 pins (2x4) 0.100" (2.54mm)                 | A121623-ND          | 1    | $0.46      |
| Surface Mount 10 pins (2x5) 0.100" (2.54mm)                | 609-5381-1-ND       | 1    | $0.50      |
| Through Hole 24 pins (1x24) 0.100" (2.54mm)                | S1012E-24-ND        | 4    | $1.28      |
|                                                            |                     |      |            |
| **Pin Headers (For Board)**                                |                     |      |            |
| Through Hole 12 pins (2x6) 0.100" (2.54mm)                 | S2012E-06-ND        | 1    | $0.60      |
| Through Hole 6 socket (2x3) 0.100" (2.54mm)                | S7106-ND            | 1    | $0.62      |
| Through Hole 10 socket (2x5) 0.100" (2.54mm)               | S7108-ND            | 1    | $0.71      |
| Through Hole 2 socket (1x3) 0.100" (2.54mm)                | S7000-ND            | 1    | $0.32      |
| Through Hole 3 socket (1x3) 0.100" (2.54mm)                | S7036-ND            | 1    | $0.37      |
| Through Hole 4 socket (1x4) 0.100" (2.54mm)                | S7002-ND            | 1    | $0.45      |
| Through Hole 5 socket (1x5) 0.100" (2.54mm)                | S6103-ND            | 1    | $0.47      |
| Through Hole 24 socket (1x24) 0.100" (2.54mm)              | S7057-ND            | 2    | $1.00      |
| 2-pin Jumper                                               | S9001-ND            | 11   | $0.10      |
| Crimp pins                                                 | WM2512-ND‎           | Lots | $0.09      |
| Crip sockets                                               | ‎WM2517CT-ND‎         | Lots | $0.06      |


## Mounting Components

### Store-Bought Components
All of the mounting components used on this board can be found on [McMaster-Carr](https://www.mcmaster.com/). 

[<i class="fas fa-file-excel"></i> Download Mounting BOM]( {{ "assets/files/Ctrl-P_Mounting.xls" | absolute_url }} ){: .btn .btn-green}


| Part Description                                           | McMaster P/N         | Qty  | Package | Price Each |
|:-----------------------------------------------------------|:--------------------|:----:|:----|-----------:|
| Narrow Head Slotted Screws, Plastic, M3 , 16mm Long               | 96295A711 | 1  | Pack of 100 each | 9.63   |
| Narrow Head Slotted Screws, Plastic, M3 , 20mm Long               | 96295A712 | 1  | Pack of 100 each | $9.69  |
| Nylon Unthreaded Spacer 6 mm OD, 2 mm Long, for M3 Screw Size     | 93657A001 | 12 | Each             | $1.07  |
| Nylon Plastic Washer for M3 Screw Size, 3.2 mm ID, 8 mm OD, Black | 95610A530 | 1  | Pack of 100 each | $3.60  |
| Nylon Unthreaded Spacer 4.5 mm OD, 1 mm Long                      | 93657A501 | 6  | Each             | $1.46  |
| Aluminum Female Threaded Hex Standoff 40mm Long, M3               | 95947A500 | 4  | Each             | $1.76  |
| Aluminum Male-Female Threaded Hex Standoff 40mm Long, M3          | 98952A401 | 4  | Each             | $2.97  |
| Aluminum Male-Female Threaded Hex Standoff 20mm Long, M3          | 98952A118 | 4  | Each             | $1.90  |
| Aluminum Female Threaded Hex Standoff 20mm Long, M3               | 95947A016 | 4  | Each             | $0.91  |
| Nylon Hex Nut M3 x 0.5 mm Thread, Black                           | 93800A400 | 1  | Pack of 100 each | $13.82 |

### Custom-Made Components
In addition, I laser-cut a flat frame to place everything together in a neat package. 

[<i class="fas fa-file-alt"></i> Download the DXF - Coming Soon]( {{ "assets/files/Ctrl-P_Mounting.xls" | absolute_url }} ){: .btn .btn-purple}


## Issues
There are many issues (both anticipated and unanticipated) with the current PCB Design (v3.4).

Major
{: .label .label-red}

- Pressure sensors coming off both sides cause mounting and soldering issues.
	- makes the board hard to solder (end up soldering underneath other sensors)
	- makes the board hard to mount (needs 40mm standoffs)
- Onboard 5V regulator can't handle spikes in current
	- If you turn on the 24V input switch, turn it off, and turn it on again, the 5V regulator will burn itself up.
	- I just had to removed it, so the Teensy is can ONLY be powered through the USB port.
- Mounting holes are crowded and not shielded
	- I placed components too close to the mounting holes
	- It's hard to get bolts thought the holes without shorting components, so I ended up using plastic screws (bad solution)

Minor
{: .label .label-yellow}

- Extra headers for overriding onboard pressure sensors don't fit
	- headers are poorly placed - interfere with sensor seating and mounting
	- Headers are hacky
- "Robot" and "Ext" headers don't fit the Molex connectors they were designed for.
	- I just mis-calculated the width of these connectors
- USB port for teensy isn't supported and has poor placement
	- the USB cord just hangs off the teensy board in the middle of the main board
	- usb cord also covers the power switch.

---
layout: default
title: Setup
has_children: false
permalink: setup
nav_order: 2
font_awesome: "fas fa-cog"
---


# <i class="{{ page.font_awesome }}"></i> {{ page.title }}


An object-oriented approach to doing pressure control. Hopefully things are modular and can be swapped in an out for different controllers and valve setups.

## Dependencies

### Hardware
- An arduino-compatible microcontroller (confirmed working on Arduino Mega and Teensy 3.5)

### Firmware
 - [EEPROMAnything Library](https://github.com/collin80/EEPROMAnything) by collin80
 - [Button Library](https://github.com/madleech/Button) by madleech
 - [EasyLCD Library](https://github.com/cbteeple/EasyLCD) by cbteeple (that's me!)
   - [LiquidCrystal_I2C](https://github.com/fdebrabander/Arduino-LiquidCrystal-I2C-library) by fdebrabander
   
### Control Application
- Various python libraries:
	- [scipy](https://www.scipy.org/) (`pip install scipy`)
	- [numpy](https://www.numpy.org/) (`pip install numpy`)
	- [numbers](https://docs.python.org/2/library/numbers.html) (`pip install numbers`)
	- [matplotlib](https://matplotlib.org/) (`pip install matplotlib`)
	- [pynput](https://pypi.org/project/pynput/) (`pip install pynput`)
	- [yaml](https://pyyaml.org/wiki/PyYAMLDocumentation) (`pip install pyyaml`)

## Installation

[pressure_controller repo](https://github.com/cbteeple/pressure_controller){: .btn}

Just clone or download the repo.


## Usage

### Firmware

Use the Arduino IDE

See the [Firmware](firmware) Page


### Top-Level Python Control

Run python scripts in a terminal (linux/mac) or [through an IDE](/top-level/python-tips) (windows)

See the [Python Interface](top-level) Page

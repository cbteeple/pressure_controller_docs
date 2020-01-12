---
layout: default
title: Firmware Interface
parent: Firmware
permalink: /firmware/firmware_interface
nav_order: 1
---

# {{ page.title }}



1. TOC
{:toc}

---

## Safety Features

### Pressure Runaway Watchdog
Looks at the pressure in all of the currently active channels, and immediately vents all channels if any channel goes above a configurable maximum. Things can get damaged if the pressure were to accidentally reach too high, so this always runs.
To set the maximum pressures:
 1. "**MAXP;[some value]**" - Set the pressure where the watchdog should trigger.


### Setpoint Guarding
When in pressure control mode (*mode 1*), the setpoint is only allowed between some upper and lower bound
 1. "**MAXP;[some value]**" - Maximum pressure, same as the watchdog pressure. We don't allow pressure to be commanded higher than this
 2. "**MINP;[some value]**" - Minimum pressure. Don't allow pressures to be set smaller than this.


## Basic Operation
If someone has configured and flashed this firmware to an arduino for you to use, this is where you should read. 

### System startup
Upon powering on the system, you should send the following commands to resume from where you left off last time:

 1. "**LOAD**". This loads the PID controller settings that were configured for you. (This is automatically executed on startup)
 2. "**SET;0;0**". This ensures all channels are set to 0psi immediately before starting.
 3. "**MODE;3**". This ensures you are in "pressure control +ramp" mode

### Decide what you want to see
Now you can choose whether you want to see the live pressure output or not
 1. "**ON**". This turns on the live pressure output
 2. "**OFF**". This turns off the live pressure output
 3. "**TIME; 100**" This will set the output time to 100 ms (10 HZ). Feel free ro set this however fast you want it.

### Set pressures and go!
Now you can set pressures and the controller will take you there. It's as simple as that!
 1. "**SET;#1;#2**". This ramps to the desired pressure (**#2**) for all channels in **#1** seconds.
 2. "**SET;#1;#2;#3;...;#N+1**". This sets the desired pressure separately for each channel (assuming you have N channels), and ramps to that pressure over **#1** seconds..

### Saving incoming data 
If you want to save the measured pressure, you need to intercept the incoming serial stream. In addition, you need to filter out all of the command echos that happen every time you send a command (like a new setpoint).

#### The simple way - copy & paste
The simple (but cumbersome) way to do this is just to use a serial material (like Arduino's serial monitor baked into their IDE). 

 1. Turn on the data stream with the "**ON**" command
 2. Do your tests
 3. Turn the stream off with the "**OFF**" command.
 4. Copy and paste all of the incoming data into a spreadsheet or text file to save and use later.
 5. *Don't forget to delete all of the rows with commands in them* (you'll have to hunt for them).

#### The slick way - directly intercept the incoming stream
If you can set up a direct interface to the incoming serial line with MATLAB or python, this is much nicer. Now you can automatically save all the data, and you can filter out command echos. **Command echos ALWAYS start with an underscore ("_") character.** This makes it easy to set up a quick if-statement to check if the first character in the incoming line of data is an underscore.

## Configuring the Firmware
This is where to read if you are setting up this system to be used.

### We use configuration files in the "config" folder :
Things to change depending on your hardware:
 1. Number of channels (`MAX_NUM_CHANNELS`)
 2. Sensor type (set `SENSOR_ANALOG` and `SENSOR_I2C` true or false depending on the type you are using.)
 3. Control type (set the types true or false depending on which one you want to use).
 4. Valve pins (set the pairs of pins to use as "channels")
 5. i2c addresses (if using i2c sensors)
 6. Default controller settings

NOTE: you might also need to change the number of channels in the "traj" class, since I haven't found a nice way to make that depend on the config file yet.

## Configuring the PID gains
You can pretty much just use the <a href="https://en.wikipedia.org/wiki/PID_controller#Ziegler%E2%80%93Nichols_method" target="_blank">Ziegler-Nichols</a> method verbatim.

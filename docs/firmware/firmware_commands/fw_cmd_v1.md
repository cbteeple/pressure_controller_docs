---
layout: default
title: Command Spec (v1.0)
parent: Firmware Commands
grand_parent: Firmware
permalink: /firmware/firmware_commands/fw_cmd_v1
nav_order: 2
---

# {{ page.title }}


1. TOC
{:toc}

---


## Basic Commands

|Command|Arguments|Description
|--|--|--
|ECHO| [#]| Set whether commands are echoed (`bool`)
|||0 = Off - No commands are echoed back (silent mode)
|||1 = On - commands are echoed back on the serial line. Command echos are always preceded by an underscore
|ON| [none] | Start the live pressure output
|OFF| [none] | Stop the live pressure output
|LOAD| [none]| Load settings from onboard storage
|SAVE| [none]| Save settings to onboard storage
|MODE| [#]| Set the control mode (`bool`)
|||0 = direct control of valve states
|||1 = pressure control using PID and sensors)
|||2 = pressure trajectory following
|TIME| [#] | Set the desired loop time for measurement outputs (in ms) (`int`)


## Control Channels

|Command|Arguments|Description
|--|--|--
|CHAN| [#] | Set all channels active or inactive (`bool`)
||| 0 = inactive
||| 1 = active
|| [#0;#1;...;#N-1] | Set individual channels active *. Replace "#" with either 1 or 0 for on or off (`bool`).
|SET| [#] | Set the pressure setpoint of ALL pressure channels (`float`). *This setting is only used if MODE is set to 1.*
|| [#0;#1;...;#N-1] | Set the pressure setpoint of individual pressure channels* (`float`).
|VALVE| [#] | Set the valve states of ALL pressure channels (`float`, can be -1.0 &rarr; 1.0). *This setting is only used if MODE is set to 0.*
|||-1.0 = vent at full speed
|||0.0 = idle (both valves in the pair are closed)
|||1.0 = pressurize to full input pressure at full speed
|| [#0;#1;...;#N-1] | Set the valve state of individual channels* (`float`).


*When setting things for individual channels, the number of arguments must equal the number of channels.*


## Controller Settings

|Command|Arguments|Description
|--|--|--
|PID| [#0; #1; #2; #3] | Set the PID gains for one particular channel
||| #0 = Channel index (`int`, can be 0 &rarr; N-1)
||| #1 = Proportional gain (`float`)
||| #2 = Integral gain (`float`)
||| #3 = Derivative gain (`float`)
|WINDOW| [#]| Set the dead window for all channels. This is a window around the setpoint in which control is turned off. *Default is 0 (control always on)*
|| [#0;#1;...;#N-1]| Set the dead window for individual channels *.

*When setting things for individual channels, the number of arguments must equal the number of channels.*


## Run Trajectories

|Command|Arguments|Description
|--|--|--
|TRAJCONFIG| [#0; #1; #2] | Set the trajectory settings
||| #0 = Starting Index (`int`, can be 0 &rarr; max_length-1)
||| #1 = Trajectory Length (`int`)
||| #2 = Wrap the trajectory (`bool`)
|TRAJSET| [#0, #1, #2;...;#N+1]| Set the trajectory line by line
||| #0 = index (`int`, can be 0 &rarr; max_length-1)
||| #1 = time point (`float`)
||| #2;...;#N+1 = pressure setpoints for all channels (`float`)

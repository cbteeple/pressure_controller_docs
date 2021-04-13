---
layout: default
title: Firmware Commands
parent: Firmware
has_children: false
permalink: /firmware/firmware_commands
nav_order: 2
---

# {{ page.title }}


1. TOC
{:toc}

---

## Structure
Commands follow a simple "COMMAND+ARGUMENTS" structure, with the separator character being the semicolon.

Send the command followed by some number of arguments depending on the command. Always end the line with a "newline".

Examples:

- [**COMMAND**]**;**[**ARG_1**]**;**[**ARG_2**]**;**...**;**[**ARG_N**]
- **chan;1;0;0;1** -  turns on channels 0 and 3, and turns 1 and 2 off (assuming there are exactly 4 output channels)

To view the current settings of any of the parameters you can control, simply use the commands below, but omit any arguments you would normally put after the commands.

## Command Specification

A comprehensive set of command specifications can be found in the [pressure_control_interface](https://github.com/cbteeple/pressure_control_interface/tree/main/pressure_control_interface/utils/command_spec) package. This documentation expands on the functionality of each command.


### Basic Commands

|Command|Arguments|Description
|--|--|--
|ON| n/a | Start the live pressure output
|OFF| n/a | Stop the live pressure output
|LOAD| n/a| Load settings from onboard storage
|SAVE| n/a| Overwrite the current settings profile in onboard storage
|MODE| #1 `int (enum)`| Set the control mode
|||0 = direct control of valve states
|||1 = pressure control using PID and sensors)
|||2 = pressure trajectory following
|||3 = pressure control with ramp from current setpoint to new one
|ECHO| #1 `bool`| Set whether commands are echoed
|||0 = Off - No commands are echoed back (silent mode)
|||1 = On - commands are echoed back on the serial line. Command echos are always preceded by an underscore
|TIME|#1 `int`| Set the desired loop time for measurement outputs (in ms)
|UNITS| #1 `int (enum)`| Set the pressure units you want to use: `{0: psi, 1: kPa, 2: bar, 3:atm}`
|| [#1;#2] | Set the input and output units separately
||| #1 `int` = input units: used for setting setpoints and loading trajectories
||| #2 `int` = output units: used for displaying data
|CURRTIME| #1 `int` | Set the current display time on the controller (in ms). Typically used to synchronize with other devices (i.e. set current time to zero when you start a trajectory)

_NOTE: Units are converted at the command/output level. Pressures are always internally represented in psi regaurdless of what the units are set to._

### Safety Settings

|Command|Arguments|Description
|--|--|--
|MAXP| #1 `float`| Set the maximum pressure allowed. Pressures are clipped if outside this range when using the "SET" command, but not when loaded as part of a trajectory. (_used for the pressure watchdog_)
|MINP| #1 `float`| Set the minimum pressure allowed. Pressures are clipped if outside this range when using the "SET" command, but not when loaded as part of a trajectory.
|MASTERP| #1 `bool`| use input pressure sensor for watchdog
|| [#1;#2] | 
||| #1 `bool` = use input pressure sensor for watchdog
||| #2 `bool` = pressure sensor data output on/off
|MASTERMAXP| [#1;#2]| Set the maximum pressure before the master watchdog triggers, as well as the 
||| #1 `float` = maximum pressure threshold
||| #2 `int` = minimum time above the threshold before watchdog triggers


### Control Channels

|Command|Arguments|Description
|--|--|--
|CHAN| #1 `bool` | Set all channels active or inactive
|| [#1;#2;...;#N] `list(bool)`| Set individual channels active *. Replace "#" with either 1 or 0 for on or off.
|SET| [#1;#2] | Set the pressure setpoint of ALL pressure channels. *This setting is only used if MODE is set to 1 or 3.*
||| #1 `float` = ramp time in seconds - _only used if MODE is set to 3_ 
||| #2 `float` = Setpoint
|| [#1;#2;...;#N;#N+1] `list(float)` | Set the pressure setpoint of individual pressure channels*.
||| #1 `float` = ramp time in seconds - _only used if MODE is set to 3_ 
||| #2;...;#N+1 `list(float)` = Setpoints for each channel 
|VALVE| #1 `float` | Set the valve states of ALL pressure channels (can be -1.0 &rarr; 1.0). *This setting is only used if MODE is set to 0.*
|||-1.0 = vent at full speed
|||0.0 = idle (both valves in the pair are closed)
|||1.0 = pressurize to full input pressure at full speed
|| [#0;#1;...;#N-1] `list(float)`| Set the valve state of individual channels* (`float`).


*When setting things for individual channels, the number of arguments must equal the number of channels.*


### Controller Settings

|Command|Arguments|Description
|--|--|--
|PID| [#1; #2; #3; #4] | Set the PID gains for one particular channel
||| #1 `int` = Channel index
||| #2 `float` = Proportional gain
||| #3 `float` = Integral gain
||| #4 `float` = Derivative gain
|WINDOW| #1 `float`| Set the dead window for all channels. This is a window around the setpoint in which control is turned off. *Default is 0 (control always on)*
|| [#0;#1;...;#N-1] `list(float)`| Set the dead window for individual channels *.
|INTSTART| #1 `float`| Set the window (in pressure space) around the setpoint in which the integrator works
|VOFFSET| [#1; #2; #3] | Set the PWM offset values for valves one particular channel
||| #1 `int` = Channel index
||| #2 `int` = Supply valve offset (can be 0 &rarr; 255)
||| #3 `int` = Vent valve offset (can be 0 &rarr; 255)

*When setting things for individual channels, the number of arguments must equal the number of channels.*


### Set Up Trajectories

|Command|Arguments|Description
|--|--|--
|TRAJCONFIG| [#1; #2; #3; #4] | Set the trajectory settings
||| #1 `int` = Prefix length
||| #2 `int` = Main trajectory length
||| #3 `int` = Suffix length
||| #4 `bool` = Run the suffix trajectory after stop
|TRAJWRAP| #1 `bool`| Wrap the trajectory (_Same functionality can be achieved using TRAJLOOP_)
|||0 = Off - trajectory excecutes once
|||1 = On - loop over and over until stopped
|TRAJLOOP| #1 `int`|  Number of times to loop
|||-1 = Loop Forever until the TRAJSTOP command is sent
|||0 = Skip the main loop
|||1,2,... = Do the main loop this many times
|TRAJSPEED| #1 `float`| Stretch the speed of the trajectory
|||1.0 - base speed
|||>1.0 - Faster than base speed
|||<1.0 - Slower than base speed (can never be 0; if 0 is sent, no changes are made)
|TRAJSET| [#1, #2, #3;...;#N+2]| Set the main trajectory line by line
||| #1 `int` = index (can be 0 &rarr; max_length-1)
||| #2 `float` = time point
||| #3;...;#N+2 `list(float)` = pressure setpoints for each channel, where the row is zero-padded if the number of inputs is less than the number of total channels
|PREFSET| [#1, #2, #3;...;#N+2]| Set the prefix trajectory line by line (works exactly like TRAJSET)
|SUFFSET| [#1, #2, #3;...;#N+2]| Set the prefix trajectory line by line (works exactly like TRAJSET)


### Run Trajectories

|Command|Arguments|Description
|--|--|--
|TRAJSTART| [none] | Start the trajectory from the beginning. Run suffix first, then run trajectory until stop is called or it finishes. If wrapping is set, loop over the main trajectory until stop is called. )
|TRAJSTOP| [none] | Stop the trajectory and return to 0 pressure
|TRAJPAUSE| [none] | Pause the trajectory and hold pressure
|TRAJRESUME| [none] | Resume the trajectory


### Others

|Command|Arguments|Description
|--|--|--
|DEFLOAD| [none]| Load default settings profile from onboard storage
|DEFSAVE| [none]| Overwrite default settings profile settings to onboard storage
|LCDTIME| #1 `int` | Set the desired refresh time for the LCD screen if attached (in ms)
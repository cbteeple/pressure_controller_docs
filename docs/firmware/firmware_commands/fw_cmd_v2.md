---
layout: default
title: Command Spec (v2.0)
parent: Firmware Commands
grand_parent: Firmware
permalink: /firmware/firmware_commands/fw_cmd_v2
nav_order: 1
---

# {{ page.title }}

New!
{: .label .label-purple .fs-5 }

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
|SAVE| [none]| Overwrite the current settings profile in onboard storage
|MODE| [#]| Set the control mode (`bool`)
|||0 = direct control of valve states
|||1 = pressure control using PID and sensors)
|||2 = pressure trajectory following
|||3 = pressure control with ramp from current setpoint to new one
|TIME| [#] | Set the desired loop time for measurement outputs (in ms) (`int`)

## Safety Settings

|Command|Arguments|Description
|--|--|--
|MAXP| [#]| Set the maximum pressure allowed. Pressures are clipped if outside this range when using the "SET" command, but not when loaded as part of a trajectory. (_used for the pressure watchdog_)
|MINP| [#]| Set the minimum pressure allowed. Pressures are clipped if outside this range when using the "SET" command, but not when loaded as part of a trajectory.


## Control Channels

|Command|Arguments|Description
|--|--|--
|CHAN| [#] | Set all channels active or inactive (`bool`)
||| 0 = inactive
||| 1 = active
|| [#0;#1;...;#N-1] | Set individual channels active *. Replace "#" with either 1 or 0 for on or off (`bool`).
|SET| [#0;#1] | Set the pressure setpoint of ALL pressure channels. *This setting is only used if MODE is set to 1 or 3.*
||| #0 = ramp time in seconds (`float`) - _only used if MODE is set to 3_ 
||| #1 = Setpoint in psi (`float`) 
|| [#0;#1;...;#N] | Set the pressure setpoint of individual pressure channels* (`float`).
||| #0 = ramp time in seconds (`float`) - _only used if MODE is set to 3_ 
||| #1;...;#N = Setpoints for each channel in psi (`float`) 
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


## Set Up Trajectories

|Command|Arguments|Description
|--|--|--
|TRAJCONFIG| [#0; #1; #2; #3] | Set the trajectory settings
||| #0 = Prefix length (`int`)
||| #1 = Main trajectory length (`int`)
||| #2 = Suffix length (`int`)
||| #3 = Run the suffix trajectory after stop (`bool`)
|TRAJWRAP| [#]| Wrap the trajectory (`bool`) (_Same functionality can be achieved using TRAJLOOP_)
|||0 = Off - trajectory excecutes once
|||1 = On - loop over and over until stopped
|TRAJLOOP| [#]|  Number of times to loop (`int`)
|||-1 = Loop Forever until the TRAJSTOP command is sent
|||0 = Skip the main loop
|||1,2,... = Do the main loop this many times
|TRAJSPEED| [#]| Stretch the speed of the trajectory (`float`)
|||1.0 - base speed
|||>1.0 - Faster than base speed
|||<1.0 - Slower than base speed (can never be 0; if 0 is sent, no changes are made)
|TRAJSET| [#0, #1, #2;...;#N+1]| Set the main trajectory line by line
||| #0 = index (`int`, can be 0 &rarr; max_length-1)
||| #1 = time point (`float`)
||| #2;...;#N+1 = pressure setpoints for each channel (`float`), where the row is zero-padded if the number of inputs is less than the number of total channels
|PREFSET| [#0, #1, #2;...;#N+1]| Set the prefix trajectory line by line (works exactly like TRAJSET)
|SUFFSET| [#0, #1, #2;...;#N+1]| Set the prefix trajectory line by line (works exactly like TRAJSET)


## Run Trajectories

|Command|Arguments|Description
|--|--|--
|TRAJSTART| [none] | Start the trajectory from the beginning. Run suffix first, then run trajectory until stop is called or it finishes. If wrapping is set, loop over the main trajectory until stop is called. )
|TRAJSTOP| [none] | Stop the trajectory and return to 0 pressure
|TRAJPAUSE| [none] | Pause the trajectory and hold pressure
|TRAJRESUME| [none] | Resume the trajectory


## Others

|Command|Arguments|Description
|--|--|--
|DEFLOAD| [none]| Load default settings profile from onboard storage
|DEFSAVE| [none]| Overwrite default settings profile settings to onboard storage
|LCDTIME| [#] | Set the desired refresh time for the LCD screen if attached (in ms) (`int`)
|INTSTART| [#]| Start or stop the controller integrator (`bool`)
|||0 = Off - No integrator
|||1 = On - Start the integrator
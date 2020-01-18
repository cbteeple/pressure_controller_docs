---
layout: default
title: Firmware Commands
parent: Firmware
has_children: true
permalink: /firmware/firmware_commands
nav_order: 2
---

# {{ page.title }}


1. TOC
{:toc}

---

## Structure
Serial commands follow a simple "COMMAND+ARGUMENTS" structure, with the separator character being the semicolon.

Send the command followed by some number of arguments depending on the command. Always end the line with a "newline". Usually serial terminals do the newline automatically for you.

Examples:
[**COMMAND**]**;**[**ARG_1**]**;**[**ARG_2**]**;**...**;**[**ARG_N**]
**chan;1;0;0;1** -  turns on channels 0 and 3, and turns 1 and 2 off (assuming there are exactly 4 output channels)


## View Current Settings
To view the current settings of any of the parameters you can control, simply use the commands below, but omit any arguments you would normally put after the commands.

Example:
"SET" will return the current setpoints of all channels.
"PID" will return the gains for all channels
"TIME" will return the desired loop time
etc.


## Command Spec


[v 2.0]({{"/firmware/firmware_commands/fw_cmd_v2" | absolute_url}}){: .btn .btn-primary}
[v 1.0]({{"/firmware/firmware_commands/fw_cmd_v1" | absolute_url}}){: .btn}



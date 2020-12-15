---
layout: default
title: Hardware Setup
parent: Python Interface
permalink: /top-level/setup
nav_order: 1
font_awesome: "fas fa-cog"
---


# <i class="{{ page.font_awesome }}"></i> {{ page.title }}


1. TOC
{:toc}

---

## Gather your hardware
You can choose to run one controller, or set up a group of pressure controllers to act as one larger "meta-controller". All you need is several USB ports (or a USB 3.0 hub). Plug all the pressure controllers in via USB and you're all set to go.


## Upload compatible firmware
This Python interface is only compatible with serial communication, so be sure to use the "serial" option (not the "HID" option) when flashing firmware to the pressure controllers. _If you have previously used the controllers in "HID" mode with ROS, you will need re-flash the "Serial" mode._


## Determine the device names
Use a serial terminal of some sort to check what the devices are called (Arduino IDE works well).

- In Ubuntu and MacOS, devices begin with `/dev/tty*`. For example, `/dev/ttyACM0` or something similar.
- In Windows, devices begin with `COM*`. For example, `COM4` or something similar.

## Build a hardware config file
A hardware config file allows you to define several parameters about how your hardware is set up. This takes the form of a yaml file where you define a list of devices, where each entry in the list is a dictionary defining the settings for one pressure controller.

Browse some examples in **"config"** >> **"hardware"**.

### Single Controller
If you are using only a single controller, you only need one device in your list. This is what most people will use.
``` yaml
- baudrate: 115200 # Baud rate fro this device. 115200 is default
  num_channels: 8  # This must match the number of channels define in the firmware
  cmd_spec: '2.0'  # The command specification version you are using. This must be a string
```


### Multiple Controllers
If you want to chain together multiple controllers, simply define multiple  devices:

```yaml
- baudrate: 115200 # Baud rate fro this device. 115200 is default
  num_channels: 8  # This must match the number of channels define in the firmware
  cmd_spec: '2.0'  # The command specification version you are using. This must be a string
  
- baudrate: 115200 # Baud rate fro this device. 115200 is default
  num_channels: 8  # This must match the number of channels define in the firmware
  cmd_spec: '2.0'  # The command specification version you are using. This must be a string
```


## Set up the communication config file
With our hardware configuration set up, the last step is to tell the system which hardware configuration you are using.

1. Go to **"config"** >> **"comms"** >> **"comms_config.yaml"**.
2. Set the `hardware` item to the name of the hardware config file you just made
3. Set the `devnames` item to a list of device names. The number of devices needs to be the same as the number of hardware devices you defined in your hardware config file.

Example:

```yaml
hardware: "double3.4"
devnames: ["/dev/ttyACM0", "/dev/ttyACM1"]
```

_The devnames are separate from the rest of the hardware config becasue sometimes device names change for no reason in Ubuntu and Windows._
---
layout: default
title: Hardware Setup
parent: ROS Driver
permalink: /ros-driver/setup
nav_order: 2
font_awesome: "fas fa-cog"
---


# <i class="{{ page.font_awesome }}"></i> {{ page.title }}


1. TOC
{:toc}

---

{: .fs-6 .fw-300 }
With proper setup, you can treat a group of pressure controllers like one larger device.


## Gather your hardware
You can choose to run one controller, or set up a group of pressure controllers to act as one larger "meta-controller".

This ROS Package is compatible with both serial and raw USB communication. Serial is limited to roughly 50 Hz communication rate to/from the controllers, whereas raw USB (sometimes called HID) is capable of 300 Hz reliably for this system. _For more info about configuring communication protocols, check out the [firmware documentation]({{ site.baseurl }}{% link docs/firmware/firmware.md %})._




## Set up a new package to store your configs
ROS conventions are mixed in terms of the correct way to handle user config files interacting with packages. You _could_ just edit the pressure_controller_ros package directly, but that gets messy since that would create a combination of user settings and package source code. Instead, here's the preferred method to avoid this:

1. Create a new package where all your configs are stored
	1. From within your catkin workspace, go to the source directory
	2. Make a new package with a name you choose (like "_pressure_controller_configs_") that depends on the "pressure_controller_ros" package
	3. Get back to your workspace directory and run `catkin_make` to build the new package

	```bash
	cd src
	catkin_create_pkg pressure_controller_configs pressure_controller_ros
	cd ..
	catkin_make
	```

2. Add the correct config folders
	- Go into your new package
	- Copy the default config folders from the pressure_control_ros package

	```bash
	cd src/pressure_controller_configs
	cp -r $(rospack find pressure_controller_ros)/config .
	```

3. Make your own launch file referencing the pressure_control_cbt package
	- Launch files are located in the launch folder of this package. Take a look there for the arguments you'll need to pass to each file when you "include" them in your own launch files
	- Make the launch directory: `mkdir launch`
	- Make a new launch file to bringup the pressure controllers [bringup_pressure.launch]({{ "assets/files/bringup_pressure.launch" | absolute_url }})
	- Note that you can set the "_config_package_". Set this to your new package: "pressure_controller_configs". This tells the startup routine where to look for your config files.
4. When starting up the pressure controllers, use this new launch file rather than the one in the original package.

	```bash
	roslaunch pressure_controller_configs bringup_pressure.launch profile:=[YOUR PROFILE] hw_profile:=[YOUR HARDWARE PROFILE]       
	```




## Build a hardware config file
A hardware config file allows you to define several parameters about how your hardware is set up. This takes the form of a yaml file where you define a list of devices, where each entry in the list is a dictionary defining the settings for one pressure controller.

Browse some examples in **"pressure_controller_ros"** >> **"config"** >> **"hardware"**.

### Hardware config fields
- Native USB (HID) Settings (_Only required for devices in HID mode_)
	- **vendor_id** (`int`) - Vendor ID number (unique to MCU manufacturer)
    - **product_id** (`int`) - Product ID number (unique to MCU board type)
    - **serial_number** (`int` or `str`) - Serial number (unique to each device)
- Serial Settings (_Only required for devices in serial mode_)
	- **devname** (`str`) - Device name (ttyACM# or ttyUSB#)
	- **baudrate** (`int`) - Baud Rate (standard is 115200 baud)
- Common Settings
    - **num_channels** (`int`) - Number of control channels the device has
    - **cmd_spec** (`str`) - Command specification number to use
    - **cmd_format** (`str`) - String format for data to be sent to the controller

### Examples
Here's an example of a hardware config with 2 pressure controllers in HID mode
```yaml
devices:
  # The first controller
  - vendor_id: 5824
    product_id: 1158
    serial_number: 6467390
    num_channels: 8
    cmd_spec: '2.1'
    cmd_format: '%0.2f'

  # The second controller
  - vendor_id: 5824
    product_id: 1158
    serial_number: 5587550
    num_channels: 8
    cmd_spec: '2.1'
    cmd_format: '%0.2f'
```

Here's an example of a hardware config with 1 pressure controller in serial mode
```yaml
devices:
  - devname: /dev/ttyACM0
    baudrate: 115200
    num_channels: 8
    cmd_spec: '2.1'
    cmd_format: '%0.2f'
```

### Determine device information
To set up device information in your hardware config file, just run a terminal command and copy the information.

1. Start a new hardware config file (must be located in the **"config"** >> **"hardware"** of either this package or your own package)
2. Plug one pressure controller in at a time.
3. Run a ROS command to get information about USB devices:
	-  `rosrun pressure_controller_ros find_hid_devices.py`
	-  `rosrun pressure_controller_ros find_serial_devices.py`
4. From the list, find the required device identifiers and copy them into your hardware config.
5. Plug in the next pressure controller and repeat steps 2-4.


### Usage
This ROS driver takes care of the low-level details of coordinating pressure control devices:
- low-level splitting of commands to different controllers
- Synchronizing timers on all controllers
- Stitching data from several controllers back into a single "data" signal (gets published to a ROS topic)

With proper setup, you can treat a group of pressure controllers like one larger device with the combined number of channels.
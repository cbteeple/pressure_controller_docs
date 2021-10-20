---
layout: default
title: ROS Driver
permalink: ros-driver
has_children: true
nav_order: 5
font_awesome: "fas fa-robot"
---

# <i class="{{ page.font_awesome }}"></i> {{ page.title }}

---

## Dependencies
### Hardware
- A pressure control system running my [Ctrl-P firmware](https://github.com/cbteeple/pressure_controller)
- A desktop computer running Linux (currently tested only in [Ubuntu 18.04](https://ubuntu.com/download/desktop))

### Software
- [ROS Melodic](http://wiki.ros.org/melodic/Installation)
- The [rqt_multiplot](http://wiki.ros.org/rqt_multiplot) package for nice plot layouts and custom axes
- [Cython HID Library](https://github.com/trezor/cython-hidapi) from Trezor:
- The [Python Control Interface](https://github.com/cbteeple/pressure_control_interface) package for this project
- Various python libraries:
	- All python dependencies are managed in the reqirements file. `pip install -r requirements.txt`

## Installation
Install things in this order to ensure everything works:
1. Clone the [Python Control Interface](https://github.com/cbteeple/pressure_control_interface) package to the `src` folder of your catkin workspace.
	- Go into the folder and switch to the `devel-ros` branch
```bash
	cd pressure_control_interface
	git checkout devel-ros
```
2. Clone this package to the `src` folder of your catkin workspace.
3. Install cython-hid dependencies (as specified in the Cython HID Library)
	``` bash
	sudo apt-get install python-dev libusb-1.0-0-dev libudev-dev
	sudo pip install --upgrade setuptools
	```
4. Install rqt_multiplot (instructions selected from [documentation](https://github.com/anybotics/rqt_multiplot_plugin))
```bash
	sudo apt-get install ros-melodic-rqt
	sudo apt-get install libqwt-dev
	sudo apt-get update
	sudo apt-get install ros-melodic-rqt-multiplot
```
5. In the root folder of this package, run `pip install -r requirements.txt` to install python dependencies for this package and the "_pressure_control_interface_" package.
6. In the root folder of your catkin workspace, run `catkin_make` to enable the custom python modules in this package to work.
7. Add the [teensy udev rules](https://www.pjrc.com/teensy/td_download.html) to enable communication with the pressure controller.
	1. Download the [udev rule file](https://www.pjrc.com/teensy/00-teensy.rules). Be sure to save it as "_00-teensy.rules_"
	2. Open a terminal in the Downloads folder and run `sudo cp 00-teensy.rules /etc/udev/rules.d/` to copy the file to the correct location.
	3. Log out of Ubuntu and log back in.

## Usage
This driver is split into two ROS packages:
- **pressure_trajectory_ros** is where trajectories are set up, built, and stored for execution
- **pressure_control_ros** is the main driver that actually interfaces with the pressure control hardware





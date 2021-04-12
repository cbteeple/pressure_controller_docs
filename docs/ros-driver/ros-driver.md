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
1. Clone the [Python Control Interface](https://github.com/cbteeple/pressure_control_interface) package to the `src` folder of your catkin workspace.
2. Clone this package to the `src` folder of your catkin workspace.
3. Install cython-hid dependencies (as specified in the Cython HID Library)
	``` bash
	sudo apt-get install python-dev libusb-1.0-0-dev libudev-dev
	sudo pip install --upgrade setuptools
	```
4. In the root folder of this package, run `pip install -r requirements.txt` to install python dependencies.
5. In the root folder of your catkin workspace, run `catkin_make` to enable the custom python modules in this package to work.

## Usage
This driver is split into two ROS packages:
- **pressure_trajectory_ros** is where trajectories are set up, built, and stored for execution
- **pressure_control_ros** is the main driver that actually interfaces with the pressure control hardware





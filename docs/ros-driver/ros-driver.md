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

### Hardware:
- A pressure control system running my custom firmware (located in my [pressure_controller](https://github.com/cbteeple/pressure_controller) repo)
- A desktop computer running Linux (currently tested only in [Ubuntu 18.04](https://ubuntu.com/download/desktop))

### Software:
- [ROS Melodic](http://wiki.ros.org/melodic/Installation)
- The [rqt_multiplot](http://wiki.ros.org/rqt_multiplot) package for nice plot layouts and custom axes
- [Cython HID Library](https://github.com/trezor/cython-hidapi) from Trezor
- Various python libraries:
    - [scipy](https://www.scipy.org/) (`pip install scipy`)
    - [numpy](https://www.numpy.org/) (`pip install numpy`)
    - [numbers](https://docs.python.org/2/library/numbers.html) (`pip install numbers`)
    - [matplotlib](https://matplotlib.org/) (`pip install matplotlib`)
    - [pynput](https://pypi.org/project/pynput/) (`pip install pynput`)
    - [yaml](https://pyyaml.org/wiki/PyYAMLDocumentation) (`pip install pyyaml`)
    - [colorama](https://pypi.org/project/colorama) (`pip install colorama`)
    - [termcolor](https://pypi.org/project/termcolor) (`pip install termcolor`)

## Installation

[Download the ROS Driver](https://github.com/cbteeple/pressure_control_cbt){: .btn .btn-primary}


1. Add this package to your `workspace/src` folder.
2. Run `catkin_make` to enable the custom python modules in this package to work





---
layout: default
title: Python Interface
has_children: true
permalink: top-level
nav_order: 4
font_awesome: "fas fa-laptop-code"
---


# <i class="{{ page.font_awesome }}"></i> {{ page.title }}
{: .no_toc }


## Dependencies

### Hardware
- An arduino-compatible microcontroller (confirmed working on Arduino Mega and Teensy 3.5)

### Software
- Various python libraries:
    - [scipy](https://www.scipy.org/) (`pip install scipy`)
    - [numpy](https://www.numpy.org/) (`pip install numpy`)
    - [numbers](https://docs.python.org/2/library/numbers.html) (`pip install numbers`)
    - [matplotlib](https://matplotlib.org/) (`pip install matplotlib`)
    - [pynput](https://pypi.org/project/pynput/) (`pip install pynput`)
    - [yaml](https://pyyaml.org/wiki/PyYAMLDocumentation) (`pip install pyyaml`)

## Installation
[Download the Firmware / Python Interface](https://github.com/cbteeple/pressure_controller){: .btn}

## Usage

### Settings Locations
- Scripts are located in "**_pressure_control_run_**"
- Controller configurations are located in the "**_config_**" folder
- Trajectory setup files are located in the "**_traj_setup_**" folder
- After trajectories are built, auto-generated files are located in the "**_traj_built_**" folder 


### Run Python Scripts
Run python scripts in a terminal (linux/mac) or [through an IDE](python-tips) (windows)





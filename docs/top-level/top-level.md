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
- Python 3 (use python 3.6 or newer)
- Various python libraries:
    - [scipy](https://www.scipy.org/) (`pip install scipy`)
    - [numpy](https://www.numpy.org/) (`pip install numpy`)
    - [numbers](https://docs.python.org/2/library/numbers.html) (`pip install numbers`)
    - [matplotlib](https://matplotlib.org/) (`pip install matplotlib`)
    - [pynput](https://pypi.org/project/pynput/) (`pip install pynput`)
    - [yaml](https://pyyaml.org/wiki/PyYAMLDocumentation) (`pip install pyyaml`)
    - [sorotraj](https://pypi.org/project/sorotraj/) (`pip install sorotraj`)

## Installation

### Set up a python IDE
Follow the instructions in the [Python Tips]({{ site.baseurl }}{% link docs/top-level/python-tips.md %}) page.


### Clone the code
Already have an IDE you like (like [VSCode](https://code.visualstudio.com/) or [PyCharm](https://www.jetbrains.com/pycharm/))?

[Download the Python Interface](https://github.com/cbteeple/pressure_control_interface){: .btn .btn-primary}

## Usage

### Settings Locations
- Scripts are located in "**_pressure_control_run_**"
- Controller configurations are located in the "**_config_**" folder
- Trajectory setup files are located in the "**_traj_setup_**" folder
- After trajectories are built, auto-generated files are located in the "**_traj_built_**" folder 


### Run Python Scripts
Run python scripts through the terminal: `python file_name.py [arg1] [arg2]`




---
layout: default
title: Pressure Skills
permalink: skills
has_children: true
nav_order: 6
font_awesome: "fas fa-running"
---

# <i class="{{ page.font_awesome }}"></i> {{ page.title }}

---

{: .fs-6 .fw-300 }
Build complex parametric skills in pressure control space using straightforward definition files.

## Motivation
In practical use, this pressure control system is extremely versatile, however the ROS driver still acts a relatively low level: **sending pressure signals over time.** Setting up pre-programmed trajectories (or even realtime feedback control) works well, but requires a lot of copying and pasteing of the same pressure trajectories into different files. In addition, sometimes we operate using a family of trajectories with fundementally the same form, so there is a lot of room to automate this.

Introducing **"Pressure Skills"**! With this framework, we can define families of pressure trajectories (_skills_) using parameters and math, then use them like functions to obtain specific trajectories given particular values of the parameters.


## Dependencies
### Hardware
- A pressure control system running the [Ctrl-P firmware](https://github.com/cbteeple/pressure_controller)
- A desktop computer running Linux (currently tested only in [Ubuntu 18.04](https://ubuntu.com/download/desktop))

### Software
- The [ROS Driver]({{ site.baseurl }}{% link docs/ros-driver/ros-driver.md %}) for this project
- The [pressure_controller_skills](https://github.com/cbteeple/pressure_controller_skills) package
- Various python libraries:
	- All python dependencies are managed in the reqirements file. `pip install -r requirements.txt`

## Installation
1. Set up and install the [ROS Driver]({{ site.baseurl }}{% link docs/ros-driver/ros-driver.md %}).
2. Clone the [pressure_controller_skills](https://github.com/cbteeple/pressure_controller_skills) package to the `src` folder of your catkin workspace.
3. In the root folder of your catkin workspace, run `catkin_make` to enable the custom python modules in this package to work.

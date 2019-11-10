---
layout: default
title: Tutorial
parent: Python Interface
permalink: /top-level/tutorial
nav_order: 1
---

# {{ page.title }}

1. TOC
{:toc}

---

_Run these commands in a linux terminal. If you are using an IPython console (like in spyder), replace `python` with `run` at the beginning of commands._

## Common usage example:
```console 
# Build your trajectory
python build_traj.py example/setpoint_traj_demo

# Configure the pressure controller with the default profile
#    This step only needs to be run when you are updating parameters.
#    The last profile to be configured is always loaded on startup
python config.py default

# Load the built trajectory onto the controller, and speed-stretch by 1.5x
python send_pre_built.py example/setpoint_traj_demo 1.5

# Run the trajectory, with wrapping turned on
python run_pre_built.py 1
```



## Configure the pressure controller.
This sets and saves a bunch of settings from a file

1. Create a config file in the `config` folder.
    * Configuration files are "*.yaml*" files with a few specific fields (see examples in the `config` folder)
    * config files must be stored in the `config` folder.
2. `python config.py [config_file]`
    * **config_file** - name of the configuration file you want to use. It can include folders too.


## Set Pressure Manually

`python set_pressure.py [p1] [p2] ... [pn]`
* **no arguments** - Pressure is set to 0
* **p1** - Pressure [in psi] - To set all pressure equal, send one value
* **p1, p2, ...,pn** - Pressure [in psi] - To set pressure individually, the number of pressure sent must equal the number of channels (n).

Once running, use keyboard keys to move the pressure up and down.


## Run a pre-built trajectory on the controller

### Build a trajectory
Build a pressure trajectory from a yaml file

1. Create a trajectory setup file in the `traj_setup` folder.
    * Trajectory setup files are "*.yaml*" files with a few specific fields (see examples in the `traj_setup` folder)
    * Trajectory setup files must be stored in the `traj_setup` folder.
2. `python build_traj.py [traj_profile]`
    * **traj_profile** - name of trajectory you want to build. It can include folders too.

3. The trajectory is built, and a "*.traj*" file is saved in the `traj_built` folder


### Load the pre-built trajectory onto the controller
Send a pressure trajectory

`python send_pre_built.py [traj_profile] [speed_factor]`

* **traj_profile** - name of trajectory you just built
* **speed_factor** - Time-stretch a trajectory (Times are divided by this factor)

You must build trajectories from setup files before you can send them. Do not try to create trajectory files yourself.



### Run the current trajectory
Execute the pressure trajectory you just sent

`python run_pre_built.py [wrap]`

* **wrap** - 0 or 1 - Wrap the trajectory (go back to time=0 when finished to create an endless loop)
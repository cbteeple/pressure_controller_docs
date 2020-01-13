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

### Commands in the console
```bash 
# Build your trajectory
python build_traj.py example/setpoint_traj_demo

# Configure the pressure controller with the default profile
#    This step only needs to be run when you are updating parameters.
#    The last profile to be configured is always loaded on startup
python config.py default

# Load the built trajectory onto the controller
python send_pre_built.py example/setpoint_traj_demo

# Run the trajectory 1 time, and speed-stretch by 2.5x (faster)
python run_pre_built.py 1 2.5
```

### example/setpoint_traj_demo.yaml:

```yaml
settings:
    traj_type: 'interp'  # Types include: 'waveform', 'interp'


# Place all of the type-specific settings in here
config:
    interp_type: none   # can be: 'linear', 'cubic'
    setpoints: # Setpoints are only used if you are doing an interpolation
        # [time (sec), pressure 1,2...N (psi)]
        main:
            - [0.0,   10, 12, 14,  16]
            - [1.0,    20, 0, 0,  0]
            - [2.0,   0, 20, 0,  0]
            - [3.0,     0, 0, 20, 0]
            - [4.0,     0, 0, 0, 20]
            - [5.0,    10, 12, 14, 16]

        prefix:
            - [0.000,   0, 0, 0,  0]
            - [1.0,    10, 12, 14,  16]

        suffix:
            - [2.000,   10, 12, 14,  16]
            - [3.0,  0, 0, 0,  0]
```

### Output


![Plot of the "setpoint_traj_demo" trajectory]({{ "assets/img/setpoint_traj_demo_plot.png" | absolute_url }})




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

_**A Note about smoothness:**_
- In the "main" part of the trajectory, the first and last lines must be the same if you want to make a smooth looping trajectory.
- The same is true for the last line in the "prefix" and first line of the "main".
- Transitions to the suffix are handled onboard (time 0.0 of the suffix gets set to the current setpoint state at the time of calling)


### Load the pre-built trajectory onto the controller
Send a pressure trajectory

`python send_pre_built.py [traj_profile]`

* **traj_profile** - name of trajectory you just built

You must build trajectories from setup files before you can send them. Do not try to create trajectory files yourself.



### Run the current trajectory
Execute the pressure trajectory you just sent

`python run_pre_built.py [num_cycles] [speed_factor]`

* **num_cycles** - Loop the main part of the trajectory this number of times. (_Set to -1 for endless loop_)
* **speed_factor** - Speed-stretch a trajectory (_larger speed factor runs the trajectory faster_)
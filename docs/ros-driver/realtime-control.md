---
layout: default
title: Realtime Control
parent: ROS Driver
permalink: /ros-driver/tutorial-realtime
nav_order: 5
---

# Realtime control with pressure_control_ros


1. TOC
{:toc}

---


## Send Trajectories in Realtime

I wrote a handy python class within the `pressure_controller_ros` package to make executing trajectories on pressure controllers an easy process. In addition, I recommend using [sorotraj](https://sorotraj.readthedocs.io/) to build trajectories from definitions similar to what is done in the raw python driver.

Here is a minimal example showing the relevant lines to add to your own ROS node:


```python
import sorotraj
from pressure_controller_ros.msg import *
from pressure_controller_ros.live_traj_new import trajSender as pneu_traj_sender

# Make a sotortaj traj builder
builder = sorotraj.TrajBuilder()

# Load a trajectory from a file and make some modifications on the fly
file_to_use = 'my_trajectory.yaml'
builder.load_traj_def(file_to_use)
traj_def = builder.get_definition()
traj_def['setpoints'][0] = [0.00, 10,10,  10,10,  10,10,  10,10] # Make some
    # modifications to the definition (i.e. change a waypoints)
builder.set_definition(traj_def) # Reset the definition (this also rebuilds the trajectory)

# Alternatively, you can forgo the "load from file" step and set the trajectory
# definition directly if you have already loaded/created it.
# traf_def = {SOME DICTIONARY IN SOROTRAJ FORMAT} 
# builder.set_definition(traj_def) 

# Get the trajectory in "sorotraj" format
traj = builder.get_trajectory()

# Now execute the trajectory on the pressure controller
hand_sender = pneu_traj_sender(self.speed_factor) # Make a traj-sender object
traj_ros = hand_sender.build_traj(traj) # Convert the trajectory to a ROS trajectory
hand_sender.execute_traj(traj_ros, blocking=False) # Run the trajectory
hand_sender.traj_client.wait_for_result() # Wait until the trajectory is finished
```



## Additional Documantation
The implementation for realtime control is based on the [ur_modern_driver](https://github.com/ros-industrial/ur_modern_driver) for Universal Robots, and is extensively used in my companion ROS package for coordinating with an arm: [Hand+Arm Package](https://github.com/cbteeple/hand_arm_cbt/blob/master/scripts/run_traj.py). To check out how this works at a lower level, feel free to check out the [source code](https://github.com/cbteeple/pressure_control_cbt/blob/master/pressure_controller_ros/src/pressure_controller_ros/live_traj_new.py) and the [live_traj_follower launch file](https://github.com/cbteeple/pressure_control_cbt/blob/master/pressure_controller_ros/launch/live_traj_follower.launch).
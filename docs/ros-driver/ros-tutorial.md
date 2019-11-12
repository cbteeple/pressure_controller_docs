---
layout: default
title: Tutorial
parent: ROS Driver
permalink: /ros-driver/tutorial
nav_order: 1
---

# Using the pressure_control ROS drivers


1. TOC
{:toc}

---

This driver is split into two ROS packages:
- **pressure_trajectory_ros** is where trajectories are set up, built, and stored for execution
- **pressure_control_ros** is the main driver that actually interfaces with the pressure control hardware

## Manual pressure control
`roslaunch pressure_controller_ros set_setpoint.launch`



## Build Trajectories
To build a pressure trajectory, you can either discretize a periodic waveform, or use a set of waypoints.

### Set Up a Trajectory
1. In the "**pressure_trajectory_ros**" package, browse the "**traj_setup**" folder. This is where you can set up trajectories to be built.
2. In the "**examples**" folder, open "**planar2seg_demo.yaml**". This example will produce a triangle wave with some prefix and suffix to that trajectory.
3. Examine the "settings" section of the file. Here we note that the trajectory is of type "waveform" and it is not designed to be wrapped (repeated over and over).
4. Examine the "config" section of the file. Here we notice a few things:
	- Only channels 1 and 2 are active
	- The waveform is a triangle wave of frequency 0.25 Hz
	- The waveform is repeating two times, and each cycle is discretized into 90 sub-samples.
5. Next, we can see the "setpoints" section has some prefix waypoints (which will be executed before the waveform), and suffix waypoints (executed after the waveform).

### Build a Trajectory
Building a trajectory is a single command through roslaunch:

`roslaunch pressure_trajectory_ros build_traj.launch profile:=example/planar2seg_demo`

*Note that you don't need to include the file extension ".yaml'*

## Prepare to Run the Pressure Controller
To begin running the pressure controller, use the following command:

`roslaunch pressure_controller_ros bringup.launch profile:=YOUR_CONFIG_PROFILE`

In the "**config**" folder of the "**pressure_control_ros**" package, you can set up hardware configurations. the "*DEBUG.yaml*" configuration is a good place to start.

*Note that you don't need to include the file extension ".yaml'*


## Run Trajectories Manually
1. Make sure you have started the pressure control interface: 

`roslaunch pressure_controller_ros bringup.launch profile:=DEBUG`

2. In a new terminal, upload the trajectory:

`roslaunch pressure_controller_ros load_traj.launch profile:=example/planar2seg_demo`

3. Start running the trajectory:

`roslaunch pressure_controller_ros run_traj.launch`

## Send Trajectories in Realtime
This is currently being implemented. Check back soon for more details!
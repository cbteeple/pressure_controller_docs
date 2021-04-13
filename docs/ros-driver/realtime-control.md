---
layout: default
title: Realtime Control
parent: ROS Driver
permalink: /ros-driver/tutorial-realtime
nav_order: 5
---

# Using the pressure_control ROS drivers


1. TOC
{:toc}

---


## Send Trajectories in Realtime
This is fully implemented now. The implementation is based on the [ur_modern_driver](https://github.com/ros-industrial/ur_modern_driver) for Universal Robots. Documentation is comming soon. For now, feel free to check out the [source code](https://github.com/cbteeple/pressure_control_cbt/tree/master/pressure_controller_ros/src/pressure_controller_ros) and the [live_traj_follower launch file](https://github.com/cbteeple/pressure_control_cbt/blob/master/pressure_controller_ros/launch/live_traj_follower.launch). In addition to this rosnode, the realtime trajectory follow has a python library that can be imported in other ros projects, ans seen in my [Hand+Arm Package](https://github.com/cbteeple/hand_arm_cbt/blob/master/scripts/pick_place_run_multi.py)
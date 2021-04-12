---
layout: default
title: ROS Basics
parent: ROS Driver
permalink: /ros-driver/ros-basics
nav_order: 1
---


# {{ page.title }}


1. TOC
{:toc}

---

## Install ROS
Follow the instructions for [installing ROS](http://wiki.ros.org/ROS/Installation). You should match the version of ROS to the version of Ubuntu you are using.
- Ubuntu 20.04 -- ROS Noetic
- Ubuntu 18.04 -- ROS Melodic
- Ubuntu 16.04 -- ROS Kinetic

For this package, you should use the "desktop-full" installation option.

### Setting up the terminal to play nicely with ROS
Add your ROS installation to your .bashrc file so it gets loaded when every time you open a new terminal:

```bash
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

## Make a Catkin Workspace

Follow the tutorial for [making a new workspace](http://wiki.ros.org/catkin/Tutorials/create_a_workspace). I usually create my worskapces in the "Documents" folder rather than the home folder, so step 1 of the tuorial becomes:

```bash
mkdir -p ~/Documents/[WORKSPACE NAME]/src
cd ~/Documents/[WORKSPACE NAME]
catkin_make
```

### Setting up the terminal to play nicely with your new workspace
Add your new catkin workspace to your .bashrc file so it gets loaded when every time you open a new terminal:

```bash
echo "source /home/[USERNAME]/Documents/[WORKSPACE NAME]/devel/setup.bash" >> ~/.bashrc
source ~/.bashrc
```
where `[USERNAME]` is your computer's username, and `[WORKSPACE NAME]` is the name of your workspace folder.


## Installing ROS packages
ROS packages can be installed either using `apt-get install` if they have official packages (like MoveIt! or Gazebo), or built from source.

The pressure controller package must be built from source:

- Clone the repo into the `src` directory in your catkin workspace.
- To build packages, run `catkin_make` from your workspace folder. (_Note: you must run this from the workspace folder, not any subfolders or anywhere else_)


## ROS programming paradigms
ROS has three main programming paradigms it uses to send/recieve messages and do things with them:

1. Publishers/Subscribers: Send/Recieve messages to and from topics.
	- Publishers send data to topics.
	- Subscribers poll for new messages on particular topics, and perform something when a new message comes in.
2. Services: Event-based programs. These are blocking, so a service MUST finish before the program that called it can move forward.
	- These should only ever be used for executing tiny calculations or triggering short actions.
3. Action Servers: Event-based programs. A goal is sent to an action server by another node, and the prgram does something in response. This is non-blocking.
	- Most modern drivers for running real hardware use this type of node (including this package).

### Stitching ROS constructs together
Usually, you will have a few ROS objects in the same node, especialy if you are building a "controller" node. For example, maybe you want to send some control signals in response to the pose of an object to do visual servoing. To do this, you would:

1. Use an existing driver for doing pose detection (maybe AprilTags with a camera) that publishes the pose of objects in one topic.
2. Use this pressure_controller_ros driver to control pneumatic pressure as your "control inputs". This package uses an action server to send commands to the controller.
3. Build your own control node that:
	- Subscribes to the "object pose" topic with a callback function.
	- Performs one step of your controller in response to each new pose estimate to obtain pressure setpoints from the pose error
	- Sends new pressure setpoints to the pressure controller by sending a new goal to the "command server"


## Running Programs
ROS has two main ways to start nodes:

1. `rosrun` starts a single node directly
2. `roslaunch` starts several nodes with parameters and arguments as prescribed in _launch_ files.

Typical ROS drivers (including this pressure controller dirver) actually require several nodes, so usually those are nicely packaged into _launch_ files. You can also combine nodes from various packages into your own _launch_ files to start combinations of different drivers and control nodes. This quickly gets messy though, so sometimes it's easier and cleaner to just make your own bash files that you run instead.

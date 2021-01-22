---
layout: default
title: Python Tips
parent: Python Interface
permalink: /top-level/python-tips
nav_order: 99
font_awesome: "fab fa-python"
---

# <i class="{{ page.font_awesome }}"></i> {{ page.title }}

---

### Set up VSCode as your python IDE
This is the standard way to run this control interface.

1. Install Python 3
	- On Ubuntu 18.04 and later: Python 3 is already installed
	- On Windows: Use [Anaconda](https://www.anaconda.com/)
2. Make a new python virtual environment (call it "ctrl_p")
	- On Ubuntu: use [venv](https://docs.python.org/3/library/venv.html) `sudo apt-get install python3-venv`
	- On Windows: do this inside Anaconda ([instructions](https://docs.anaconda.com/anaconda/navigator/tutorials/manage-environments/))

3. Clone the [python interface](https://github.com/cbteeple/pressure_control_interface) code (you can put it anywhere you want)
4. Install [VSCode](https://code.visualstudio.com/)
5. Configure VSCode
	- Install the [python extension for vscode](https://code.visualstudio.com/docs/python/python-tutorial).
	- (_Windows Only_) Set your default terminal to the command prompt ([instructions](https://stackoverflow.com/questions/44435697/vscode-change-default-terminal)).
	- Open the "**_pressure_control_interface_**" folder from inside vscode.
	- Set the python virtual environment to use ([instructions](https://code.visualstudio.com/docs/python/python-tutorial#_select-a-python-interpreter)).
6. Install python package dependencies
	- `pip install [PACKAGE]`
	- all dependancies for this project are listed in the [setup]({{ site.baseurl }}{% link docs/top-level/top-level.md %}) page





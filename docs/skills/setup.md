---
layout: default
title: Setup
parent: Pressure Skills
permalink: /skills/setup
nav_order: 1
font_awesome: "fas fa-cog"
---


# <i class="{{ page.font_awesome }}"></i> {{ page.title }}


1. TOC
{:toc}

---

## Basic structure of skills
Skills are essentially families of pressure trajectories defined by some channel-wise equations. Parameters can be defined and used in these equations to create dynamic "trajectory generators" which act like python functions.


Each skill is made up of four basic components:

1. **context** (`list`) - A list of control configuration profiles where the skill is valid to use (_this is used during runtime to ensure skills are only run when the control system is configured correctly_).
2. **variables** (`dict`) - A dictionary defining all the parameters of a skill as well as thier default values.
2. **postures** (`dict` of `list`) - A dictionary defining all relevant vectors of pressures (what we call "postures"), where each element in the pressure vector is an equation which can utilize variables. (_Each equation is interpreted as a string and variables are substituted into the text before evaluating._)
2. **skill** (`dict` of `list`) - A dictionary defining prefix, main, and suffix trajectories. Each trajectory is a list, where each list entry defines a time and posture.



## Make a skill config file

This example will guide you through making your first pressure skill based on the "rotate4finger" skill:

[<i class="fab fa-github"></i> "rotate4finger.yaml" on GitHub]( https://github.com/cbteeple/pressure_controller_skills/blob/main/skills/rotate4finger/rotate4finger.yaml ){: .btn .btn-primary} 


1. Define the controller context (list of config profiles where your skill is relevant):

    ```yaml
    context:
      - anthro8
      - anthro8mixed
    ```

2. Define the variables you want to use:

    ```yaml
    variables:
      idle_pressure: -5     #[psi]
      grasp_pressure: 20    #[psi]
      twist_offset: 5       #[psi]
    ```

3. Define a set of postures to use in your skill. Each posture contains a vector of pressures with element-wise equations (which can use variables):

    ```yaml
    postures:
      idle:
        - "idle_pressure"
        - "idle_pressure"
        - "idle_pressure"
        - "idle_pressure"
        - "idle_pressure"
        - "idle_pressure"
        - "idle_pressure"
        - "idle_pressure"

      .
      .
      .

      rotpos:
        - "grasp_pressure-twist_offset"
        - "grasp_pressure+twist_offset"
        - "grasp_pressure-twist_offset"
        - "grasp_pressure+twist_offset"
        - "grasp_pressure-twist_offset"
        - "grasp_pressure+twist_offset"
        - "grasp_pressure-twist_offset"
        - "grasp_pressure+twist_offset"
    ```

4. Define the skill in terms of postures vs. time. Trajectories are dynamically time-scaled later when they are compiled, so the times in this definiton file only represent relative lengths of trajectory segments. Also, be sure to include default times.

    ```yaml
    skill:
      default_times:
        prefix: 1.0 #[sec]
        main:   4.0 #[sec]
        suffix: 1.0 #[sec]
        
      prefix:
        - time: 0.0
          posture: idle
        - time: 1.0
          posture: grasp4

      main:
        - time: 0.0
          posture: grasp4
        - time: 0.25
          posture: rotneg
        - time: 0.75
          posture: rotpos
        - time: 1.0
          posture: grasp4

      suffix:
        - time: 0.0
          posture: grasp4
        - time: 1.0
          posture: idle
    ```



## Compiling skills
Skills can be complied into pressure trajectories dynamically using variables.

```python
#!/usr/bin/env python
import rospy
from pressure_controller_skills.build_skills import SkillBuilder

# Define the specific values of skill parameters and times to use when compiling a trajectory
variable_ovr = {'idle_pressure':  0.0,
                'grasp_pressure': 24.0,
                'twist_offset':   3.0,
                }

time_ovr = {'prefix': 2.0,
            'main':   20.0,
            'suffix': 2.0,
            }


# Define the location of the "rotate4finger" skill. Note the omission of the file extension.
filename = 'rotate4finger/rotate4finger'

# Define the context (i.e. pressure control setup) you are currently using.
context  = 'anthro8' # Use the anthro8 context

# Create a SkillBuilder object to load and compile the trajectory
node = SkillBuilder(context=context) # Ommit the context to skip safety checks.
node.load_skill(filename) # Load a skill from a file
skill = node.generate_skill(vars=variable_ovr, times=time_ovr) # Generate the skill
node.save_skill(filename) # Save the generated skill
```

## Maintaining skill libraries
It's very important that skill files are saved in the correct location so that the package can compile them.

By default, skills should be saved in the "skills" folder within this package. If you would like to save skills in a different location, you need to explicitly define the location when instantiating a `SkillBuilder` object. For example, you could make a new ros package called "my_skills" to hold your skills, and contain them all inside the "pressure_skills" folder inside your new package. Then your code becomes:

```python
skill_ros_package = 'my_skills'
skill_folder      = 'pressure_skills'
context           = 'anthro8'

# Create a SkillBuilder object
node = SkillBuilder(context=context, ros_package=skill_ros_package, folder=skill_folder)

# Proceed like normal -->
```
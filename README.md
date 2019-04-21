# CPSC 310 Project


This is the base project for CPSC310. You will extend this codebase for all of the deliverables in the project. Please keep your repository private.

The [course webpage](https://github.com/ubccpsc/310/tree/2017jan) is your best resource for additional details about the project, AutoTest, and the specific requirements of each project deliverable. These resources will be frequently updated as the term progresses.

## Configuring your environment

To start using this project you need to get your computer configured so you can build and execute the code. This process should be largely similar to the ```cpsc310starter``` repo used during the first lab. To do this, follow these steps; the specifics of each step (especially the first two) will vary based on which operating system your computer has:

1. Install git (v2.6+) (you should be able to execute ```git --version``` on the command line).

1. Install Node (v6+), which will also install YARN (you should be able to execute ```node --version``` and ```yarn --version``` the command line).

1. Clone the project: ```git clone git@github.com:CS310-2017Jan/cpsc310project_teamXXX.git``` (where ```XXX``` is your team number). You can also clone the repo by visiting your project in Github and getting the clone target by clicking on the green button on your project repository.

<!---
1. It is important that your project directory be called ```cpsc310project``` if you want to work with the public test suite we are providing. The easiest way to do this is to move it to the right name: ```mv cpsc310project_teamXXX cpsc310project``` (replacing ```XXX``` with your team number). ***NOTE:*** This is important or the public test suite will not work. The private test suite we run will do this automatically.
--->

## Project commands

Once your project is configured you need to further prepare the project's tooling and dependencies. In the ```cpsc310project``` folder (on OS X / Linux):

1. ```yarn run clean```

1. ```yarn run configure```

1. ```yarn run build```

If you use Windows; instead try (and hope):

1. ```yarn run cleanwin```

1. ```yarn run configurewin```

1. ```yarn run build```

### Executing the unit test suite

The sample project ships with some automated unit tests. These commands will execute the suites:
 
* Test: ```yarn run test``` (or ```yarn test```)
* Test coverage: ```yarn run cover``` (or ```yarn run coverwin``` if you use Windows). HTML reports can be found: ```./coverage/lcov-report/index.html```

You can also run the tests as a Mocha target inside your favourite IDE (WebStorm and VSCode both work well and are free for academic use); some students are also using Atom and Cloud9 (although this will require a bit of fiddling since it runs in the cloud).


### Executing the private test suite

To invoke the private suite, add a ```@CPSC310Bot``` mention to any commit in your main branch in Github. Remember: these are rate limited so choose your commits wisely. Additional details can be found in the AutoTest documentation.


### Starting the server

* ```yarn run start```


## Developing your project

As you change your TypeScript code you will have to re-compile. This can be done with ```yarn run build``` to build the system and get it ready to execute. You should always fix any compilation errors shown in this step; this is required for AutoTest to succeed. New unit tests can be written and added to ```/test```; as long as the tests end in ```Spec.ts``` they will be executed automatically when you run ```yarn run test```.

### Running and testing from an IDE

While these instructions are for WebStorm, other IDEs (e.g., VSCode, Atom, etc.) and editors (e.g., Sublime) should be similar, or will at least be compatible with the command line options described above.

To run or test the system in WebStorm you will need to configure run targets: 

* **To run the system**: Go to the ```Run->Edit Configurations``` and tap on the ```+``` and then ```Node.js```. Point the 'JavaScript file' argument to ```src/App.js```. 

* **To run unit tests**: Go to the ```Run->Edit Configurations``` and tap on the ```+``` and then ```Mocha```. Point the 'Test Directory' file argument to ```test/```. You can also optionally tap the ```+``` in the ```Before launch``` box and select ```Compile TypeScript``` if you want to make sure a fresh TypeScript compile is forced before each test run.



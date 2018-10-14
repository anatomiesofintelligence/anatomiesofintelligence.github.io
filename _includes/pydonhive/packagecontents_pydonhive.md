# What is in the package

In the download package you’ll find two folders and a few files:

* `README.md` – short introduction
* `INSTALL.md` – details how to install the package and its dependencies
* `GETTING_STARTED.md` – gives a quick overview on how to start with the MiniBees you just got and how to interface with them.
* `MINIHIVEOSC_DOCUMENTATION.md` gives an overview of the OSC interface of MiniHiveOsc, one of the ways to interface with the minibees through the SenseWorld DataNetwork
* `TODO.txt` – (outdated) todo list for pydon

* `examples` - folder with examples
    * `configuration` - example configurations for pydon
    * `eyesweb` - example patch for [EyesWeb](http://www.infomus.org/eyesweb_eng.php)
    * `max` - example patch for [Max/MSP](https://cycling74.com/products/max)
    * `puredata` - example patch for [PureData](http://puredata.info)
    * `supercollider` - example scripts for [SuperCollider](http://supercollider.github.io)
    * `vvvv` - example patch for [vvvv](https://vvvv.org)

* `windows` - this contains scripts for installing on windows

* `pydon` – this is the actual pydon package, with inside it:
    * `setup.py` - the installation script
    * A folder `scripts` – the python datanetwork client library, containing:
        * `pydongui.py` – an encapsulating program, providing a GUI-interface for metapydonhive.
        * `pydoncli.py` – an encapsulating program, providing a command line interface for metapydonhive.
    * A folder `pydon` – the python datanetwork client library, containing:
        * `pydon.py` – the python datanetwork client
        * `pydonhive.py` – the python MiniBee management – serial communication component
        * `minibeexml.py` – implementing reading and writing the minibee configurations as an XML file
        * `swpydonhive.py` – gluing pydon.py and pydonhive.py together to a Python “hive” client to the DataNetwork. This is the program you will use to hook up your MiniBees to the DataNetwork.
        * `lmpydonhive.py` – gluing pydonhive.py to libmapper together to a Python “hive” libmapper client. See IDMIL’s website.
        * `minihiveosc.py` – a simple program to communicate to the MiniBee network with a simple OSC interface (sends the data from the minibees to one IP/port via OSC; not using the DataNetwork).
        * `minihivejunxion.py` – a simple program to communicate with the MiniBee network to and from Junxion with a simple OSC interface (not using the DataNetwork).
        * `metapydonhive.py` – an encapsulating program, where you can select one of the possible interfaces to use (datanetwork, osc, junxion, libmapper).
        * `pydonguifront.py` – an encapsulating program, providing a GUI-interface for metapydonhive.
        * `pydonlogger.py` – a helper utility to log the output into both the GUI window of pydongui, and a log file.
        * `hiveserialapi.py` - handling the serial API interface
        * `hiveserial.py` - handling the serial AT interface
        * `__init__.py` - python package file
    * A folder `configs` – containing some more example configuration files.
    * A folder `obsolete` – containing obsolete files.
* `pyosc.tar.gz` – a compressed archive containing pyosc.
* `XBee-2.0.1.tar.gz` – a compressed archive containing a slightly modified version of the python-xbee library.
* `pyserial-sensestage.tar.gz`
* `installation.sh` - a script for installation on Linux and OSX

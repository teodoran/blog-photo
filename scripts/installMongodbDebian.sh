#!/bin/bash
# install mongodb
sudo chmod 777 /etc/apt/sources.list
sudo echo "deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen" >> /etc/apt/sources.list
sudo chmod 644 /etc/apt/sources.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com --recv 7F0CEB10
sudo apt-get update
sudo apt-get install -y mongodb-10gen



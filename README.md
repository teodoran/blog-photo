A photo blog for Jon
====================
A Christmas project using node.js

TODO:

* Refactor
* Login system
* Buster.js
* Features, features

Setup guide
-----------
Requirements:

* Node
* Npm
* Bower
* MongoDB

Clone source into a folder and then install dependencies with: 

```
npm install
bower install
```

If you wish to populate the database with test data, run: 

```
node test-db-setup.js.
```

Launch the site at localhost with:

```
npm start
```

### Installation guides

The following guides are for newer versions of Ubuntu, although links to more general instructions can be found.

#### Installing node

This is a brief summary of [howtonode.org](http://howtonode.org/how-to-install-nodejs).

Install the dependencies:

```
sudo apt-get install g++ curl libssl-dev apache2-utils
sudo apt-get install git-core
```

Clone and build from source with:

```
git clone git://github.com/ry/node.git
cd node
./configure
make
sudo make install
```

#### Installing npm

This is a simple one:

```
curl https://npmjs.org/install.sh | sudo sh
```

If you have problems with running the npm command, try to make `bash(1)` forget all mappings with `hash -r`.

More information about this can be found at [Stackoverflow](http://stackoverflow.com/questions/8935341/npm-wont-run-after-upgrade).

#### Installing Bower

Information about Bower installation can be found at [bower.io](http://bower.io/).

Bower can be installed from npm using:

```
npm install -g bower
```

#### Installing MongoDB

The official guide can be found at [mongodb.org](http://docs.mongodb.org/manual/installation/).

A brief summary for Ubuntu users:

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install mongodb-10gen
```
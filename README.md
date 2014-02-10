Kodekollektivet.no
==================
[![npm dependecy tracker](https://david-dm.org/teodoran/blog-photo.png)](https://david-dm.org/teodoran/blog-photo)

A blog site.

Setup guide
-----------
Requirements:

* Node
* MongoDB

Clone source into a folder and then install dependencies with: 

```
npm install
```

Launch the site at localhost with:

```
npm start
```

Run all tests with:

```
npm test
```

A more detailed test breakdown can be shown whit:

```
npm run-script spec
```


### Installation guides

The following guides are for newer versions of Ubuntu, although links to more general instructions can be found.

#### Installing node

This is a brief summary of [howtonode.org](http://howtonode.org/how-to-install-nodejs), but with the updated location of the node git repository. For the most up to date installation guide, refer to the [nodejs.org](http://nodejs.org/download/) homepage.

Install the dependencies:

```
sudo apt-get install g++ curl libssl-dev apache2-utils
sudo apt-get install git-core
```

Clone and build from source with:

```
git clone git@github.com:joyent/node.git
cd node
./configure
make
sudo make install
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

Folder structure
----------------

Server-side code and npm dependencies is put in the root folder. Client-side code is put in the /public folder.

* Server.js contains the Node server code. It uses express.js. 
* Post-provider.js contains the database interaction code. It uses mongoose.js.

The /public folder is structured in as following:

* Site view javascrip files are located at the root level.
* /css contains site specific css files.
* /html contains site specific html files.
* /img contains site graphics. Not meant as a location for images related to blogpost content.
* /lib contains pre-compiled client-side libraries, configuration and css.
# Level 02 - Starting the app back-end - Challenge
More info: https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-upload

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.21.1][yarn] or higher installed on your computer. From your command line:

```bash
# Configure a docker image with postgres
docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Create a database called
gostack_desafio06

# Clone this repository
$ git clone https://github.com/phenriq694/goStack-level02-challenge.git

# Go into the repository
$ cd goStack-level02-challenge

# Install dependencies
$ yarn

# Run the migrations
yarn typeorm migration:run

# Start application
$ yarn dev:server
```

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/

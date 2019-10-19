# Junior Programmers Camp XV Websites

A website for Junior Programmers Camp XV, camp by CS students at SIT, KMUTT.

This project compose of many systems.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Copy file ```config-sample.json``` in ```server/config``` and rename the copied one to ```config.json```.

Create folder ```server/uploads/pictures```, ```server/uploads/pictures/verifications```, and ```server/uploads/documents```.

Clone the project and run the script to install all dependencies.

```
yarn
```

Install `knex` 

```
yarn global add knex
```

Change directory to `server`

```
cd server
```

Migrate the database

```
knex migrate:latest
```

If you want the seed data, run the script (only available in `development` mode)

```
knex seed:run
```

Change directory back to the project

```
cd ..
```

To fully use all funcitonalities of the system, add user_id to grantedList in ```server/middlewares/auth.js``` on ```isAdmin``` and ```isStaff``` functions.

To fully activate the grading system, goto ```/admin/activate``` to activate operations that necessary to grading system.

Start the project with

```
yarn start
```


## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Pittawat Taveekitworachai**
* **Natnarong Trewittayatorn**
* **Wicharn Rueangkhajorn**


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

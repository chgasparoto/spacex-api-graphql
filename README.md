# SpaceX GraphQL Server

:rocket: A simple GraphQL Server for SpaceX data - https://github.com/r-spacex/SpaceX-API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
node -v
node: v8.9.4
```

### Installing

It's pretty straightforward.

```
npm install
npm run dev

Go to
http://localhost:5000/graphql
```

And copy and paste the following query to see details about the rockets.

```
{
  rockets(id: "falconheavy") {
    company {
      name
      ceo
      employees
      summary
    }
    name
    costPerLaunch
    country
    engines {
      number
      version
      type
      layout
      thrustSeaLevel {
        kN
        lbf
      }
    }
    landingLegs {
      number
      material
    }
  }
}
```

## Running the tests

To run the tests go to the terminal and enter `npm run test`


## Deployment

There is a live version of the master branch running on [Heroku](https://stark-brushlands-54184.herokuapp.com/graphql)

## Built With

* Node
* Express
* GraphQL

## Contributing

If you want to collaborate, please feel free. I appreciate any help :)

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/chgasparoto/spacex-graphql-server/tags). 

## Authors

* **Cleber Gasparoto** - [Profile](https://github.com/chgasparoto)

See also the list of [contributors](https://github.com/chgasparoto/spacex-graphql-server/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

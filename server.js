const {faker} = require('@faker-js/faker');
const express = require('express');
const app = express();
const port = 8000;

class User {
    constructor({password, email, phoneNumber, lastName, firstName, _id}) {
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.lastName = lastName;
        this.firstName = firstName;
        this._id = _id;
    }
}

class Company {
    constructor({_id, name, address}) {
        this._id = _id;
        this.name = name;
        this.address = {
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country,
        };
    }
}

const createProduct = (type) => {
    let newFake = {};
    if ( type === "User") {
        newFake = {
            password: faker.internet.password(),
            email: faker.internet.email(),
            phoneNumber: faker.phone.phoneNumber(),
            lastName: faker.name.lastName(),
            firstName: faker.name.firstName(),
            _id: faker.random.numeric()
        }
    } else {
        newFake = {
            _id: faker.random.numeric(),
            name: faker.company.companyName(),
            address: {
                street: faker.address.streetName(),
                city: faker.address.cityName(),
                state: faker.address.state(),
                zipCode: faker.address.zipCode(),
                country: faker.address.country(),
            }
        }
    }
    return newFake;
}

app.get("/api/users/new", (req, res) => {
    const user = createProduct("User");
    res.json(user)
})

app.get("/api/companies/new", (req, res) => {
    const company = createProduct("Company");
    res.json(company)
})

app.get("/api/user/company", (req, res) => {
    const user = createProduct("User");
    const company = createProduct("Company");
    res.json({user, company})
})

app.listen(port, () => console.log(`Listening on port: ${port}`))
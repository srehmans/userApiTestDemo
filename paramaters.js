const faker = require('faker');

module.exports = {

    mainUrl: "https://gorest.co.in",
    getUsersEndpoint: "/public-api/users",
    getAllUsersContainsName: '/public-api/users?first_name=',
    options: {
        headers: {
            'Authorization': 'Bearer 71ANAkq5YKKlHbcqLqOysE89pStS1pDhwWTT',
        }
    },
    StatusSuccess: 200,
    StatusSuccessMulti: 201,
    StatusError: 401,
    StatusDataValidationError : 422,
    postData: {

        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        gender: 'male',
        email: faker.internet.email(),
        status: 'active'

    },
    NegPostData: {

        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        status: ''
    }

};

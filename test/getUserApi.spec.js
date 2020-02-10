const data = require('./../paramaters');
const helper = require('./../helper');
const chkrm = require("chakram");
expect = chkrm.expect;
const url = data.mainUrl

describe.skip('Happy path', function () {


    it('Should return status is OK with auth token', function () {

        console.log(url + data.getUsersEndpoint)
        console.log(data.options);
        return chkrm.get(url + data.getUsersEndpoint, data.options)
            .then(function (response) {
                expect(response).to.have.status(data.StatusSuccess);
                console.log(response.body._meta.code);
                console.log(response.body._meta.message)

            })
    });

    it('Should return list of all users', function () {

        return chkrm.get(url + data.getUsersEndpoint, data.options)
            .then(function (response) {
                expect(response).to.have.status(data.StatusSuccess);
                let listOfUsers = response.body.result;
                listOfUsers.forEach(helper.listUsers);
                expect(response.body.result.length).to.be.eq(20);
            })
    })

    it('Should contain list all users with first_name contains john.', function () {

        console.log(url + data.getAllUsersContainsName + 'John');
        return chkrm.get(url + data.getAllUsersContainsName + 'John', data.options)
            .then(function (response) {
                let listOfUsers = response.body.result;
                listOfUsers.forEach(helper.listUsers)
                expect(JSON.stringify(response.body.result)).to.contains('John');
            })

    })

    it('Should create user and verify user exists', function () {

        console.log(url + data.getUsersEndpoint);
        return chkrm.post(url + data.getUsersEndpoint, data.postData, data.options)
            .then(function (response) {
                console.log(response.body._meta.code);
                expect(response.body._meta.code).to.be.eq(data.StatusSuccessMulti);
                console.log(response.body._meta.message);
                let userName = response.body.result.first_name
                console.log(url + data.getUsersEndpoint+'/'+userName, data.options)
                return chkrm.get(url + data.getUsersEndpoint+'/'+userName, data.options)
                     .then(function (userCreated) {
                             // expect that user exists
                     })
            })

    })

});

describe('Sad path', function () {


    it('Should not return status is OK without auth token', function () {

        console.log(url + data.getUsersEndpoint)
        return chkrm.get(url + data.getUsersEndpoint, null)
            .then(function (response) {
                expect(response.body._meta.code).to.be.eq(data.StatusError);
                console.log(response.body._meta.code);
                console.log(response.body._meta.message)

            })
    });


    it('Should not contain list all users with first_name contains john.', function () {

        console.log(url + data.getAllUsersContainsName + '7');
        return chkrm.get(url + data.getAllUsersContainsName + '7', data.options)
            .then(function (response) {
                let listOfUsers = response.body.result;
                listOfUsers.forEach(helper.listUsers);
                expect(response.body.result).to.empty;
            })

    })

    it('Should validate data before user creation and verify user exists', function () {

        console.log(url + data.getUsersEndpoint);
        return chkrm.post(url + data.getUsersEndpoint, data.NegPostData, data.options)
            .then(function (response) {
                console.log(response.body._meta.code);
                expect(response.body._meta.code).to.be.eq(data.StatusDataValidationError);
                console.log(response.body._meta.message);
         
            })

    })

});

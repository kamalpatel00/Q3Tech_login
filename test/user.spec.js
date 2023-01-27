var chai = require('chai')
var assert = chai.assert;
var should = chai.should()
var expect = chai.expect;
var server = require('../server')

let chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe('#Should give user list', function(){
    it('Get users', function(done){
        chai.request(server)
        .get('/api/tutorials')
        .end((err, response) =>{
            expect(response.status).to.be.equal(200)
            expect(response.body).to.have.all.keys('success', 'data')
            done()
        })
    })
})

describe('#Should resend OTP with mobile number', function(){
    it('Resend OTP', function(done){
        chai.request(server)
        .post('/api/tutorials/resendOtp/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({mobile: '9876543211'})
        .end((err, response) =>{
            expect(response.status).to.be.equal(200)
            expect(response.body).to.have.all.keys('mobile', 'otp', 'message')
            done()
        })
    })
})


describe('#Should return error 500 if already registered', function(){
    it('Check For Exist mobile number', function(done){
        chai.request(server)
        .post('/api/tutorials')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({mobile: '9876543211'})
        .end((err, response) =>{
            expect(response.status).to.be.equal(500)
            done()
        })
    })
})

describe('#Should not Login if user enter Invalid mobile and otp', function(){
    it('Invalid Credential provided', function(done){
        chai.request(server)
        .post('/api/tutorials/verifyOtp/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({mobile: '0987654910', otp: 196745})
        .end((err, response) =>{
            expect(response.status).to.be.equal(500)
            done()
        })
    })
})

describe('#Should Login if user enter valid mobile and otp', function(){
    it('Valid Credential provided', function(done){
        chai.request(server)
        .post('/api/tutorials/verifyOtp/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({mobile: '0987654910', otp: 849544})
        .end((err, response) =>{
            expect(response.status).to.be.equal(200)
            expect(response.body).to.have.all.keys('message', 'mobile')
            done()
        })
    })
})


describe('#Should user delete enter valid mobile number', function(){
    let req = {
        params: {
            mobile: "9876543211"
        }
    }
    it('User Delete', function(done){
        chai.request(server)
        .delete('/api/tutorials/:mobile')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(req)
        .end((err, response) =>{
            expect(response.status).to.be.equal(200)
            expect(response.body).to.have.all.keys('message')
            done()
        })
    })
})




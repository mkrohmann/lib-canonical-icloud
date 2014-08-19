'use strict';

var normalizer = require('../index.js'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;
chai.use(chaiAsPromised);

describe('The normalizer', function() {
    it('should transform the email address to lowercase', function() {
        var testAddress = 'SteveJobs@iCloud.com';
        return normalizer.normalize(testAddress)
            .then(function(normalized) {
                expect(normalized).to.equal('stevejobs@icloud.com');
            });
    });

    it('should replace any Apple domain other than icloud.com by icloud.com', function() {
        var testAddress = 'stevejobs@mac.com';
        return normalizer.normalize(testAddress)
            .then(function(normalized) {
                expect(normalized).to.equal('stevejobs@icloud.com');
            });       var normalized = normalizer.normalize(testAddress);
    });

    it('should remove any text after plus sign from the user name', function() {
        var testAddress = 'stevejobs+apple@icloud.com';
        return normalizer.normalize(testAddress)
            .then(function(normalized) {
                expect(normalized).to.equal('stevejobs@icloud.com');
            });
    });
});

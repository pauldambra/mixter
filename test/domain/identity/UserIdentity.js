var UserIdentity = require('../../../src/domain/identity/UserIdentity');
var expect = require('chai').expect;

describe('User Identity Aggregate', function() {
    var email = 'user@mix-it.fr';

    var eventsRaised = [];
    var publishEvent = function publishEvent(evt){
        eventsRaised.push(evt);
    };

    it('When create UserIdentityId Then toString return email', function() {
        var id = new UserIdentity.UserIdentityId(email);

        expect(id.toString()).to.eql(('UserIdentity:' + email));
    });

    it('When register user Then raise userRegistered event', function() {
        UserIdentity.register(publishEvent, email);

        var expectedEvent = new UserIdentity.UserRegistered(new UserIdentity.UserIdentityId(email));
        expect(eventsRaised).to.contains(expectedEvent);
    });
});
'use strict';

var APPLE_DOMAINS = ['mac.com', 'me.com', 'icloud.com'];

/**                                                                                                                                                                                                            
 * Evaluates whether or not an email address resides on Gmail server.
 *
 * @param server
 * @return {bool}
 */
function isAppleServer(server) {
   return APPLE_DOMAINS.indexOf(server) > -1;
}

/**
 * Removes periods and any text after a plus sign.
 *
 * @param user the user to be canonicalized
 * @return {string}
 */
function normalizeUser(user) {
    return user.split('+')[0];
}

/**
 * Helps to check a given email address for uniqueness.
 *
 * Normalizes any email address on an Apple server to its simplest canonical
 * representation so that it can be compared against other canonical email
 * addresses.
 *
 * The canonical address should not be stored in stead of the user's inputed
 * address, as some folks use these modifications to route their incoming
 * email to particular folders.
 *
 * @param email the email address to be canonicalized
 * @retursn {string}
 */
function normalize(email) {
    if (!email.toLowerCase || email.indexOf('@') === -1) {
        return null;
    }
    email = email.toLowerCase();

    var chunks = email.split('@'),
        server = chunks.pop(),
        user = chunks.pop();

    if (isAppleServer(server)) {
        return normalizeUser(user) + '@icloud.com';
    }
}

module.exports = {
    normalize: normalize
};

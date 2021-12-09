const router = require('express')();
const ctrl = require('./contact_ctrl');

router.get('/getContacts', ctrl.getContacts);

router.post('/addContact', ctrl.addContact);

module.exports = router;
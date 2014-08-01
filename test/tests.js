require('mocha');

window.assert = require('chai').assert;
window._ = require('lodash');
mocha.setup('bdd')
mocha.checkLeaks();


require('coffee!./randomizer.spec.coffee');
require('coffee!./generator.spec.coffee');

//		mocha.globals(['jQuery']);
mocha.run();

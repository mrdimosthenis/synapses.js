const codec = require('./codec');
const fun = require('./fun');
const net = require('./net');
const stats = require('./stats');

const synapses = {
    Codec: codec,
    fun: fun,
    Net: net,
    stats: stats
}

module.exports = synapses;

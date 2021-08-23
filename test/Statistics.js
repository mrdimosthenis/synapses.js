const assert = require('assert');
const syn = require('../src/index');

describe('statistics tests', function () {

    it('rmse', function () {
        assert.equal(
            syn.stats.rmse(
                [
                    [[0.0, 0.0, 1.0], [0.0, 0.0, 1.0]],
                    [[0.0, 0.0, 1.0], [0.0, 1.0, 1.0]]
                ]
            ),
            0.7071067811865476
        );
    });

    it('score', function () {
        assert.equal(
            syn.stats.score(
                [
                    [[0.0, 0.0, 1.0], [0.0, 0.1, 0.9]],
                    [[0.0, 1.0, 0.0], [0.8, 0.2, 0.0]],
                    [[1.0, 0.0, 0.0], [0.7, 0.1, 0.2]],
                    [[1.0, 0.0, 0.0], [0.3, 0.3, 0.4]],
                    [[0.0, 0.0, 1.0], [0.2, 0.2, 0.6]]
                ]
            ),
            0.6
        );
    });

});

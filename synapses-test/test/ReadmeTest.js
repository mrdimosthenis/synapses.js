const assert = require('assert');
const syn = require('../../synapses/src/index');

describe('customized network tests', function () {

    let randNet = new syn.net({layers: [2, 3, 1]});

    randNet.json();
    console.log(randNet.json());

    let net = new syn.net({
        json:
            "[[{\"activationF\" : \"sigmoid\", \"weights\" : [-0.5,0.1,0.8]}" +
            " ,{\"activationF\" : \"sigmoid\", \"weights\" : [0.7,0.6,-0.1]}," +
            "  {\"activationF\" : \"sigmoid\", \"weights\" : [-0.8,-0.1,-0.7]}]," +
            "[{\"activationF\" : \"sigmoid\", \"weights\" : [0.5,-0.3,-0.4,-0.5]}]]"
    });

    net.predict([0.2, 0.6]);
    console.log(net.predict([0.2, 0.6]));

    net.fit(0.1, [0.2, 0.6], [0.9]);

    new syn.net({layers: [2, 3, 1], seed: 1000});

    function activation(layerIndex) {
        switch (layerIndex) {
            case 0:
                return syn.fun.SIGMOID;
            case 1:
                return syn.fun.IDENTITY;
            case 2:
                return syn.fun.LEAKY_RE_LU;
            case 3:
                return syn.fun.TANH;
        }
    }

    function weight(_layerIndex) {
        return 1.0 - 2.0 * Math.random();
    }

    let customNet = new syn.net({
        layers: [4, 6, 8, 5, 3],
        activation: activation,
        weight: weight
    });

    customNet.svg();

    let expAndPredVals = [
        [[0.0, 0.0, 1.0], [0.0, 0.1, 0.9]],
        [[0.0, 1.0, 0.0], [0.8, 0.2, 0.0]],
        [[1.0, 0.0, 0.0], [0.7, 0.1, 0.2]],
        [[1.0, 0.0, 0.0], [0.3, 0.3, 0.4]],
        [[0.0, 0.0, 1.0], [0.2, 0.2, 0.6]]
    ];

    syn.stats.rmse(expAndPredVals);
    console.log(syn.stats.rmse(expAndPredVals));

    syn.stats.score(expAndPredVals);
    console.log(syn.stats.score(expAndPredVals));

    let setosa = {
        petal_length: "1.5",
        petal_width: "0.1",
        sepal_length: "4.9",
        sepal_width: "3.1",
        species: "setosa"
    };

    let versicolor = {
        petal_length: "3.8",
        petal_width: "1.1",
        sepal_length: "5.5",
        sepal_width: "2.4",
        species: "versicolor"
    };

    let virginica = {
        petal_length: "6.0",
        petal_width: "2.2",
        sepal_length: "5.0",
        sepal_width: "1.5",
        species: "virginica"
    };

    let dataset = [setosa, versicolor, virginica];

    let attributes = [
        ["petal_length", false],
        ["petal_width", false],
        ["sepal_length", false],
        ["sepal_width", false],
        ["species", true],
    ];

    let codec = new syn.codec({attributes: attributes, data: dataset});

    let codecJson = codec.json();
    console.log(codec.json());

    new syn.codec({json: codecJson})

    let encodedSetosa = codec.encode(setosa);
    console.log(codec.encode(setosa));

    codec.decode(encodedSetosa);
    console.log(codec.decode(encodedSetosa));

    it('trivial', function () {
        assert.equal(1, 1);
    });

});
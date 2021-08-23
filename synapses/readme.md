# synapses.js

A **neural networks** library for **JavaScript**!

## Basic usage

### Install synapses-java

```
npm i synapses@8.0.0
```

### Require the library

```javascript
const syn = require('synapses');
```

### Create a random neural network by providing its layer sizes

```javascript
let randNet = new syn.net({layers: [2, 3, 1]});
```

* Input layer: the first layer of the network has 2 nodes.
* Hidden layer: the second layer has 3 neurons.
* Output layer: the third layer has 1 neuron.

### Get the json of the random neural network

```javascript
randNet.json();
// "[[{\"activationF\" : \"sigmoid\", \"weights\" : [-0.5,0.1,0.8]}" +
// " ,{\"activationF\" : \"sigmoid\", \"weights\" : [0.7,0.6,-0.1]}," +
// "  {\"activationF\" : \"sigmoid\", \"weights\" : [-0.8,-0.1,-0.7]}]," +
// "[{\"activationF\" : \"sigmoid\", \"weights\" : [0.5,-0.3,-0.4,-0.5]}]]"
```

### Create a neural network by providing its json

```javascript
let net = new syn.net({
    json:
        "[[{\"activationF\" : \"sigmoid\", \"weights\" : [-0.5,0.1,0.8]}" +
        " ,{\"activationF\" : \"sigmoid\", \"weights\" : [0.7,0.6,-0.1]}," +
        "  {\"activationF\" : \"sigmoid\", \"weights\" : [-0.8,-0.1,-0.7]}]," +
        "[{\"activationF\" : \"sigmoid\", \"weights\" : [0.5,-0.3,-0.4,-0.5]}]]"
});
```

### Make a prediction

```javascript
net.predict([0.2, 0.6]);
// [ 0.49131100324012494 ]
```

### Train a neural network

```javascript
net.fit(0.1, [0.2, 0.6], [0.9]);
```

The `fit` method adjusts the weights of the neural network to a single observation.

In practice, for a neural network to be fully trained, it should be fitted with multiple observations.

## Advanced usage

### Create a neural network for testing

```javascript
new syn.net({layers: [2, 3, 1], seed: 1000});
```

We can provide a `seed` to create a non-random neural network.
This way, we can use it for testing.

### Define the activation functions and the weights

```javascript
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
```

* The `activation` function accepts the index of a layer and returns an activation function for its neurons.
* The `weight` function accepts the index of a layer and returns a weight for the synapses of its neurons.

If we don't provide these functions, the activation function of all neurons is sigmoid,
and the weight distribution of the synapses is normal between -1.0 and 1.0.

### Draw a neural network

```javascript
customNet.svg();
```

![Network Drawing](https://github.com/mrdimosthenis/synapses/blob/master/neural_network.png?raw=true)

With its svg drawing, we can see what a neural network looks like.
The color of each neuron depends on its activation function
while the transparency of the synapses depends on their weight.

### Measure the difference between the expected and predicted values

```javascript
let expAndPredVals = [
    [[0.0, 0.0, 1.0], [0.0, 0.1, 0.9]],
    [[0.0, 1.0, 0.0], [0.8, 0.2, 0.0]],
    [[1.0, 0.0, 0.0], [0.7, 0.1, 0.2]],
    [[1.0, 0.0, 0.0], [0.3, 0.3, 0.4]],
    [[0.0, 0.0, 1.0], [0.2, 0.2, 0.6]]
];
```

* Root-mean-square error

```javascript
syn.stats.rmse(expAndPredVals);
// 0.6957010852370435
```

* Classification accuracy score

```javascript
syn.stats.score(expAndPredVals);
// 0.6
```

### Create a codec by providing the attributes and the data points

* One hot encoding is a process that turns discrete attributes into a list of 0.0 and 1.0.
* Minmax normalization scales continuous attributes into values between 0.0 and 1.0.

You can use a codec to encode and decode a data point.

```javascript
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
```

* The first parameter is a list of pairs that define the name and the type (discrete or not) of each attribute.
* The second parameter is an iterator that contains the data points.

### Get the json of the codec

```javascript
let codecJson = codec.json();
// "[{\"Case\" : \"SerializableContinuous\", " +
//   "\"Fields\" : [{\"key\" : \"petal_length\",\"min\" : 1.5,\"max\" : 6.0}]}," +
//  "{\"Case\" : \"SerializableContinuous\", " +
//   "\"Fields\" : [{\"key\" : \"petal_width\",\"min\" : 0.1,\"max\" : 2.2}]}," +
//  "{\"Case\" : \"SerializableContinuous\", " +
//   "\"Fields\" : [{\"key\" : \"sepal_length\",\"min\" : 4.9,\"max\" : 5.5}]}," +
//  "{\"Case\" : \"SerializableContinuous\", " +
//   "\"Fields\" : [{\"key\" : \"sepal_width\",\"min\" : 1.5,\"max\" : 3.1}]}," +
//  "{\"Case\" : \"SerializableDiscrete\", " +
//   "\"Fields\" : [{\"key\" : \"species\",\"values\" : [\"virginica\",\"versicolor\",\"setosa\"]}]}]"
```

### Create a codec by providing its json

```javascript
new syn.codec({json: codecJson})
```

### Encode a data point

```javascript
let encodedSetosa = codec.encode(setosa);
// [ 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0 ]
```

### Decode a data point

```javascript
codec.decode(encodedSetosa);
// {
//     petal_length: "1.5",
//     petal_width: "0.1",
//     sepal_length: "4.9",
//     sepal_width: "3.1",
//     species: "setosa"
// }
```

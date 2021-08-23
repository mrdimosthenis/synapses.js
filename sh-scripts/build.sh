cat scala-synapses/target/scala-3.0.1/synapses-opt/main.js > synapses/src/main.js
echo "module.exports = {CodecJsObj: CodecJsObj, NetJsObj: NetJsObj, StatsJs: StatsJs, FunJs: FunJs, CodecJs: CodecJs, NetJs: NetJs}" >> synapses/src/main.js
cd synapses || exit
npm install
cd ../

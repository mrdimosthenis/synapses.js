cd scala-synapses || exit
sbt fullLinkJS
cd ../
cat scala-synapses/target/scala-3.0.1/synapses-opt/main.js > synapses/src/main.js
echo "module.exports = {CodecJsObj: CodecJsObj, NetJsObj: NetJsObj, StatsJs: StatsJs, FunJs: FunJs, CodecJs: CodecJs, NetJs: NetJs}" >> synapses/src/main.js
cd synapses || exit
npm install
rm -rf /out
jsdoc -c ../jsdoc.json --readme readme.md src/codec.js src/fun.js src/net.js src/stats.js src/index.js
cd ../

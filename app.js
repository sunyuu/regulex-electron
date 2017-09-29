const regulex = require('regulex');


var svgCon = document.getElementById('svgcon');
var parse = regulex.parse;
var input = document.getElementById('input');
var visualize = require('./node_modules/regulex/src/visualize');
var reString = 'var\s+([a-zA-Z_]\w*);';
var re = new RegExp(reString);
input.value =  trim(reString);
var paper = Raphael(svgCon, 0, 0);
try {
  visualize(parse(re.source),getRegexFlags(re),paper);
} catch(e) {
  if (e instanceof parse.RegexSyntaxError) {
    logError(re,e);
  } else throw e;
}

function logError(re,err) {
  var msg=["Error:"+err.message,""];
  if (typeof err.lastIndex==='number') {
    msg.push(re);
    msg.push(new Array(err.lastIndex).join('-')+"^");
  }
  console.log(msg.join("\n"));
}


function getRegexFlags(re) {
  var flags='';
  flags+=re.ignoreCase?'i':'';
  flags+=re.global?'g':'';
  flags+=re.multiline?'m':'';
  return flags;
}

function trim(value) {
  return value.replace(/^\s+/,'').replace(/\s+$/,'');
}
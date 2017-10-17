const regulex = require('regulex');


var svgCon = getEleDom('#svgcon');
var input = getEleDom('#input');
var btn = getEleDom('#btn');
var parse = require('./node_modules/regulex/src/parse');
var visualize = require('./node_modules/regulex/src/visualize');
var reString = 'var\s+([a-zA-Z_]\w*);';
var re = new RegExp(reString);

input.value = trim(reString);

var paper = Raphael(svgCon, 0, 0);

try {
    visualizeReg(re);
} catch (e) {
    console.log(e);
    if (e instanceof parse.RegexSyntaxError) {
        logError(re, e);
    } else throw e;
}

btn.addEventListener('click', function() {
    try {
        var re = new RegExp(input.value);
        visualizeReg(re);
    } catch(e) {
        logError(re,e);
        // console.log(e)
    } 
    
})

function logError(re, err) {
    var msg = ["Error:" + err.message, ""];
    if (typeof err.lastIndex === 'number') {
        msg.push(re);
        msg.push(new Array(err.lastIndex).join('-') + "^");
    }
    console.log(msg.join("\n"));

    var errDom = getEleDom('#errlog');
    errDom.innerHTML = msg.join("\n");
    errDom.className += ' reg-err-show';
    setTimeout(function () {
        errDom.className = errDom.className.replace(/reg\-err\-show/g, '');
        errDom.className = trim(errDom.className);
    }, 2000)
}


function getRegexFlags() {
    var flags = '';
    flags += getEleDom('#flagI').checked ? 'i' : '';
    flags += getEleDom('#flagG').checked ? 'g' : '';
    flags += getEleDom('#flagM').checked ? 'm' : '';
    return flags;
}

function trim(value) {
    return value.replace(/^\s+/, '').replace(/\s+$/, '');
}

function visualizeReg(re) {
    visualize(parse(re.source), getRegexFlags(re), paper);
}

function getEleDom (elem) {
    return document.querySelector(elem);
}
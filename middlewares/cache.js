const NodeCache = require('node-cache')

const cache = new NodeCache({ stdTTL: 10 })

function getUrlFromRequest(req) {
  const url = req.protocol + '://' + req.headers.host + req.originalUrl;
  return url;
}

function getUrlForTodo(req) {
  const url = req.protocol + '://' + req.headers.host + '/todo';
  return url;
}

function set(req, res) {
  const url = getUrlFromRequest(req);
  cache.set(url, res.locals.data);
}

function get(req, res, next) {
  const url = getUrlFromRequest(req);
  const content = cache.get(url);
  if (content) {
    return res.status(200).json(content);
  }
  return next();
}

function setAppend(req, res) {
  const url = getUrlFromRequest(req);
  let content = cache.get(url);
 if(content){
   content.push(res.locals.data);
   cache.set(url, content);
 }else {
   cache.set(url, [res.locals.data]);
 }
}

function getAll(req, res) {
  const url = getUrlForTodo(req);
  const content = cache.get(url);
  console.log('content :>> ');
  if (content) {
    return res.status(200).json(content);
  }
  return res.status(200).json([]);
}

module.exports = { get, set , setAppend, getAll }
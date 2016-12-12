const countDao = require('../dao/countDao');

let count = {};

count.$routers =[
   {
   	  method: 'get',
   	  path: '/posts/info',
   	  router: (req, res, next) =>{
   		countDao.find(req, res, next);
   	  }

   },
   {
   	  method: 'get',
   	  path: '/classInfo',
   	  router: (req, res, next) =>{
   		countDao.findAllClass(req, res, next);
   	  }

   }

];

module.exports = count;
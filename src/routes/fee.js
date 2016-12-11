const feeDao = require('../dao/feeDao.js');

let fee = {};

fee.$routers =[
   {
   	  method: 'post',
   	  path: '/fee',
   	  router: (req, res, next) =>{
   		feeDao.add(req, res, next);
   	  }
   },
   {
   	  method: 'get',
   	  path: '/fee',
   	  router: (req, res, next) =>{
   		feeDao.find(req, res, next);
   	  }

   },
    {
   	  method: 'delete',
   	  path: '/fee',
   	  router: (req, res, next) =>{
   		feeDao.delete(req, res, next);
   	  }

   }
];

module.exports = fee;
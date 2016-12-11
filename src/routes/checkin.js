const checkinDao = require('../dao/checkinDao');

let checkIn = {};

checkIn.$routers =[
   {
   	  method: 'post',
   	  path: '/checkIn',
   	  router: (req, res, next) =>{
   		checkinDao.add(req, res, next);
   	  }
   },
   {
   	  method: 'get',
   	  path: '/checkIn',
   	  router: (req, res, next) =>{
   		checkinDao.find(req, res, next);
   	  }

   },
    {
   	  method: 'delete',
   	  path: '/checkIn',
   	  router: (req, res, next) =>{
   		checkinDao.delete(req, res, next);
   	  }

   }
];

module.exports = checkIn;
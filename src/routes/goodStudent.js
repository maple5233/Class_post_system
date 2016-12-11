const goodStudentDao = require('../dao/goodStudentDao');

let goodStudent = {};

goodStudent.$routers =[
   {
   	  method: 'post',
   	  path: '/goodStudent',
   	  router: (req, res, next) =>{
   		goodStudentDao.add(req, res, next);
   	  }
   },
   {
   	  method: 'get',
   	  path: '/goodStudent',
   	  router: (req, res, next) =>{
   		goodStudentDao.find(req, res, next);
   	  }

   },
    {
   	  method: 'delete',
   	  path: '/goodStudent',
   	  router: (req, res, next) =>{
   		goodStudentDao.delete(req, res, next);
   	  }

   }
];

module.exports = goodStudent;
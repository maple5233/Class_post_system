const answersDao = require('../dao/answersDao');

let answers = {};

answers.$routers =[
   {
   	  method: 'post',
   	  path: '/answers',
   	  router: (req, res) =>{
   		answersDao.add(req, res);
   	  }
   },
   {
   	  method: 'get',
   	  path: '/answers',
   	  router: (req, res) =>{
   		answersDao.find(req, res);
   	  }

   },
    {
   	  method: 'delete',
   	  path: '/answers',
   	  router: (req, res) =>{
   		answersDao.delete(req, res);
   	  }

   }
];

module.exports = answers;
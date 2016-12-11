const meetingDao = require('../dao/meetingDao.js');

let meeting = {};

meeting.$routers =[
   {
   	  method: 'post',
   	  path: '/meeting',
   	  router: (req, res, next) =>{
   		meetingDao.add(req, res, next);
   	  }
   },
   {
   	  method: 'get',
   	  path: '/meeting',
   	  router: (req, res, next) =>{
   		meetingDao.find(req, res, next);
   	  }

   },
    {
   	  method: 'delete',
   	  path: '/meeting',
   	  router: (req, res, next) =>{
   		meetingDao.delete(req, res, next);
   	  }

   }
];

module.exports = meeting;
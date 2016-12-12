let studentSql = {
	getList: 'select * from students where classId = (select classId from classes where teacherId =?) order by ? limit ?,?',
    getListByAdmin: 'select * from students  order by ? limit ?,?'    
    //getListByAdmin: 'select * from students'
}

module.exports = studentSql;
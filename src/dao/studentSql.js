let studentSql = {
	getList: 'select * from students where classId = (select classId from classes where teacherId =?) and isDeleted=0 order by ? limit ?,?',
    getListByAdmin: 'select * from students  and isDeleted=0 order by ? limit ?,?',
    register: 'INSERT INTO students (studentId, studentName, studentPass, studentRank, classId) VALUES (null,?,?,0,?)',
    tryLogin: 'select * from students where studentId = ?',
    getClassNameByClassId: 'select * from classes where classId = ?',
    getStudentById: 'select * from students where studentId = ?'
    //getListByAdmin: 'select * from students'
};

module.exports = studentSql;
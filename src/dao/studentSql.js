let studentSql = {
	getList: 'select * from students where classId in (select classId from classes where teacherId =?) order by ? limit ?,?',
    getListByAdmin: 'select * from students order by ? limit ?,?',
    register: 'INSERT INTO students (studentId, studentName, studentPass, studentRank, classId) VALUES (null,?,?,0,?)',
    tryLogin: 'select * from students where studentId = ?',
    getClassNameByClassId: 'select * from classes where classId = ?',
    getStudentById: 'select * from students where studentId = ?',
    updatePass: 'update students SET studentPass = ? where studentId = ?'
    //getListByAdmin: 'select * from students'
};

module.exports = studentSql;
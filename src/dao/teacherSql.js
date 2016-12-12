var teachers = {
    insert: 'INSERT INTO teachers(teacherId, teacherName, teacherPass) VALUES(null,?,?)',
    update: 'update teachers set teacherName=?, teacherPass=? where teacherId=?',
    delete: 'delete from teachers where teacherId=?',
    queryById: 'select * from teachers where teacherId=?',
    queryAll: 'select * from teachers',
    tryLogin: 'select * from teachers where teacherId = ?',
    getClassNameByClassId: 'select * from classes where classId = ?'
};

module.exports = teachers;
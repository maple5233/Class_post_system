let goodStudentSql = {
	insert:'INSERT INTO good_student_posts (postId, studentId, goodStudent, title, howmuch, isDeleted) VALUES (null,?,?,?,?,0)',
	findAll:'select * from good_student_posts where studentId = (select studentId from students where classId =?) order by ? limit ?,?',
	delete:'update good_student_posts SET isDeleted = 1 where postId = ?'
};

module.exports = goodStudentSql;
let meetingSql = {
	insert:'INSERT INTO class_meeting_posts (postId, studentId, time, place, numPeople, numShow, title, isDeleted) VALUES (null,?,?,?,?,?,?,0)',
	findAll:'select * from class_meeting_posts where studentId in (select studentId from students where classId =?) and isDeleted=0 order by ? limit ?,?',
	delete:'update class_meeting_posts SET isDeleted = 1 where postId = ?'
};

module.exports = meetingSql;
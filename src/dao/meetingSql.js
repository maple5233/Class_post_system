let meetingSql = {
	insert:'INSERT INTO class_meeting_posts (postId, studentId, time, place, numPeople, numShow, title, isDeleted) VALUES (null,?,?,?,?,?,?,0)',
	findAll:'select * from class_meeting_posts where studentId in (select studentId from students where classId =?) and isDeleted=0 order by ? limit ?,?',
	findDisgree:'select studentId from agree_infos where studentId in (select studentId from students where classId =?) and agreeInfo=0',
    findAgree:'select studentId from agree_infos where postId=? and agreeInfo=1',
	delete:'update class_meeting_posts SET isDeleted = 1 where postId = ?',
	insertAgree: 'INSERT INTO agree_infos (agreeInfoId, studentId, postId, agreeInfo) VALUES(null, ?,?,?)'
};

module.exports = meetingSql;
let answersSql = {
	insert:'INSERT INTO answers (answerId, studentId, postKind, postId, content, time, isDeleted) VALUES (null,?,?,?,?,?,0)',
	findAll:'select * from answers where postKind=? and postId=? and isDeleted=0',
	delete:'update answers SET isDeleted = 1 where answerId = ?'
};

module.exports = answersSql;

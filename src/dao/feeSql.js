let feeSql = {
	insert:'INSERT INTO party_fee_posts (postId, studentId, time, howmuch, isDeleted) VALUES (null,?,?,?,0)',
	findAll:'select * from party_fee_posts where studentId in (select studentId from students where classId =?) and isDeleted=0 order by ? limit ?,?',
	delete:'update party_fee_posts SET isDeleted = 1 where postId = ?'
};

module.exports = feeSql;
let countSql = {
	getPay: 'select sum(howmuch) from party_fee_posts where postId in (select postId from fee_infos where studentId =? and feeInfo=1)',
    getUnPay: 'select sum(howmuch) from party_fee_posts where postId in (select postId from fee_infos where studentId =? and feeInfo=0)',
    getAbsence: 'select time from check_in_posts where badStudent = ?',
    getClass: 'select classId, className from classes'
}

module.exports = countSql;
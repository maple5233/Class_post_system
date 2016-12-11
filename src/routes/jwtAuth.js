let jwt = require('jwt-simple');

module.exports = function(req, res, next) {
	let token = (req.body && req.body.access_token) || 
	(req.query && req.query.access_token) || 
	req.headers['x-access-token'];

	if (token) {
		try {
			let decoded = jwt.decode(token, app.get('jwtTokenSecret'));
			// handle token here
			if (decoded.exp <= Date.now()) {
				res.end('Access token has expired', 400);
			}
			// 访问数据库取出用户信息
			// User.findOne({ _id: decoded.iss }, function(err, user) {
			// 	req.user = user;
			// });
		} catch (err) {
			res.status(401).json({
				code: '-1',
				msg: err
			})
		}
	} else {
		res.status(401).json({
			code: '-1',
			msg: '未登录!'
		})
	}
};
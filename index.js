var app = require('http').createServer();
var io = require('socket.io').listen(app);

module.exports = function(bot, module) {
	new SocketAdapter(bot, module);
};

function SocketAdapter(bot, module) {

	var _this = this;
	this.bot = bot;

	app.listen(8888);

	io.sockets.on('connection', function (socket) {
		_this.channel = bot.createChannel(module.name + ':' + socket.id);

		_this.channel.socket = socket;

		_this.channel.say = function(response) {
			this.socket.emit('response', response.reply);
		};

		_this.channel.socket.on('message', function(message) {
			_this.channel.emit('command', { message: message.command });
			_this.channel.emit('message', { message: message.command });
		});
	});
}
const events = require('events');
const io = require('socket.io-client');
const INTERVAL_TIMEOUT = 5000;
class monitorServerListener extends events {
	constructor() {
		super();
		this.socket = null;
		this._progressCounter = 0;
	}

	init(config) {
		const counter = 0;

		this.socket = io(config.LISTEN_SERVICE_PATH);
		this.socket.on('connect', () => console.log('connected'));
		this.socket.on('PROGRESS', data => {
			this._progressCounter++;
			//	console.log(`data: ${JSON.stringify(data)}`);
		});

		setTimeout(() => (this._progressCounter >= 1 ? this.emit('status', true) : this.emit('status', false)), config.TIMEOUT_INTERVAL);
	}
}

module.exports = new monitorServerListener();

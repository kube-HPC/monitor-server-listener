const config = {
	TIMEOUT_INTERVAL: process.env.TIMEOUT_INTERVAL || 5000,
	SELECTOR_NAME: process.env.SELECTOR_NAME || 'app=monitor-server',
	LISTEN_SERVICE_PATH: process.env.LISTEN_SERVICE_PATH || 'http://localhost:30010'
};

config.kubernetes = {
	isLocal: !!process.env.KUBERNETES_SERVICE_HOST,
	namespace: process.env.NAMESPACE || 'default'
};

module.exports = config;

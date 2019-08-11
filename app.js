const monitorServerListener = require('./lib/monitor-server-listener');
const kubernetesClient = require('./lib/kubernetes-api');
const config = require('./config/config');
kubernetesClient.init(config).then(res => {
	monitorServerListener.on('status', async status => {
		console.log(`status=${status}`);
		if (!status) {
			await kubernetesClient.deletePod(config.SELECTOR_NAME);
			console.log(`pod deleted`);
		}
		process.exit();
	});
	monitorServerListener.init(config);
});

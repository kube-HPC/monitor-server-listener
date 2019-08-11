const EventEmitter = require('events');

const KubernetesClient = require('@hkube/kubernetes-client').Client;
const formatters = require('./helpers/formatters');
//const objectPath = require('object-path');
//const delay = require('delay');

class KubernetesApi extends EventEmitter {
	async init(options = {}) {
		try {
			this._config = options;
			this._client = new KubernetesClient(options.kubernetes);
			console.info(`Initialized kubernetes client with options ${JSON.stringify({ ...options.kubernetes, url: this._client._config.url })}`);

			const kubeVersionRaw = await this._client.versions.get();
			this.kubeVersion = {
				...kubeVersionRaw.body,
				major: formatters.parseInt(kubeVersionRaw.body.major, 1),
				minor: formatters.parseInt(kubeVersionRaw.body.minor, 9)
			};
			console.log(`kubernetes version: ${this.kubeVersion.major}:${this.kubeVersion.minor}`);
		} catch (error) {
			console.error(`Error initializing kubernetes. error: ${error.message}`, error);
		}
	}

	async deletePod(labelSelector = 'app=monitor-server') {
		//	console.log(`Deleting deploy ${deploymentName}`);
		try {
			const res = await this._client.pods.get({ labelSelector });
			if (res.body.items[0]) {
				await this._client.pods.delete({ podName: res.body.items[0].metadata.name });
				console.info(`delete pod matches selector ${labelSelector}`);
			} else {
				console.warn(`cant find pod name matches selector ${labelSelector}`);
			}
			//	return res;
		} catch (error) {
			console.warn(`unable to delete selector ${labelSelector}. error: ${error.message}`);
		}
		return null;
	}
}

module.exports = new KubernetesApi();

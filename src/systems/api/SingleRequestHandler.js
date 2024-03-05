class SingleRequestHandler {
	constructor() {
		this.cancels = {};
	}

	handle(key, cancel) {
		if (this.cancels[key]) {
			this.cancels[key]();
		}

		this.cancels[key] = cancel;
	}
}

export default SingleRequestHandler;

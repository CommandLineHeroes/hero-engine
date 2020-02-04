export default class Logger {
    constructor(module) {
        this.module = module;
    }

    log(...msg) {
        console.log(`[${this.module}] `, ...msg);
    }
}

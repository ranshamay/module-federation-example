/**
 * An internal package that needs to be consumed via a private npm registry
 */
export class ApplicationInsights {
    initialize(...args) {
        console.info("ApplicationInsights.initialize", ...args);
    }

    trackEvent(...args) {
        console.info("ApplicationInsights.trackEvent", ...args);

    }
}
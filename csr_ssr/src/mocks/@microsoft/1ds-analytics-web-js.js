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

  getPropertyManager(...args) {
    console.info("ApplicationInsights.getPropertyManager", ...args);
    return {
      setProperty: () =>
        console.info("ApplicationInsights.setProperty", ...args),
    };
  }
}

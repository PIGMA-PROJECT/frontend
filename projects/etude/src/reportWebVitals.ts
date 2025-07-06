type ReportHandler = (metric: { name: string; value: number }) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then((webVitals) => {
      webVitals.onCLS(onPerfEntry); // Updated to the correct method name
      webVitals.onINP(onPerfEntry); // Corrected method name
      webVitals.onFCP(onPerfEntry);
      webVitals.onLCP(onPerfEntry);
      webVitals.onTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

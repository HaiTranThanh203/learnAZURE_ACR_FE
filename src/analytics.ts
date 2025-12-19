import ReactGA from "react-ga4";

// Vite + TypeScript lấy biến môi trường bằng cách này:
const MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

export const initGA = () => {
  // Kiểm tra xem biến có tồn tại không
  if (MEASUREMENT_ID && typeof MEASUREMENT_ID === 'string') {
    ReactGA.initialize(MEASUREMENT_ID);
    console.log(`✅ Google Analytics connected: ${MEASUREMENT_ID}`);
  } else {
    console.error("❌ GA Measurement ID not found in .env file!");
  }
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
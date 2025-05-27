import ChartFeature from "@shared/features/ChartFeature";
import NotificationsFeature from "@shared/features/NotificationsFeature";

const featureMap = {
  charts: ChartFeature,
  notifications: NotificationsFeature,
};

export default function FeatureLoader({ feature }) {
  const Component = featureMap[feature];
  return Component ? <Component /> : null;
}

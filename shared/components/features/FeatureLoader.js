import dynamic from "next/dynamic";
import FeatureComingSoon from "@shared/components/features/FeatureComingSoon";
import FeatureCard from "@shared/components/features/FeatureCard";
import { SkeletonLoader } from "@shared/ui/SkeletonLoader";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const featureComponents = {
  charts: dynamic(
    () => delay(700).then(() => import("@shared/features/ChartFeature")),
    {
      loading: () => (
        <FeatureCard>
          <SkeletonLoader />
        </FeatureCard>
      ),
    }
  ),
  notifications: dynamic(
    () =>
      delay(700).then(() => import("@shared/features/NotificationsFeature")),
    {
      loading: () => (
        <FeatureCard>
          <SkeletonLoader />
        </FeatureCard>
      ),
    }
  ),
};

export default function FeatureLoader({ feature }) {
  const FeatureComponent = featureComponents[feature];

  if (!FeatureComponent) {
    return <FeatureComingSoon feature={feature} />;
  }

  return (
    <FeatureCard>
      <FeatureComponent />
    </FeatureCard>
  );
}

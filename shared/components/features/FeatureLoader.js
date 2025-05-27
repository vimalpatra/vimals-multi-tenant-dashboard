import dynamic from "next/dynamic";
import FeatureComingSoon from "@shared/components/features/FeatureComingSoon";
import FeatureCard from "@shared/components/features/FeatureCard";
import { Skeleton } from "@shared/ui/Skeleton";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const featureComponents = {
  charts: dynamic(
    () => delay(700).then(() => import("@shared/features/ChartFeature")),
    {
      loading: () => (
        <FeatureCard>
          <Skeleton />
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
          <Skeleton />
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

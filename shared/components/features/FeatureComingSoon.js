import FeatureCard from "@shared/components/features/FeatureCard";
import FeatureTitle from "@shared/components/features/FeatureTitle";

export default function FeatureComingSoon({ feature }) {
  return (
    <FeatureCard>
      <FeatureTitle
        title={`${
          feature.charAt(0).toUpperCase() + feature.slice(1)
        } Coming Soon!`}
      />
      <p className="text-gray-600">
        We&apos;re working hard to bring you this feature. Stay tuned for
        updates!
      </p>
    </FeatureCard>
  );
}

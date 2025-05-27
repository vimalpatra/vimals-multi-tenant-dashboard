import FeatureCard from "@shared/components/features/FeatureCard";
import FeatureTitle from "@shared/components/features/FeatureTitle";
import enUS from "@shared/locales/en_US.json";

export default function FeatureComingSoon({ feature }) {
  return (
    <FeatureCard>
      <FeatureTitle title={enUS.features[feature.toLowerCase()]} />
      <p className="text-gray-600">{enUS.features.comingSoon}</p>
    </FeatureCard>
  );
}

import {
  Bell,
  Globe,
  ImageIcon,
  Mail,
  PlayCircle,
  UserPlus,
  UserX,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/reusables/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { MarketingTable } from "@/components/operations/MarketingTable";
import { MarketingExportMenu } from "@/components/operations/marketing/MarketingExportMenu";
import { AddCampaignFlow } from "@/components/operations/marketing/AddCampaignFlow";
import { getCampaigns, getMarketingStats } from "@/lib/data/marketing";

const STAT_ICONS: Record<string, LucideIcon> = {
  inAppPush: Bell,
  emailCampaigns: Mail,
  popupAds: Zap,
  bannerAd: ImageIcon,
  appDownloads: PlayCircle,
  websiteVisit: Globe,
  signups: UserPlus,
  deletedAccounts: UserX,
};

export default async function MarketingPage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getMarketingStats(),
    getCampaigns(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <PageHeader
        title="Marketing"
        subtitle="Push, email, SMS campaigns and audience segmentation."
      >
        <MarketingExportMenu />
        <AddCampaignFlow />
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            icon={STAT_ICONS[metric.id] ?? Bell}
          />
        ))}
      </section>

      <MarketingTable campaigns={data} total={total} />
    </div>
  );
}

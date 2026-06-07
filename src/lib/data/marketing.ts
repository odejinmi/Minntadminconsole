import {
  CampaignStatus,
  type Campaign,
  type Metric,
  type Paginated,
} from "./types";

const COMPARISON_WEEK = "vs last week";
const CAMPAIGN_DATE = "Mar 8, 2026 2:34 PM";
const DASH = "-";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

const up = (id: string, label: string, value: string): Metric => ({
  id,
  label,
  value,
  delta: 12.4,
  trend: "up",
  comparison: COMPARISON_WEEK,
});

export function getMarketingStats(): Promise<Metric[]> {
  return delay([
    up("inAppPush", "In-App Push", "213"),
    up("emailCampaigns", "Email campaigns", "13"),
    up("popupAds", "Pop-up Ads", "3"),
    up("bannerAd", "Banner Ad", "2"),
    up("appDownloads", "App downloads (30D)", "5,676"),
    up("websiteVisit", "Website Visit", "12.7k"),
    up("signups", "Signup's", "4,676"),
    up("deletedAccounts", "Deleted accounts", "25"),
  ]);
}

const campaign = (
  name: string,
  channel: string,
  audience: string,
  frequency: string,
  status: CampaignStatus,
): Campaign => ({
  id: `${name}-${channel}`,
  name,
  channel,
  audience,
  frequency,
  status,
  date: CAMPAIGN_DATE,
});

const campaigns: Campaign[] = [
  campaign("Refer and Earn", "Banner Ad", DASH, DASH, CampaignStatus.Delivered),
  campaign("Card spend $5 back", "In-App Push", "Active card holders", DASH, CampaignStatus.Delivered),
  campaign("Re-engage dormant", "Pop-up Ads", "Inactive 30d", "Once per day", CampaignStatus.Running),
  campaign("Refer and Earn", "Pop-up Ads", "All Users", "Once per session", CampaignStatus.Running),
  campaign("Weekend FX boost", "Email campaigns", "Tier 2+", DASH, CampaignStatus.Delivered),
  campaign("Refer-a-friend Q2", "Email campaigns", "All users", DASH, CampaignStatus.Draft),
  campaign("Stablecoin launch", "In-App Push", "All Users", DASH, CampaignStatus.Delivered),
];

export function getCampaigns(): Promise<Paginated<Campaign>> {
  return delay({ data: campaigns, total: 97 });
}

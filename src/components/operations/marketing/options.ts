/** Shared option lists for the campaign creation forms. */

export const TARGET_USERS = ["Individuals", "Business"];

export const AUDIENCE_SEGMENTS = [
  "All Users",
  "Verified Users",
  "Unverified Users",
  "Active Users",
  "Inactive Users",
];

export const TARGET_SECTIONS = [
  "Home Screen",
  "Airtime",
  "Internet Data",
  "Betting",
  "Cable TV",
  "Electricity",
  "Cards",
  "Lifestyle",
  "Marketplace",
  "Flight",
  "Events",
  "Services",
];

export const BANNER_TYPES = ["Full-screen cover ads", "Pop up Banner"];

export const DISPLAY_FREQUENCIES = [
  "Once per session",
  "Once per day",
  "Once per week",
];

export type CampaignType = "email" | "popup" | "push" | "banner";

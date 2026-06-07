import { ImageIcon } from "lucide-react";

type CampaignPreviewProps = {
  heading: string;
  title: string;
  description: string;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  withCover?: boolean;
};

/** Live preview panel shared by the email / pop-up / push campaign forms. */
export function CampaignPreview({
  heading,
  title,
  description,
  titlePlaceholder,
  descriptionPlaceholder,
  withCover = true,
}: Readonly<CampaignPreviewProps>): React.ReactElement {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{heading}</p>
      <div className="rounded-2xl border border-border p-4">
        {withCover && (
          <div className="grid h-40 place-items-center rounded-xl bg-muted/40">
            <ImageIcon className="size-7 text-muted-foreground" />
          </div>
        )}
        <p className="mt-4 font-display text-lg font-semibold tracking-tight">
          {title || titlePlaceholder}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {description || descriptionPlaceholder}
        </p>
      </div>
    </div>
  );
}

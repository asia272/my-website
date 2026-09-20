import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
    title: string;
    value: number;
    description: string;
    icon: LucideIcon;
};

export default function DashboardCard({
    title,
    value,
    description,
    icon: Icon,
}: DashboardCardProps) {
    return (
        <div
            className="
        group
        rounded-2xl
        border
        border-border
        bg-card
        p-5
        transition
        duration-300
        hover:-translate-y-1
        hover:border-primary/30
      "
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-semibold tracking-tight">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                </div>

                <div
                    className="
            flex
            size-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
            transition
            group-hover:bg-primary
            group-hover:text-primary-foreground
          "
                >
                    <Icon className="size-5" />
                </div>
            </div>
        </div>
    );
}
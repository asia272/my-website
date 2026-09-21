import { LucideIcon } from "lucide-react";

type DashboardCardProps = {
    title: string;
    value: number;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    iconBg?: string;
};

export default function DashboardCard({
    title,
    value,
    description,
    icon: Icon,
    iconColor = "text-primary",
    iconBg = "bg-primary/10",
}: DashboardCardProps) {
    return (
        <div
            className="
                p-5
                card 
            "
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-secondary">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-semibold tracking-tight">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-secondary">
                        {description}
                    </p>
                </div>

                <div
                    className={`
                        flex
                        size-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${iconBg}
                    `}
                >
                    <Icon
                        className={`
                            size-5
                            ${iconColor}
                        `}
                    />
                </div>
            </div>
        </div>
    );
}
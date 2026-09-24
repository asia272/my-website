import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { FolderOpen } from "lucide-react";


function EmptyProjects({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <Card
            className="
                border-border/70
                bg-card/60
                shadow-none
            "
        >
            <CardContent
                className="
                    flex
                    min-h-[300px]
                    flex-col
                    items-center
                    justify-center
                    px-6
                    py-12
                    text-center
                "
            >
                <div
                    className="
                        mb-5
                        flex
                        size-14
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-primary/20
                        bg-primary/5
                    "
                >
                    <FolderOpen
                        className="
                            size-6
                            text-primary
                        "
                    />
                </div>

                <h3
                    className="
                        text-xl
                        font-semibold
                        tracking-[-0.025em]
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-2
                        max-w-md
                        text-sm
                        leading-6
                        text-muted-foreground
                    "
                >
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}
export default EmptyProjects;
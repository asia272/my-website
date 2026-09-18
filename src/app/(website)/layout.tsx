import type { ReactNode } from "react";

import WebsiteLayout from "@/components/layout/WebsiteLayout";

interface WebsiteLayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: WebsiteLayoutProps) {
    return <WebsiteLayout>{children}</WebsiteLayout>;
}
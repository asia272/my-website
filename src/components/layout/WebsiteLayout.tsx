import type { ReactNode } from "react";

import AOSProvider from "./AOSProvider";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface WebsiteLayoutProps {
    children: ReactNode;
}

const WebsiteLayout = ({ children }: WebsiteLayoutProps) => {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <AOSProvider />

            <Navbar />

            <main>{children}</main>

            <Footer />
        </div>
    );
};

export default WebsiteLayout;
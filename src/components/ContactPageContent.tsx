
import {
    Code2,
    Sparkles,
} from "lucide-react";
import PageHeading from "./shared/PageHeading";



const ContactPageContent = () => {
    return (
        <aside>
            <div className="lg:sticky lg:top-[calc(var(--nav-height)+32px)]">
                <div className="max-w-xl">

                    <PageHeading
                        label="Let’s Build Something"
                        title="Conversation"
                        highlightedText="Reach Out Anytime"
                        description="Have a project, website, or digital idea in mind? Share what you’re looking to build, and let’s turn your requirements into a modern, reliable, and production-ready digital experience."
                        fontSize="clamp(1.9rem,3vw,3.1rem)"
                        letterSpacing="0.2px"
                        lineHeight="1.5"
                    />

                </div>
            </div>
        </aside>
    );
};

export default ContactPageContent;

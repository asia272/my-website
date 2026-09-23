import { ArrowUpRight, CheckCircle2, Clock3 } from 'lucide-react'
import React from 'react'
import PageHeading from './shared/PageHeading'

const ContactLeftSide = () => {
    return (
        <div className="lg:sticky lg:top-28">
            <PageHeading
                label="Get In Touch"
                fontSize="clamp(0.44rem,3vw,2.8rem)"
                title="Let's Build"
                highlightedText="Something Together"
                description="Have a project in mind, need help bringing an idea to life, or simply want to connect? I'd love to hear from you."
                maxWidth="max-w-2xl"
                titleMaxWidth="max-w-xl"

            />

            {/* Project-oriented content */}
            <div className="mt-10 space-y-5">
                {/* Availability */}
                <div
                    className="
                                    card
                                    group
                                    relative
                                    overflow-hidden
                                    p-5
                                    sm:p-6
                                "
                >
                    <div
                        className="
                                        absolute
                                        -right-16
                                        -top-16
                                        h-32
                                        w-32
                                        rounded-full
                                        bg-primary/10
                                        blur-3xl
                                        transition-all
                                        duration-500
                                        group-hover:bg-primary/20
                                    "
                    />

                    <div className="relative flex items-start gap-4">
                        <div
                            className="
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-md
        border
        border-[color:color-mix(in_srgb,var(--chart-2)_20%,transparent)]
        bg-[color:color-mix(in_srgb,var(--chart-2)_10%,transparent)]
        text-[var(--chart-2)]
    "
                        >
                            <CheckCircle2 className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-primary">
                                Currently Available
                            </p>

                            <p className="mt-1 text-sm leading-6 text-secondary">
                                Open to new projects, collaborations,
                                and interesting ideas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Response time */}
                <div
                    className="
                                    card
                                    group
                                    p-5
                                    sm:p-6
                                "
                >
                    <div className="flex items-start gap-4">
                        <div
                            className="
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-md
        border
        border-[color:color-mix(in_srgb,var(--chart-3)_20%,transparent)]
        bg-[color:color-mix(in_srgb,var(--chart-3)_10%,transparent)]
        text-[var(--chart-3)]
    "
                        >
                            <Clock3 className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-primary">
                                Quick Response
                            </p>

                            <p className="mt-1 text-sm leading-6 text-secondary">
                                Send a message and I'll get back to
                                you as soon as possible.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ContactLeftSide
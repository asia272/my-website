

import React from "react";

const OrbitDecorations = () => {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                inset-0
              z-0
                overflow-hidden
            "
        >
            {/* =====================================================
                AMBIENT RADIAL GLOWS
            ====================================================== */}

            {/* Chart 2 — large upper-right atmosphere */}
            <div
                className="
                    absolute
                    -right-56
                    -top-78
                    h-[1160px]
                    w-[960px]
                    rounded-full
                    bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-3)_12%,transparent)_0%,color-mix(in_srgb,var(--chart-1)_5%,transparent)_30%,transparent_72%)]
                    blur-2xl
                    [box-shadow:0_0_140px_color-mix(in_srgb,var(--chart-2)_8%,transparent)]
                "
            />

            {/* Chart 3 — soft center atmosphere */}
            <div
                className="
                    absolute
                    left-1/2
                    top-[8%]
                    h-[460px]
                    w-[760px]
                    -translate-x-1/2
                    bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--chart-3)_8%,transparent)_0%,color-mix(in_srgb,var(--chart-3)_3%,transparent)_38%,transparent_72%)]
                    blur-2xl
                    [box-shadow:0_0_120px_color-mix(in_srgb,var(--chart-3)_6%,transparent)]
                "
            />

            {/* Chart 4 — lower-left atmosphere */}
            <div
                className="
                    absolute
                    -bottom-48
                    -left-48
                    h-[560px]
                    w-[560px]
                    rounded-full
                    bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-4)_9%,transparent)_0%,color-mix(in_srgb,var(--chart-4)_3%,transparent)_35%,transparent_72%)]
                    blur-2xl
                    [box-shadow:0_0_130px_color-mix(in_srgb,var(--chart-4)_7%,transparent)]
                "
            />

            {/* =====================================================
                SOFT LOCAL GLOW BEHIND ORBITS
            ====================================================== */}

            <div
                className="
                    absolute
                    -left-20
                    top-20
                    h-72
                    w-72
                    rounded-full
                    bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-1)_8%,transparent)_0%,transparent_68%)]
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    right-0
                    top-[38%]
                    h-80
                    w-80
                    rounded-full
                    bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-2)_7%,transparent)_0%,transparent_68%)]
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    bottom-0
                    left-1/2
                    h-72
                    w-96
                    -translate-x-1/2
                    bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--chart-3)_6%,transparent)_0%,transparent_70%)]
                    blur-3xl
                "
            />

            {/* =====================================================
                ORBIT 1
            ====================================================== */}

            <div
                className="
                    absolute
                    -left-24
                    top-24
                    h-72
                    w-72
                    rounded-full
                    border
                    border-[color:var(--chart-1)]
                    opacity-20
                    [box-shadow:0_0_0_1px_color-mix(in_srgb,var(--chart-1)_8%,transparent),0_0_70px_color-mix(in_srgb,var(--chart-1)_18%,transparent),inset_0_0_50px_color-mix(in_srgb,var(--chart-1)_8%,transparent)]
                "
            >
                {/* Rotating satellite */}
                <div
                    className="
                        absolute
                        inset-0
                        animate-[spin_12s_linear_infinite]
                    "
                >
                    <span
                        className="
                            absolute
                            -right-1
                            top-1/2
                            h-2.5
                            w-2.5
                            -translate-y-1/2
                            rounded-full
                            bg-[color:var(--chart-1)]
                            shadow-[0_0_18px_color-mix(in_srgb,var(--chart-1)_80%,transparent),0_0_35px_color-mix(in_srgb,var(--chart-1)_35%,transparent)]
                        "
                    />
                </div>
            </div>

            {/* =====================================================
                ORBIT 2
            ====================================================== */}

            <div
                className="
                    absolute
                    right-[-110px]
                    top-1/3
                    h-80
                    w-80
                    rounded-full
                    border
                    border-[color:var(--chart-2)]
                    opacity-20
                    [box-shadow:0_0_0_1px_color-mix(in_srgb,var(--chart-2)_8%,transparent),0_0_90px_color-mix(in_srgb,var(--chart-2)_18%,transparent),inset_0_0_55px_color-mix(in_srgb,var(--chart-2)_7%,transparent)]
                "
            >
                {/* Rotating satellite */}
                <div
                    className="
                        absolute
                        inset-0
                        animate-[spin_17s_linear_infinite_reverse]
                    "
                >
                    <span
                        className="
                            absolute
                            -bottom-1
                            left-1/2
                            h-2.5
                            w-2.5
                            -translate-x-1/2
                            rounded-full
                            bg-[color:var(--chart-2)]
                            shadow-[0_0_20px_color-mix(in_srgb,var(--chart-2)_85%,transparent),0_0_38px_color-mix(in_srgb,var(--chart-2)_35%,transparent)]
                        "
                    />
                </div>
            </div>

            {/* =====================================================
                ORBIT 3
            ====================================================== */}

            <div
                className="
                    absolute
                    bottom-[-150px]
                    left-1/2
                    h-96
                    w-96
                    -translate-x-1/2
                    rounded-full
                    border
                    border-[color:var(--chart-3)]
                    opacity-[0.16]
                    [box-shadow:0_0_0_1px_color-mix(in_srgb,var(--chart-3)_7%,transparent),0_0_100px_color-mix(in_srgb,var(--chart-3)_16%,transparent),inset_0_0_60px_color-mix(in_srgb,var(--chart-3)_6%,transparent)]
                "
            >
                {/* Rotating satellite */}
                <div
                    className="
                        absolute
                        inset-0
                        animate-[spin_21s_linear_infinite]
                    "
                >
                    <span
                        className="
                            absolute
                            -left-1
                            top-1/2
                            h-2.5
                            w-2.5
                            -translate-y-1/2
                            rounded-full
                            bg-[color:var(--chart-3)]
                            shadow-[0_0_20px_color-mix(in_srgb,var(--chart-3)_85%,transparent),0_0_40px_color-mix(in_srgb,var(--chart-3)_35%,transparent)]
                        "
                    />
                </div>
            </div>




        </div>
    );
};

export default OrbitDecorations;
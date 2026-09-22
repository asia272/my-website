import PageHero from '@/components/shared/PageHero'
import React from 'react'

const page = () => {
    return (
        <div>
            <PageHero
                breadcrumb="Services"
                label="What I Do"
                title="Solutions Built"
                highlightedText="For The Web"
                description="Modern full-stack web development focused on performance, scalability, and exceptional user experiences."
            />
        </div>
    )
}

export default page
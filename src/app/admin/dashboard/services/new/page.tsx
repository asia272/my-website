import ServiceForm from "@/components/admin/services/ServiceForm";
import AdminPageHeading from "@/components/admin/AdminPageHeading";

export default function NewServicePage() {
    return (
        <div className="space-y-6">
            <AdminPageHeading
                title="Add Service"
                description="Create a new service for your website."
            />

            <ServiceForm mode="create" />
        </div>
    );
}
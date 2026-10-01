import { AdminSidebar } from "@/components/AdminSidebar";
import { AppLayout } from "@/components/AppLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      sidebar={<AdminSidebar />}
      userName="Administrator"
      userSubtitle="Super Admin"
      userAvatarText="A"
      themeColor="slate"
    >
      {children}
    </AppLayout>
  );
}

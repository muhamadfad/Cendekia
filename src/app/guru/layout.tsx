import { GuruSidebar } from "@/components/GuruSidebar";
import { AppLayout } from "@/components/AppLayout";

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      sidebar={<GuruSidebar />}
      userName="Budi Guru, S.Pd"
      userSubtitle="NIP: 198001012010011001"
      userAvatarText="BG"
      themeColor="emerald"
    >
      {children}
    </AppLayout>
  );
}

import { SiswaSidebar } from "@/components/SiswaSidebar";
import { AppLayout } from "@/components/AppLayout";

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      sidebar={<SiswaSidebar />}
      userName="Siswa Teladan"
      userSubtitle="NISN: 0012345678"
      userAvatarText="ST"
      themeColor="indigo"
    >
      {children}
    </AppLayout>
  );
}

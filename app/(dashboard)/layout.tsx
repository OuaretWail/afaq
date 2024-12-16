import Nav_Bar from "@/components/navBar";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/Sidebar";
import Footer from "@/components/Footer";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <div >
        <Nav_Bar />
      <main >
        {children}
        <Footer/>
      </main>
    </div>
  );
};

export default DashboardLayout;
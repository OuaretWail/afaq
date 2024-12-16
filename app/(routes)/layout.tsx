import Footer from "@/components/Footer";
import Nav_Bar from "@/components/navBar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
        >
            <Nav_Bar/>
            {children}
            <Footer/>
        </body>
      </html>
  );
}

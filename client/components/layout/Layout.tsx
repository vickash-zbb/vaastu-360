import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background to-muted/40  ">
        <div className=" mx-auto w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

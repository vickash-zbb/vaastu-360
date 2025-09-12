import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 from-background to-muted/40  ">
        <div className=" mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

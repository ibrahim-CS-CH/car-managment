import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <section>
      {/* <Sidebar /> */}
      <main>
        {/* <Header /> */}
        <div>
          <Outlet />
          {/* <DrawerMenu /> */}
        </div>
      </main>
    </section>
  );
}

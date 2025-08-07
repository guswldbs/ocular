import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header style={{ background: "pink", padding: 16, fontSize: 24 }}>
        header
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
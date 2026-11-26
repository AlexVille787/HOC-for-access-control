import React from "react";
import { withAuthorization } from "./hoc/withAuthorization";
import { AdminPanel } from "./components/AdminPanel";

const AdminPanelWithAuth = withAuthorization(AdminPanel, ["admin"]);

const App: React.FC = () => {
  return (
    <div>
      <p>admin:</p>
      <AdminPanelWithAuth currentUser={{ roles: ["admin"] }} />

      <p>user:</p>
      <AdminPanelWithAuth currentUser={{ roles: ["user"] }} />

      <p>null:</p>
      <AdminPanelWithAuth currentUser={null} />
    </div>
  );
};

export default App;

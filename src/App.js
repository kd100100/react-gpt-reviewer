import { useState } from "react";
import Navbar from "./components/navbar";
import SecurityThreatsChecker from "./pages/securityThreatsChecker";
import TestWriter from "./pages/testWriter";

const NavbarItems = {
  TestWriter: "Write unit and functional tests",
  SecurityThreatsChecker: "Check for application security threats",
};

function App() {
  const [currentPage, setCurrentPage] = useState(NavbarItems.TestWriter);

  return (
    <div className="bg-wave-blue container mx-auto">
      <Navbar
        currentPage={currentPage}
        changePage={setCurrentPage}
        navbarItems={NavbarItems}
      />
      {currentPage === NavbarItems.TestWriter && <TestWriter />}
      {currentPage === NavbarItems.SecurityThreatsChecker && (
        <SecurityThreatsChecker />
      )}
    </div>
  );
}

export default App;

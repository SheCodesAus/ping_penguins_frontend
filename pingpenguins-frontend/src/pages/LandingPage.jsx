import React from "react";
// import LandingPageHeader from "..PageHeader.jsx"
// import DisclosureCard from "..DisclosureCard.jsx"
// import WorkshopDetails from "..WorkshopDetailsCard.jsx"
import "./style.css";

// Main Page Component
const Stickybloom = () => {
  return (
    <div className="stickybloom-app">
      <NavBar />
      <Header />
      <main className="content">
        <WorkshopDetails />
        <ImportantDisclosure />
      </main>
      <button className="enter-button">Enter the Workspace</button>
    </div>
  );
};


export default Stickybloom;
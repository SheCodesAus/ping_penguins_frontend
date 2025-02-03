import 'react';
import { Link, useParams } from 'react-router-dom';
import CountdownTimer from '../components/WorkshopPage/CountdownTimer';
import useBoard from '../hooks/use-board';

// Landing Page Header Component
const LandingPageHeader = () => {
  return (
    <header className="header">
      <h1 className="header-title">StickyBloom Workshop Space</h1>
      <p className="header-subtitle">Share your insights and collaborate in real-time</p>
      <p className="welcome-text">Welcome! Our workshop will start soon...</p>
    </header>
  );
};


// Workshop Details Component
const WorkshopDetails = () => {
  return (
    <div className="workshop-details-card">
      <h2>Workshop Details</h2>
      <p>
        Hi there! I&apos;m Emma Herbert, your Chief of Happiness at Crowdbloom. I&apos;m
        thrilled to welcome you to this session, designed to create a safe space
        for authentic conversations, valuable insights, and meaningful
        connections. Your input is incredibly important, and I encourage you to
        share openly and honestly. This is a judgment-free zone where your
        thoughts, experiences, and perspectives are not only respected but
        valued.
      </p>
      <ul>
        <li>Collaborative environment for all participants</li>
        <li>Secure and private workspace</li>
      </ul>
    </div>
  );
};

// Important Disclosure Component
const DisclosureCard = () => {
  return (
    <div className="workshop-disclosure-card">
      <h2>Important Disclosure</h2>
      <p>
        To ensure this workshop delivers the best outcomes for everyone
        involved, some information shared during our time together will be
        collated for reporting purposes. This report is solely intended to
        identify themes, needs for care, and areas where we can provide better
        support based on your input.
      </p>
      <ul>
        <li>Respect the confidentiality of shared information</li>
        <li>Maintain professional conduct throughout the session</li>
        <li>Use the platform responsibly and constructively</li>
      </ul>
    </div>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const { id: pk } = useParams();
  const { board, isLoading } = useBoard(pk);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!board) {
    return <div>Error loading board data</div>;
  }

  const boardLink = `/workshop/${pk}`;

  return (
    <div className="stickybloom-app">
      <main className="content">
        <div className="header-container">
        <LandingPageHeader />
        </div>
        <CountdownTimer boardId={"1"} />
        <div className='flex-container'>
          <WorkshopDetails />
          <DisclosureCard />
          </div>
        <div className="button-container">
          <Link to={boardLink} className="enter-workshop-button">
            Enter the Workspace
//           <Link to="/login" className="enter-button">
//             Login to the Workspace
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
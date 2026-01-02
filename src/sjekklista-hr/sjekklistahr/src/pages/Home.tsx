import React from 'react';
import './Home.css';

interface ListItem {
  id: string;
  text: string;
}

export const Home: React.FC = () => {
  const tasks: ListItem[] = [
    { id: '1', text: 'Godkjenn timeregistrering for uke 12' },
    { id: '2', text: 'Gjennomgå søknader om ferie' },
    { id: '3', text: 'Oppdater arbeidstidsavtaler' },
  ];

  const events: ListItem[] = [
    { id: '1', text: 'Magnus Hansen startet 01.04' },
    { id: '2', text: 'Lisa Johansen fullførte onboarding' },
    { id: '3', text: 'Ny ferieforespørsel fra Erik Olsen' },
  ];

  return (
    <div className="dashboard-grid">
      {/* Dine oppgaver */}
      <div className="dash-card">
        <div className="dash-header">
          <div className="dash-title">Dine oppgaver</div>
        </div>
        <div className="dash-content">
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id}>{task.text}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Siste hendelser */}
      <div className="dash-card">
        <div className="dash-header">
          <div className="dash-title">Siste hendelser</div>
        </div>
        <div className="dash-content">
          <ul className="task-list">
            {events.map(event => (
              <li key={event.id}>{event.text}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Din ferie */}
      <div className="dash-card">
        <div className="dash-header">
          <div className="dash-title">Din ferie</div>
        </div>
        <div className="dash-content">
          <div className="vacation-box">
            <div>Brukt ferie: 12 av 25 dager</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '48%' }}></div>
            </div>
            <div className="vacation-small">Neste ferie: 15. juli – 22. juli</div>
          </div>
        </div>
      </div>

      {/* Company Messages */}
      <div className="dash-card">
        <div className="dash-header">
          <div className="dash-title">Siste beskjeder</div>
        </div>
        <div className="dash-content">
          <div>
            <p><strong>Viktig:</strong> Husk å oppdatere nødkontakter</p>
            <p>Alle ansatte må oppdatere sine nødkontakter innen 30. april.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

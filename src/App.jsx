import React, { useState, useEffect } from 'react';
import TabMenu from './components/TabMenu';
import ReportTable from './components/ReportTable';
import reportsData from './data/reports.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const selectedReport = reportsData.find(report => report.id === activeTab);
    setReportData(selectedReport ? selectedReport.data : []);
  }, [activeTab]);

  const tabs = reportsData.map(report => ({
    id: report.id,
    title: report.title
  }));

  return (
    <div className="container mt-5">
      <TabMenu tabs={tabs} onSelect={setActiveTab} />
      <ReportTable reportData={reportData} />
    </div>
  );
};

export default App;

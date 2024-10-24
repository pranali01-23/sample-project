import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import salesJSON from './sales.json';
import inventoryJSON from './inventory.json';
import customersJSON from './customers.json';

const App = () => {
  const [activeReport, setActiveReport] = useState('sales');
  const [salesData, setSalesData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  // Load JSON files once on component mount
  useEffect(() => {
    setSalesData(salesJSON);
    setInventoryData(inventoryJSON);
    setCustomerData(customersJSON);
  }, []);

  const renderReport = () => {
    switch (activeReport) {
      case 'sales':
        return (
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((data, index) => (
                <tr key={index}>
                  <td>{data.item}</td>
                  <td>{data.quantity}</td>
                  <td>${data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'inventory':
        return (
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Stock</th>
                <th>Warehouse</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((data, index) => (
                <tr key={index}>
                  <td>{data.item}</td>
                  <td>{data.stock}</td>
                  <td>{data.warehouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'customers':
        return (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Purchase</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.purchase}</td>
                  <td>${data.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-light sidebar">
          <h4 className="p-3">Reports</h4>
          <ul className="list-group">
            <li className="list-group-item" onClick={() => setActiveReport('sales')}>Sales Report</li>
            <li className="list-group-item" onClick={() => setActiveReport('inventory')}>Inventory Report</li>
            <li className="list-group-item" onClick={() => setActiveReport('customers')}>Customer Report</li>
          </ul>
        </div>
        <div className="col-md-9">
          <h2 className="p-3">{activeReport.charAt(0).toUpperCase() + activeReport.slice(1)} Report</h2>
          <div className="p-3">
            {renderReport()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';
// import TabMenu from './components/TabMenu';
// import ReportTable from './components/ReportTable';
// import reportsData from './data/reports.json';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
//   const [activeTab, setActiveTab] = useState(1);
//   const [reportData, setReportData] = useState([]);

//   useEffect(() => {
//     const selectedReport = reportsData.find(report => report.id === activeTab);
//     setReportData(selectedReport ? selectedReport.data : []);
//   }, [activeTab]);

//   const tabs = reportsData.map(report => ({
//     id: report.id,
//     title: report.title
//   }));

//   return (
//     <div className="container mt-5">
//       <TabMenu tabs={tabs} onSelect={setActiveTab} />
//       <ReportTable reportData={reportData} />
//     </div>
//   );
// };

// export default App;

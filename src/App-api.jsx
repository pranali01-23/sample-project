import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [activeReport, setActiveReport] = useState('sales');
  const [salesData, setSalesData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [error, setError] = useState("");

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('https://api.example.com/sales');
      setSalesData(response.data);
    } catch (error) {
      setError("Failed to fetch sales data");
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get('https://api.example.com/inventory');
      setInventoryData(response.data);
    } catch (error) {
      setError("Failed to fetch inventory data");
    }
  };

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get('https://api.example.com/customers');
      setCustomerData(response.data);
    } catch (error) {
      setError("Failed to fetch customer data");
    }
  };

  useEffect(() => {
    if (activeReport === 'sales') fetchSalesData();
    if (activeReport === 'inventory') fetchInventoryData();
    if (activeReport === 'customers') fetchCustomerData();
  }, [activeReport]);

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
            {error ? <div className="alert alert-danger">{error}</div> : renderReport()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

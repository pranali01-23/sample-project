import React from 'react';

const ReportTable = ({ reportData }) => {
  if (!reportData) return null;
  
  const keys = Object.keys(reportData[0]);

  return (
    <table className="table">
      <thead>
        <tr>
          {keys.map(key => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {reportData.map((item, index) => (
          <tr key={index}>
            {keys.map(key => (
              <td key={key}>{item[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;

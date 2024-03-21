import React, { useEffect, useState } from 'react';

const YourComponent = () => {
  const [data, setData] = useState([]);

  // Sample data array of objects (replace this with your fetched data from the database)
  const sampleData = [
    { createdTime: '2023-09-01T12:00:00', entryPrice: 100, exitPrice: 120 },
    { createdTime: '2023-09-01T12:00:00', entryPrice: 100, exitPrice: 120 },
    { createdTime: '2023-08-01T12:00:00', entryPrice: 100, exitPrice: 120 },
    { createdTime: '2023-07-01T12:00:00', entryPrice: 100, exitPrice: 120 },
    { createdTime: '2023-07-01T12:00:00', entryPrice: 100, exitPrice: 120 },
    { createdTime: '2023-08-01T12:00:00', entryPrice: 100, exitPrice: 120 },
    { createdTime: '2023-08-01T12:00:00', entryPrice: 100, exitPrice: 120 },
    { createdTime: '2023-08-02T12:00:00', entryPrice: 120, exitPrice: 130 },
    // Add more data here...
  ];

  useEffect(() => {
    // Replace the sampleData with your actual fetched data from the database
    setData(sampleData);
  }, []);

  // Function to group the data by week
  const groupDataByWeek = () => {
    const groupedData = {};
    data.forEach((item) => {
      const createdTime = new Date(item.createdTime);
      const weekNumber = getWeekNumber(createdTime);
      if (!groupedData[weekNumber]) {
        groupedData[weekNumber] = [];
      }
      groupedData[weekNumber].push(item);
    });
    return groupedData;
  };

  // Function to get the week number of a date
  const getWeekNumber = (date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return week;
  };

  // Function to calculate change percentage
  const calculateChangePercentage = (entryPrice, exitPrice) => {
    return ((exitPrice - entryPrice) / entryPrice) * 100;
  };

  const groupedData = groupDataByWeek();

  return (
    <div style={{color:"red"}}>
      {Object.keys(groupedData).map((weekNumber) => (
        <div key={weekNumber}>
          <h2>Week {weekNumber}</h2>
          <ul>
            {groupedData[weekNumber].map((item, index) => (
              <li key={index}>
                Entry Price: {item.entryPrice}, Exit Price: {item.exitPrice},{' '}
                Change Percentage: {calculateChangePercentage(item.entryPrice, item.exitPrice)}%
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default YourComponent;

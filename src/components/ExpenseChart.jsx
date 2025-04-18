import React from 'react';

const ExpenseChart = ({ expenses }) => {
  if (!expenses || Object.keys(expenses).length === 0) {
    return <p className="text-center text-gray-500">No expense data available</p>;
  }

  const categories = Object.keys(expenses);
  const values = Object.values(expenses);
  const total = values.reduce((sum, val) => sum + val, 0);

  // Generate a color for each category
  const getColor = (index) => {
    const colors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(199, 199, 199, 0.8)'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4 text-center">Expense Allocation</h3>
      
      {/* Pie Chart Representation */}
      <div className="relative h-64 w-64 mx-auto mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {(() => {
            let startAngle = 0;
            return categories.map((category, index) => {
              const percentage = (expenses[category] / total) * 100;
              const angle = (percentage / 100) * 360;
              const endAngle = startAngle + angle;
              
              // Convert angles to radians for calculation
              const startRadians = (startAngle - 90) * (Math.PI / 180);
              const endRadians = (endAngle - 90) * (Math.PI / 180);
              
              // Calculate path coordinates
              const x1 = 50 + 40 * Math.cos(startRadians);
              const y1 = 50 + 40 * Math.sin(startRadians);
              const x2 = 50 + 40 * Math.cos(endRadians);
              const y2 = 50 + 40 * Math.sin(endRadians);
              
              // Large arc flag is 1 if angle > 180 degrees
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              // Create SVG path
              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');
              
              const path = (
                <path
                  key={category}
                  d={pathData}
                  fill={getColor(index)}
                  stroke="white"
                  strokeWidth="1"
                />
              );
              
              // Update start angle for next segment
              startAngle = endAngle;
              
              return path;
            });
          })()}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category, index) => {
          const percentage = ((expenses[category] / total) * 100).toFixed(1);
          return (
            <div key={category} className="flex items-center">
              <div 
                className="w-4 h-4 mr-2" 
                style={{ backgroundColor: getColor(index) }}
              ></div>
              <div>
                <span className="font-medium">{category}</span>
                <span className="text-sm text-gray-600 ml-1">
                  (${expenses[category]}, {percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Bar Chart */}
      <div className="mt-8">
        <h4 className="text-lg font-medium mb-3">Expense Breakdown</h4>
        <div className="space-y-3">
          {categories.map((category, index) => {
            const percentage = (expenses[category] / total) * 100;
            return (
              <div key={category} className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{category}</span>
                  <span className="text-sm font-medium">${expenses[category]}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-full rounded-full"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: getColor(index)
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Total */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between font-bold">
          <span>Total Expenses:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart; 
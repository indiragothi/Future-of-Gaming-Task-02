import React, { useEffect, useState } from 'react';
import './AnimatedGrid.css'

const AnimatedGrid = ({ rows = 15, cols = 20 }) => {
    const [grid, setGrid] = useState(
        Array.from({ length: rows }, () => Array(cols).fill(null))
      );
    
      useEffect(() => {
        const interval = setInterval(() => {
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                if (rowIndex === 0) {
                  // Randomly start a drop
                  return Math.random() < 0.1 ? getRandomColor() : null;
                } else {
                  // Move the drop down
                  return prevGrid[rowIndex - 1][colIndex];
                }
              })
            );
            return newGrid;
          });
        }, 100);
    
        return () => clearInterval(interval);
      }, []);
    
      const getRandomColor = () => {
        const colors = ['#00f', '#f00', '#ff0', '#0ff', '#f0f'];
        return colors[Math.floor(Math.random() * colors.length*6)]; 
      };
 
  return (
    <div className="grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="cell"
            style={{ backgroundColor: cell }}
          />
        ))
      )}
    </div>
 
  )
}

export default AnimatedGrid

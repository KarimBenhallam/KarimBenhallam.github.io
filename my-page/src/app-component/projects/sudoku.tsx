
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React from 'react';
import { classNames } from 'primereact/utils';

const Sudoku = () => {

  const emptyBoard = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 2));
  const sudokuData = emptyBoard.map((row, rowIndex) => {
    return row.map((cell, colIndex) => ({
      id: `${rowIndex}-${colIndex}`,
      rowIndex : rowIndex,
      colIndex : colIndex,
      value: emptyBoard[rowIndex][colIndex],
    }))
  }).flat();

  const isThickLine = (index : number) => {
    // Add your logic here to determine where to apply thicker lines
    return index % 3 === 0;
  };



  return (
    // this line was needed so the content was centered in variuous browsers
    //the previous version only worked on firefox
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div className='relative mb-2'>
        <h1>Sudoku</h1>
        <DataTable value={sudokuData} className="p-datatable-gridlines border-1 border-500" >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((obj, index, array) => (
            <Column
              key={`${obj}-${obj}`}
              field={'value'}
              editor={<InputNumber value={obj} onValueChange={(e) => console.log(e.value, sudokuData, obj)} min={1} max={9} inputStyle={{ maxWidth: '2rem' }} />}
              className={classNames( {"border-top-3" : isThickLine(obj)})}
              headerStyle={{display: 'none'}}
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default Sudoku;
import React, { useState } from 'react';
import './Seat.css';

interface SeatProps {
  selectedCount: number;
  movies: Movie[];
  selectedIndex: number;
  setSelectedCount: (count: number) => void;
}

const Seat: React.FC<SeatProps> = ({ selectedCount, setSelectedCount, selectedIndex, movies }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const extractRowAndColumn = (seatId) => {
    const row = seatId.charAt(0);
    const column = parseInt(seatId.slice(1), 10);
    return { row, column };
  };

  const handleToggle = (seatId) => {
    const { row, column } = extractRowAndColumn(seatId);
    const selectedSeat = { row, column };

    const isAlreadySelected = selectedSeats.some(
      (seat) => seat.row === selectedSeat.row && seat.column === selectedSeat.column
    );

    if (isAlreadySelected) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter(
          (seat) => seat.row !== selectedSeat.row || seat.column !== selectedSeat.column
        )
      );
      setSelectedCount((prevCount) => prevCount - 1);
    } else {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, selectedSeat]);
    }
    setSelectedCount(selectedSeats.length);
  };

  const handleTicketing = () => {
    const totalPrice = calculateTotalPrice();
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('totalPrice', totalPrice.toString());

    alert(
      "예매가 완료되었습니다!\n좌석: " +
        selectedSeats.map((seat) => `${seat.row}${seat.column}`).join(", ") +
        "\n가격: " + totalPrice + "원"
    );
  };

  const isSelectedSeat = (seatId) => {
    const { row, column } = extractRowAndColumn(seatId);
    return selectedSeats.some(
      (selectedSeat) => selectedSeat.row === row && selectedSeat.column === column
    );
  };

  const isOccupiedSeat = (rowIndex, column) => {
    return (
      (rowIndex === 2 && (column === 4 || column === 5)) ||
      (rowIndex === 3 && (column === 6 || column === 7)) ||
      (rowIndex === 5 && (column === 1 || column === 2))
    );
  };

  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E", "F"];
    const columns = Array.from({ length: 10 }, (_, index) => index + 1);

    return rows.map((row, rowIndex) => (
      <div key={row} className="row">
        <span className={`seat${row}`}>{row}</span>
        {columns.map((column) => {
          const seatId = `${row}${column}`;
          const occupiedSeat = isOccupiedSeat(rowIndex, column);
          const isClickable = !occupiedSeat;

          return (
            <span
              key={seatId}
              className="seat"
              onClick={isClickable ? () => handleToggle(seatId) : null}
              style={{
                background: occupiedSeat
                  ? '#a9a9a9'
                  : isSelectedSeat(seatId)
                  ? '#ffd600'
                  : 'linear-gradient(0deg, #d21919, #d21919)',
                cursor: isClickable ? 'pointer' : 'not-allowed',
                marginLeft: column === 6 ? '55px' : '5px',
              }}
            ></span>
          );
        })}
      </div>
    ));
  };

  const calculateTotalPrice = () => {
    if (!movies) {
      console.error("");
      return 0;
    }

    return selectedSeats.reduce((total, seat) => {
      const selectedMovie = movies[selectedIndex];
      const seatPrice = selectedMovie ? selectedMovie.price : 0;
      return total + seatPrice;
    }, 0);
  };

  return (
    <div className="right-container">
      <div className="screen">스크린</div>
      <div className="seatsContainer">
        <span className="seatA">A</span>
        <span className="seatB">B</span>
        <span className="seatC">C</span>
        <span className="seatD">D</span>
        <span className="seatE">E</span>
        <span className="seatF">F</span>
        {renderSeats()}
      </div>

       <div className="showcase">
         <li>
           <div className="availableSeatIcon"></div>
           <div className="availableSeat-text">선택가능</div>
         </li>
        <li>
           <div className="selectedSeatIcon"></div>
           <div className="selectedSeat-text">선택좌석</div>
         </li>
         <li>
           <div className="occupiedSeatIcon"></div>
           <div className="occupiedSeat-text">예매완료</div>
         </li>
       </div>
       <div className="sum-price">총 합계: {calculateTotalPrice()}원</div>
       <button className="ticketing-btn" onClick={handleTicketing}>예매하기</button>
     </div>
  );
};

export default Seat;


// import { useState } from 'react';
// import './Seat.css';
// import styled from 'styled-components';
// import { Movie } from "./Ticketing";
// import { movies } from "./Ticketing";

// interface SeatProps {
//   selectedCount: number;
//   movies: Movie[];
//   selectedIndex: number;
//   setSelectedCount: (count: number) => void;

// }

// const Seat: React.FC<SeatProps> = ({ selectedCount, setSelectedCount, selectedIndex, movies }) => {
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const extractRowAndColumn = (seatId) => {
//     const row = seatId.charAt(0);
//     const column = parseInt(seatId.slice(1), 10);
//     return { row, column };
//   };

//   const handleToggle = (seatId) => {
//     const { row, column } = extractRowAndColumn(seatId);

//     const selectedSeat = {
//       row: row,
//       column: column,
//     };

//     const isAlreadySelected = selectedSeats.some(
//       (seat) => seat.row === selectedSeat.row && seat.column === selectedSeat.column
//     );

//     if (isAlreadySelected) {
//       setSelectedSeats((prevSelectedSeats) =>
//         prevSelectedSeats.filter(
//           (seat) => seat.row !== selectedSeat.row || seat.column !== selectedSeat.column
//         )
//       );
//       setSelectedCount((prevCount) => prevCount - 1);
//     } else {
//       setSelectedSeats((prevSelectedSeats) => [
//         ...prevSelectedSeats,
//         selectedSeat,
//       ]);
//     }
//     setSelectedCount(selectedSeats.length);
//   };

  
//   const handleTicketing = () => {
//     const totalPrice = calculateTotalPrice();
//     localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
//     localStorage.setItem('totalPrice', totalPrice.toString());

//     alert(
//       "예매가 완료되었습니다!\n좌석: " +
//         selectedSeats.map((seat) => `${seat.row}${seat.column}`).join(", ") + 
//         "\n가격: " + calculateTotalPrice() + "원"
//     );
//   };

//   const isSelectedSeat = (seatId) => {
//     const { row, column } = extractRowAndColumn(seatId);

//     return selectedSeats.some(
//       (selectedSeat) =>
//         selectedSeat.row === row && selectedSeat.column === column
//     );
//   };
//   const isOccupiedSeat = (rowIndex, column) => {
//     return (
//       (rowIndex === 2 && (column === 4 || column === 5)) ||
//       (rowIndex === 3 && (column === 6 || column === 7)) ||
//       (rowIndex === 5 && (column === 1 || column === 2))
//     );
//   };


//   const renderSeats = () => {
//     const rows = ["A", "B", "C", "D", "E", "F"];
//     const columns = Array.from({ length: 10 }, (_, index) => index + 1);

//     return rows.map((row, rowIndex) => (
//       <div key={row} className="row">
//         <span className={`seat${row}`}>{row}</span>
//         {columns.map((column) => {
//           const seatId = `${row}${column}`;
//           const occupiedSeat = isOccupiedSeat(rowIndex, column);
//           const isClickable = !occupiedSeat;
//           return (
//             <span
//               key={seatId}
//               className="seat"
//               onClick={isClickable ? () => handleToggle(seatId) : null}
//               style={{
//                 background: occupiedSeat ? '#a9a9a9': isSelectedSeat(seatId) ? '#ffd600' : 'linear-gradient(0deg, #d21919, #d21919)',
//                 cursor: isClickable ? 'pointer' : 'not-allowed',
//                 marginLeft: column === 6 ? '55px' : '5px',
//               }}
//             >
            
//             </span>
//           );
//         })}
//       </div>
//     ));
//   };
//     const calculateTotalPrice = () => {
//       if (!movies) {
//         console.error("Movies array is undefined");
//         return 0; // 혹은 에러 처리를 추가할 수 있습니다.
//       }
//       // 선택된 좌석들에 대한 총 가격 계산
//       return selectedSeats.reduce((total, seat) => {
//         // 여기에서 선택된 좌석에 해당하는 영화의 가격을 찾습니다.
//         const selectedMovie = movies[selectedIndex]; // 원하는 영화를 선택하세요.
//         const seatPrice = selectedMovie ? selectedMovie.price : 0; // 영화의 가격을 가져옵니다.
//         return total + seatPrice;
//       }, 0);
//     };
//   return (
//     <div className="right-container">
//       <div className="screen">스크린</div>
//       <div className="seatsContainer">
//         <span className="seatA">A</span>
//         <span className="seatB">B</span>
//         <span className="seatC">C</span>
//         <span className="seatD">D</span>
//         <span className="seatE">E</span>
//         <span className="seatF">F</span>
//         {renderSeats()}
//       </div> 

//       <div className="showcase">
//         <li>
//           <div className="availableSeatIcon"></div>
//           <div className="availableSeat-text">선택가능</div>
//         </li>
//         <li>
//           <div className="selectedSeatIcon"></div>
//           <div className="selectedSeat-text">선택좌석</div>
//         </li>
//         <li>
//           <div className="occupiedSeatIcon"></div>
//           <div className="occupiedSeat-text">예매완료</div>
//         </li>
//       </div>
//       <div className="sum-price">총 합계: {calculateTotalPrice()}원</div>
//       <button className="ticketing-btn" onClick={handleTicketing}>예매하기</button>
//     </div>
//   );
// };

// export default Seat;


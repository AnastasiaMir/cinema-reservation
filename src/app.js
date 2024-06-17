import initView from './view.js';

export default () => {
  const elements = {
    container: document.querySelector('.container'),
    seats: document.querySelectorAll('.seat'),
    dateButtons: document.querySelectorAll('.btn-date'),
    timeButtons: document.querySelectorAll('.btn-time'),
    bookButton: document.querySelector('.btn-book'),
    btnDatesContainer: document.querySelector('.btn-dates-container'),
  };
  const state = {
    date: '',
    time: '20:00',
    selectedSeatsId: [],
    booked: false,
    error: false,
    bookedSeatsId: [],
  };

  const watchedState = initView(state, elements);

  document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date(Date.now());
    localStorage.setItem('currentDate', currentDate);
    watchedState.date = new Date().toLocaleString().split(',')[0].trim();
  });

  elements.seats.forEach((seat) => {
    seat.addEventListener('click', (e) => {
      e.preventDefault();
      watchedState.error = false;
      watchedState.selectedSeatsId = watchedState.selectedSeatsId.includes(seat.id)
        ? watchedState.selectedSeatsId.filter((id) => id !== seat.id)
        : [...watchedState.selectedSeatsId, seat.id];
    });
  });

  elements.dateButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      watchedState.error = false;
      watchedState.selectedSeatsId = [];
      watchedState.bookedSeatsId = [];
      watchedState.date = `${e.target.name}.2024`;
    });
  });

  elements.timeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      watchedState.error = false;
      watchedState.selectedSeatsId = [];
      watchedState.bookedSeatsId = [];
      watchedState.time = e.target.name;
    });
  });

  elements.bookButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (watchedState.selectedSeatsId.length > 0) {
      watchedState.error = false;
      watchedState.bookedSeatsId = [...watchedState.bookedSeatsId, ...watchedState.selectedSeatsId];
      const key = `${state.date}-${state.time}`;
      if (localStorage.getItem(key) !==null) {
        const bookedSeats = JSON.parse(localStorage.getItem(key));
        const updatedBookedSeats = JSON.stringify([...bookedSeats, ...watchedState.bookedSeatsId]);
        localStorage.setItem(key, updatedBookedSeats);
      } else {
        const data = JSON.stringify(watchedState.bookedSeatsId);
        localStorage.setItem(key, data);
      }
      watchedState.booked = true;
      watchedState.selectedSeatsId = [];
      watchedState.booked = false;
    } else {
      watchedState.error = true;
    }
  });
};

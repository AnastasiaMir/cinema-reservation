import onChange from 'on-change';



const renderSeats = (state, elements) => {
  const selectedDateFormat = state.date.replaceAll('.', '-').split('-').reverse().join('-');
  const currentDateFormat = new Date().toISOString().split('T')[0];
  const currentTimeFormat = new Date().toISOString().split('T')[1].substring(0,5)

  if ((selectedDateFormat < currentDateFormat) ||
  (selectedDateFormat===currentDateFormat && state.time < currentTimeFormat)) {
    elements.seats.forEach((seat) => {
      seat.classList.add('reserved');
    });
    return;
  }
  const bookedSeats = JSON.parse(localStorage.getItem(`${state.date}-${state.time}`));
  elements.seats.forEach((seat) => {
    seat.classList.remove('selected', 'reserved');
    if (bookedSeats !== null) {
      if (bookedSeats.includes(seat.id)) {
        seat.classList.add('reserved');
      }
    } 
    if (state.selectedSeatsId.includes(seat.id)) {
      seat.classList.add('selected');
    }

  });
};
const renderDates = (state, elements) => {
    const p = document.querySelector('p');
    p.textContent = "";
  const selectedDateBtn = document.querySelector('.btn-date.btn-selected');
  if (selectedDateBtn !== null) {
    selectedDateBtn.classList.remove('btn-selected');
  }
  elements.dateButtons.forEach((btn) => {
    const diff = Number(btn.id.substring(4, 6));
    const btnName = new Date(new Date().setDate(new Date().getDate() + diff))
      .toLocaleDateString().substring(0, 5);
    if (state.date.substring(0, 5) === btnName) {
      btn.classList.add('btn-selected');
    }
    btn.setAttribute('name', btnName);
    btn.textContent = btnName;
  });
};
const renderTime = (state, elements) => {
    const p = document.querySelector('p');
    p.textContent = ""
  const selectedTimeBtn = document.querySelector('.btn-time.btn-selected');
  if (selectedTimeBtn !== null) {
    selectedTimeBtn.classList.remove('btn-selected');
  }
  elements.timeButtons.forEach((btn) => {
    if (state.time === btn.name) {
      btn.classList.add('btn-selected');
    }
  });
};

const renderBooked = (state, elements) => {
  const bookedSeats = JSON.parse(localStorage.getItem(`${state.date}-${state.time}`));
  elements.seats.forEach((seat) => {
    if (bookedSeats !== null) {
      if (bookedSeats.includes(seat.id)) {
        seat.classList.add('reserved');
      }
    } 
    if (state.bookedSeatsId.includes(seat.id)) {
        seat.classList.remove('selected');
        seat.classList.add('reserved');
    }
  });
};

const renderError = () => {
    const p = document.querySelector('p');
    p.textContent = "Пожалуйста выберите место!"
}

const initView = (state, elements) => onChange(state, (path, value) => {
  switch (path) {
    case 'date':
      renderDates(state, elements);
      renderTime(state, elements)
      renderSeats(state, elements);
      break;
    case 'time':
        renderTime(state, elements);
        renderSeats(state, elements);
      break;
    case 'selectedSeatsId':
      renderSeats(state, elements);
      renderBooked(state, elements);
      break;
    case 'booked':
        renderBooked(state, elements)
      break;

    case 'error':
        if (value === true) {
            renderError();
        }
      break;
  }
});
export default initView;


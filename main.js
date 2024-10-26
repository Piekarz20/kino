document.addEventListener('DOMContentLoaded', () => {
	const selectedSeatsDiv = document.getElementById('selectedSeats');
	const totalPriceDiv = document.getElementById('totalPrice');
	const bookButton = document.getElementById('bookButton');
	const seats = document.querySelectorAll('.seat');

	const seatsPrices = {
		regular: {
			normal: 22.9,
			reduced: 18.9,
		},
		vip: {
			normal: 33.9,
			reduced: 28.9,
		},
	};

	const selectedSeats = {};

	function handleSeatSelection(event, row, seat) {
		const seatId = `${row}/${seat}`;
		const isVip = row === 6 || row === 7;

		if (event.target.checked) {
			event.target.classList.remove('available', 'vip');
			event.target.classList.add('selected');
			selectedSeats[seatId] = {
				row,
				seat,
				isVip,
				isReduced: false,
			};
		} else {
			event.target.classList.remove('selected');
			event.target.classList.add(isVip ? 'vip' : 'available');
			delete selectedSeats[seatId];
		}

		updateCart();
	}

	function updateCart() {
		selectedSeatsDiv.innerHTML = '';
		let total = 0;

		for (const seatId in selectedSeats) {
			const seatData = selectedSeats[seatId];
			const seatItem = document.createElement('div');
			seatItem.className = 'seat-item';

			const seatInfo = document.createElement('div');
			seatInfo.textContent = `Rząd ${seatData.row}, Miejsce ${seatData.seat}`;

			const controls = document.createElement('div');
			controls.className = 'seat-controls';

			const reducedCheckbox = document.createElement('input');
			reducedCheckbox.type = 'checkbox';
			reducedCheckbox.className = 'reduced-checkbox';
			reducedCheckbox.checked = seatData.isReduced;
			reducedCheckbox.addEventListener('change', (e) => {
				seatData.isReduced = e.target.checked;
				updateCart();
			});

			const reducedLabel = document.createElement('p');
			reducedLabel.textContent = 'Ulgowy';

			const price = document.createElement('p');
			price.className = 'seat-price';
			const seatPrice = seatData.isVip
				? seatData.isReduced
					? seatsPrices.vip.reduced
					: seatsPrices.vip.normal
				: seatData.isReduced
				? seatsPrices.regular.reduced
				: seatsPrices.regular.normal;
			price.textContent = `${seatPrice.toFixed(2)} zł`;

			total += seatPrice;

			controls.appendChild(reducedCheckbox);
			controls.appendChild(reducedLabel);
			controls.appendChild(price);

			seatItem.appendChild(seatInfo);
			seatItem.appendChild(controls);
			selectedSeatsDiv.appendChild(seatItem);
		}

		totalPriceDiv.textContent = `Suma: ${total.toFixed(2)} zł`;
	}

	seats.forEach((seat) => {
		const [row, seatNum] = seat.id.split('/').map(Number);
		seat.addEventListener('change', (e) =>
			handleSeatSelection(e, row, seatNum)
		);
	});

	bookButton.addEventListener('click', () => {
		if (Object.keys(selectedSeats).length === 0) {
			alert('Wybierz przynajmniej jedno miejsce!');
			return;
		}

		alert('Rezerwacja została przyjęta!');

		// Clear selections
		for (const seatId in selectedSeats) {
			delete selectedSeats[seatId];
		}

		seats.forEach((seat) => {
			seat.checked = false;
			seat.classList.remove('selected');
			seat.classList.add(seat.classList.contains('vip') ? 'vip' : 'available');
		});

		updateCart();
	});
});

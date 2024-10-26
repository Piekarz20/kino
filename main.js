document.addEventListener('DOMContentLoaded', () => {
	const seats = {
		regular: {
			normal: 22.9,
			reduced: 18.9,
		},
		vip: {
			normal: 33.9,
			reduced: 28.9,
		},
	};

	const selectedSeats = new Map();

	function handleSeatSelection(event, row, seat) {
		const seatId = `${row}/${seat}`;
		const isVip = row === 6 || row === 7;

		if (event.target.checked) {
			event.target.classList.remove('available', 'vip');
			event.target.classList.add('selected');
			selectedSeats.set(seatId, {
				row,
				seat,
				isVip,
				isReduced: false,
			});
		} else {
			event.target.classList.remove('selected');
			event.target.classList.add(isVip ? 'vip' : 'available');
			selectedSeats.delete(seatId);
		}

		updateCart();
	}

	function updateCart() {
		const selectedSeatsDiv = document.getElementById('selectedSeats');
		const totalPriceDiv = document.getElementById('totalPrice');

		selectedSeatsDiv.innerHTML = '';
		let total = 0;

		selectedSeats.forEach((seatData, seatId) => {
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
					? seats.vip.reduced
					: seats.vip.normal
				: seatData.isReduced
				? seats.regular.reduced
				: seats.regular.normal;
			price.textContent = `${seatPrice.toFixed(2)} zł`;

			total += seatPrice;

			controls.appendChild(reducedCheckbox);
			controls.appendChild(reducedLabel);
			controls.appendChild(price);

			seatItem.appendChild(seatInfo);
			seatItem.appendChild(controls);
			selectedSeatsDiv.appendChild(seatItem);
		});

		totalPriceDiv.textContent = `Suma: ${total.toFixed(2)} zł`;
	}

	document.querySelectorAll('.seat').forEach((seat) => {
		const [row, seatNum] = seat.id.split('/').map(Number);
		seat.addEventListener('change', (e) =>
			handleSeatSelection(e, row, seatNum)
		);
	});

	document.getElementById('bookButton').addEventListener('click', () => {
		if (selectedSeats.size === 0) {
			alert('Wybierz przynajmniej jedno miejsce!');
			return;
		}
		alert('Rezerwacja została przyjęta!');
		selectedSeats.clear();
		document.querySelectorAll('.seat').forEach((seat) => {
			seat.checked = false;
			seat.classList.remove('selected');
			seat.classList.add(seat.classList.contains('vip') ? 'vip' : 'available');
		});
		updateCart();
	});
});

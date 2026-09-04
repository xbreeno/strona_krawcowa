const form = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');
const submitBtn = document.getElementById('submitBtn');
const subjectField = document.getElementById('emailSubject');

if (form && statusMessage && submitBtn && subjectField) {
	form.addEventListener('submit', async function (event) {
		event.preventDefault();

		submitBtn.disabled = true;
		submitBtn.textContent = 'Wysyłanie...';
		statusMessage.textContent = '';
		const senderName = document.getElementById('name').value.trim();
		const sentAt = new Date().toLocaleString('pl-PL', {
			dateStyle: 'short',
			timeStyle: 'short'
		});
		subjectField.value = `Wiadomość od ${senderName || 'klienta'} | ${sentAt}`;

		try {
			const response = await fetch('https://formsubmit.co/ajax/breno0932kk@gmail.com', {
				method: 'POST',
				headers: {
					Accept: 'application/json'
				},
				body: new FormData(form)
			});

			if (!response.ok) {
				throw new Error('Wysyłka formularza nie powiodła się.');
			}

			statusMessage.style.color = '#16a34a';
			statusMessage.textContent = 'Wiadomość została wysłana!';
			form.reset();
		} catch (error) {
			statusMessage.style.color = '#dc2626';
			statusMessage.textContent = 'Nie udało się wysłać wiadomości. Spróbuj ponownie.';
		} finally {
			submitBtn.disabled = false;
			submitBtn.textContent = 'Wyślij wiadomość';
		}
	});
}
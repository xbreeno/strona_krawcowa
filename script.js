const form = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');
const submitBtn = document.getElementById('submitBtn');
const subjectField = document.getElementById('emailSubject');

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
	link.addEventListener('click', function (event) {
		event.preventDefault();

		const targetId = link.getAttribute('href');
		const target = targetId === '#' ? document.body : document.querySelector(targetId);

		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
	});
});

const sectionDots = document.querySelectorAll('.section-dot');
const observedSections = document.querySelectorAll('main > section[id]');

if (sectionDots.length && observedSections.length) {
	const sectionObserver = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				sectionDots.forEach(function (dot) {
					dot.classList.toggle('is-active', dot.dataset.section === entry.target.id);
				});
			}
		});
	}, {
		rootMargin: '-35% 0px -55% 0px',
		threshold: 0
	});

	observedSections.forEach(function (section) {
		sectionObserver.observe(section);
	});
}

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
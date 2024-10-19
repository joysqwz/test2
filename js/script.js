// const wrapper = document.querySelector('.wrapper');
// const loginLink = document.querySelector('.login-link');
// const registerLink = document.querySelector('.register-link');

// registerLink.addEventListener('click', ()=> {
// 	wrapper.classList.add('active');
// });

// loginLink.addEventListener('click', ()=> {
// 	wrapper.classList.remove('active');
// });

(function() {
	var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			particles = [],
			properties = {
					bgColor: 'rgba(0, 0, 0, 0)', // Прозрачный фон
					particleImages: [], // Массив для хранения изображений
					particleRadius: 10, // Увеличиваем радиус для изображения
					particleCount: 60,
					particleMaxVelocity: 0.1,
			};

	// Устанавливаем размеры канваса
	function setCanvasSize() {
			canvas.width = innerWidth;
			canvas.height = innerHeight;
	}

	// Добавляем изображения в массив
	for (let i = 1; i <= 19; i++) {
			properties.particleImages.push(`./images/${i}.png`);
	}

	// Создаем массив объектов изображений
	properties.particleImages = properties.particleImages.map(src => {
			const img = new Image();
			img.src = src;
			return img;
	});

	// Устанавливаем стиль канваса
	canvas.style.position = 'absolute';
	canvas.style.top = '0';
	canvas.style.left = '0';
	canvas.style.zIndex = '0';

	document.querySelector('body').appendChild(canvas);

	// Убираем отступы и прокрутку
	// document.body.style.margin = '0';
	// document.body.style.overflow = 'hidden';

	// Устанавливаем размеры канваса при загрузке
	setCanvasSize();

	window.onresize = function() {
			setCanvasSize(); // Обновляем размеры канваса при изменении размера окна
	}

	class Particle {
			constructor() {
					this.x = Math.random() * canvas.width;
					this.y = Math.random() * canvas.height;
					this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
					this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
					this.image = properties.particleImages[Math.floor(Math.random() * properties.particleImages.length)]; // Случайное изображение
			}
			position() {
					this.x + this.velocityX > canvas.width && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
					this.y + this.velocityY > canvas.height && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
					this.x += this.velocityX;
					this.y += this.velocityY;
			}
			reDraw() {
					ctx.drawImage(this.image, this.x - properties.particleRadius, this.y - properties.particleRadius, properties.particleRadius * 2, properties.particleRadius * 2);
			}
			reCalculateLife() {
					// Удаляем логику жизни, если она не нужна
			}
	}

	function reDrawBackground() {
			ctx.fillStyle = properties.bgColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function reDrawParticles() {
			for (var i in particles) {
					particles[i].reCalculateLife();
					particles[i].position();
					particles[i].reDraw();
			}
	}

	function loop() {
			ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка холста
			reDrawBackground();
			reDrawParticles();
			requestAnimationFrame(loop);
	}

	function init() {
			for (var i = 0; i < properties.particleCount; i++) {
					particles.push(new Particle);
			}
			loop();
	}

	// Ждем, пока все изображения загрузятся, перед началом анимации
	let imagesLoaded = 0;
	properties.particleImages.forEach(img => {
			img.onload = () => {
					imagesLoaded++;
					if (imagesLoaded === properties.particleImages.length) {
							init();
					}
			};
			img.onerror = () => {
					console.error(`Ошибка загрузки изображения: ${img.src}`);
			};
	});

}());
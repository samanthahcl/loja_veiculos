document.addEventListener('DOMContentLoaded', () => {
    const carListingsContainer = document.querySelector('.car-listings');
    const filterButtons = document.querySelectorAll('.search-options button');
    const searchInput = document.getElementById('searchInput'); // NOVO: Seleciona o campo de pesquisa
    const searchButton = document.getElementById('searchButton'); // NOVO: Seleciona o botão de pesquisa

    // Número de WhatsApp da loja (formato internacional: 55 + DDD + Número)
    const storeWhatsappNumber = '5583996510055'; // Ex: 5583996510055 para (83) 99651-0055

    const cars = [
        {
            id: 1,
            type: 'usado',
            image: 'imagens/carro1.jpg',
            title: 'C3 TENDENCE 1.5',
            details: '2014 | Manual',
            price: 'R$ 34.900'
        },
        {
            id: 2,
            type: 'usado',
            image: 'imagens/carro2.jpg',
            title: 'COROLLA GLI 1.8 ',
            details: '2017 | Automático',
            price: 'R$ 84.900'
        },
        {
            id: 3,
            type: 'usado',
            image: 'imagens/carro3.jpg',
            title: 'CROSSFOX 1.6',
            details: '2009-2010 | Manual',
            price: 'R$ 34.900'
        },
        {
            id: 4,
            type: 'usado',
            image: 'imagens/carro4.jpg',
            title: 'DUSTER ZEN 1.6',
            details: '2021-2022 | Manual',
            price: 'R$ 75.900'
        },
        {
            id: 5,
            type: 'usado',
            image: 'imagens/carro5.jpg',
            title: 'FORD KA CLASS',
            details: '2013 | Manual',
            price: 'R$ 25.900'
        },
        {
            id: 6,
            type: 'usado',
            image: 'imagens/carro6.jpg',
            title: 'FORD KA SE 1.0',
            details: '2019-2020 | Manual',
            price: 'R$ 49.900'
        },
        {
            id: 7,
            type: 'usado',
            image: 'imagens/carro7.jpg',
            title: 'GOL G5 1.0',
            details: '2012-2013 | Manual',
            price: 'R$ 35.900'
        },
        {
            id: 8,
            type: 'usado',
            image: 'imagens/carro8.jpeg',
            title: 'GOLF GTI 2.0 TSI DSG',
            details: '2016 | Autómatico',
            price: 'R$ 135.000'
        },
        {
            id: 9,
            type: 'usado',
            image: 'imagens/9.jpg',
            title: 'LOGAN EXP 1.6',
            details: '2015 | Manual',
            price: 'R$ 36.900'
        },
        {
            id: 10,
            type: 'usado',
            image: 'imagens/10.jpg',
            title: 'LOGAN DIN 1.6',
            details: '2016 | Manual',
            price: 'R$ 37.900'
        },
        {
            id: 11,
            type: 'usado',
            image: 'imagens/11.jpg',
            title: 'ONIX JOY 1.0',
            details: '2018 | Manual',
            price: 'R$ 47.900'
        },
        {
            id: 12,
            type: 'usado',
            image: 'imagens/12.jpg',
            title: 'ONIX JOY 1.0',
            details: '2019 | Manual',
            price: 'R$ 46.900'
        },
        {
            id: 13,
            type: 'usado',
            image: 'imagens/13.jpg',
            title: 'PALIO FIRE 1.0',
            details: '2017 | Manual',
            price: 'R$ 37.900'
        },
        {
            id: 14,
            type: 'usado',
            image: 'imagens/14.jpg',
            title: 'RENEGADE 1.8',
            details: '2020 | Autómatico',
            price: 'R$ 82.900'
        },
        {
            id: 15,
            type: 'usado',
            image: 'imagens/15.jpg',
            title: 'SANDERO EXP 1.6',
            details: '2011 | Manual',
            price: 'R$ 28.900'
        },
        {
            id: 16,
            type: 'usado',
            image: 'imagens/16.jpg',
            title: 'SAVEIRO CS TREND 1.6',
            details: '2015 | Manual',
            price: 'R$ 47.900'
        },
        {
            id: 17,
            type: 'usado',
            image: 'imagens/17.jpg',
            title: 'S10 CD 4X4 D',
            details: '2021-2022 | Manual',
            price: 'R$ 135.000'
        },
        {
            id: 18,
            type: 'usado',
            image: 'imagens/18.jpg',
            title: 'VOYAGE 1.6 ',
            details: '2021-2022 | Manual',
            price: 'R$ 58.900'
        },
        {
            id: 19,
            type: 'usado',
            image: 'imagens/19.jpg',
            title: 'VOYAGE 1.6 COM GNV',
            details: '2020-2021 | Manual',
            price: 'R$ 50.0000'
        },
    ];

    // Função para exibir carros, agora com um parâmetro de pesquisa opcional
    function displayCars(filterType = 'todos', searchTerm = '') {
        carListingsContainer.innerHTML = ''; // Limpa a lista existente

        let filteredCars = cars;

        // Aplica o filtro por tipo (usado/pesquisar/todos)
        if (filterType !== 'todos') {
            filteredCars = filteredCars.filter(car => car.type === filterType);
        }

        // Aplica o filtro de pesquisa se houver um termo
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
            filteredCars = filteredCars.filter(car =>
                car.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                car.details.toLowerCase().includes(lowerCaseSearchTerm) ||
                car.price.toLowerCase().includes(lowerCaseSearchTerm) // Também pesquisa no preço
            );
        }

        if (filteredCars.length === 0) {
            carListingsContainer.innerHTML = '<p>Nenhum carro encontrado com esses critérios.</p>';
            return;
        }

        filteredCars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');

            const whatsappMessage = `Olá! Tenho interesse no veículo: ${car.title} (${car.details} - ${car.price}). Poderia me dar mais informações?`;
            const whatsappLink = `https://wa.me/${storeWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.title}">
                <div class="car-details">
                    <h3>${car.title}</h3>
                    <p>${car.details}</p>
                    <span class="price">${car.price}</span>
                    <div class="action-buttons">
                        <a href="${whatsappLink}" target="_blank" class="details-whatsapp-btn">
                            <i class="fab fa-whatsapp"></i> Mais informações
                        </a>
                    </div>
                </div>
            `;
            carListingsContainer.appendChild(carCard);
        });
    }

    // Adiciona event listeners aos botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Remove a classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado
            event.target.classList.add('active');

            const filterType = event.target.dataset.filter;
            searchInput.value = ''; // Limpa o campo de pesquisa ao usar os botões de filtro
            displayCars(filterType);
        });
    });

    // NOVO: Adiciona event listener para o botão de pesquisa
    if (searchButton && searchInput) {
        function handleSearch() {
            // Remove a classe 'active' de todos os botões de filtro
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão "Pesquisar" (se ele for um dos filterButtons)
            // Ou apenas garante que nenhum filtro de "usado" esteja ativo.
            // Se você tiver um botão "Pesquisar" na search-options, você pode ativá-lo aqui:
            // const searchFilterButton = document.querySelector('.search-options button[data-filter="pesquisar"]');
            // if (searchFilterButton) searchFilterButton.classList.add('active');

            const searchTerm = searchInput.value;
            // Chama displayCars com 'todos' os tipos, mas com o termo de pesquisa
            displayCars('todos', searchTerm);
        }

        searchButton.addEventListener('click', handleSearch);

        // Opcional: Pesquisar ao pressionar Enter no campo de busca
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Exibir carros inicialmente ao carregar a página
    // Pode começar com 'todos' para ver tudo ou 'usado' como antes.
    displayCars('usado');
});
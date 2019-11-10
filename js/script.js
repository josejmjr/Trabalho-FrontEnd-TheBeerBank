var i = 2;
var todasBebidas = [];
listaAtualizada = JSON.parse(sessionStorage.getItem("listaFovoritos"));



const urls = ['https://api.punkapi.com/v2/beers?page=1&per_page=80',
'https://api.punkapi.com/v2/beers?page=2&per_page=80',
'https://api.punkapi.com/v2/beers?page=3&per_page=80',
'https://api.punkapi.com/v2/beers?page=4&per_page=80',
'https://api.punkapi.com/v2/beers?page=5&per_page=80'];

vainaAPI(urls).then(response =>{
	console.log ("executando!")
})
.catch(error => {

	console.error(error);
});

async function vainaAPI(urls){
	for(let url of urls){
		const response = await fetch(url);
		const lcervejas = await response.json();
		todasBebidas.push(...lcervejas)
	}
}

// verificar se não tem nada e escreve na tela as 80 primeiras
if ($('#search-input').val() == '') {
	fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=80`)
		.then(function (resp) {
			return resp.json();
		})
		.then(function (data) {
			escrever(data);
		});
};


$(window).scroll(function () {
	if ($(window).scrollTop() == $(document).height() - $(window).height() && $('#search-input').val() === "") {
		// ajax call get data from server and append to the div
		if (i < 6) {
			fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`)
				.then(function (resp) {
					return resp.json();
				})
				.then(function (data) {
					escrever(data);
				});
			i++;
		}
	}
});

function escrever(data) {
	if (data.length === 0) {
		this.showError('Esta Cerveja não existe na nossa base de Cervejas!')
	} else {
		$('#error').remove()
		data.forEach(element => {
			if (element.image_url == null) {
				element.image_url = "http://www.portaldapropaganda.com.br/noticias/wp-content/uploads/2018/03/Coca-Cola-600ml-Vidro-decart%C3%A1vel.png"
			}

			let randomBeers = [];
			randomBeers.push(todasBebidas[Math.floor(Math.random() * todasBebidas.length)]);
			randomBeers.push(todasBebidas[Math.floor(Math.random() * todasBebidas.length)]);
			randomBeers.push(todasBebidas[Math.floor(Math.random() * todasBebidas.length)]);

			for(var i=0; i<3; i++){
				if (randomBeers[i].image_url == null) {
					randomBeers[i].image_url = "http://www.portaldapropaganda.com.br/noticias/wp-content/uploads/2018/03/Coca-Cola-600ml-Vidro-decart%C3%A1vel.png"
				}
			}


			$('#lCervejas').append(
				`
		<div class="col-lg-4 col-md-6 col-sm-12 mt-4 grow">
		<a><i class="fa fa-star-o two mt-3 mr-4" id="id${element.id}" aria-hidden="true" onclick="addFavo(${element.id})"></i></a> 
		<div class="card" type="button"  data-toggle="modal" data-target="#modalQuickView${element.id}">
			<img class="card-img-top smallimg m-3" src="${element.image_url}">
			<div class="card-body">
				<h5 class="card-title">${element.name}</h5>
				<p class="card-text">${element.tagline}</p>
				</div>
				</div>
			</div>

				<!-- Modal inicio: modalQuickView -->
				
				<div class="modal fade" id="modalQuickView${element.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg" role="document">
						<div class="modal-content">
							<div class="modal-body p-5">

							<!-- X PRA FECHAR O POP UP -->

							<button type="button" class="close" data-dismiss="modal">
							   <span>&times;</span>
							</button>
								   
							<!--/.X PRA FECHAR O POP UP-->

								<div class="row">
									<div class="col-sm-4">
											 <!--Carousel Wrapper-->
									   <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">
											
											 <!--COLOCAR A IMAGEM DA CERVEJA PRINCIPAL-->
											<div class="carousel-inner" role="listbox" id="imgmodal">
												<div class="carousel-item active">
													<img class="d-block w-100" src="${element.image_url}">
												</div>

											</div>
								   <!--/.FIM DA CERVEJA PRINCIPAL-->

									   </div>


									<!--/.Carousel Wrapper-->
								  </div>
										<div class="col-sm-8 text-left">
											<h3 id="nomeprodutomodal">${element.name} </h3>
											<h4 class="h4-responsive">
												<span class="text-muted">
													<h6>${element.tagline}</h6>
												</span>
												<hr/>
												<span>
												<h5 class ="title mt-3">IBU: ${element.ibu}  ABV: ${element.abv}%   EBC: ${element.ebc}</h5>
												</span>
											</h4>

											<!--Accordion wrapper-->
											<div class="accordion md-accordion font-size" id="accordionEx" role="tablist" aria-multiselectable="true">
												<!-- Card body -->
												<div id="collapseOne1" class="collapse show" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
													<div>
													${element.description}
													<h6 class ="title" style=text-align:left id="bestserved"><strong>Best Served With </strong></h6>
													 <ul style=text-align:left>
													   ${element.food_pairing
													   .map(ingredient => `<li>${ingredient}</li>`)
													   .join("")}

													 </ul>
													</div>
													
												</div>

										  </div>
										 
									  </div>
  
									 
									  
								  </div>

								<div class="row mt-3 mb-3">
									<h4 class ="title" id="alsolike">You might also like:</h4>
								</div>

								<div class="container">
									<div class="row">

										<div class="col-sm-4" data-target="#modalQuickView${randomBeers[0].id}">
											<div class="border height p-3">	
												<img class="card-img-top m-3 p-1 smallimg" src="${randomBeers[0].image_url}" class="img-fluid" alt="${randomBeers[0].name}" />
												<div id="">
													<h5 class="card-title" style="color: grey">${randomBeers[0].name}</h5>
												</div>
											</div>
										</div>
										
										<div class="col-sm-4" id="modalQuickView${randomBeers[1].id}">
											<div class="border height p-3">	
												<img class="card-img-top m-3 p-1 smallimg" src="${randomBeers[1].image_url}" class="img-fluid" alt="${randomBeers[1].name}" />
												<div id="">
													<h5 class="card-title" style="color: grey">${randomBeers[1].name}</h5>
												</div>
											</div>
										</div>

										<div class="col-sm-4" id="modalQuickView${randomBeers[2].id}">
											<div class="border height p-3">	
												<img class="card-img-top m-3 p-1 smallimg" src="${randomBeers[2].image_url}"class="img-fluid" alt="${randomBeers[2].name}" />
												<div id="">
													<h5 class="card-title" style="color: grey">${randomBeers[2].name}</h5>
												</div>
											</div>
										</div>

									</div>
								</div>


							  </div>
						  </div>
					  </div>
				  </div>

												<!-- FIM DO MODAL 
												-->
	`

			)

		});
	}
}



// Auto complete
var options = {
	url: function (q) {
		return "https://api.punkapi.com/v2/beers?beer_name=" + q;
	},
	getValue: "name",

	requestDelay: 1000
};

$("#search-input").easyAutocomplete(options);

class BeerAPI {
	constructor() {
		this.apiUrl = 'https://api.punkapi.com/v2/beers'
	}

	// Busca
	searchByName(name, callback) {
		const url = this.apiUrl
		const params = {
			'beer_name': name
		}

		$.getJSON(url, params)
			.done((data) => {
				callback(data)
			})
			.fail((response) => {
				callback(null)
			})
	}
}

class BeerSearch {
	constructor() {
		this.BeerAPI = new BeerAPI()
		this.elements = {
			'form': $('#search-form'),
			'input': $('#search-input'),
			'results': $('#lCervejas')
		}

		this.registerEvents()
	}

	registerEvents() {
		this.elements.form.on('submit', (e) => {
			e.preventDefault()
			const userInput = this.elements.input.val().trim();
			this.BeerAPI.searchByName(
				userInput, (data) => {
					this.showResults(data)
				}
			)
		})
	}


	// escreve na tela resultado
	showResults(data) {
		this.elements.results.html('')
		if (data.length === 0) {
			this.showError('Esta Cerveja não existe na nossa base de Cervejas!')
		} else {
			$('#error').remove()
			data.forEach(beer => {
				if (beer.image_url == null) {
					beer.image_url = "http://www.portaldapropaganda.com.br/noticias/wp-content/uploads/2018/03/Coca-Cola-600ml-Vidro-decart%C3%A1vel.png"
				}

				let randomBeersBusca = [];
				randomBeersBusca.push(todasBebidas[Math.floor(Math.random() * todasBebidas.length)]);
				randomBeersBusca.push(todasBebidas[Math.floor(Math.random() * todasBebidas.length)]);
				randomBeersBusca.push(todasBebidas[Math.floor(Math.random() * todasBebidas.length)]);


				for(var i=0; i<3; i++){
					if (randomBeersBusca[i].image_url == null) {
						randomBeersBusca[i].image_url = "http://www.portaldapropaganda.com.br/noticias/wp-content/uploads/2018/03/Coca-Cola-600ml-Vidro-decart%C3%A1vel.png"
					}
				}
	

				this.elements.results.append(`
					<div class="col-lg-4 col-md-6 col-sm-12 mt-4 grow">
					<a><i class="fa fa-star-o two mt-3 mr-4" id="id${beer.id}" aria-hidden="true" onclick="addFavo(${beer.id})"></i></a> 
					<div class="card" type="button"  data-toggle="modal" data-target="#modalQuickView${beer.id}">
						<img class="card-img-top smallimg m-3" src="${beer.image_url}">
						<div class="card-body">
							<h5 class="card-title">${beer.name}</h5>
							<p class="card-text">${beer.tagline}</p>
							</div>
							</div>
						</div>
			
							<!-- Modal inicio: modalQuickView -->
							
							<div class="modal fade" id="modalQuickView${beer.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-lg" role="document">
									<div class="modal-content">
										<div class="modal-body p-5">
			
										<!-- X PRA FECHAR O POP UP -->
			
										<button type="button" class="close" data-dismiss="modal">
										   <span>&times;</span>
										</button>
											   
										<!--/.X PRA FECHAR O POP UP-->
			
											<div class="row">
												<div class="col-sm-4">
														 <!--Carousel Wrapper-->
												   <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">
														
														 <!--COLOCAR A IMAGEM DA CERVEJA PRINCIPAL-->
														<div class="carousel-inner" role="listbox" id="imgmodal">
															<div class="carousel-item active">
																<img class="d-block w-100" src="${beer.image_url}">
															</div>
			
														</div>
											   <!--/.FIM DA CERVEJA PRINCIPAL-->
			
												   </div>
			
			
												<!--/.Carousel Wrapper-->
											  </div>
													<div class="col-sm-8 text-left">
														<h3 id="nomeprodutomodal">${beer.name} </h3>
														<h4 class="h4-responsive">
															<span class="text-muted">
																<h6>${beer.tagline}</h6>
															</span>
															<hr/>
															<span>
															<h5 class ="title mt-3">IBU: ${beer.ibu}  ABV: ${beer.abv}%   EBC: ${beer.ebc}</h5>
															</span>
														</h4>
			
														<!--Accordion wrapper-->
														<div class="accordion md-accordion font-size" id="accordionEx" role="tablist" aria-multiselectable="true">
															<!-- Card body -->
															<div id="collapseOne1" class="collapse show" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
																<div>
																${beer.description}
																<h6 class ="title" style=text-align:left id="bestserved"><strong>Best Served With </strong></h6>
																 <ul style=text-align:left>
																   ${beer.food_pairing
																   .map(ingredient => `<li>${ingredient}</li>`)
																   .join("")}
			
																 </ul>
																</div>
																
															</div>
			
													  </div>
													 
												  </div>
			  
												 
												  
											  </div>
			
											<div class="row mt-3 mb-3">
												<h4 class ="title" id="alsolike">You might also like:</h4>
											</div>
			
											<div class="container">
												<div class="row">
			
													<div class="col-sm-4" data-target="#modalQuickView${randomBeersBusca[0].id}">
														<div class="border height p-3">	
															<img class="card-img-top m-3 p-1 smallimg" src="${randomBeersBusca[0].image_url}" class="img-fluid" alt="${randomBeersBusca[0].name}" />
															<div id="">
																<h5 class="card-title" style="color: grey">${randomBeersBusca[0].name}</h5>
															</div>
														</div>
													</div>
													
													<div class="col-sm-4" id="modalQuickView${randomBeersBusca[1].id}">
														<div class="border height p-3">	
															<img class="card-img-top m-3 p-1 smallimg" src="${randomBeersBusca[1].image_url}" class="img-fluid" alt="${randomBeersBusca[1].name}" />
															<div id="">
																<h5 class="card-title" style="color: grey">${randomBeersBusca[1].name}</h5>
															</div>
														</div>
													</div>
			
													<div class="col-sm-4" id="modalQuickView${randomBeersBusca[2].id}">
														<div class="border height p-3">	
															<img class="card-img-top m-3 p-1 smallimg" src="${randomBeersBusca[2].image_url}"class="img-fluid" alt="${randomBeersBusca[2].name}" />
															<div id="">
																<h5 class="card-title" style="color: grey">${randomBeersBusca[2].name}</h5>
															</div>
														</div>
													</div>
			
												</div>
											</div>
			
			
										  </div>
									  </div>
								  </div>
							  </div>
			
															<!-- FIM DO MODAL  -->			
					  `)
			})
		}
	}


	showError(message) {
		let alert = $('#error')

		if (alert.length === 0) {
			this.elements.form.before('<div class="alert alert-danger" id="error"></div>')
			alert = $('#error')
		}

		alert.text(message)
	}
}

const beerForm = new BeerSearch()

//Guarda os favoritos
var listaFavoritos = [];

function addFavo(elemento) {
	if (typeof (Storage) !== "undefined") {
		if (sessionStorage.listaFavoritos) {
			listaFavoritos = JSON.parse(
				sessionStorage.getItem("listaFavoritos"));
		} else {
			listaFavoritos = [];
		}
		if (listaFavoritos.includes(elemento)) {
			listaFavoritos.splice(listaFavoritos.indexOf(elemento), 1);
			console.log('Bebida deletada dos favoritos')
			$(`#id${elemento}`).removeClass('fa-star').addClass('fa-star-o');
		} else {
			listaFavoritos.push(elemento)
			console.log('Bebida adicionada aos favoritos')
			$(`#id${elemento}`).removeClass('fa-star-o').addClass('fa-star');
			console.log(`id${elemento}`)
		}

		sessionStorage.listaFavoritos = JSON.stringify(listaFavoritos);
	}
	listaAtualizada = JSON.parse(sessionStorage.getItem("listaFavoritos"));

}

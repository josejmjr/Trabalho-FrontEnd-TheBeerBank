var favoritos = [];
listaFovoritos = JSON.parse(sessionStorage.getItem("listaFovoritos"));
listaAtualizada = JSON.parse(sessionStorage.getItem("listaFovoritos"));
console.log(listaFovoritos)
listaFovoritos.forEach(element => {
    fetch('https://api.punkapi.com/v2/beers/'+element)
    .then(function(response){
        return response.json();
    }).then(function(data){
   escrever(data)
console.log(favoritos)
    
});
})


function escrever(arr){
           // trta cervejas sem foto
arr.forEach(element => {
if (element.image_url == null) {
    element.image_url = "https://decisaoentrega.fbitsstatic.net/img/p/refrigerante-coca-cola-vidro-250ml-269493/438806.jpg"
}
$('#fCerveja').append(
	`
	<div class="col-lg-4 col-md-6 col-sm-12 mt-4 scrollable-data grow teste2" style="height:485px;">
		<div class="card" button type="button" data-toggle="modal" data-target="#modalQuickView${element.id}">
			<a><i class="fa fa-star-o two mt-3 mr-4" id="id-${element.id}" aria-hidden="true" onclick="addFavo(${element.id})"></i></a>	
			<img class="card-img-top m-3 smallimg" src="${element.image_url}">
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

										<div class="col-sm-4" data-target="#modalQuickView${Math.floor(Math.random(element.id) * 10)}">
											<div class="border height p-3">	
												<img class="card-img-top m-3 p-1 smallimg" src="${element.image_url}" class="img-fluid" alt="${element.name}" />
												<div id="">
													<h5 class="card-title" style="color: grey">${element.name}</h5>
												</div>
											</div>
										</div>
										
										<div class="col-sm-4" id="modalQuickView${Math.floor(Math.random(element.id) * 10)}">
											<div class="border height p-3">	
												<img class="card-img-top m-3 p-1 smallimg" src="${element.image_url}" class="img-fluid" alt="${element.name}" />
												<div id="">
													<h5 class="card-title" style="color: grey">${element.name}</h5>
												</div>
											</div>
										</div>

										<div class="col-sm-4" id="modalQuickView${Math.floor(Math.random(element.id) * 10)}">
											<div class="border height p-3">	
												<img class="card-img-top m-3 p-1 smallimg" src="${element.image_url}"class="img-fluid" alt="${element.name}" />
												<div id="">
													<h5 class="card-title" style="color: grey">${element.name}</h5>
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

if(listaAtualizada !== ""){
	console.log("entrei INT")
listaAtualizada.forEach(element => {
	
	$(`#id-${element}`).removeClass('fa fa-star-o').addClass('fa fa-star two');	
});
}})
}



function addFavo(elemento) {
	console.log('tona funcao de favoritos')
	if(typeof(Storage) !== "undefined") {
		if (sessionStorage.listaFovoritos) {
			listaFovoritos = JSON.parse(
				sessionStorage.getItem("listaFovoritos"));
		} else {
			listaFovoritos = [];
		}		
			if(listaFovoritos.includes(elemento)){
				listaFovoritos.splice(listaFovoritos.indexOf(elemento),1);
                console.log('deletei dos favoritos uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
                location.reload();
			}else{
				listaFovoritos.push(elemento)
                console.log('adicionei nos favoritos ooooooo')
                location.reload();
			}			
			
		sessionStorage.listaFovoritos = JSON.stringify(listaFovoritos);
	}
	var fav = listaFovoritos.filter(function (cerva){ return listaFovoritos.includes(cerva.id)});
		console.log(fav)
}
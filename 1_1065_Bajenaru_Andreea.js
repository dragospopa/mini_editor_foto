(function () {
						var canvas = document.getElementById("my-canvas"),
						context = canvas.getContext("2d"),
						img = document.createElement("img"),
						buton_pensula = document.getElementById("pensula"),
						buton_pipeta = document.getElementById("pipeta"),
						buton_dreptunghi = document.getElementById("dreptunghi"),
						buton_linie = document.getElementById("linie"),
						buton_selectie = document.getElementById("selectie"),
						buton_desenare = document.getElementById("desenare"),
						mouseDown = false,
						brushColor = "rgb(0, 0, 0)",
						hasText = true,
						x_initial=0,
						y_initial=0,

						//Functie pentru stergerea canvasului

						clearCanvas = function () {
							if (hasText) {
								context.clearRect(0, 0, canvas.width, canvas.height);
								hasText = false;
							}
						};

						// Functie pentru executarea de sunete

						function sunet(src) {
    						this.sound = document.createElement("audio");
    						this.sound.src = src;
    						this.sound.setAttribute("preload", "auto");
    						this.sound.setAttribute("controls", "none");
    						this.sound.style.display = "none";
    						document.body.appendChild(this.sound);
    						this.play = function(){
       							this.sound.play();
    						}
    						this.stop = function(){
        						this.sound.pause();
    						}    
						}

							
						// Adaugarea intructiunilor pe canvas

						context.fillText("Trage o imagine in canvas", 240, 200);
						context.fillText("Apasa pe pipeta si apoi pe un loc din imagine ca se setezi culoarea pensulei.", 240, 220);
						
						// Incarcarea imaginii

						img.addEventListener("load", function () {
							clearCanvas();
							context.drawImage(img, 0, 0);
						}, false);
						
						// Eveniment care detecteaza coborarea mouse-ului pe canvas si care retine pozitia acestuia

						canvas.addEventListener("mousedown", function (evt) {
										clearCanvas();
										mouseDown = true;
										context.beginPath();
										var x = evt.layerX;
										var y = evt.layerY;
										x_initial=x;
										y_initial=y;
										context.moveTo(x,y);
								}, false);

						// Eveniment la schimbarea starii chechbox-ului pipeta

						pipeta.addEventListener("change", function (e) {
							// Executarea de sunete
							var check_sunet = new sunet("Media/pipeta.wav");
							check_sunet.play(); 		
							buton_selectie.checked=false;
								// Detectarea evenimentului de ridicare a mouse-ului
							canvas.addEventListener("mouseup", function (evt) {
									mouseDown = false;
									var colors = context.getImageData(evt.layerX, evt.layerY, 1, 1).data;
									// Retinerea culorii de la coordonatele respective numai in cazul in care pipeta e selectata
									if(buton_pipeta.checked==true) {
										brushColor = "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")";
										buton_pipeta.checked=false;
									}
							}, false);
						}, false);

						// Eveniment la schimbarea starii chechbox-ului pensula
						
						pensula.addEventListener("change", function(e){ 
							// Executarea de sunete
							var pensula_sunet = new sunet("Media/pensula.wav");
							var desenare_sunet = new sunet("Media/desenare_pensula.wav");
							pensula_sunet.play(); 

							// In cazul in care se selecteaza functia de desenare prin pensula, toate celalate functii sunt deselectate
							if (buton_pensula.checked==true)
							{
								buton_dreptunghi.checked=false;
								buton_linie.checked=false;
								buton_selectie.checked=false;
							}				

							// Oprirea desenarii in momentul in care se ridica mouse-ul
							canvas.addEventListener("mouseup", function oprire_pensula (evt) {
								mouseDown=false;
							});

							// Eveniment de miscare a mouse-ului - desenare atata timp cat mouse-ul este apasat si pensula selectata
							canvas.addEventListener("mousemove", function desenare_pensula (evt) {
								if (mouseDown && buton_pensula.checked==true) {
									//Sunetul se executa pe toata durata desenarii
									desenare_sunet.play();
									// Se utilizeaza culoarea prina prin pipeta - daca nu a fost prins nimic, se utilizeaza culoarea neagra
									context.strokeStyle = brushColor;								
									context.lineWidth = 20;
									context.lineJoin = "round";
									context.lineTo(evt.layerX+1, evt.layerY+1);
									context.stroke();
								}
							}); 

						});

						// Eveniment la schimbarea starii chechbox-ului linie

						linie.addEventListener("change", function(e) {
							// Executarea de sunete
							var linie_sunet = new sunet("Media/linie.wav");
							var desenare_sunet = new sunet("Media/desenare_linie.wav");
							linie_sunet.play(); 

							// In cazul in care se selecteaza functia de desenare prin linie, toate celalate functii sunt deselectate
							if (buton_linie.checked==true)
							{
								buton_dreptunghi.checked=false;
								buton_pensula.checked=false;
								buton_selectie.checked=false;
							}

							// Eveniment de miscare a mouse-ului - sunetul se executa pe toata durata desenarii
							canvas.addEventListener("mousemove", function desenare_linie(evt) {
								if (mouseDown && buton_linie.checked==true) {
									desenare_sunet.play();
								}
							});

							// Eveniment de ridicare a mouse-ului - trasarea liniei in functie de coordonatele initiale si cele din momentul eliberarii click-ului
							canvas.addEventListener("mouseup", function desenare_linie_1(evt) {
								mouseDown=false;
								if(buton_linie.checked==true) {
									desenare_sunet.play();
									context.strokeStyle = brushColor;								
									context.lineWidth = 5;
									context.lineTo(evt.layerX+1, evt.layerY+1);
									context.closePath();
									context.stroke();
								}
							});
						});

						// Eveniment la schimbarea starii chechbox-ului dreptunghi

						dreptunghi.addEventListener("change", function(e) {
							// Executarea de sunete
							var dreptunghi_sunet = new sunet("Media/dreptunghi.wav");
							var desenare_sunet = new sunet("Media/desenare_dreptunghi.wav");
							dreptunghi_sunet.play(); 

							// In cazul in care se selecteaza functia de desenare prin dreptunghi, toate celalate functii sunt deselectate
							if (buton_dreptunghi.checked==true)
							{
								buton_linie.checked=false;
								buton_pensula.checked=false;
								buton_selectie.checked=false;
							}

							// Eveniment de miscare a mouse-ului - sunetul se executa pe toata durata desenarii
							canvas.addEventListener("mousemove", function desenare_dreptunghi(evt) {
								if (mouseDown && buton_dretpunghi.checked==true) {
									desenare_sunet.play();
								}
							});

							// Eveniment de ridicare a mouse-ului - trasarea dreptunghiului in functie de coordonatele initiale si cele din momentul eliberarii click-ului
							canvas.addEventListener("mouseup", function desenare_dreptunghi(evt) {
								mouseDown=false;
								if(buton_dreptunghi.checked==true){
									desenare_sunet.play();
									context.strokeStyle = brushColor;							
									context.lineWidth = 5;
									var x = evt.layerX+1;
									var y = evt.layerY+1;
									context.rect(Math.min(x_initial,x),Math.min(y_initial,y),Math.abs(x_initial-x),Math.abs(y_initial-y));
									context.stroke();
								}
							});

						});

						// Eveniment la schimbarea starii chechbox-ului selectie

						selectie.addEventListener("change", function(e){
							// Executarea de sunete
							var selectie_sunet = new sunet("Media/selectie.wav");
							var desenare_sunet = new sunet("Media/desenare_selectie.wav");
							selectie_sunet.play();

							// In cazul in care se selecteaza functia de selectie, toate celalate functii sunt deselectate
							if(buton_selectie.checked==true)
							{
								buton_pensula.checked=false;
								buton_linie.checked=false;
								buton_dreptunghi.checked=false;
								buton_desenare.checked=false;
							}

							// Eveniment de miscare a mouse-ului - sunetul se executa pe toata durata desenarii
							canvas.addEventListener("mousemove", function desenare_selectie(evt) {
								if (mouseDown && buton_selectie.checked==true) {
									desenare_sunet.play();
								}
							});


							// Eveniment de ridicare a mouse-ului - trasarea zonei selectate in functie de coordonatele initiale si cele din momentul eliberarii click-ului
							canvas.addEventListener("mouseup", function desenare_selectie(evt) {
								mouseDown=false;
								if(buton_selectie.checked==true){
									desenare_sunet.play();
									context.strokeStyle = "#000000";							
									context.lineWidth = 5;
									var x = evt.layerX+1;
									var y = evt.layerY+1;
									context.rect(Math.min(x_initial,x),Math.min(y_initial,y),Math.abs(x_initial-x),Math.abs(y_initial-y));
									context.stroke();
									// Dupa desenarea dreptunghiului care inconjoara selectia, se sterge ce se afla inauntrul acestuia
									context.clearRect(Math.min(x_initial,x),Math.min(y_initial,y),Math.abs(x_initial-x),Math.abs(y_initial-y));
								}
							});
						});

						// Eveniment pentru drop

						canvas.addEventListener("dragover", function (evt) {
							evt.preventDefault();
						}, false);

						// Eveniment pentru dragare

						canvas.addEventListener("drop", function (evt) {
							// Executarea de sunete
							var drop_sunet = new sunet("Media/drop.wav");
							drop_sunet.play();

							// Procesarea fisierului primit prin dragare
							var files = evt.dataTransfer.files;
							if (files.length > 0) {
								var file = files[0];
								if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
									var reader = new FileReader();
									// Note: addEventListener doesn't work in Google Chrome for this event
									reader.onload = function (evt) {
										img.src = evt.target.result;
									};
									reader.readAsDataURL(file);
								}
							}
							evt.preventDefault();
						}, false);
						
						// Eveniment pentru salvarea imaginii

						var saveImage = document.getElementById("salvare");
						saveImage.addEventListener("click", function (evt) {
							// Executarea de sunete
							var salvare_sunet = new sunet("Media/salvare.wav");
							salvare_sunet.play();
							// Deschiderea unei noi ferestre prin care sa se downloadeze imaginea
							window.open(canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
							evt.preventDefault();
						}, false);
						
						// Eveniment pentru stergerea modificarilor aduse pozei 

						stergere.addEventListener("click", function(e) {
							// Executarea de sunete
							var stergere_sunet = new sunet("Media/stergere.wav");
							stergere_sunet.play();
							clearCanvas();
							context.drawImage(img, 0, 0);
						});

						// Eveniment pentru executarea de sunete la selectarea checkboxului de desenare

						desenare.addEventListener("click", function(e) {
							var desenare_sunet = new sunet("Media/desenare.wav");
							desenare_sunet.play();
						});

					})();
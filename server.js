//importo le librerie che utilizzero'
var express = require('express');
var util = require('util');
var bind = require('bind');
var bodyParser = require('body-parser');
var app = express();
//richiedo anche la mia libreria
var lib = require('./model.js');

//aggiungo dipendenti come esempio
lib.addEmployee(1, "Giacomo", "Rossi", 5, 1800);
lib.addEmployee(27, "Giuseppe", "Verdi", 2, 1200);
lib.addEmployee(10, "Mario", "Bianchi", 10, 3500);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/static"));

app.set('port', (process.env.PORT || 5000));

//verra' chiamata al primo accesso
app.get('/', function (request, response) {
	bind.toFile(
        //richiamo il template
        './template.tpl',
        {
            visible: false //il form non dev'essere visibile al primo ingresso
        },
        function (data) {
			response.writeHead(200, {'Content-Type' : 'text/html'});
			response.end(data);
		}
	);
});

//chiamata quando devo eliminare un dipendente
app.post('/deleteEmployee', function (request, response) {
	if (typeof request.body !== 'undefined' && request.body) {
		if (typeof request.body.idEmployeeToFind !== 'undefined' &&
            request.body.idEmployeeToFind) {
            var id = parseInt(request.body.idEmployeeToFind, 10),
                res = lib.deleteEmployee(id);
            if (res == 1) {
                console.log("[/deleteEmployee] eliminazione ok");
            } else {
                console.log("[/deleteEmployee] tenta di eliminare un dipendente inesistente");
            }
		} else {
			console.log("[/deleteEmployee]: errore nell'eliminare un dipendente");
		}
	} else {
		console.log("[/deleteEmployee] errore 2 nell'eliminare un dipendente");
	}
    //restituiso il template con il form non visibile
	bind.toFile(
		'./template.tpl',
        {
            visible : false
        },
		function (data) {
			response.writeHead(200, {'Content-Type' : 'text/html'});
			response.end(data);
		}
	);
});

//chiamata quando devo cercare un dipendente
app.post('/findEmployee', function (request, response) {
	if (typeof request.body !== 'undefined' && request.body) {
		if (typeof request.body.idEmployeeToFind !== 'undefined' &&
            request.body.idEmployeeToFind) {
			var id = parseInt(request.body.idEmployeeToFind, 10),
                e = lib.findEmployee(id),
                firstName,
                lastName,
                level,
                salary;
            if (e !== null) {
                //se trovo un dipendente con l'id dato, allora mostro le sue informazioni
                bind.toFile(
                    './template.tpl',
                    {
                        visible : true,
                        id : e.getId(),
                        firstName : e.getFirstName(),
                        lastName : e.getLastName(),
                        level : e.getLevel(),
                        salary : e.getSalary()
                    },
                    function (data) {
                        response.writeHead(200, {'Content-Type' : 'text/html'});
                        response.end(data);
                    }
                );
                console.log("[/findEmployee]: trovato: " + e.getId());
            } else {
                //altrimenti, se non trovo un dipendente con l'id passato, mostro il form vuoto
                bind.toFile(
                    './template.tpl',
                    {
                        visible : true
                    },
                    function (data) {
                        response.writeHead(200, {'Content-Type' : 'text/html'});
                        response.end(data);
                    }
                );
                console.log("[/findEmployee]: dipendente non trovato"); 
            }
        } else {
			console.log("[/findEmployee]: errore nel cercare un dipendente");
		}
	} else {
		console.log("[/findEmployee]: errore 2 nel cercare un dipendente");
	}
});

//funzione chiamata quando devo aggiungere o modificare un dipendente
app.post('/addEmployee', function (request, response) {
    if (typeof request.body !== 'undefined' && request.body) {
        var id,
            newid,
            newfirstName,
            newlastName,
            newlevel,
            newsalary,
            e,
            ok = true;
        //controllo se mi ha passato o meno l'id
        if (typeof request.body.idEmployee !== 'undefined' &&
            request.body.idEmployee) {
			id = request.body.idEmployee;
            //se mi e' arrivata una stringa vuota prendo io un nuovo id
			if (id == "") {
                newid = lib.getNextId();
            } else {
                //altrimenti utlizzo quello che mi ha passato
                newid = parseInt(id, 10);
            }
		} else {
            //se mi e' arrivato qualcosa di strano prendo io un nuovo id
            newid = lib.getNextId();
		}

        
        //faccio il controllo su tutti i campi per vedere se sono arrivati corretti o meno
        
        if (typeof request.body.firstNameEmployee !== 'undefined' &&
           request.body.firstNameEmployee) {
            newfirstName = request.body.firstNameEmployee;
        } else {
            ok = false;
        }

        if (typeof request.body.lastNameEmployee !== 'undefined' &&
           request.body.lastNameEmployee) {
            newlastName = request.body.lastNameEmployee;
        } else {
            ok = false;
        }

        if (typeof request.body.levelEmployee !== 'undefined' &&
           request.body.levelEmployee) {
            newlevel = parseInt(request.body.levelEmployee, 10);
        } else {
            ok = false;
        }

        if (typeof request.body.salaryEmployee !== 'undefined' &&
           request.body.salaryEmployee) {
            newsalary = parseInt(request.body.salaryEmployee, 10);
        } else {
            ok = false;
        }
        
        //se non ho avuto errori
        if (ok) {
            //controllo se il dipendente e' gia presente in elenco o meno
            e = lib.findEmployee(newid);
            if (e !== null) {
                //dipendente presente, devo solo modificare
                e.setFirstName(newfirstName);
                e.setLastName(newlastName);
                e.setLevel(newlevel);
                e.setSalary(newsalary);
                //mostro il dipendente con i campi modificati
                bind.toFile(
                    './template.tpl',
                    {
                        visible : true,
                        id : newid,
                        firstName : newfirstName,
                        lastName : newlastName,
                        level : newlevel,
                        salary : newsalary
                    },
                    function (data) {
                        response.writeHead(200, {'Content-Type' : 'text/html'});
                        response.end(data);
                    }
                );
                
                console.log("[/addEmployee]: Dipendente modificato!");
            } else {
                //devo aggiungere un nuovo dipendente
                lib.addEmployee(newid, newfirstName, newlastName, newlevel, newsalary);
                //mostro il dipendente con i nuovi campi
                bind.toFile(
                    './template.tpl',
                    {
                        visible : true,
                        id : newid,
                        firstName : newfirstName,
                        lastName : newlastName,
                        level : newlevel,
                        salary : newsalary
                    },
                    function (data) {
                        response.writeHead(200, {'Content-Type' : 'text/html'});
                        response.end(data);
                    }
                );
                
                console.log("[/addEmployee]: Dipendente aggiunto!");
            }
        } else {
            response.writeHead(400, {});
			response.end("[/addEmployee]: I dati inviati non erano corretti");
        }
	} else {
		console.log("[/addEmployee]: errore 2 nell'aggiungere un dipendente");
	}
});

app.listen(app.get('port'), function () {
    "use strict";
    console.log('Node app is running on port', app.get('port'));
});
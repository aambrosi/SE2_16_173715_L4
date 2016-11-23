# SE2_16_173715_L4
Esercizio di laboratorio Software Engineering: Employee

MIGLIORIE:
Quando viene cercato un dipendente tramite id ma il form è ancora nascosto, ho fatto in modo che il form venga scoperto e che i dati siano visibili se il dipendente esiste o che venga fatto vedere un form vuoto se non esiste.

Quando viene aggiunto un dipendente senza che sia specificato l'id, dopo averlo aggiunto modifico il campo id del form facendo vedere qual'è l'id che è stato assegnato al dipendente in modo che sia poi raggiungibile se si vuole vedere/modificare i dati.

TEST:

Per prima cosa avviare il server tramite il comando "node server.js".
Successivamente sarà possibile raggiungere la pagina "127.0.0.1:5000" e interagire con il sistema.

Sono già inseriti all'avvio 3 dipendenti:
id  nome        cognome    livello    stipendio

1   "Giacomo"   "Rossi"    5          1800
27  "Giuseppe"  "Verdi"    2          1200
10  "Mario"     "Bianchi"  10         3500

Utilizzare questi all'inizio per vedere i risultati con la ricerca o dopo averne eliminato uno vedere che ad una ricerca con l'id eliminato non ritorna nulla.
Lasciare l'id vuoto nell'inserimento di un nuovo dipendente per vedere che prenderà come id quello massimo + 1.
Provare a lasciare campi vuoti o ad inserire valori negativi di id/stipendio/livello.
Sovrascrivere dipendenti.
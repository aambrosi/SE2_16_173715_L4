<html>
    <head>
        <title>SE16 - Lab4</title>
        <script src="js/script.js" type="text/javascript"></script>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <h2>
            Software Engineer 2016: Lab4
        </h2>
        <br>
        <form method="post">
            Inserisci ID dipendente:  
            <input type="number" id="idEmployeeToFind" name="idEmployeeToFind" placeholder="1">
            <input type="button" value="Cerca"   onclick="findEmployee(this.form);" name="Cerca"> 
            <input type="button" value="Elimina" onclick="deleteEmployee(this.form);" name="Elimina">
            <br>
            <br>
            <input type="button" value="Visualizza Form" onclick="discoverForm();">
        </form>
        
        <br>
        <br>
        
        <div id="employeeDataDiv" (:if[visible] ~ [:then ~ class="visible":][:else ~ class="hidden":]:)>
            <fieldset>
                <legend>
                    
                    Dati del dipendente cercato:
                </legend>
                <form method="post">
                    ID:
                    <br>
                    <input type="number" id="idEmployee" name="idEmployee" placeholder="1" value="(:id:)">
                    <br>
                    Nome:
                    <br>
                    <input type="text" id="firstNameEmployee" name="firstNameEmployee" placeholder="Mario" value="(:firstName:)"> 
                    <br>
                    Cognome:
                    <br>
                    <input type="text" id="lastNameEmployee" name="lastNameEmployee" placeholder="Bianchi" value="(:lastName:)">
                    <br>
                    Livello:
                    <br>
                    <input type="number" id="levelEmployee" name="levelEmployee" placeholder="5" value="(:level:)">
                    <br>
                    Stipendio:
                    <br>
                    <input type="number" id="salaryEmployee" name="salaryEmployee" placeholder="2300" value="(:salary:)">
                    $
                    <br>
                    <br>
                    <input type="button" value="Aggiungi/Modifica" onclick="addEmployee(this.form);" >
                </form>
            </fieldset>
        </div>   
    </body>
</html>
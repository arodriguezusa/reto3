// Function to select the information to render acording to the table.
function render(tableName){
    var welcome = document.getElementById("Welcome");
    var category = document.getElementById("Category");
    var library = document.getElementById("Lib");
    var client = document.getElementById("Client");
    var message = document.getElementById("Message");
    var reservation = document.getElementById("Reservation");

    // Hide the information.
    welcome.style.display = "none";
    category.style.display = "none";
    library.style.display = "none";
    client.style.display = "none";
    message.style.display = "none";
    reservation.style.display = "none";

    // Check the table name to display the information.
    switch (tableName){
        case "Welcome":
            welcome.style.display = "block";
            break;
        case "Category":
            category.style.display = "block";
            break;
        case "Lib":
            library.style.display = "block";
            break;
        case "Client":
            client.style.display = "block";
            break;
        case "Message":
            message.style.display = "block";
            break;
        case "Reservation":
            reservation.style.display = "block";
            break;
    }
}
// Function ro return the table index.
function selectTable(tableName){
    let actualTable = "";
    switch (tableName){
        case "Category":
            actualTable = "#catResult";
            break;
        case "Lib":
            actualTable = "#libraryResult";
            break;
        case "Client":
            actualTable = "#clientResult";
            break;
        case "Message":
            actualTable = "#messageResult";
            break;
        case "Reservation":
            actualTable = "#reservResult";
            break;
        case "Admin":
            actualTable = "#adminResult";
            break;
    }
    return actualTable;
}

// Select the info acording to the table.
function selectActualInfo(tableName, service){
    let actualInfo = {};
    if (tableName == "Reservation"){
        let libraryId = {};
        let clientId = {};
        if (service == "save"){
            libraryId = {id: $("#reservationLib").val()}
            clientId = {idClient: $("#reservationClient").val()}
            actualInfo = {
                startDate: $("#startDate").val(),
                devolutionDate: $("#devolutionDate").val(),
                library: libraryId,
                client: clientId
            };
        }
        else if (service == "update"){
            libraryId = {id: $("#uReservationLib").val()}
            clientId = {idClient: $("#uReservationClient").val()}
            actualInfo = {
                startDate: $("#uStartDate").val(),
                devolutionDate: $("#uDevolutionDate").val(),
                library: libraryId,
                client: clientId
            };
        }
    }
    else {
        switch (tableName){
            case "Category":
                if (service == "save"){
                    actualInfo = {
                        name: $("#catName").val(),
                        description: $("#catDescription").val()
                    };
                }
                else if (service == "update"){
                    actualInfo = {
                        name: $("#uCatName").val(),
                        description: $("#uCatDescription").val()
                    };
                }
                break;
            case "Lib":
                let catId = {};
                if (service == "save"){
                    catId = {id: $("#libraryCategory").val()}
                    actualInfo = {
                        name: $("#libraryName").val(),
                        brand: $("#libraryTarget").val(),
                        year: $("#libraryCapacity").val(),
                        description: $("#libraryDescription").val(),
                        category: catId
                    };
                }
                else if (service == "update"){
                    catId = {id: $("#uLibraryCategory").val()}
                    actualInfo = {
                        name: $("#uLibraryName").val(),
                        brand: $("#uLibraryTarget").val(),
                        year: $("#uLibraryCapacity").val(),
                        description: $("#uLibraryDescription").val(),
                        category: catId
                    };
                }
                break;
            case "Client":
                if (service == "save"){
                    actualInfo = {
                        email: $("#clientEmail").val(),
                        password: $("#clientPassword").val(),
                        name: $("#clientName").val(),
                        age: $("#clientAge").val()
                    };
                }
                else if (service == "update"){
                    actualInfo = {
                        email: $("#uClientEmail").val(),
                        password: $("#uClientPassword").val(),
                        name: $("#uClientName").val(),
                        age: $("#uClientAge").val()
                    };
                }
                break;
            case "Message":
                let libraryId = {};
                let clientId = {};
                if (service == "save"){
                    libraryId = {id: $("#messageLib").val()}
                    clientId= {idClient: $("#messageClient").val()}
                    actualInfo = {
                        messageText: $("#messageText").val(),
                        library: libraryId,
                        client: clientId
                    };
                }
                else if (service == "update"){
                    libraryId = {id: $("#messageLib").val()}
                    clientId= {idClient: $("#uMessageClient").val()}
                    actualInfo = {
                        messageText: $("#uMessageText").val(),
                        library: libraryId,
                        client: clientId
                    };
                }
                break;
        }
    }
    return actualInfo;
}

// Clear fields acording to the table.
function clearFields(tableName){
    switch (tableName){
        case "Category":
            $("#catName").val("");
            $("#catDescription").val("");
            break;
        case "Lib":
            $("#libraryTarget").val("");
            $("#libraryCapacity").val("");
            $("#libraryCategory").val("");
            $("#libraryName").val("");
            $("#libraryDescription").val("");
            break;
        case "Client":
            $("#clientEmail").val("");
            $("#clientPassword").val("");
            $("#clientName").val("");
            $("#clientAge").val("");
            break;
        case "Message":
            $("#messageText").val("");
            $("#messageLib").val("");
            $("#messageClient").val("");
            break;
        case "Reservation":
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#reservationLib").val("");
            $("#reservationClient").val("");
            break;
    }
}

// Make an HTTP GET request.
function getInfo(tableName){
    $.ajax({
        url: "http://localhost:80/api/" + tableName + "/all",
        type: "GET",
        dataType: "JSON",
        success: function(answer){
            console.log(answer);
            displayAnswer(tableName, answer);
            clearFields(tableName);
        }
    })
}
// Function to display the GET results.
function displayAnswer(tableName, item){
    let actualTable = selectTable(tableName);
    $(actualTable).empty();
    let newTable = "<table class='info-table'>";
    switch (tableName){
        case "Category":
            newTable += "<caption>Información de Categorías</caption>";
            newTable += "<thead>";
            newTable += "<tr>";
            newTable += "<th>NOMBRE</th>";
            newTable += "<th>DESCRIPCIÓN</th>";
            newTable += "<th>SALAS</th>";
            newTable += "<th>ACCIONES</th>";
            newTable += "</tr>";
            newTable += "</thead>";
            break;
        case "Lib":
            newTable += "<caption>Información de Salas</caption>";
            newTable += "<thead>";
            newTable += "<tr>";
            newTable += "<th>NOMBRE</th>";
            newTable += "<th>TARGET</th>";
            newTable += "<th>CAPACIDAD</th>";
            newTable += "<th>DESCRIPCIÓN</th>";
            newTable += "<th>CATEGORÍA</th>";
            newTable += "<th>MENSAJES</th>";
            newTable += "<th>RESERVACIONES</th>";
            newTable += "<th>ACCIONES</th>";
            newTable += "</tr>";
            newTable += "</thead>";
            break;
        case "Client":
            newTable += "<caption>Información de Clientes</caption>";
            newTable += "<thead>";
            newTable += "<tr>";
            newTable += "<th>EMAIL</th>";
            newTable += "<th>PASSWORD</th>";
            newTable += "<th>NOMBRE</th>";
            newTable += "<th>EDAD</th>";
            newTable += "<th>MENSAJES</th>";
            newTable += "<th>RESERVACIONES</th>";
            newTable += "<th>ACCIONES</th>";
            newTable += "</tr>";
            newTable += "</thead>";
            break;
        case "Message":
            newTable += "<caption>Información de Messages</caption>";
            newTable += "<thead>";
            newTable += "<tr>";
            newTable += "<th>MENESAJE</th>";
            newTable += "<th>SALAS</th>";
            newTable += "<th>CLIENTE</th>";
            newTable += "<th>ACCIONES</th>";
            newTable += "</tr>";
            newTable += "</thead>";
            break;
        case "Reservation":
            newTable += "<caption>Información de Reservaciones</caption>",
            newTable += "<thead>";
            newTable += "<tr>";
            newTable += "<th>INICIO</th>";
            newTable += "<th>DEVOLUCION</th>";
            newTable += "<th>ESTADO</th>";
            newTable += "<th>SALAS</th>";
            newTable += "<th>CLIENTE</th>;"
            newTable += "<th>SCORE</th>";
            newTable += "<th>ACCIONES</th>";
            newTable += "</tr>";
            newTable += "</thead>";
            break;
    }
    newTable += "<tbody>";
    for(i = 0; i < item.length; ++i){
        switch (tableName){
            case "Category":
                newTable += "<tr>";
                newTable += "<td><textarea id='uCatName' rows='1' placeholder='" +
                    item[i].name + "' required></textarea></td>";
                newTable += "<td><textarea id='uCatDescription' rows='1' " +
                    "placeholder='" + item[i].description + "' required></textarea></td>";
                newTable += "<td>" + JSON.stringify(item[i].library) + "</td>";
                // Update and Delete buttons.
                newTable += "<td> <button onclick='updateInfo(" + '"' + tableName +
                    '", ' + item[i].id + ")'><i class='bx bx-edit-alt'></i></button>" +
                    "<button onclick='deleteInfo(" + '"' + tableName + '", ' +
                    item[i].id + ")'><i class='bx bxs-trash'></i></button>";
                newTable += "</tr>";
                break;
            case "Lib":
                newTable += "<tr>";
                newTable += "<td><textarea id='uLibraryName' rows='1' placeholder='" +
                    item[i].name + "' required></textarea></td>";
                newTable += "<td><textarea id='uLibraryTarget' rows='1' placeholder='" +
                    item[i].brand + "' required></textarea></td>";
                newTable += "<td><input type='number' id='uLibraryCapacity'  placeholder='" +
                    item[i].year + "' required></td>";
                newTable += "<td><textarea id='uLibraryDescription' rows='1' " +
                    "placeholder='" + item[i].description +
                    "' required></textarea></td>";
                newTable += "<td><textarea id='uLibraryCategory' rows='1' placeholder='" +
                    JSON.stringify(item[i].category) + "' required></textarea></td>";
                newTable += "<td>" + JSON.stringify(item[i].messages) + "</td>";
                newTable += "<td>" + JSON.stringify(item[i].reservations) + "</td>";
                // Delete button.
                newTable += "<td> <button onclick='updateInfo(" + '"' + tableName +
                    '", ' + item[i].id + ")'><i class='bx bx-edit-alt'></i></button>" +
                    "<button onclick='deleteInfo(" + '"' + tableName + '", ' +
                    item[i].id + ")'><i class='bx bxs-trash'></i></button>";
                newTable += "</tr>";
                break;
            case "Client":
                newTable += "<tr>";
                newTable += "<td><textarea id='uClientEmail' rows='1' placeholder='" +
                    item[i].email + "' required></textarea></td>";
                newTable += "<td><textarea id='uClientPassword' rows='1' placeholder='" +
                    item[i].password + "' required></textarea></td>";
                newTable += "<td><textarea id='uClientName' rows='1' placeholder='" +
                    item[i].name + "' required></textarea></td>";
                newTable += "<td><input type='number' id='uClientAge'  placeholder='" +
                    item[i].age + "' required></td>";
                newTable += "<td>" + JSON.stringify(item[i].messages) + "</td>";
                newTable += "<td>" + JSON.stringify(item[i].reservations) + "</td>";
                // Delete button.
                newTable += "<td> <button onclick='updateInfo(" + '"' + tableName +
                    '", ' + item[i].idClient + ")'><i class='bx bx-edit-alt'></i></button>" +
                    "<button onclick='deleteInfo(" + '"' + tableName + '", ' +
                    item[i].idClient + ")'><i class='bx bxs-trash'></i></button>";
                newTable += "</tr>";
                break;
            case "Message":
                newTable += "<tr>";
                newTable += "<td><textarea id='uMessageText' rows='1' placeholder='" +
                    item[i].messageText + "' required></textarea></td>";
                newTable += "<td><textarea id='uMessageLib' rows='1' placeholder='" +
                    JSON.stringify(item[i].library) + "' required></textarea></td>";
                newTable += "<td><textarea id='uMessageClient' rows='1' placeholder='" +
                    JSON.stringify(item[i].client) + "' required></textarea></td>";
                // Delete button.
                newTable += "<td> <button onclick='updateInfo(" + '"' + tableName +
                    '", ' + item[i].idMessage + ")'><i class='bx bx-edit-alt'></i></button>" +
                    "<button onclick='deleteInfo(" + '"' + tableName + '", ' +
                    item[i].idMessage + ")'><i class='bx bxs-trash'></i></button>";
                newTable += "</tr>";
                break;
            case "Reservation":
                newTable += "<tr>";
                newTable += "<td>" + item[i].startDate + "<input type='date'" +
                    " id='uStartDate'></td>";
                newTable += "<td>" + item[i].devolutionDate + "<input type='date'" +
                    " id='uDevolutionDate'></td>";
                newTable += "<td>" + item[i].status + "</td>";
                newTable += "<td><textarea id='uReservationLibrary' rows='1' placeholder='" +
                    JSON.stringify(item[i].library) + "' required></textarea></td>";
                newTable += "<td><textarea id='uReservationClient' rows='1' placeholder='" +
                    JSON.stringify(item[i].client) + "' required></textarea></td>";
                newTable += "<td>" + JSON.stringify(item[i].score) + "</td>";
                // Update and Delete buttons.
                newTable += "<td> <button onclick='updateInfo(" + '"' + tableName +
                    '", ' + item[i].idReservation + ")'><i class='bx bx-edit-alt'></i></button>" +
                    "<button onclick='deleteInfo(" + '"' + tableName + '", ' +
                    item[i].idReservation + ")'><i class='bx bxs-trash'></i></button>";
                newTable += "</tr>";
                break;
        }
    }
    newTable += "</tbody>";
    newTable += "</table>";
    $(actualTable).append(newTable);
}

// Function to save new information with a POST request.
function saveInfo(tableName){
    let actualData = selectActualInfo(tableName, "save");
    let dataToSend = JSON.stringify(actualData);
    $.ajax({

        url: "http://localhost:80/api/" + tableName + "/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON; charset=utf-8",
        dataType: "JSON",
        success: function(answer){
            getInfo(tableName);
            alert("¡Guardado con éxito!")
        }
    })
}

// Function to update a table info with a PUT request.
function updateInfo(tableName, register_id){
    let register = {};
    if (tableName == "Client"){
        register = {
            idClient: register_id
        };
    }
    else if (tableName == "Message"){
        register = {
            idMessage: register_id
        };
    }
    else if (tableName == "Reservation"){
        register = {
            idReservation: register_id
        };
    }
    else {
        register = {
            id: register_id
        };
    }

    let actualData = selectActualInfo(tableName, "update");
    let fullJson = {
        ...register,
        ...actualData
    };
    let dataToSend = JSON.stringify(fullJson);
    $.ajax({
        url: "http://localhost:80/api/" + tableName + "/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON; charset=utf-8",
        dataType: "JSON",
        success: function(answer){
            getInfo(tableName);
            alert("¡Actualizado con éxito!")
        }
    })
}
// Function to delete an element of a table with a DELETE request.
function deleteInfo(tableName, register_id){
    let register = {
        id: register_id
    };
    let dataToSend = JSON.stringify(register);
    $.ajax({
        url: "http://localhost:80/api/" + tableName + "/" + register_id.toString(),
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        dataType: "JSON",
        success: function(answer){
            getInfo(tableName);
            alert("¡El registro se ha eliminado!")
        }
    })
}

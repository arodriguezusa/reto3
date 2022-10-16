// Select the info acording to the table.
function selectActualInfo(tableName){
    let actualInfo = {};
    if (tableName == "Category") {
        actualInfo = {
            name: $("#name").val(),
            description: $("#description").val()
        };
    }
    else if (tableName == "Library"){
        actualInfo = {
            target: $("#target").val(),
            capacity: $("#capacity").val(),
            category: $("#category").val(),
            description: $("#description").val(),
            name: $("#name").val()
        };
    }
    else if(tableName == "client") {
        actualInfo = {
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            age: $("#age").val()
        };
    }
    else if(tableName == "message"){
        actualInfo = {
            messagetext: $("#messagetext").val(),
            library: $("#library").val(),
            client: $("#client").val()
        };
    }
    else if(tableName == "reservation"){
        actualInfo = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            library: $("#library").val(),
            client: $("#client").val()
        };
    }
    else if(tableName == "Admin"){
        actualInfo = {
            name: $("#name").val(),
            email: $("#email").val(),
            password: $("#password").val()
        };
    }
    return actualInfo;
}

// Clear fields acording to the table.
function clearFields(tableName){
    if(tableName == "Category"){
        $("#name").val("");
        $("#description").val("");
    }
    else if (tableName == "Lib") {
        $("#target").val("");
        $("#capacity").val("");
        $("#category").val("");
        $("#name").val("");
        $("#description").val("");
    }
    else if(tableName == "Client") {
        $("#email").val("");
        $("#password").val("");
        $("#name").val("");
        $("#age").val("");
    }
    else if(tableName == "Message"){
        $("#messagetext").val("");
        $("#skate").val();
        $("#client").val();
    }
    else if(tableName == "Reservation"){
        $("#startDate").val("");
        $("#devolutionDate").val("");
        $("#library").val("");
        $("#client").val("");
    }
    else if(tableName == "Admin"){
        $("#name").val("");
        $("#email").val("");
        $("#password").val("");
    }
}

// Make an HTTP GET request.
function getInfo(tableName){
    $.ajax({
        url: "http://127.0.0.1:8080/api/" + tableName + "/all",
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
    $("#result").empty();
    let newTable = "<table>";
    if (tableName == "Category"){
        newTable += "<tr>";
        newTable += "<th>ID</th>";
        newTable += "<th>NOMBRE</th>";
        newTable += "<th>DESCRIPCION</th>";
        newTable += "<th>SALAS</th>";
        newTable += "</tr>";
    }
    else if (tableName == "Lib"){
        newTable += "<tr>";
        newTable += "<th>ID</th>";
        newTable += "<th>NOMBRE</th>";
        newTable += "<th>TARGET</th>";
        newTable += "<th>CAPACIDAD</th>";
        newTable += "<th>DESCRIPCION</th>";
        newTable += "<th>CATEGORIA</th>";
        newTable += "<th>MENSAJES</th>";
        newTable += "<th>RESERVACIONES</th>";
        newTable += "</tr>";
    }
    else if (tableName == "Client"){
        newTable += "<tr>";
        newTable += "<th>ID</th>";
        newTable += "<th>EMAIL</th>";
        newTable += "<th>PASSWORD</th>";
        newTable += "<th>NOMBRE</th>";
        newTable += "<th>EDAD</th>";
        newTable += "<th>MENSAJES</th>";
        newTable += "<th>RESERVACIONES</th>";
        newTable += "</tr>";
    }
    else if (tableName == "Message"){
        newTable += "<tr>";
        newTable += "<th>ID</th>";
        newTable += "<th>MENSAJE</th>";
        newTable += "<th>SALA</th>";
        newTable += "<th>CLIENTE</th>";
        newTable += "</tr>";
    }
    else if (tableName == "Reservation"){
        newTable += "<tr>";
        newTable += "<th>ID</th>";
        newTable += "<th>INICIO</th>";
        newTable += "<th>DEVOLUCION</th>";
        newTable += "<th>ESTADO</th>";
        newTable += "<th>SALA</th>";
        newTable += "<th>CLIENTE</th>";
        newTable += "<th>SCORE</th>";
        newTable += "</tr>";
    }
    else if (tableName == "Admin"){
        newTable += "<tr>";
        newTable += "<th>ID</th>";
        newTable += "<th>NOMBRE</th>";
        newTable += "<th>EMAIL</th>";
        newTable += "<th>PASSWORD</th>";
        newTable += "</tr>";
    }
    for(i = 0; i < item.length; ++i){
        if (tableName == "Category"){
            newTable += "<tr>";
            newTable += "<td>" + item[i].id + "</td>";
            newTable += "<td>" + item[i].name + "</td>";
            newTable += "<td>" + item[i].description + "</td>";
            newTable += "<td>" + item[i].library + "</td>";
            // Delete button.
            newTable += "<td> <button onclick='deleteInfo(" + '"' + tableName + '", ' + item[i].id + ")'>Eliminar</button>";
            newTable += "</tr>";
        }
        else if (tableName == "Lib"){
            newTable += "<tr>";
            newTable += "<td>" + item[i].id + "</td>";
            newTable += "<td>" + item[i].name + "</td>";
            newTable += "<td>" + item[i].target + "</td>";
            newTable += "<td>" + item[i].capacity + "</td>";
            newTable += "<td>" + item[i].description + "</td>";
            newTable += "<td>" + item[i].category + "</td>";
            newTable += "<td>" + item[i].messages + "</td>";
            newTable += "<td>" + item[i].reservations + "</td>";
            // Delete button.
            newTable += "<td> <button onclick='deleteInfo(" + '"' + tableName + '", ' + item[i].id + ")'>Eliminar</button>";
            newTable += "</tr>";
        }
        else if (tableName == "Client"){
            newTable += "<tr>";
            newTable += "<td>" + item[i].idClient + "</td>";
            newTable += "<td>" + item[i].email + "</td>";
            newTable += "<td>" + item[i].password + "</td>";
            newTable += "<td>" + item[i].name + "</td>";
            newTable += "<td>" + item[i].age + "</td>";
            newTable += "<td>" + item[i].messages + "</td>";
            newTable += "<td>" + item[i].reservations + "</td>";
            // Delete button.
            newTable += "<td> <button onclick='deleteInfo(" + '"' + tableName + '", ' + item[i].id + ")'>Eliminar</button>";
            newTable += "</tr>";
        }
        else if (tableName == "message"){
            newTable += "<tr>";
            newTable += "<td>" + item[i].idMessage + "</td>";
            newTable += "<td>" + item[i].messagetext + "</td>";
            newTable += "<td>" + item[i].library + "</td>";
            newTable += "<td>" + item[i].client + "</td>";
            // Delete button.
            newTable += "<td> <button onclick='deleteInfo(" + '"' + tableName + '", ' + item[i].id + ")'>Eliminar</button>";
        }
        else if (tableName == "message"){
            newTable += "<tr>";
            newTable += "<td>" + item[i].idReservation + "</td>";
            newTable += "<td>" + item[i].startDate + "</td>";
            newTable += "<td>" + item[i].devolutionDate + "</td>";
            newTable += "<td>" + item[i].status + "</td>";
            newTable += "<td>" + item[i].skate + "</td>";
            newTable += "<td>" + item[i].client + "</td>";
            newTable += "<td>" + item[i].score + "</td>";
            // Delete button.
            newTable += "<td> <button onclick='deleteInfo(" + '"' + tableName + '", ' + item[i].id + ")'>Eliminar</button>";
        }
    }
    newTable += "</table>";
    $("#result").append(newTable);
}

// Function to save new information with a POST request.
function saveInfo(tableName){
    let actualData = selectActualInfo(tableName);
    let dataToSend = JSON.stringify(actualData);
    console.log("Actual data", actualData)
    console.log("Data to Send", dataToSend)
    $.ajax({
        url: "http://127.0.0.1:8080/api/" + tableName + "/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON; charset=utf-8",
        dataType: "JSON",
        success: function(answer){
            $("#result").empty();
            alert("¡Guardado con éxito!")
        }
    })
}

// Function to update a table info with a PUT request.
function updateInfo(tableName){
    let actualData = selectActualInfo(tableName);
    let dataToSend = JSON.stringify(actualData);
    $.ajax({
        url: "http://127.0.0.1:8080/api/" + tableName + "/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON; charset=utf-8",
        dataType: "JSON",
        success: function(answer){
            $("#result").empty();
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
        url: "http://127.0.0.1:8080/api/" + tableName + "/" + register_id.toString(),
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        dataType: "JSON",
        success: function(answer){
            $("#result").empty();
            alert("¡El registro se ha eliminado!")
        }
    })
}

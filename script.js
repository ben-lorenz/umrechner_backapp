// ======================================
// Backrechner
// script.js
// Teil 1
// ======================================


// ----------------------------
// Elemente
// ----------------------------

const formType = document.getElementById("formType");

const originalInputs = document.getElementById("originalInputs");
const targetInputs = document.getElementById("targetInputs");

const ingredientsBody = document.getElementById("ingredientsBody");

const resultBody = document.getElementById("resultBody");

const addIngredientButton = document.getElementById("addIngredient");
const calculateButton = document.getElementById("calculate");



// ----------------------------
// Initialisierung
// ----------------------------

createFormInputs();

addIngredient();

formType.addEventListener("change", () => {

    createFormInputs();

});

addIngredientButton.addEventListener("click", () => {

    addIngredient();

});

calculateButton.addEventListener("click", () => {

    calculate();

});



// ======================================
// Eingabefelder erzeugen
// ======================================

function createFormInputs(){

    const type = formType.value;

    createOriginalInputs(type);

    createTargetInputs(type);

}



// ======================================

function createOriginalInputs(type){

    switch(type){

        case "springform":

            originalInputs.innerHTML = `

                <div class="inputRow">

                    <div class="field">

                        <label>Durchmesser (cm)</label>

                        <input
                            id="originalDiameter"
                            type="number"
                            min="1"
                            placeholder="26">

                    </div>

                </div>

            `;

        break;



        case "blech":

            originalInputs.innerHTML = `

                <div class="inputRow">

                    <div class="field">

                        <label>Breite (cm)</label>

                        <input
                            id="originalWidth"
                            type="number"
                            min="1"
                            placeholder="30">

                    </div>

                    <div class="field">

                        <label>Länge (cm)</label>

                        <input
                            id="originalHeight"
                            type="number"
                            min="1"
                            placeholder="40">

                    </div>

                </div>

            `;

        break;



        case "foermchen":

            originalInputs.innerHTML = `

                <div class="inputRow">

                    <div class="field">

                        <label>Anzahl Förmchen</label>

                        <input
                            id="originalCount"
                            type="number"
                            min="1"
                            placeholder="12">

                    </div>

                </div>

            `;

        break;

    }

}



// ======================================

function createTargetInputs(type){

    switch(type){

        case "springform":

            targetInputs.innerHTML = `

                <div class="inputRow">

                    <div class="field">

                        <label>Neuer Durchmesser (cm)</label>

                        <input
                            id="targetDiameter"
                            type="number"
                            min="1"
                            placeholder="20">

                    </div>

                </div>

            `;

        break;



        case "blech":

            targetInputs.innerHTML = `

                <div class="inputRow">

                    <div class="field">

                        <label>Breite (cm)</label>

                        <input
                            id="targetWidth"
                            type="number"
                            min="1"
                            placeholder="20">

                    </div>

                    <div class="field">

                        <label>Länge (cm)</label>

                        <input
                            id="targetHeight"
                            type="number"
                            min="1"
                            placeholder="30">

                    </div>

                </div>

            `;

        break;



        case "foermchen":

            targetInputs.innerHTML = `

                <div class="inputRow">

                    <div class="field">

                        <label>Neue Anzahl</label>

                        <input
                            id="targetCount"
                            type="number"
                            min="1"
                            placeholder="18">

                    </div>

                </div>

            `;

        break;

    }

}



// ======================================
// Zutat hinzufügen
// ======================================

function addIngredient(){

    const row = document.createElement("tr");

    row.className = "ingredientRow";

    row.innerHTML = `

        <td>

            <input
                type="number"
                class="ingredientAmount"
                placeholder="250"
                step="any">

        </td>

        <td>

            <input
                type="text"
                class="ingredientUnit"
                placeholder="optional">

        </td>

        <td>

            <input
                type="text"
                class="ingredientName"
                placeholder="optional">

        </td>

        <td>

            <button
                class="deleteButton"
                type="button">

                🗑

            </button>

        </td>

    `;

    row
    .querySelector(".deleteButton")
    .addEventListener("click", () => {

        row.remove();

    });

    ingredientsBody.appendChild(row);

}



// ======================================
// Zahlen formatieren
// ======================================

function formatNumber(value){

    if(isNaN(value)){

        return "";

    }

    return Number(value.toFixed(2)).toString();

}



// ======================================
// Faktor bestimmen
// (kommt in Teil 2)
// ======================================

function getFactor(){

    const type = formType.value;

    switch(type){

        case "springform":

            const oldRadius =
                Number(document.getElementById("originalDiameter").value) / 2;

            const newRadius =
                Number(document.getElementById("targetDiameter").value) / 2;

            return (newRadius * newRadius) /
                   (oldRadius * oldRadius);



        case "blech":

            const oldArea =
                Number(document.getElementById("originalWidth").value) *
                Number(document.getElementById("originalHeight").value);

            const newArea =
                Number(document.getElementById("targetWidth").value) *
                Number(document.getElementById("targetHeight").value);

            return newArea / oldArea;



        case "foermchen":

            return Number(document.getElementById("targetCount").value) /
                   Number(document.getElementById("originalCount").value);

    }

    return 1;

}

// ======================================
// Backrechner
// script.js
// Teil 2
// ======================================


// ======================================
// Berechnung
// ======================================

function calculate() {

    const factor = getFactor();

    // Ungültige Eingaben abfangen
    if (!isFinite(factor) || factor <= 0) {

        alert("Bitte gültige Größen eingeben.");

        return;

    }

    resultBody.innerHTML = "";

    const rows = document.querySelectorAll(".ingredientRow");

    let hasIngredients = false;

    rows.forEach(row => {

        const amountField = row.querySelector(".ingredientAmount");
        const unitField = row.querySelector(".ingredientUnit");
        const nameField = row.querySelector(".ingredientName");

        const amount = Number(amountField.value);

        // Leere Zeilen ignorieren
        if (isNaN(amount) || amountField.value === "") {

            return;

        }

        hasIngredients = true;

        const result = amount * factor;

        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td class="resultAmount">

                ${formatNumber(result)}

            </td>

            <td>

                ${unitField.value.trim()}

            </td>

            <td>

                ${nameField.value.trim()}

            </td>

        `;

        resultBody.appendChild(tr);

    });

    if (!hasIngredients) {

        resultBody.innerHTML = `

            <tr>

                <td colspan="3" class="emptyResult">

                    Bitte mindestens eine Zutatenmenge eingeben.

                </td>

            </tr>

        `;

    }

}



// ======================================
// Komfortfunktionen
// ======================================

// Enter fügt neue Zutatenzeile hinzu
ingredientsBody.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") {

        return;

    }

    const currentRow = event.target.closest("tr");

    if (!currentRow) {

        return;

    }

    event.preventDefault();

    const rows = [...document.querySelectorAll(".ingredientRow")];

    const lastRow = rows[rows.length - 1];

    if (currentRow === lastRow) {

        addIngredient();

    }

    const newRows = document.querySelectorAll(".ingredientRow");

    const newest = newRows[newRows.length - 1];

    newest.querySelector(".ingredientAmount").focus();

});



// ======================================
// Berechnung auch per Enter
// ======================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter" && event.ctrlKey) {

        calculate();

    }

});



// ======================================
// Erste Ergebnisanzeige
// ======================================

resultBody.innerHTML = `

<tr>

    <td colspan="3" class="emptyResult">

        Noch keine Berechnung durchgeführt.

    </td>

</tr>

`;



// ======================================
// Fertig
// ======================================

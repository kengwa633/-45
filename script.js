let currentUser = "";
let selectedBus = "";
let selectedSeat = "";

// LOGIN
function login() {
    let user = document.getElementById("username").value;

    if (user === "") {
        alert("Enter username");
        return;
    }

    currentUser = user;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("mainSystem").style.display = "block";
}

// SELECT BUS
function selectBus(bus) {
    selectedBus = bus;
    document.getElementById("selectedBus").innerHTML = "Selected Bus: " + bus;

    generateSeats();
}

// GENERATE SEATS
function generateSeats() {
    let seatContainer = document.getElementById("seats");
    seatContainer.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        let seat = document.createElement("div");
        seat.classList.add("seat");
        seat.innerText = i;

        seat.onclick = function () {
            document.querySelectorAll(".seat").forEach(s => s.classList.remove("selected"));
            seat.classList.add("selected");
            selectedSeat = i;
        };

        seatContainer.appendChild(seat);
    }
}

// PAYMENT
function payNow() {
    let result = document.getElementById("result");

    if (selectedBus === "" || selectedSeat === "") {
        result.innerHTML = "⚠️ Select bus and seat first!";
        return;
    }

    result.innerHTML = "⏳ Processing payment...";

    setTimeout(() => {
        result.innerHTML =
            "✅ Booking Confirmed!<br>" +
            "User: " + currentUser +
            "<br>Bus: " + selectedBus +
            "<br>Seat: " + selectedSeat +
            "<br>Payment: Successful 💰";
    }, 2000);
}

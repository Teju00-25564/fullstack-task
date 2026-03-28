// Fetch Order History
fetch("http://localhost:3000/orders")
.then(res => res.json())
.then(data => {
    let table = document.getElementById("orderTable");

    data.forEach(order => {

        let formattedDate = new Date(order.order_date)
            .toLocaleDateString("en-IN");

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.name}</td>
            <td>${order.product_name}</td>
            <td>${order.quantity}</td>
            <td>₹${order.total_amount}</td>
            <td>${formattedDate}</td>
        `;

        table.appendChild(row);
    });
})
.catch(err => console.log(err));


// Fetch Highest Value Order
fetch("http://localhost:3000/highest-order")
.then(res => res.json())
.then(data => {
    document.getElementById("highestOrder").innerText =
        `${data.name} - ₹${data.total_amount}`;
})
.catch(err => console.log(err));


// Fetch Most Active Customer
fetch("http://localhost:3000/most-active")
.then(res => res.json())
.then(data => {
    document.getElementById("mostActive").innerText =
        `${data.name} (${data.total_orders} Orders)`;
})
.catch(err => console.log(err));


const express = require('express');
const cors = require('cors');


 function authenticate() {
    
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;

    // Make the fetch request
    fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "login_id": login,
            "password": password
        }),
    })
    .then(response => {
    })
    .catch(error => console.error('Error:', error));

 }
 async function addCustomer() {
    const customerEndpoint = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";

    if (!authToken) {
        console.error("Authentication token is missing. Please authenticate first.");
        return;
    }

    const customerData = {
        "cmd": "create",
        "first_name": "Jane",
        "last_name": "Doe",
        "street": "Elvnu Street",
        "address": "H no 2",
        "city": "Delhi",
        "state": "Delhi",
        "email": "sam@gmail.com",
        "phone": "12345678"
    };

    try {
        const response = await fetch(customerEndpoint, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(customerData)
        });

        if (response.status === 201) {
            console.log("Customer created successfully!");
        } else {
            console.error(`Failed to create customer with status ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error creating customer:", error.message);
    }
}

addCustomer();


// Function to get the customer list
async function getCustomerList() {
    const customerListEndpoint = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list";

    try {
        const response = await fetch(customerListEndpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            const customerList = await response.json();
            displayCustomerList(customerList);
        } else {
            console.error(`Failed to get customer list with status ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error getting customer list:", error.message);
    }
}

function displayCustomerList(customerList) {
    console.log("Customer List:", customerList);
}


getCustomerList();


// Function to delete a customer
async function deleteCustomer(uuid) {
    const deleteCustomerEndpoint = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";

    try {
        const response = await fetch(deleteCustomerEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                "cmd": "delete",
                "uuid": uuid
            })
        });

        if (response.status === 200) {
            console.log("Customer deleted successfully!");
        } else {
            console.error(`Failed to delete customer with status ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error deleting customer:", error.message);
    }
}

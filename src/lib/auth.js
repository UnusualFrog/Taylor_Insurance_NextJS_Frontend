// Functionality for auth and log in
export async function loginCustomer(username, password) {
    const res = await fetch(`http://localhost:8080/v1/customers/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });

    const data = await res.json();

    if (res.status === 200) {
        return {
            ...data, 
            role:'customer'
        };
    } else {
        return data;
    }
}

export async function loginEmployee(username, password) {
    const res = await fetch(`http://localhost:8080/v1/employees/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
    });

    const data = await res.json();

    if (res.status === 200) {
        return {
            ...data,
            role:'customer'
        };
    } else {
        return data;
    }
}

// Register customer and return the result
export async function registerCustomer(customerData) {
    // first create the address
    const addressParams = new URLSearchParams({
        unit: customerData.unit,
        street: customerData.street,
        city: customerData.city,
        province: customerData.province,
        postalCode: customerData.postalCode,
    });
    console.log(addressParams.toString());
    const addressRes = await fetch(`http://localhost:8080/v1/addresses?${addressParams.toString()}`, {
        method: "POST"
    });

    const addressData = await addressRes.json();

    if (addressRes.status !== 201 || !addressData.success) {
        throw new Error(addressData.message || "Address creation failed");
    }

    const createdAddressId = addressData.addressId 

    if (!createdAddressId) {
        throw new Error("Address ID not returned by backend.");
    }

    // Step 2: Register the customer using query parameters
    const customerParams = new URLSearchParams({
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        birthday: customerData.birthday,
        email: customerData.email,
        username: customerData.username,
        password: customerData.password,
        addressId: createdAddressId.toString(),
    });

    const customerRes = await fetch(`http://localhost:8080/v1/customers/register?${customerParams.toString()}`, {
        method: "POST"
    });

    const customerDataRes = await customerRes.json();

    if (customerRes.status !== 200) {
        throw new Error(customerDataRes.message || "Customer registration failed");
    }

    return { // return success and the stuff used for cookies
        success: true,
        username: customerData.username,
        password: customerData.password // used to log in
    };
}

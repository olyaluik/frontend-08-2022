import { useEffect } from "react";
import { useState } from "react";

function Cart() {
    const [parcelMachines, setParcelMachines] = useState({omniva:[], smartpost:[]});

    useEffect(() => {
        fetch("http://localhost:8080/parcel-machines/EE")
        .then(res => res.json())
        .then(json => setParcelMachines(json))
    }, []);

    const pay = () => {
        fetch("http://localhost:8080/orders/123", {
            method: "POST",
            body: JSON.stringify([{"id":1}, {"id":5}]),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => window.location.href = json.payment_link)
    }

    return (  
        <div>

        <select>
            {parcelMachines.omniva.map(element => <option key={element.NAME}>{element.NAME}</option>)}
        </select>
        <select>
            {parcelMachines.smartpost.map(element => <option key={element.name}>{element.name}</option>)}
        </select>

        <button onClick={pay}>Maksma</button>
        </div>);
}

export default Cart;
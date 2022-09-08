import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

function MaintainProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/products")
            .then(res => res.json())
            .then(json => setProducts(json))
    }, []);

    const deleteProduct = (productId) => {
        fetch("http://localhost:8080/delete-product/" + productId, {method: "DELETE"})
        .then(res => res.json())
        .then(json => setProducts(json))
    }

    const decreaseQuantity = (product) => {
        fetch("http://localhost:8080/decrease-stock", {
            method: "PATCH",
            body: JSON.stringify(product),
            headers: {"Content-Type": "application/json"}})
        .then(res => res.json())
        .then(json => setProducts(json))
    }

    const increaseQuantity = (product) => {
        fetch("http://localhost:8080/add-stock", {
            method: "PATCH", 
            body: JSON.stringify(product),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => setProducts(json))
    }



    return ( 
        <div>
            {products.map(element => 
                <div className={ element.active ? "active" : "inactive" } key={element.id}>
                    <img src={element.image} alt="" />
                    <div>ID: {element.name}</div>
                    <div>Name: {element.name}</div>
                    <div>Hind: {element.price}</div>
                    <div>Kogus: {element.stock}</div>
                    <div>Kategooria: {element.category?.name}</div>
                    <button onClick={() => deleteProduct(element.id)}>Kustuta toode</button>
                    <Link to={"/admin/muuda/" + element.id}>
                        <button>Muuda toodet</button>
                    </Link>


                    <br />
                    <button onClick={() => decreaseQuantity(element)}>-</button>
                    <button onClick={() => increaseQuantity(element)}>+</button>
                </div>
                )}
        </div> );
}


export default MaintainProducts;
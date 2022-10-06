import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function MaintainCategory() {
    const [categories, setCategories] = useState([]);
    const nameRef = useRef();

    useEffect(() => {
        fetch("http://localhost:8080/category")
        .then(res => res.json())
        .then(json => setCategories(json))
    }, []);

    const addNewCategory = () =>{
        //nagu Postmanis saadan objekti
        const newCategory = {
            "name": nameRef.current.value
        }

        fetch("http://localhost:8080/category", {
            method: "POST",
            body: JSON.stringify(newCategory),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => setCategories(json))
    }

    const [message, setMessage] = useState("");

    const deleteCategory= (categoryID) => {
        fetch("http://localhost:8080/category/" + categoryID, {method: "DELETE"})
        .then(res => res.json())
        .then(json => {
            if(json.error) {
                switch(json.message) {
                    case "CATEGORY_IS_IN_USE":
                        fetch("http://localhost:8080/products-by-category/" + categoryID)
                        .then(res => res.json())
                        .then(json => setMessage("Kustutatav kategooria on mõnes tootes kasutusel: " + json));
                }
            } else {
                setMessage("Kustutamine õnnestus");
                setCategories(json);
            }
        })
    }

    return (
        <div>
            <div>{message}</div>
            <label>Kategooria nimi</label> <br/>
            <input ref={nameRef} type="text" /> <br /> 
            <button onClick={addNewCategory}>Sisesta uus kategooria</button>
            {categories.map( category => 
                <div key = {category.id}>
                    {category.id}. {category.name}
                    <button onClick={() => deleteCategory(category.id)}>Kustuta toode</button>
                </div>)}
        </div> );
}

export default MaintainCategory;
import { useState } from "react";
import { useParams } from "react-router-dom";

function EditProduct() {
    const { id } =useParams();
    const [product, setProducts] = useState({});

    //useEffect -->päring küsi üks toode

    //label /input

    //get ja edit product

    return ( <div>EP {id}
    <input defaultValue={product.name} type = "text" />
    </div> );
}

export default EditProduct;
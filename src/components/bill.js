import React, { useState } from 'react';
import billStyle from './bill.module.css';

function Bill() {
    const [customerName, setCustomerName] = useState("");
    const [products, setProducts] = useState([
        {
            name: '',
            quantity: '',
            price: 0
        },
    ]);

    const [visible, setVisible] = useState(false);

    let date = new Date().toLocaleDateString();

    const handleCustomerNameChange=(event)=> {
        setCustomerName(event.target.value);
    }

    const handleProductChange=(index,event)=> {
        const newProducts=[...products];
        if(event.target.name === 'name'){
               switch(event.target.value){
                case ("sugar"):
                    newProducts[index].price=10;
                    break;
                 case("coffee"):
                    newProducts[index].price=20;
                    break;
                 case "biscuits":
                    newProducts[index].price=30;
                    break;
                 case "oats":
                    newProducts[index].price=40;
                    break;
                 default:
                    newProducts[index].price=0;
                    break;            
               }
        }
        newProducts[index][event.target.name]=event.target.value;
        setProducts(newProducts);
    }

    const handleAddProduct=()=> {
        setProducts([...products,{name:'',quantity:'', price:0}]);
    }

    const handleSubmit =(event)=> {
        event.preventDefault();
        setVisible(!visible);
    }

    let total=0;
    for(let i=0;i<products.length;i++){
        total += products[i].quantity * products[i].price;
    }


    return (
        
        <>
        <div className={billStyle.mainContainer}>
            
           
            <div className={billStyle.container}>
                <div>
                    <h3>Customer Name</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={customerName}
                            placeholder='Customer Name'
                            onChange={handleCustomerNameChange}
                        />
                        <hr />
                        <hr />

                        {products.map((product, index) => (
                            <>
                                <div key={index}>
                                    <h3 className={billStyle.add}>
                                        Select Product

                                        {/* add button */}
                                        <span  >
                                            {index === products.length - 1 && (
                                                <button onClick={handleAddProduct} className={billStyle.btn} >
                                                    Add Product
                                                </button>
                                            )
                                            }

                                        </span>
                                    </h3>

                                    {/* options */}
                                    <div className={billStyle.options}>
                                    <select
                                        name='name'
                                        value={product.name}
                                        onChange={(event) => handleProductChange(index, event)}
                                    >
                                        <option value=''>Select a product</option>
                                        <option value='sugar'>Sugar</option>
                                        <option value='coffee'>Coffee</option>
                                        <option value='biscuits'>Biscuits</option>
                                        <option value='oats'>oats</option>

                                    </select>

                                    <input
                                    type='number'
                                    name='quantity'
                                    value={product.quantity}
                                    placeholder='Quantity'
                                    onChange={(event) => handleProductChange(index,event)}
                                    />
                                    </div>

                                    <hr/>

                                </div>
                            </>
                        ))
                        }

                        <button type='submit' className={billStyle.btn}>Generate Bill</button>

                    </div>
                </form>

                {/* table */}

                { visible && (
                    <>
                    <div className={billStyle.table}>
                        <table className={billStyle.tableContainer}>
                            <thead>
                                <tr>
                                    <th colSpan='4'>Customer Name: {customerName}</th>
                                </tr>
                                <tr>
                                    <th colSpan='4'>Date: {date}</th>
                                </tr>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            { products.map((product,index)=> (
                                <tbody key={index}>
                                    <tr>
                                        <th>{product.name}</th>
                                        <th>{product.quantity}</th>
                                        <th>{product.price}</th>
                                        <th>{product.price * product.quantity}</th>
                                    </tr>
                                </tbody>
                            ))

                            }

                            <tr>
                                <th colSpan='3'>Total</th>
                                <th>{total}</th>
                            </tr>

                        </table>
                    </div>
                    </>

                )
                }

            </div>
            </div>
        </>
    )
}

export default Bill;
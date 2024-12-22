import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { Audio } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import emptyimg from '../../Assets/images/preview.png'


export default function Cart() {

    const { updateCount, totalCartPrice, allProducts, deleteproduct, clearCart, getUserCart, numOfCartItems } = useContext(cartContext);
    const { isError, isLoading } = useQuery('getUserCart', getUserCart)
    //const x = useQuery('allProducts', allProducts)
    if (isLoading) {
        return <div className='d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center '>
            <Audio
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    }
    if (isError) {
        
        return <div className='d-flex justify-content-center'>
            <div className='text-center my-4'>
                <h4>Cart is empty</h4>
                <img src={emptyimg} height={400} alt="" />
            
            </div>

        </div>
    }

    async function updateMyproductCount(id, newCount) {
        const res = await updateCount(id, newCount)
        if (res) {
            toast.success('product updated successfully', { duration: 1500, position: 'top-center' })
        } else {
            toast.error('Error occurred', { duration: 1500, position: 'top-center' })
        }
    }
    async function myDeleteProduct(id) {
        const res = await deleteproduct(id)
        if (res) {
            toast.success('product removed successfully', { duration: 1500, position: 'top-center' })
        } else {
            toast.error('Error occurred', { duration: 1500, position: 'top-center' })
        }
    }
    console.log(allProducts);
    return <>
        {numOfCartItems !== 0 ?
            <div className="container Cart mt-3">

                <div className='d-flex justify-content-between'>
                    <div>
                        <h2>Shop Cart</h2>
                        <h5 className='text-main'>Total cart price : {totalCartPrice} EGP</h5>

                    </div>
                    <Link to='/payment'>
                        <button className='btn btn-primary mt-3 me-3'>Confirm Payment</button>
                    </Link>
                </div>


                <button className='btn btn-outline-danger' onClick={clearCart} ><i class="fa-solid fa-broom"></i> clear</button>
                {allProducts.map((product, idx) => <div key={idx} className="row shadow-lg sell rounded-2 p-5 mt-2 py-3 d-flex justify-content-center mb-1">
                    <div className="col-1">
                        <figure>
                            <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
                        </figure>
                    </div>
                    <div className="col-9">
                        <article>
                            <h3>{product.product.title}</h3>
                            <h5 className='text-main'>Price: {product.price}EGP</h5>
                            <button className='btn btn-outline-danger' onClick={() => myDeleteProduct(product.product.id)}><i className='fa-solid fa-trash border-light'></i> Remove</button>
                        </article>
                    </div>
                    <div className="col-2">
                        <div className='d-flex align-content-center justify-content-between'>

                            <button className='btn btn-outline-success mb-5' onClick={() => updateMyproductCount(product.product.id, product.count + 1)}>+</button>
                            <p>{product.count}</p>
                            <button className='btn btn-outline-danger mb-5' disabled={product.count == 1} onClick={() => updateMyproductCount(product.product.id, product.count - 1)}>-</button>

                        </div>
                    </div>
                </div>)}

            </div>
            
            : <div className='d-flex justify-content-center'>
                <div className='text-center my-4'>
                    <h4>Cart is empty</h4>
                    <img src={emptyimg} height={400} alt="" />

                </div>

            </div>
        }

    </>
}
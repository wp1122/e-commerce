import React from 'react'
import cart from "../assets/cart.png"

const Header = () => {
  return (
    <>
        <div className='col-sm-2 col-5 pl-4'>
            <h5 className='p-2 bg-secondary text-white' >Lumber Store</h5>
        </div>
        <div className='col-1 col-sm-8'></div>
        <div className='d-none d-sm-block col-sm-1'>
            Products
        </div>
        <div className='col-3 col-sm-1'>
          <img className='img-fluid' style={{cursor:'pointer'}} width={25} height={25} src={cart} alt="Card image cap"/>
        </div>
        
    </>
  )
}

export default Header
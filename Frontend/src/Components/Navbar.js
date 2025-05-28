import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {

  const [cartView, setCartView] = useState(false)
  let data = useCart();
 const navigate = useNavigate();

 const handleout = ()=>{
     localStorage.removeItem('token');
     navigate("/login")
 }


  return (
    <div  style={{boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.8)"}}>

<nav className="navbar navbar-expand-lg navbar-dark position-sticky"
                style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15);", filter: 'blur(20)', backgroundColor:"#8B0000", position: "fixed", zIndex: "10", width: "100%" }}>
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">Food  Station</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5 mt-3 mx-3" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem('token')) ? 
              <li className="nav-item">
              <Link className="nav-link active fs-5 mt-3 mx-3" aria-current="page" to="/myorder">my orders</Link>
              </li>
        : ""}
      </ul>
      { (!localStorage.getItem('token')) ?
      <div className='d-flex'>
       
            <Link className="btn text-danger bg-white mx-2" to="/Login">Login</Link>
            <Link className="btn text-danger bg-white mx-2" to="/createuser">signup</Link>
                
      </div>
      :      <div>
                   <div className="btn text-danger bg-white mx-2" onClick={()=>{setCartView(true)}}>
                    my cart { (data.length !==0 ? <Badge pill bg='danger'> {data.length} </Badge> : " ")}
                    
                   </div>
                   {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                   <div className="btn text-danger bg-white mx-2"  onClick={handleout}>logout</div>
            </div>
            
       } 
    </div>
  </div>
</nav>
    </div>
  )
}

import React, { useState } from 'react';
import {Link, Outlet} from "react-router";
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { labelConfigs as lbl } from "../helper/LabelConfigs.js";
import { Sidebar } from 'primereact/sidebar';

export default function DashboardLayout() {
  const [visible, setVisible] = useState(false);

  let navBar = <>
    <Navbar expand="lg" className="" bg="primary" data-bs-theme="dark" sticky="top">
      <Container fluid>
        <button type="button" onClick={() => setVisible(true)} class="navbar-toggler-side-bar mx-1" style={{visibility: "visible"}}>
          <span class="navbar-toggler-icon"></span>
        </button>
        <Navbar.Brand href="#" className="text-uppercase fw-bold border-bottom border-light p-1">
          <i className={lbl.app.icon+` text-white me-1`}></i>
          <Link to="/dashboard/produk" className="text-decoration-none text-white">
            {lbl.app.name}
          </Link>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        <Navbar.Toggle aria-controls="navbarScroll">
        <button aria-controls="navbarScroll" type="button" aria-label="Toggle navigation" class="btn btn-link btn-sm">
          <i className="pi pi-angle-down"></i>
        </button>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: 'unset' }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link> */}
            <Nav.Link href="#action1">
              <Link to="/dashboard/produk">Produk</Link>  
            </Nav.Link>
            <Nav.Link href="#action2">
              <Link to="/register">Daftar</Link> 
            </Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown" data-bs-theme="light">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                <Link to="/dashboard/produk" className="text-dark">Produk</Link> 
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              <Link to="/register">Daftar</Link> 
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            /> */}
            <input type="text" placeholder="search" className="form-control bg-white me-1"/>
            {/* <Button variant="outline-success">Search</Button> */}
            <button className={'btn btn-light btn-sm text-nowrap'} type="button">
              <i className="me-1 fa fa-search"></i>
              Search
            </button>
            <Link to="/login" className={'btn btn-light btn-sm text-nowrap ms-1 '}>
              <i className={lbl.signIn.icon+``}></i>
              Sign In
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <hr className="m-0"/>
    <div className="bg-primary" style={{height: '12px'}}></div>
    {/* <button className="btn btn-primary m-1 btn-sm" onClick={() => setVisible(true)} style={{position: "fixed", top: "72px", zIndex: 1}}>
      <i className="pi pi-arrow-right"></i>
    </button> */}
    <br/>
    <div className="mb-3"></div>
    <div className="container p-1">
      <Outlet/>
    </div>
    <div className="bg-dark mt-3" style={{height: '240px'}}>

    </div>
  </>;
    

  let navBarOld = <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col">
    <header className="bg-gradient shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard/contacts" className="flex items-center hover:opacity-90 transition-opacity duration-200">
          <i className="fas fa-address-book text-white text-2xl mr-3"></i>
          <div className="text-white font-bold text-xl">Contact Management</div>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/dashboard/users/profile"
                  className="text-gray-100 hover:text-white flex items-center transition-colors duration-200">
                <i className="fas fa-user-circle mr-2"></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users/logout"
                  className="text-gray-100 hover:text-white flex items-center transition-colors duration-200">
                <i className="fas fa-sign-out-alt mr-2"></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main className="container mx-auto px-4 py-8 flex-grow">

      <Outlet/>

      <div className="mt-10 mb-6 text-center text-gray-400 text-sm animate-fade-in">
        <p>© 2025 Contact Management. All rights reserved.</p>
      </div>
    </main>
  </div>

  return <>
    {navBar}
    {/* {navBarOld} */}

    <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <h2>Sidebar</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </Sidebar>
    </div>
  </>
}
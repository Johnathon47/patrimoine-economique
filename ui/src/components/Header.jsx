import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/patrimoine">Patrimoine Économique</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/patrimoine">Patrimoine</Nav.Link>
            <Nav.Link as={Link} to="/possession">Liste des Possessions</Nav.Link>
            <Nav.Link as={Link} to="/possession/create">Créer Possession</Nav.Link>
            <Nav.Link as={Link} to="/patrimoine/graph">PatrimoineGraph</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;

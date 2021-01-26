import React, { useState, useEffect } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import axios from 'axios';

const FunctionBasedComponent = () => {
  const [ users, setUsers ] = useState([]);
  const [ showDetails, setShowDetails ] = useState(false);

  const fetchUsers = async () => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);

    setUsers(response.data);
    console.log("call");
  };

  useEffect( () => { 
    fetchUsers(); 
  }, [  ] );

  const handleClick = event => { setShowDetails(!showDetails) };

  return (
    <Container>
      {
        users.map((user) => (
          <ul key={ user.id }>
            <li>
              <strong>{ user.name }</strong>
              <div>
                <Button
                  onClick={ handleClick }
                >
                  { showDetails ? "Close Additional Info" : "More Info"  }
              </Button>
               { showDetails &&
                 <Container className="additional-info">
                   <Row>
                     { `Email: ${ user.email }` }
                   </Row>
                   <Row>
                     { `Phone: ${ user.phone }` }
                   </Row>
                   <Row>
                     { `Website: ${ user.website }` }
                   </Row>
                 </Container>
               }
              </div>
            </li>
          </ul>
        ))
      }
    </Container>
  )
}

export default FunctionBasedComponent;

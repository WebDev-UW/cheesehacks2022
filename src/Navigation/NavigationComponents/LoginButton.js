import React, { useState, useEffect } from 'react';
import { Nav, Spinner, Button } from "react-bootstrap";

export default function LoginButton(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (props.user === null) {
    return (
      <Nav.Link>
        <div style={{ height: "1rem" }}>
          <Spinner animation="border"></Spinner>
        </div>
      </Nav.Link>
    );
  } else if (props.user === false) {
    return <Nav.Link href='/login'>Login</Nav.Link>;
  } else if (props.user?.id) {
    return (
      <Nav.Link
        href="/home"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='position-relative'
      >
        <div>
          <img
            height="18px"
            width="18px"
            className="mx-2"
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            src={`${props.user.profile_picture_url}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = `/api/files/cheesehacks_main.jpg`;
            }}
          ></img>
          {`${props.user.first_name} ${props.user.last_name}`}

          {isHovered && (
            <div className='position-absolute card top-15 end-0'>
              <Button variant="light" className="m-1" href="/home">
                Home
              </Button>
              <Button variant="light" className="m-1" href="/logout">
                Logout
              </Button>
            </div>
          )}
          {isMobile && (
            <div href="/logout" className='mt-3'>
              Logout
            </div>
          )}
        </div>
      </Nav.Link>
    );
  } else {
    return <></>;
  }
}

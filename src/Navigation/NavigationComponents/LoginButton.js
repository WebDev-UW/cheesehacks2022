import React from "react";
import { Nav, Spinner } from "react-bootstrap";

export default function LoginButton(props) {
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
      <Nav.Link href="/home">
        <div>
          <img height='18px' width='18px' className='mx-2' style={{objectFit: 'cover', borderRadius: '50%'}} src={`${props.user.profile_picture_url}`} onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src=`/api/files/cheesehacks_main.jpg`;
                  }}></img>
          {`${props.user.first_name} ${props.user.last_name}`}
        </div>
      </Nav.Link>
    );
  } else {
    return <></>;
  }
}

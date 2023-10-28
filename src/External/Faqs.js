import React from "react";
import { Accordion } from "react-bootstrap";

export default function Faqs(props) {
  return (
    <Accordion flush>
      <h4 className="text-center m-3">General</h4>
      <Accordion.Item eventKey="0">
        <Accordion.Header>What is a Hackathon?</Accordion.Header>
        <Accordion.Body>
          A hackathon is an event where students come together to work on
          software projects
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Is there any cost to attend?</Accordion.Header>
        <Accordion.Body>
          No! The hackathon is graciously supported by our corporate sponsors.
          Additionally, we will provide free catered food on the night of the
          12th.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1.5">
        <Accordion.Header>
          Can Freshmen or those without significant CS experience attend?
        </Accordion.Header>
        <Accordion.Body>
          For sure! Regardless of experience, you are welcome to come and hack!
          It's a great opportunity to build your personal professional portfolio
          and meet other developers.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>What kind of projects can I build?</Accordion.Header>
        <Accordion.Body>
          You can work on anything! Whether it is built in Java, JavaScript,
          C++, C#, or any other language, you will fit right in. Any experience
          level is welcome to participtate. We judge based on different factors,
          such as the user interface of the end-product, to the technical
          complexity of the product created.
        </Accordion.Body>
      </Accordion.Item>
      <h4 className="text-center m-3">Registration</h4>
      <Accordion.Item eventKey="1">
        <Accordion.Header>How do I attend?</Accordion.Header>
        <Accordion.Body>
          Register on this website to save your seat. Then, browse or create a
          team for the hackathon. And most importantly, show up on the day of
          the hackathon with your laptop!
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="9">
        <Accordion.Header>Can I register without a team?</Accordion.Header>
        <Accordion.Body>
          Yes, you can register without a team. When the hackathon begins, we
          will help you find a team if you have not found one in advance.
        </Accordion.Body>
      </Accordion.Item>
      <h4 className="text-center m-3">Teams</h4>
      <Accordion.Item eventKey="5">
        <Accordion.Header>Can we make teams?</Accordion.Header>
        <Accordion.Body>
          Yes! We encourage you to join a team for the hackathon. You can
          register your team in advance, or join one on the day of the hackathon
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="11">
        <Accordion.Header>How many people can be on a team?</Accordion.Header>
        <Accordion.Body>
          Teams consist of 2-4 members.
        </Accordion.Body>
      </Accordion.Item>
      <h4 className="text-center m-3">Logistics</h4>

      <Accordion.Item eventKey="4">
        <Accordion.Header>When and where is the hackathon?</Accordion.Header>
        <Accordion.Body>
          The hackathon is planned for Saturday, November 4th at 1pm to
          Sunday, November 5th at 11am. After the hackathon ends, judging will
          be performed and you may be asked to give a presentation to win awards
          or prizes.
          <br />
          <br />
          The hackathon will occur at Educational Sciences Room 204,{" "}
          <a href="https://map.wisc.edu/s/20807nlk">
            1025 W. Johnson St, Madison, WI 53715
          </a>
          . We have reserved additional rooms in the building for use during the
          hackathon.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="6">
        <Accordion.Header>Do I need to bring food?</Accordion.Header>
        <Accordion.Body>
          No! Major meals and snacks will be provided throughout the event
          thanks to our sponsors. If you have certain medical conditions, we
          would still advise for you to come prepared.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7">
        <Accordion.Header>
          What if I have dietary requirements?
        </Accordion.Header>
        <Accordion.Body>
          When you register the event, you will be able to specify any certain
          dietary requirements so that we can provide proper accomodations.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="8">
        <Accordion.Header>What should I bring?</Accordion.Header>
        <Accordion.Body>
          You should bring a laptop, a phone, chargers, materials to plan your
          site (whether that be pens/paper/markers, whiteboards, or figma), a
          pillow or blanket for some rest, and any other hardware or equipment
          that your project needs.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="10">
        <Accordion.Header>
          Can I start my project before the hackathon begins?
        </Accordion.Header>
        <Accordion.Body>
          No, please reserve all your work for the official start time on Nov
          4th.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

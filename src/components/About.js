import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
  const user = useContext(noteContext);
  return (
    <div>
      This is an about page.
      <br />
    </div>
  );
};

export default About;

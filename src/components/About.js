import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
  const user = useContext(noteContext);
  return (
    <div className="container my-4">
      <h2>About iNotebook</h2>
      <p>
        Welcome to <strong>iNotebook</strong>, your personal cloud-based
        notebook designed for
        <strong> security, convenience, and accessibility</strong>.
      </p>
      <p>
        iNotebook allows users to{" "}
        <strong>securely store and manage their notes online</strong>. With{" "}
        <strong>login and signup functionality</strong>, only authenticated
        users can access the platform, ensuring privacy and security. Each user
        can create, update, and delete their own notes, which remain completely
        private and inaccessible to others.
      </p>

      <h3>Key Features:</h3>
      <ul>
        <li>
          ✅ <strong>Cloud Storage</strong> – Access your notes from anywhere,
          anytime.
        </li>
        <li>
          ✅ <strong>Secure Login & Signup</strong> – Only registered users can
          explore the site.
        </li>
        <li>
          ✅ <strong>User-Specific Notes</strong> – Each user can see only their
          own notes.
        </li>
        <li>
          ✅ <strong>Easy-to-Use Interface</strong> – Simple and intuitive
          design for seamless note-taking.
        </li>
      </ul>

      <p>
        <strong>
          Start using iNotebook today and keep your ideas organized in the
          cloud!
        </strong>
      </p>
    </div>
  );
};

export default About;

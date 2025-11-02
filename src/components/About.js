import React from "react";
import { ReactComponent as NotesIllustration } from "../assets/Ransom note letters-pana.svg"; // Replace with your SVG file path
import { ReactComponent as CollaborationIllustration } from "../assets/Live collaboration-rafiki.svg"; // Replace with your SVG file path

function About() {
  return (
    <div
      className="container my-5 p-4 rounded shadow-sm"
      style={{ maxWidth: "900px" }}
    >
      <h1 className="text-center mb-4">About iNotebook</h1>
      <NotesIllustration
        style={{ maxWidth: "200px", display: "block", margin: "auto" }}
      />
      <p className="lead text-center my-4">
        Welcome to <strong>iNotebook</strong> – your personal online notes
        application.
      </p>
      <p>
        iNotebook is a simple and elegant platform designed to help you create,
        edit, and delete notes seamlessly. Whether you're organizing your
        thoughts, planning your day, or keeping important information handy,
        iNotebook makes note management effortless.
      </p>
      <h4 className="mt-4 mb-3">Features:</h4>
      <ul>
        <li>
          <strong>User Authentication:</strong> Secure login and sign-up to keep
          your notes private.
        </li>
        <li>
          <strong>Create Notes:</strong> Easily add new notes with titles,
          descriptions, and tags.
        </li>
        <li>
          <strong>Edit & Delete:</strong> Modify or remove your notes anytime.
        </li>
        <li>
          <strong>Responsive Design:</strong> Works flawlessly on desktops,
          tablets, and smartphones.
        </li>
        <li>
          <strong>Real-time Updates:</strong> Changes reflect instantly, making
          note management dynamic.
        </li>
      </ul>

      <CollaborationIllustration
        style={{ maxWidth: "200px", display: "block", margin: "40px auto" }}
      />
      <p>
        Your data is stored securely in the cloud, ensuring your notes are
        accessible only to you. Focused on simplicity and speed, iNotebook is
        perfect for students, professionals, or anyone who needs to keep their
        notes organized.
      </p>

      <div className="text-center mt-5">
        <h5>Connect with me:</h5>
        <p>
          <strong>Name:</strong> Subhrojit Hore
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:your.email@example.com"
            className="text-decoration-none"
          >
            subhrojithore35@gmail.com
          </a>
        </p>
        <p>
          <strong>Instagram:</strong>{" "}
          <a
            href="https://instagram.com/ghawrkaana_soinyo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            @ghawrkaana_soinyo
          </a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.bing.com/ck/a?!&&p=91b08673295d20142520adbb53c27c8af67986f55c98e79d5a53beec98805c14JmltdHM9MTc2MjA0MTYwMA&ptn=3&ver=2&hsh=4&fclid=1d5582d4-6a93-66a1-3dc6-926f6b6467e2&psq=subhrojit+hore+linked+in&u=a1aHR0cHM6Ly9pbi5saW5rZWRpbi5jb20vaW4vaHVlaHVlaHVlMjE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            Subhrojit Hore
          </a>
        </p>
      </div>

      <div className="text-center mt-4">
        <a href="/" className="btn btn-primary btn-lg">
          Get Started with iNotebook
        </a>
      </div>
    </div>
  );
}

export default About;

import { auth } from "./firbase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.signup = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await createUserWithEmailAndPassword(auth, email, password);
  window.location.href = "dashboard.html";
};

window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await signInWithEmailAndPassword(auth, email, password);
  window.location.href = "dashboard.html";
};

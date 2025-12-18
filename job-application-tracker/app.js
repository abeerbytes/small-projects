import { auth, db } from "./firbase.js";
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const company = document.getElementById("company");
const role = document.getElementById("role");
const locationInput = document.getElementById("location");
const status = document.getElementById("status");
const jobList = document.getElementById("jobList");

let allJobs = [];

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadJobs(user.uid);
  }
});

window.addJob = async () => {
  await addDoc(collection(db, "jobs"), {
    uid: auth.currentUser.uid,
    company: company.value,
    role: role.value,
    location: locationInput.value,
    status: status.value
  });

  company.value = "";
  role.value = "";
  locationInput.value = "";
};

const loadJobs = (uid) => {
  const q = query(collection(db, "jobs"), where("uid", "==", uid));
  onSnapshot(q, (snapshot) => {
    allJobs = [];
    snapshot.forEach(docSnap => {
      allJobs.push({ id: docSnap.id, ...docSnap.data() });
    });
    renderJobs(allJobs);
  });
};

const renderJobs = (jobs) => {
  jobList.innerHTML = "";
  jobs.forEach(job => {
    jobList.innerHTML += `
      <div class="bg-white p-4 rounded-xl shadow">
        <h2 class="font-bold">${job.company}</h2>
        <p>${job.role}</p>
        <p class="text-sm">${job.location || ""}</p>
        <span class="inline-block mt-2 px-3 py-1 rounded-full text-sm">
          ${job.status}
        </span>
        <button onclick="deleteJob('${job.id}')"
          class="block text-red-500 mt-3">Delete</button>
      </div>
    `;
  });
};

window.deleteJob = async (id) => {
  await deleteDoc(doc(db, "jobs", id));
};

window.filterJobs = (s) => {
  s === "All"
    ? renderJobs(allJobs)
    : renderJobs(allJobs.filter(j => j.status === s));
};

window.logout = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};

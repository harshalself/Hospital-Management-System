document.addEventListener("DOMContentLoaded", function () {
  // Common functionality
  setupNavigation();
  setupNotifications();

  // Page-specific functionality
  if (document.getElementById("patientLookupForm")) {
    setupPatientLookup();
  } else if (document.getElementById("patientForm")) {
    setupPatientForm();
  } else {
    setupOverviewPage();
  }
});

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));
      // Add active class to the clicked link
      this.classList.add("active");
    });
  });
}

function setupNotifications() {
  const notificationBell = document.querySelector(".notifications");
  if (notificationBell) {
    notificationBell.addEventListener("click", function () {
      this.classList.add("animate-ring");
      setTimeout(() => this.classList.remove("animate-ring"), 1000);
    });
  }
}

function setupPatientLookup() {
  const patientLookupForm = document.getElementById("patientLookupForm");

  patientLookupForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const patientName = document.getElementById("patientNameInput").value; // Updated here

    try {
      const response = await fetch(
        `http://localhost:5000/api/patients/${encodeURIComponent(patientName)}`
      );
      const patientDetails = await response.json();

      if (response.ok) {
        // Display patient details in the respective span elements
        document.getElementById("patientNameDisplay").innerText =
          patientDetails.name; // Updated here
        document.getElementById("patientAge").innerText = patientDetails.age;
        document.getElementById("patientGender").innerText =
          patientDetails.gender;
        document.getElementById("patientContact").innerText =
          patientDetails.contact;
        document.getElementById("patientMedicalHistory").innerText =
          patientDetails.medicalHistory;
        document.getElementById("patientAssignedDoctor").innerText =
          patientDetails.assignedDoctor;
        document.getElementById("patientDetails").style.display = "block";
        document.getElementById("errorMessage").innerText = ""; // Clear any previous error messages
      } else {
        document.getElementById("errorMessage").innerText =
          patientDetails.message; // Show error message
        document.getElementById("patientDetails").style.display = "none"; // Hide details
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("errorMessage").innerText =
        "An error occurred while fetching patient details.";
      document.getElementById("patientDetails").style.display = "none"; // Hide details
    }
  });
}

// Function to generate random data
function generateRandomPatients(count) {
  const names = [
    "John",
    "Jane",
    "Alex",
    "Emily",
    "Michael",
    "Sarah",
    "David",
    "Anna",
  ];
  const genders = ["male", "female"];
  const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Lee", "Dr. Brown"];
  const medicalHistories = ["None", "Diabetes", "Hypertension", "Asthma"];

  const patients = [];

  for (let i = 0; i < count; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAge = Math.floor(Math.random() * 100);
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomContact = `555-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
    const randomHistory =
      medicalHistories[Math.floor(Math.random() * medicalHistories.length)];

    patients.push({
      name: randomName,
      age: randomAge,
      gender: randomGender,
      contact: randomContact,
      assignedDoctor: randomDoctor,
      medicalHistory: randomHistory,
    });
  }

  return patients;
}

async function fetchPatientData() {
  // Simulating fetching random dummy data
  return generateRandomPatients(50); // Generates 50 random patients
}

async function setupOverviewPage() {
  const patientData = await fetchPatientData();

  // Define age groups
  const ageGroups = {
    "0-17": 0,
    "18-29": 0,
    "30-44": 0,
    "45-60": 0,
    "60+": 0,
  };

  // Count the number of patients in each age group and gender
  const genderCount = {
    male: 0,
    female: 0,
  };

  patientData.forEach((patient) => {
    // Age group counting
    if (patient.age <= 17) ageGroups["0-17"]++;
    else if (patient.age <= 29) ageGroups["18-29"]++;
    else if (patient.age <= 44) ageGroups["30-44"]++;
    else if (patient.age <= 60) ageGroups["45-60"]++;
    else ageGroups["60+"]++;

    // Gender counting
    if (patient.gender.toLowerCase() === "male") genderCount.male++;
    else if (patient.gender.toLowerCase() === "female") genderCount.female++;
  });

  // Prepare data for the age distribution pie chart
  const ageLabels = Object.keys(ageGroups);
  const ageData = Object.values(ageGroups);

  // Prepare data for the gender bar chart
  const genderLabels = ["Male", "Female"];
  const genderData = [genderCount.male, genderCount.female];

  // Create the age distribution pie chart
  const patientCtx = document.getElementById("patientChart").getContext("2d");
  new Chart(patientCtx, {
    type: "pie",
    data: {
      labels: ageLabels,
      datasets: [
        {
          label: "Patient Age Distribution",
          data: ageData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const dataset =
                tooltipItem.chart.data.datasets[tooltipItem.datasetIndex];
              const total = dataset.data.reduce((sum, value) => sum + value, 0);
              const value = dataset.data[tooltipItem.dataIndex];
              const percentage = ((value / total) * 100).toFixed(2);
              return `${tooltipItem.label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
    },
  });

  // Create the gender distribution bar chart
  const genderCtx = document.getElementById("genderChart").getContext("2d");
  new Chart(genderCtx, {
    type: "bar",
    data: {
      labels: genderLabels,
      datasets: [
        {
          label: "Gender Distribution",
          data: genderData,
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}`;
            },
          },
        },
      },
    },
  });

  // Animate stat numbers
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    const finalValue = parseInt(stat.textContent, 10) || 0; // Ensure it's a number
    animateValue(stat, 0, finalValue, 1000); // Call animateValue
  });
}

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
function setupPatientForm() {
  const patientForm = document.getElementById("patientForm");

  patientForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      contact: document.getElementById("contact").value,
      medicalHistory: document.getElementById("medicalHistory").value,
      assignedDoctor: document.getElementById("assignedDoctor").value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Patient added successfully!");
        patientForm.reset(); // Clear the form
      } else {
        alert(result.message); // Show error message
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("An error occurred while adding the patient.");
    }
  });
}

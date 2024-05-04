// resume.js

document.addEventListener("DOMContentLoaded", function() {
    const resumeContainer = document.getElementById("resumeContainer");
    const errorContainer = document.getElementById("errorContainer");
    const jobFilter = document.getElementById("jobFilter");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
  
    let resumeData = [];
    let filteredData = [];
    let currentIndex = 0;
  
    // Fetch data from JSON file
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        resumeData = data.resume;
        filteredData = resumeData;
        renderResume(currentIndex);
      })
      .catch(error => {
        errorContainer.textContent = "Error loading data.";
      });
  
    // Render the resume of the current applicant
    function renderResume(index) {
      const applicant = filteredData[index];
      if (applicant) {
        const basics = applicant.basics;
        const skills = applicant.skills;
        const work = applicant.work;
        const internship = applicant.internship;
        const projects = applicant.projects;
        const education = applicant.education;
        const achievements = applicant.achievements;
        const interests = applicant.interests;
  
        resumeContainer.innerHTML = `
          <div class="resume-section">
            <div class="resume-heading">${basics.name}</div>
            <div class="resume-subheading">${basics.AppliedFor}</div>
            <div class="resume-content">
              <p>Email: ${basics.email}</p>
              <p>Phone: ${basics.phone}</p>
              <p>Location: ${basics.location.city}, ${basics.location.state}</p>
            </div>
          </div>
          <!-- Add rendering for skills, work experience, etc. -->
        `;
      } else {
        resumeContainer.innerHTML = "";
        errorContainer.textContent = "No applicant found.";
      }
  
      // Hide/show previous and next buttons based on index
      if (currentIndex === 0) {
        prevButton.style.display = "none";
      } else {
        prevButton.style.display = "block";
      }
  
      if (currentIndex === filteredData.length - 1) {
        nextButton.style.display = "none";
      } else {
        nextButton.style.display = "block";
      }
    }
  
    // Event listener for filtering by job
    jobFilter.addEventListener("input", function() {
      const searchTerm = jobFilter.value.trim().toLowerCase();
      filteredData = resumeData.filter(applicant => applicant.basics.AppliedFor.toLowerCase().includes(searchTerm));
      if (filteredData.length > 0) {
        errorContainer.textContent = "";
        currentIndex = 0;
        renderResume(currentIndex);
      } else {
        errorContainer.textContent = "Invalid search or No applications for this job.";
        resumeContainer.innerHTML = "";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
      }
    });
  
    // Event listener for previous button
    prevButton.addEventListener("click", function() {
      if (currentIndex > 0) {
        currentIndex--;
        renderResume(currentIndex);
      }
    });
  
    // Event listener for next button
    nextButton.addEventListener("click", function() {
      if (currentIndex < filteredData.length - 1) {
        currentIndex++;
        renderResume(currentIndex);
      }
    });
  });
  
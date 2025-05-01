document.addEventListener('DOMContentLoaded', function() {
  const addSchoolForm = document.getElementById('addSchoolForm');
  const schoolsContainer = document.getElementById('schoolsContainer');
  const noSchoolsMessage = document.getElementById('noSchoolsMessage');
  
  // Load schools when page loads
  loadSchools();
  
  // Form submission handler
  addSchoolForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('schoolName').value.trim();
      const address = document.getElementById('schoolAddress').value.trim();
      const type = document.getElementById('schoolType').value;
      const students = document.getElementById('studentCount').value || 'N/A';
      const year = document.getElementById('establishedYear').value || 'Unknown';
      
      // Create school object with current timestamp as ID
      const school = {
          id: Date.now(),
          name,
          address,
          type,
          students,
          year,
          addedDate: new Date().toLocaleDateString()
      };
      
      // Add school to display and storage
      addSchoolToDisplay(school);
      saveSchool(school);
      
      // Reset form
      addSchoolForm.reset();
      
      // Hide "no schools" message if it's the first school
      if (noSchoolsMessage.style.display !== 'none') {
          noSchoolsMessage.style.display = 'none';
      }
  });
  
  // Function to add school to the display
  function addSchoolToDisplay(school) {
      const schoolCard = document.createElement('div');
      schoolCard.className = 'card school-card';
      schoolCard.innerHTML = `
          <div class="card-body">
              <div class="d-flex justify-content-between">
                  <h5 class="card-title">${school.name}</h5>
                  <button class="btn btn-remove btn-danger btn-sm" data-id="${school.id}">Remove</button>
              </div>
              <p class="card-text"><strong>Address:</strong> ${school.address}</p>
              <div class="row">
                  <div class="col-md-6">
                      <p class="card-text"><strong>Type:</strong> ${school.type}</p>
                  </div>
                  <div class="col-md-6">
                      <p class="card-text"><strong>Students:</strong> ${school.students}</p>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6">
                      <p class="card-text"><strong>Established:</strong> ${school.year}</p>
                  </div>
                  <div class="col-md-6">
                      <p class="card-text"><strong>Added:</strong> ${school.addedDate}</p>
                  </div>
              </div>
          </div>
      `;
      
      schoolsContainer.prepend(schoolCard);
      
      // Add event listener to remove button
      schoolCard.querySelector('.btn-remove').addEventListener('click', function() {
          if (confirm(`Are you sure you want to remove ${school.name}?`)) {
              removeSchool(school.id);
              schoolCard.remove();
              
              // Show "no schools" message if last school was removed
              if (schoolsContainer.children.length === 1) {
                  noSchoolsMessage.style.display = 'block';
              }
          }
      });
  }
  
  // Function to save school to localStorage
  function saveSchool(school) {
      let schools = JSON.parse(localStorage.getItem('schools')) || [];
      schools.push(school);
      localStorage.setItem('schools', JSON.stringify(schools));
  }
  
  // Function to load schools from localStorage
  function loadSchools() {
      let schools = JSON.parse(localStorage.getItem('schools')) || [];
      
      if (schools.length > 0) {
          noSchoolsMessage.style.display = 'none';
          
          // Add each school to display
          schools.forEach(school => {
              addSchoolToDisplay(school);
          });
      }
  }
  
  // Function to remove school from localStorage
  function removeSchool(id) {
      let schools = JSON.parse(localStorage.getItem('schools')) || [];
      schools = schools.filter(school => school.id !== id);
      localStorage.setItem('schools', JSON.stringify(schools));
  }
});
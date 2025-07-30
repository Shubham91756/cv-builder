// main.js - Cleaned and working version for CV Builder

document.addEventListener('DOMContentLoaded', function () {
  loadSampleData();
  setupEventListeners();
  updatePreview();
});

function setupEventListeners() {
  document.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  });
  document.getElementById('primaryColor').addEventListener('change', updatePreview);
}

// ------------------------ Language ------------------------
function addLanguage() {
  const container = document.getElementById('languagesContainer');
  const id = Date.now();

  const div = document.createElement('div');
  div.classList.add('language-item');
  div.dataset.id = id;
  div.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label>Language</label>
        <input type="text" class="lang-name" placeholder="English">
      </div>
      <div class="form-group">
        <label>Level</label>
        <select class="lang-level">
          <option value="Native">Native</option>
          <option value="Fluent">Fluent</option>
          <option value="Advanced">Advanced</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Basic">Basic</option>
        </select>
      </div>
    </div>
    <button class="remove-btn" onclick="removeLanguage(${id})">Remove</button>
  `;

  container.appendChild(div);

  div.querySelectorAll('input').forEach(input => input.addEventListener('input', updatePreview));
  div.querySelectorAll('select').forEach(select => select.addEventListener('change', updatePreview));

  updatePreview();
}

function removeLanguage(id) {
  const item = document.querySelector(`.language-item[data-id='${id}']`);
  if (item) item.remove();
  updatePreview();
}

// ------------------------ Education ------------------------
function addEducation() {
  const container = document.getElementById('educationContainer');
  const id = Date.now();

  const div = document.createElement('div');
  div.classList.add('education-item');
  div.dataset.id = id;
  div.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label>Degree</label>
        <input type="text" class="edu-degree" placeholder="Bachelor of Science">
      </div>
      <div class="form-group">
        <label>Institution</label>
        <input type="text" class="edu-school" placeholder="University Name">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Year</label>
        <input type="text" class="edu-year" placeholder="2018-2022">
      </div>
      <div class="form-group">
        <label>GPA (optional)</label>
        <input type="text" class="edu-gpa" placeholder="3.8/4.0">
      </div>
    </div>
    <button class="remove-btn" onclick="removeEducation(${id})">Remove</button>
  `;

  container.appendChild(div);

  div.querySelectorAll('input').forEach(input => input.addEventListener('input', updatePreview));

  updatePreview();
}

function removeEducation(id) {
  const item = document.querySelector(`.education-item[data-id='${id}']`);
  if (item) item.remove();
  updatePreview();
}

// ------------------------ Project ------------------------
function addProject() {
  const container = document.getElementById('projectsContainer');
  const id = Date.now();

  const div = document.createElement('div');
  div.classList.add('project-item');
  div.dataset.id = id;
  div.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label>Project Name</label>
        <input type="text" class="proj-name" placeholder="E-commerce Platform">
      </div>
      <div class="form-group">
        <label>Technologies</label>
        <input type="text" class="proj-tech" placeholder="React, Node.js, MongoDB">
      </div>
    </div>
    <div class="form-group full-width">
      <label>Description</label>
      <textarea class="proj-description" placeholder="Describe the project and your role..."></textarea>
    </div>
    <button class="remove-btn" onclick="removeProject(${id})">Remove</button>
  `;

  container.appendChild(div);

  div.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', updatePreview));

  updatePreview();
}

function removeProject(id) {
  const item = document.querySelector(`.project-item[data-id='${id}']`);
  if (item) item.remove();
  updatePreview();
}

// ------------------------ Preview Logic ------------------------
function updatePreview() {
  // Language
  const langSection = document.getElementById('languagesSection');
  const langPreview = document.getElementById('previewLanguages');
  const langItems = document.querySelectorAll('.language-item');
  if (langItems.length === 0) {
    langSection.style.display = 'none';
    langPreview.innerHTML = '';
  } else {
    let html = '';
    langItems.forEach(item => {
      const name = item.querySelector('.lang-name')?.value || '';
      const level = item.querySelector('.lang-level')?.value || '';
      if (name.trim()) {
        html += `<div class="language-item"><span>${name}</span><span class="language-level">${level}</span></div>`;
      }
    });
    langPreview.innerHTML = html;
    langSection.style.display = html ? 'block' : 'none';
  }

  // Education
  const eduPreview = document.getElementById('previewEducation');
  const eduItems = document.querySelectorAll('.education-item');
  if (eduItems.length === 0) {
    eduPreview.innerHTML = 'No education added yet...';
  } else {
    let html = '';
    eduItems.forEach(item => {
      const degree = item.querySelector('.edu-degree')?.value || '';
      const school = item.querySelector('.edu-school')?.value || '';
      const year = item.querySelector('.edu-year')?.value || '';
      const gpa = item.querySelector('.edu-gpa')?.value || '';
      if (degree || school) {
        html += `
          <div class="education-item">
            <div class="item-header">
              <div>
                <div class="item-title">${degree}</div>
                <div class="item-company">${school}</div>
              </div>
              <div class="item-date">${year}</div>
            </div>
            ${gpa ? `<p>GPA: ${gpa}</p>` : ''}
          </div>
        `;
      }
    });
    eduPreview.innerHTML = html || 'No education added yet...';
  }

  // Project
  const projPreview = document.getElementById('previewProjects');
  const projSection = document.getElementById('projectsSection');
  const projItems = document.querySelectorAll('.project-item');
  if (projItems.length === 0) {
    projSection.style.display = 'none';
  } else {
    let html = '';
    projItems.forEach(item => {
      const name = item.querySelector('.proj-name')?.value || '';
      const tech = item.querySelector('.proj-tech')?.value || '';
      const desc = item.querySelector('.proj-description')?.value || '';
      if (name || desc) {
        html += `
          <div class="project-item">
            <div class="item-header">
              <div>
                <div class="item-title">${name}</div>
                <div class="item-company">${tech}</div>
              </div>
            </div>
            <p>${desc}</p>
          </div>
        `;
      }
    });
    projPreview.innerHTML = html;
    projSection.style.display = html ? 'block' : 'none';
  }
}

function loadSampleData() {
  document.getElementById('fullName').value = 'John Doe';
  document.getElementById('jobTitle').value = 'Full Stack Developer';
  document.getElementById('email').value = 'john.doe@email.com';
  document.getElementById('phone').value = '+1 (555) 123-4567';
  document.getElementById('location').value = 'New York, NY';
  document.getElementById('website').value = 'https://linkedin.com/in/johndoe';
  document.getElementById('summary').value = 'Full Stack Developer with experience in scalable systems.';
  document.getElementById('skills').value = 'JavaScript, Python, React';

  addLanguage();
  addEducation();
  addProject();
}

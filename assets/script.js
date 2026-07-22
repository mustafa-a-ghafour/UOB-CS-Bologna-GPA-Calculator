// Curriculum Data Structure
const curriculum = {
  stage1: {
    name: "المرحلة الأولى",
    semester1: [
      { name: "اساسيات البرمجة 1", credits: 8 },
      { name: "تركيب الحاسوب", credits: 7 },
      { name: "مقدمة الى علم الحاسوب", credits: 5 },
      { name: "حساب التفاضل و التكامل", credits: 6 },
      { name: "اللغة الانكليزية 1", credits: 2 },
      { name: "الديمقراطية و حقوق الانسان", credits: 2 }
    ],
    semester2: [
      { name: "اساسيات البرمجة 2", credits: 8 },
      { name: "هياكل متقطعة", credits: 6 },
      { name: "المنطق الرقمي", credits: 7 },
      { name: "مهارات الكتابة الاكاديمية", credits: 5 },
      { name: "الاحتمالية و الاحصاء", credits: 2 },
      { name: "اللغة العربية 1", credits: 2 }
    ]
  },
  stage2: {
    name: "المرحلة الثانية",
    semester1: [
      { name: "هياكل بيانات", credits: 6 },
      { name: "برمجة كيانية", credits: 6 },
      { name: "طرائق عددية", credits: 5 },
      { name: "النظرية الاحتسابية", credits: 5 },
      { name: "برمجة مرئية", credits: 6 },
      { name: "اللغة الانكليزية 2", credits: 2 }
    ],
    semester2: [
      { name: "تصميم و تحليل الخوارزميات", credits: 7 },
      { name: "لغة للأغراض العامة", credits: 7 },
      { name: "مترجمات", credits: 6 },
      { name: "تصميم و برمجة الويب", credits: 6 },
      { name: "اللغة العربية 2", credits: 2 },
      { name: "جرائم نظام البعث في العراق", credits: 2 }
    ]
  },
  stage3: {
    name: "المرحلة الثالثة",
    semester1: [
      { name: "ذكاء اصطناعي", credits: 6 },
      { name: "شبكات الحاسوب", credits: 6 },
      { name: "امن الحاسوب", credits: 5 },
      { name: "تطوير تطبيقات الويب", credits: 5 },
      { name: "هندسة برمجيات", credits: 4 },
      { name: "معمارية الحاسوب", credits: 4 }
    ],
    semester2: [
      { name: "تطوير تطبيقات النقال", credits: 6 },
      { name: "رسوم الحاسوب", credits: 6 },
      { name: "تعلم الألة", credits: 6 },
      { name: "أساسيات أنظمة قواعد البيانات", credits: 6 },
      { name: "تشفير", credits: 5 },
      { name: "منهجية البحث العلمي", credits: 1 }
    ]
  },
  stage4: {
    name: "المرحلة الرابعة",
    semester1: [
      { name: "معالجة الصور الرقمية", credits: 6 },
      { name: "أنظمة إدارة قواعد البيانات", credits: 6 },
      { name: "مقدمة الى انترنيت الأشياء", credits: 4 },
      { name: "نظم تشغيل", credits: 6 },
      { name: "استرجاع المعلومات", credits: 5 },
      { name: "مشروع بحث 1", credits: 3 }
    ],
    semester2: [
      { name: "تنقيب بيانات", credits: 6 },
      { name: "امن سيبراني", credits: 6 },
      { name: "مقدمة الى الروبوتات", credits: 5 },
      { name: "وسائط متعددة", credits: 6 },
      { name: "حوسبة متوازية و توزيعية", credits: 4 },
      { name: "مشروع بحث 2", credits: 3 }
    ]
  }
};

// Grading Scales Mapping
const gradeScale = {
  "امتياز": { name: "امتياز", min: 90, max: 100, avg: 95 },
  "جيد جداً": { name: "جيد جداً", min: 80, max: 89, avg: 84.5 },
  "جيد": { name: "جيد", min: 70, max: 79, avg: 74.5 },
  "متوسط": { name: "متوسط", min: 60, max: 69, avg: 64.5 },
  "مقبول": { name: "مقبول", min: 50, max: 59, avg: 54.5 },
  "ناجح بقيد المعالجة": { name: "ناجح بقيد المعالجة", min: 50, max: 50, avg: 50 }
};

// Global App State
let activeStage = "stage1";
let isPreciseMode = false;
let isCumulativeAllStages = false;
let selectedGrades = {
  stage1: { semester1: {}, semester2: {} },
  stage2: { semester1: {}, semester2: {} },
  stage3: { semester1: {}, semester2: {} },
  stage4: { semester1: {}, semester2: {} }
};

// Load data from LocalStorage if exists
function loadStateFromLocalStorage() {
  // Clean up any previously saved grades to start fresh on reload
  localStorage.removeItem("bologna_gpa_grades");
  
  const savedStage = localStorage.getItem("bologna_gpa_active_stage");
  if (savedStage && curriculum[savedStage]) {
    activeStage = savedStage;
  }
  
  const savedPreciseMode = localStorage.getItem("bologna_gpa_precise_mode");
  if (savedPreciseMode !== null) {
    isPreciseMode = savedPreciseMode === "true";
  }
  
  const savedScope = localStorage.getItem("bologna_gpa_cumulative_all_stages");
  if (savedScope !== null) {
    isCumulativeAllStages = savedScope === "true";
  }
}

// Save state to LocalStorage
function saveStateToLocalStorage() {
  localStorage.setItem("bologna_gpa_active_stage", activeStage);
  localStorage.setItem("bologna_gpa_precise_mode", isPreciseMode);
  localStorage.setItem("bologna_gpa_cumulative_all_stages", isCumulativeAllStages);
}

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
  loadStateFromLocalStorage();
  initializeTheme();
  setupPreciseToggle();
  setupScopeToggle();
  renderStageSelector();
  renderStage(activeStage);
  setupThemeToggle();
});

// Precise Mode Toggle Setup
function setupPreciseToggle() {
  const toggle = document.getElementById("precise-toggle");
  if (!toggle) return;
  
  toggle.checked = isPreciseMode;
  document.body.classList.toggle("precise-mode-active", isPreciseMode);
  
  toggle.addEventListener("change", (e) => {
    isPreciseMode = e.target.checked;
    document.body.classList.toggle("precise-mode-active", isPreciseMode);
    convertGradesMode(isPreciseMode);
    saveStateToLocalStorage();
    renderStage(activeStage);
  });
}

// Scope Toggle Setup
function setupScopeToggle() {
  const toggle = document.getElementById("scope-toggle");
  if (!toggle) return;
  
  toggle.checked = isCumulativeAllStages;
  
  toggle.addEventListener("change", (e) => {
    isCumulativeAllStages = e.target.checked;
    saveStateToLocalStorage();
    renderStage(activeStage);
  });
}

// Helper to convert existing grades when switching modes
function convertGradesMode(toPrecise) {
  for (const stage in selectedGrades) {
    for (const sem in selectedGrades[stage]) {
      for (const subjectName in selectedGrades[stage][sem]) {
        const val = selectedGrades[stage][sem][subjectName];
        if (toPrecise) {
          if (typeof val === "string" && gradeScale[val]) {
            selectedGrades[stage][sem][subjectName] = gradeScale[val].avg;
          }
        } else {
          if (typeof val === "number" || !isNaN(parseFloat(val))) {
            const num = parseFloat(val);
            const scaleKey = getGradeScaleKey(num);
            if (scaleKey) {
              selectedGrades[stage][sem][subjectName] = scaleKey;
            } else {
              delete selectedGrades[stage][sem][subjectName];
            }
          }
        }
      }
    }
  }
}

// Map exact grade back to estimate key
function getGradeScaleKey(val) {
  if (val >= 90 && val <= 100) return "امتياز";
  if (val >= 80 && val < 90) return "جيد جداً";
  if (val >= 70 && val < 80) return "جيد";
  if (val >= 60 && val < 70) return "متوسط";
  if (val >= 50 && val < 60) return "مقبول";
  return null;
}

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem("bologna_gpa_theme") || "light-mode";
  document.documentElement.className = savedTheme;
}

function setupThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark-mode");
    const newTheme = isDark ? "light-mode" : "dark-mode";
    document.documentElement.className = newTheme;
    localStorage.setItem("bologna_gpa_theme", newTheme);
  });
}

// Stage Selector rendering and handlers
function renderStageSelector() {
  const select = document.getElementById("stage-select");
  if (!select) return;
  
  // Set current selected stage from state
  select.value = activeStage;
  
  // Listen to changes to dynamically render stage
  select.addEventListener("change", (e) => {
    activeStage = e.target.value;
    saveStateToLocalStorage();
    renderStage(activeStage);
  });
}

// Render dynamic subjects for both semesters
function renderStage(stageKey) {
  const sem1List = document.getElementById("semester1-subjects");
  const sem2List = document.getElementById("semester2-subjects");
  const singleStageWrapper = document.getElementById("single-stage-wrapper");
  const allStagesContainer = document.getElementById("all-stages-container");
  const selectorContainer = document.querySelector(".stage-selector-container");
  
  if (isCumulativeAllStages) {
    // Hide Stage Selector and Single Stage Grid
    if (selectorContainer) selectorContainer.style.display = "none";
    if (singleStageWrapper) singleStageWrapper.style.display = "none";
    if (allStagesContainer) {
      allStagesContainer.style.display = "flex";
      allStagesContainer.innerHTML = "";
    }
    
    // Render subjects for all stages grouped by stage rows
    for (const key in curriculum) {
      const stageName = curriculum[key].name;
      
      // Calculate total credits for this stage
      const s1Credits = curriculum[key].semester1.reduce((sum, s) => sum + s.credits, 0);
      const s2Credits = curriculum[key].semester2.reduce((sum, s) => sum + s.credits, 0);
      
      // Stage wrapper
      const stageWrapper = document.createElement("div");
      stageWrapper.className = "stage-wrapper-outside";
      
      // Stage title
      const stageTitle = document.createElement("h3");
      stageTitle.className = "stage-header-title-outside";
      stageTitle.textContent = stageName;
      stageWrapper.appendChild(stageTitle);
      
      const stageRow = document.createElement("div");
      stageRow.className = "stage-row";
      stageWrapper.appendChild(stageRow);
      
      // Columns grid
      const columnsGrid = document.createElement("div");
      columnsGrid.className = "stage-row-columns";
      
      // Semester 1 Column
      const col1 = document.createElement("div");
      col1.className = "stage-row-column";
      const col1Header = document.createElement("div");
      col1Header.className = "stage-row-column-header";
      col1Header.textContent = `الكورس الأول (${getCreditsLabel(s1Credits)})`;
      col1.appendChild(col1Header);
      const list1 = document.createElement("div");
      list1.className = "subjects-list";
      curriculum[key].semester1.forEach((subject, index) => {
        list1.appendChild(createSubjectCard(subject, "semester1", index, key));
      });
      col1.appendChild(list1);
      
      // Semester 2 Column
      const col2 = document.createElement("div");
      col2.className = "stage-row-column";
      const col2Header = document.createElement("div");
      col2Header.className = "stage-row-column-header";
      col2Header.textContent = `الكورس الثاني (${getCreditsLabel(s2Credits)})`;
      col2.appendChild(col2Header);
      const list2 = document.createElement("div");
      list2.className = "subjects-list";
      curriculum[key].semester2.forEach((subject, index) => {
        list2.appendChild(createSubjectCard(subject, "semester2", index, key));
      });
      col2.appendChild(list2);
      
      columnsGrid.appendChild(col1);
      columnsGrid.appendChild(col2);
      stageRow.appendChild(columnsGrid);
      
      if (allStagesContainer) {
        allStagesContainer.appendChild(stageWrapper);
      }
    }
  } else {
    // Show Stage Selector and Single Stage Grid
    if (selectorContainer) selectorContainer.style.display = "flex";
    if (singleStageWrapper) singleStageWrapper.style.display = "";
    if (allStagesContainer) allStagesContainer.style.display = "none";
    
    sem1List.innerHTML = "";
    sem2List.innerHTML = "";
    
    const stageData = curriculum[stageKey];
    if (!stageData) return;

    // Update single stage title dynamically
    const singleStageTitle = document.getElementById("single-stage-title");
    if (singleStageTitle) {
      singleStageTitle.textContent = stageData.name;
    }
    
    const s1TotalCredits = stageData.semester1.reduce((sum, s) => sum + s.credits, 0);
    const s2TotalCredits = stageData.semester2.reduce((sum, s) => sum + s.credits, 0);
    
    document.getElementById("s1-total-credits-display").textContent = `الكورس الأول (${getCreditsLabel(s1TotalCredits)})`;
    document.getElementById("s2-total-credits-display").textContent = `الكورس الثاني (${getCreditsLabel(s2TotalCredits)})`;
    
    // Render Semester 1 subjects
    stageData.semester1.forEach((subject, index) => {
      sem1List.appendChild(createSubjectCard(subject, "semester1", index, stageKey));
    });
    
    // Render Semester 2 subjects
    stageData.semester2.forEach((subject, index) => {
      sem2List.appendChild(createSubjectCard(subject, "semester2", index, stageKey));
    });
  }
  
  // Compute & Render GPAs
  calculateGPAs();
}

// Helper to create individual subject card HTML element
function createSubjectCard(subject, semesterKey, index, stageKey) {
  const card = document.createElement("div");
  card.className = "subject-card";
  
  const savedGrade = selectedGrades[stageKey][semesterKey][subject.name];
  const hasGrade = savedGrade !== undefined && savedGrade !== null && savedGrade !== "";
  if (hasGrade) {
    card.classList.add("has-grade");
  }
  
  // Create card info section
  const infoDiv = document.createElement("div");
  infoDiv.className = "subject-info";
  
  const nameSpan = document.createElement("span");
  nameSpan.className = "subject-name";
  nameSpan.textContent = subject.name;
  
  const creditsSpan = document.createElement("span");
  creditsSpan.className = "subject-credits";
  creditsSpan.innerHTML = `عدد الوحدات: <span class="subject-credits-badge">${getCreditsLabel(subject.credits)}</span>`;
  
  infoDiv.appendChild(nameSpan);
  infoDiv.appendChild(creditsSpan);
  
  if (isPreciseMode) {
    // Create numeric input wrapper
    const inputWrapper = document.createElement("div");
    inputWrapper.className = "grade-input-wrapper";
    
    const input = document.createElement("input");
    input.type = "number";
    input.className = "grade-numeric-input";
    input.placeholder = "الدرجة (50-100)";
    input.min = "50";
    input.max = "100";
    input.setAttribute("aria-label", `درجة مادة ${subject.name}`);
    
    if (hasGrade) {
      input.value = savedGrade;
    }
    
    // Real-time update and validation
    input.addEventListener("input", (e) => {
      let val = e.target.value;
      if (val === "") {
        input.classList.remove("is-invalid");
        delete selectedGrades[stageKey][semesterKey][subject.name];
        card.classList.remove("has-grade");
      } else {
        let numVal = parseFloat(val);
        if (isNaN(numVal) || numVal < 50 || numVal > 100) {
          input.classList.add("is-invalid");
          delete selectedGrades[stageKey][semesterKey][subject.name];
          card.classList.remove("has-grade");
        } else {
          input.classList.remove("is-invalid");
          selectedGrades[stageKey][semesterKey][subject.name] = numVal;
          card.classList.add("has-grade");
        }
      }
      saveStateToLocalStorage();
      calculateGPAs();
    });
    
    inputWrapper.appendChild(input);
    card.appendChild(infoDiv);
    card.appendChild(inputWrapper);
  } else {
    // Create grade selection select dropdown
    const selectWrapper = document.createElement("div");
    selectWrapper.className = "grade-select-wrapper";
    
    const select = document.createElement("select");
    select.className = "grade-select";
    select.setAttribute("aria-label", `تقدير مادة ${subject.name}`);
    
    // Add placeholder option
    const placeholderOpt = document.createElement("option");
    placeholderOpt.value = "";
    placeholderOpt.textContent = "اختر التقدير";
    select.appendChild(placeholderOpt);
    
    // Populate grades
    Object.keys(gradeScale).forEach(gradeKey => {
      const scale = gradeScale[gradeKey];
      const opt = document.createElement("option");
      opt.value = gradeKey;
      
      // Different text formatting based on conditional pass or range scale
      if (scale.min === scale.max) {
        opt.textContent = `${scale.name} (${scale.min})`;
      } else {
        opt.textContent = `${scale.name} (${scale.min}-${scale.max})`;
      }
      
      if (hasGrade && savedGrade === gradeKey) {
        opt.selected = true;
      }
      
      select.appendChild(opt);
    });
    
    // Event listener for real-time update
    select.addEventListener("change", (e) => {
      const value = e.target.value;
      if (value) {
        selectedGrades[stageKey][semesterKey][subject.name] = value;
        card.classList.add("has-grade");
      } else {
        delete selectedGrades[stageKey][semesterKey][subject.name];
        card.classList.remove("has-grade");
      }
      
      saveStateToLocalStorage();
      calculateGPAs();
    });
    
    selectWrapper.appendChild(select);
    card.appendChild(infoDiv);
    card.appendChild(selectWrapper);
  }
  
  return card;
}

// Calculate and render all GPAs (Min, Max, Avg)
function calculateGPAs() {
  const dbTitle = document.querySelector(".dashboard-title");
  if (dbTitle) {
    dbTitle.textContent = isCumulativeAllStages ? "لوحة ملخص المعدلات (جميع المراحل)" : "لوحة ملخص المعدلات (المرحلة الحالية)";
  }

  const dashboard = document.querySelector(".summary-dashboard");
  if (dashboard) {
    dashboard.classList.toggle("all-stages-active", isCumulativeAllStages);
  }

  if (isCumulativeAllStages) {
    const s1GPA = calculateSemesterGPA("semester1");
    updateGPADisplay("s1", s1GPA);
    
    const s2GPA = calculateSemesterGPA("semester2");
    updateGPADisplay("s2", s2GPA);
    
    const cumulativeGPA = calculateCumulativeGPA();
    updateGPADisplay("cumulative", cumulativeGPA);
    
    const totalStageCredits = 240;
    const gradedCredits = (s1GPA.gradedCredits || 0) + (s2GPA.gradedCredits || 0);
    document.getElementById("cumulative-credits-ratio").textContent = 
      `${getCreditsLabel(gradedCredits)} من أصل ${getCreditsLabel(totalStageCredits)} تم اختيارها`;
  } else {
    const s1GPA = calculateSemesterGPA("semester1", activeStage);
    updateGPADisplay("s1", s1GPA);
    
    const s2GPA = calculateSemesterGPA("semester2", activeStage);
    updateGPADisplay("s2", s2GPA);
    
    const cumulativeGPA = calculateCumulativeGPA(activeStage);
    updateGPADisplay("cumulative", cumulativeGPA);
    
    const totalStageCredits = 60;
    const gradedCredits = (s1GPA.gradedCredits || 0) + (s2GPA.gradedCredits || 0);
    document.getElementById("cumulative-credits-ratio").textContent = 
      `${getCreditsLabel(gradedCredits)} من أصل ${getCreditsLabel(totalStageCredits)} تم اختيارها`;
  }
}

// Calculate GPA for a specific semester
function calculateSemesterGPA(semesterKey, stageKey = null) {
  let weightedMin = 0;
  let weightedMax = 0;
  let weightedAvg = 0;
  let gradedCredits = 0;
  
  const stagesToCalculate = stageKey ? [stageKey] : Object.keys(curriculum);
  
  stagesToCalculate.forEach(sKey => {
    const subjects = curriculum[sKey][semesterKey];
    subjects.forEach(subject => {
      const val = selectedGrades[sKey][semesterKey][subject.name];
      if (val !== undefined && val !== null && val !== "") {
        if (isPreciseMode) {
          const grade = parseFloat(val);
          if (!isNaN(grade) && grade >= 50 && grade <= 100) {
            weightedMin += grade * subject.credits;
            weightedMax += grade * subject.credits;
            weightedAvg += grade * subject.credits;
            gradedCredits += subject.credits;
          }
        } else {
          if (gradeScale[val]) {
            const scale = gradeScale[val];
            weightedMin += scale.min * subject.credits;
            weightedMax += scale.max * subject.credits;
            weightedAvg += scale.avg * subject.credits;
            gradedCredits += subject.credits;
          }
        }
      }
    });
  });
  
  if (gradedCredits === 0) {
    return { min: null, max: null, avg: null, gradedCredits: 0 };
  }
  
  return {
    min: (weightedMin / gradedCredits).toFixed(2),
    max: (weightedMax / gradedCredits).toFixed(2),
    avg: (weightedAvg / gradedCredits).toFixed(2),
    gradedCredits: gradedCredits
  };
}

// Calculate Cumulative Stage GPA (Semester 1 + Semester 2)
function calculateCumulativeGPA(stageKey = null) {
  let weightedMin = 0;
  let weightedMax = 0;
  let weightedAvg = 0;
  let gradedCredits = 0;
  
  const stagesToCalculate = stageKey ? [stageKey] : Object.keys(curriculum);
  
  stagesToCalculate.forEach(sKey => {
    // Sem 1
    curriculum[sKey].semester1.forEach(subject => {
      const val = selectedGrades[sKey]["semester1"][subject.name];
      if (val !== undefined && val !== null && val !== "") {
        if (isPreciseMode) {
          const grade = parseFloat(val);
          if (!isNaN(grade) && grade >= 50 && grade <= 100) {
            weightedMin += grade * subject.credits;
            weightedMax += grade * subject.credits;
            weightedAvg += grade * subject.credits;
            gradedCredits += subject.credits;
          }
        } else {
          if (gradeScale[val]) {
            const scale = gradeScale[val];
            weightedMin += scale.min * subject.credits;
            weightedMax += scale.max * subject.credits;
            weightedAvg += scale.avg * subject.credits;
            gradedCredits += subject.credits;
          }
        }
      }
    });
    
    // Sem 2
    curriculum[sKey].semester2.forEach(subject => {
      const val = selectedGrades[sKey]["semester2"][subject.name];
      if (val !== undefined && val !== null && val !== "") {
        if (isPreciseMode) {
          const grade = parseFloat(val);
          if (!isNaN(grade) && grade >= 50 && grade <= 100) {
            weightedMin += grade * subject.credits;
            weightedMax += grade * subject.credits;
            weightedAvg += grade * subject.credits;
            gradedCredits += subject.credits;
          }
        } else {
          if (gradeScale[val]) {
            const scale = gradeScale[val];
            weightedMin += scale.min * subject.credits;
            weightedMax += scale.max * subject.credits;
            weightedAvg += scale.avg * subject.credits;
            gradedCredits += subject.credits;
          }
        }
      }
    });
  });
  
  if (gradedCredits === 0) {
    return { min: null, max: null, avg: null, gradedCredits: 0 };
  }
  
  return {
    min: (weightedMin / gradedCredits).toFixed(2),
    max: (weightedMax / gradedCredits).toFixed(2),
    avg: (weightedAvg / gradedCredits).toFixed(2),
    gradedCredits: gradedCredits
  };
}

// Helper to update HTML display for GPA
function updateGPADisplay(prefix, gpaObject) {
  const avgEl = document.getElementById(`${prefix}-gpa-avg`);
  const minEl = document.getElementById(`${prefix}-gpa-min`);
  const maxEl = document.getElementById(`${prefix}-gpa-max`);
  
  if (gpaObject.avg === null) {
    avgEl.textContent = "-.-";
    minEl.textContent = "-.-";
    maxEl.textContent = "-.-";
  } else {
    avgEl.textContent = gpaObject.avg;
    minEl.textContent = gpaObject.min;
    maxEl.textContent = gpaObject.max;
  }
  
  // Update labels dynamically based on precise mode and cumulative mode
  const card = document.getElementById(prefix === "cumulative" ? "cumulative-summary-card" : `${prefix}-summary-card`);
  if (card) {
    const labelEl = card.querySelector(".gpa-label");
    const headerEl = card.querySelector("h4");
    if (labelEl) {
      if (prefix === "cumulative") {
        if (isCumulativeAllStages) {
          if (headerEl) headerEl.textContent = "المعدل التراكمي العام";
          labelEl.textContent = isPreciseMode ? "المعدل التراكمي الدقيق" : "المعدل التراكمي المتوسط";
        } else {
          if (headerEl) headerEl.textContent = "المعدل التراكمي للمرحلة";
          labelEl.textContent = isPreciseMode ? "المعدل التراكمي الدقيق" : "المعدل التراكمي المتوسط";
        }
      } else {
        labelEl.textContent = isPreciseMode ? "المعدل الدقيق" : "المتوسط";
      }
    }
  }
}

// Arabic grammatically correct credits formatter (العدد والمعدود)
function getCreditsLabel(count) {
  if (count === 1) {
    return "وحدة واحدة";
  }
  if (count === 2) {
    return "وحدتين";
  }
  if (count >= 3 && count <= 10) {
    return `${count} وحدات`;
  }
  return `${count} وحدة`;
}

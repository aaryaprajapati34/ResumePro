// =========================================================
// ResumePro - Resume Builder
// builder.js
// =========================================================


// =========================================================
// ELEMENTS
// =========================================================

const form = document.getElementById("resumeForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const summary = document.getElementById("summary");
const skills = document.getElementById("skills");
const certifications = document.getElementById("certifications");

const resumeNameInput =
    document.getElementById("resume_name");


// =========================================================
// PREVIEW ELEMENTS
// =========================================================

const previewFullname =
    document.getElementById("previewFullname");

const previewEmail =
    document.getElementById("previewEmail");

const previewPhone =
    document.getElementById("previewPhone");

const previewAddress =
    document.getElementById("previewAddress");

const previewSummary =
    document.getElementById("previewSummary");

const previewEducation =
    document.getElementById("previewEducation");

const previewExperience =
    document.getElementById("previewExperience");

const previewSkills =
    document.getElementById("previewSkills");

const previewProjects =
    document.getElementById("previewProjects");

const previewCertifications =
    document.getElementById("previewCertifications");

const resumePreview =
    document.getElementById("resumePreview");


// =========================================================
// PROFILE PHOTO
// =========================================================

const profileImageInput =
    document.getElementById("profile_image");

const previewPhotoLive =
    document.getElementById("previewPhotoLive");

const livePhotoWrapper =
    document.getElementById("livePhotoWrapper");


// =========================================================
// HELPER
// =========================================================

function getValue(element) {

    if (!element) {
        return "";
    }

    return String(element.value || "").trim();
}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(value) {

    if (!value) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =========================================================
// FORMAT TEXT
// =========================================================

function formatText(value) {

    if (!value) {
        return "";
    }

    return escapeHTML(value)
        .replace(/\r?\n/g, "<br>");
}


// =========================================================
// PERSONAL INFORMATION PREVIEW
// =========================================================

function updatePersonalPreview() {

    if (previewFullname) {

        previewFullname.textContent =
            getValue(fullname) || "Your Name";
    }


    if (previewEmail) {

        const value =
            getValue(email);

        previewEmail.textContent =
            value || "you@example.com";

        previewEmail.style.display =
            value ? "" : "";
    }


    if (previewPhone) {

        const value =
            getValue(phone);

        previewPhone.textContent =
            value;

        previewPhone.style.display =
            value ? "" : "none";
    }


    if (previewAddress) {

        const value =
            getValue(address);

        previewAddress.textContent =
            value;

        previewAddress.style.display =
            value ? "" : "none";
    }
}


// =========================================================
// SUMMARY PREVIEW
// =========================================================

function updateSummaryPreview() {

    if (!previewSummary) {
        return;
    }

    const value =
        getValue(summary);

    previewSummary.innerHTML =
        value
            ? formatText(value)
            : "Your professional summary will appear here.";
}


// =========================================================
// EDUCATION COLLECTION
// =========================================================

function collectEducation() {

    const items =
        document.querySelectorAll(
            "#educationContainer .repeat-item"
        );

    const results = [];


    items.forEach(item => {

        const degree =
            item.querySelector(
                ".education-degree"
            )?.value.trim() || "";

        const institution =
            item.querySelector(
                ".education-institution"
            )?.value.trim() || "";

        const start =
            item.querySelector(
                ".education-start"
            )?.value.trim() || "";

        const end =
            item.querySelector(
                ".education-end"
            )?.value.trim() || "";

        const grade =
            item.querySelector(
                ".education-grade"
            )?.value.trim() || "";


        if (
            !degree &&
            !institution &&
            !start &&
            !end &&
            !grade
        ) {
            return;
        }


        const lines = [];


        if (degree) {
            lines.push(degree);
        }

        if (institution) {
            lines.push(institution);
        }

        if (start || end) {

            if (start && end) {

                lines.push(
                    `${start} - ${end}`
                );

            } else {

                lines.push(
                    start || end
                );
            }
        }

        if (grade) {
            lines.push(grade);
        }


        if (lines.length) {

            results.push(
                lines.join("\n")
            );
        }

    });


    return results.join("\n\n");
}


// =========================================================
// EXPERIENCE COLLECTION
// =========================================================

function collectExperience() {

    const items =
        document.querySelectorAll(
            "#experienceContainer .repeat-item"
        );

    const results = [];


    items.forEach(item => {

        const title =
            item.querySelector(
                ".experience-title"
            )?.value.trim() || "";

        const company =
            item.querySelector(
                ".experience-company"
            )?.value.trim() || "";

        const start =
            item.querySelector(
                ".experience-start"
            )?.value.trim() || "";

        const end =
            item.querySelector(
                ".experience-end"
            )?.value.trim() || "";

        const description =
            item.querySelector(
                ".experience-description"
            )?.value.trim() || "";


        if (
            !title &&
            !company &&
            !start &&
            !end &&
            !description
        ) {
            return;
        }


        const lines = [];


        if (title) {
            lines.push(title);
        }

        if (company) {
            lines.push(company);
        }

        if (start || end) {

            if (start && end) {

                lines.push(
                    `${start} - ${end}`
                );

            } else {

                lines.push(
                    start || end
                );
            }
        }


        let entry =
            lines.join("\n");


        if (description) {

            if (entry) {
                entry += "\n\n";
            }

            entry += description;
        }


        if (entry) {
            results.push(entry);
        }

    });


    return results.join("\n\n");
}


// =========================================================
// PROJECT COLLECTION
// =========================================================

function collectProjects() {

    const items =
        document.querySelectorAll(
            "#projectsContainer .repeat-item"
        );

    const results = [];


    items.forEach(item => {

        const name =
            item.querySelector(
                ".project-name"
            )?.value.trim() || "";

        const technologies =
            item.querySelector(
                ".project-tech"
            )?.value.trim() || "";

        const description =
            item.querySelector(
                ".project-description"
            )?.value.trim() || "";


        if (
            !name &&
            !technologies &&
            !description
        ) {
            return;
        }


        const lines = [];


        if (name) {
            lines.push(name);
        }

        if (technologies) {

            lines.push(
                `Technologies: ${technologies}`
            );
        }


        let entry =
            lines.join("\n");


        if (description) {

            if (entry) {
                entry += "\n\n";
            }

            entry += description;
        }


        if (entry) {
            results.push(entry);
        }

    });


    return results.join("\n\n");
}


// =========================================================
// EDUCATION PREVIEW
// =========================================================

function updateEducationPreview() {

    if (!previewEducation) {
        return;
    }

    const value =
        collectEducation();

    previewEducation.innerHTML =
        value
            ? formatText(value)
            : "Your education details will appear here.";
}


// =========================================================
// EXPERIENCE PREVIEW
// =========================================================

function updateExperiencePreview() {

    if (!previewExperience) {
        return;
    }

    const value =
        collectExperience();

    previewExperience.innerHTML =
        value
            ? formatText(value)
            : "Your experience details will appear here.";
}


// =========================================================
// PROJECT PREVIEW
// =========================================================

function updateProjectPreview() {

    if (!previewProjects) {
        return;
    }

    const value =
        collectProjects();

    previewProjects.innerHTML =
        value
            ? formatText(value)
            : "Your projects will appear here.";
}


// =========================================================
// SKILLS PREVIEW
// =========================================================

function updateSkillsPreview() {

    if (!previewSkills) {
        return;
    }

    const value =
        getValue(skills);


    if (!value) {

        previewSkills.innerHTML =
            "Your skills will appear here.";

        return;
    }


    const skillArray =
        value
            .replace(/\r?\n/g, ",")
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);


    previewSkills.innerHTML =
        skillArray
            .map(skill => `
                <span class="skill">
                    ${escapeHTML(skill)}
                </span>
            `)
            .join("");
}


// =========================================================
// CERTIFICATION PREVIEW
// =========================================================

function updateCertificationPreview() {

    if (!previewCertifications) {
        return;
    }

    const value =
        getValue(certifications);

    previewCertifications.innerHTML =
        value
            ? formatText(value)
            : "Your certifications will appear here.";
}


// =========================================================
// UPDATE HIDDEN DATABASE FIELDS
// =========================================================

function updateHiddenFields() {

    const educationField =
        document.getElementById("education");

    const experienceField =
        document.getElementById("experience");

    const projectsField =
        document.getElementById("projects");


    if (educationField) {

        educationField.value =
            collectEducation();
    }


    if (experienceField) {

        experienceField.value =
            collectExperience();
    }


    if (projectsField) {

        projectsField.value =
            collectProjects();
    }
}


// =========================================================
// CREATE EDUCATION ENTRY
// =========================================================

function createEducationEntry(
    degree = "",
    institution = "",
    start = "",
    end = "",
    grade = ""
) {

    const container =
        document.getElementById(
            "educationContainer"
        );


    if (!container) {
        return;
    }


    const item =
        document.createElement("div");

    item.className =
        "repeat-item education-item";


    item.innerHTML = `

        <div class="repeat-item-header">

            <h3>
                Education
                <span class="entry-number"></span>
            </h3>

            <button
                type="button"
                class="remove-entry-btn"
                onclick="removeEntry(this)"
            >
                Remove
            </button>

        </div>


        <div class="form-row">

            <div class="form-group">

                <label>
                    Degree / Course
                </label>

                <input
                    type="text"
                    class="education-degree"
                    placeholder="B.Sc. Computer Science"
                >

            </div>


            <div class="form-group">

                <label>
                    Institution
                </label>

                <input
                    type="text"
                    class="education-institution"
                    placeholder="College / University"
                >

            </div>

        </div>


        <div class="form-row">

            <div class="form-group">

                <label>
                    Start Year
                </label>

                <input
                    type="text"
                    class="education-start"
                    placeholder="2024"
                >

            </div>


            <div class="form-group">

                <label>
                    End Year
                </label>

                <input
                    type="text"
                    class="education-end"
                    placeholder="2027"
                >

            </div>

        </div>


        <div class="form-group">

            <label>
                Grade / CGPA
            </label>

            <input
                type="text"
                class="education-grade"
                placeholder="CGPA: 8.5"
            >

        </div>

    `;


    container.appendChild(item);


    item.querySelector(
        ".education-degree"
    ).value = degree;

    item.querySelector(
        ".education-institution"
    ).value = institution;

    item.querySelector(
        ".education-start"
    ).value = start;

    item.querySelector(
        ".education-end"
    ).value = end;

    item.querySelector(
        ".education-grade"
    ).value = grade;
}


// =========================================================
// CREATE EXPERIENCE ENTRY
// =========================================================

function createExperienceEntry(
    title = "",
    company = "",
    start = "",
    end = "",
    description = ""
) {

    const container =
        document.getElementById(
            "experienceContainer"
        );


    if (!container) {
        return;
    }


    const item =
        document.createElement("div");

    item.className =
        "repeat-item experience-item";


    item.innerHTML = `

        <div class="repeat-item-header">

            <h3>
                Experience
                <span class="entry-number"></span>
            </h3>

            <button
                type="button"
                class="remove-entry-btn"
                onclick="removeEntry(this)"
            >
                Remove
            </button>

        </div>


        <div class="form-row">

            <div class="form-group">

                <label>
                    Job Title
                </label>

                <input
                    type="text"
                    class="experience-title"
                    placeholder="Software Developer Intern"
                >

            </div>


            <div class="form-group">

                <label>
                    Company
                </label>

                <input
                    type="text"
                    class="experience-company"
                    placeholder="Company Name"
                >

            </div>

        </div>


        <div class="form-row">

            <div class="form-group">

                <label>
                    Start Date
                </label>

                <input
                    type="text"
                    class="experience-start"
                    placeholder="June 2026"
                >

            </div>


            <div class="form-group">

                <label>
                    End Date
                </label>

                <input
                    type="text"
                    class="experience-end"
                    placeholder="Present"
                >

            </div>

        </div>


        <div class="form-group">

            <label>
                Description
            </label>

            <textarea
                class="experience-description"
                rows="5"
                placeholder="Describe your responsibilities and achievements..."
            ></textarea>

        </div>

    `;


    container.appendChild(item);


    item.querySelector(
        ".experience-title"
    ).value = title;

    item.querySelector(
        ".experience-company"
    ).value = company;

    item.querySelector(
        ".experience-start"
    ).value = start;

    item.querySelector(
        ".experience-end"
    ).value = end;

    item.querySelector(
        ".experience-description"
    ).value = description;
}


// =========================================================
// CREATE PROJECT ENTRY
// =========================================================

function createProjectEntry(
    name = "",
    technologies = "",
    description = ""
) {

    const container =
        document.getElementById(
            "projectsContainer"
        );


    if (!container) {
        return;
    }


    const item =
        document.createElement("div");

    item.className =
        "repeat-item project-item";


    item.innerHTML = `

        <div class="repeat-item-header">

            <h3>
                Project
                <span class="entry-number"></span>
            </h3>

            <button
                type="button"
                class="remove-entry-btn"
                onclick="removeEntry(this)"
            >
                Remove
            </button>

        </div>


        <div class="form-group">

            <label>
                Project Name
            </label>

            <input
                type="text"
                class="project-name"
                placeholder="ResumePro - Resume Builder"
            >

        </div>


        <div class="form-group">

            <label>
                Technologies
            </label>

            <input
                type="text"
                class="project-tech"
                placeholder="Python, Flask, MySQL, HTML, CSS, JavaScript"
            >

        </div>


        <div class="form-group">

            <label>
                Description
            </label>

            <textarea
                class="project-description"
                rows="5"
                placeholder="Describe your project, features and contribution..."
            ></textarea>

        </div>

    `;


    container.appendChild(item);


    item.querySelector(
        ".project-name"
    ).value = name;

    item.querySelector(
        ".project-tech"
    ).value = technologies;

    item.querySelector(
        ".project-description"
    ).value = description;
}


// =========================================================
// PARSE SAVED EDUCATION
// =========================================================

function parseEducationEntry(entry) {

    const lines =
        entry
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean);


    if (!lines.length) {
        return null;
    }


    const degree =
        lines[0] || "";

    const institution =
        lines[1] || "";


    let start = "";
    let end = "";
    let grade = "";


    if (lines[2]) {

        const dateParts =
            lines[2].split(/\s+-\s+/);

        start =
            dateParts[0]?.trim() || "";

        end =
            dateParts
                .slice(1)
                .join(" - ")
                .trim() || "";
    }


    if (lines[3]) {

        grade =
            lines[3].trim();
    }


    return {
        degree,
        institution,
        start,
        end,
        grade
    };
}


// =========================================================
// LOAD SAVED EDUCATION
// =========================================================

function loadSavedEducation() {

    const field =
        document.getElementById("education");

    const container =
        document.getElementById(
            "educationContainer"
        );


    if (!field || !container) {
        return;
    }


    const saved =
        field.value.trim();


    if (!saved) {
        return;
    }


    container.innerHTML = "";


    const entries =
        saved.split(/\r?\n\s*\r?\n/);


    entries.forEach(entry => {

        const data =
            parseEducationEntry(entry);


        if (!data) {
            return;
        }


        createEducationEntry(
            data.degree,
            data.institution,
            data.start,
            data.end,
            data.grade
        );

    });
}


// =========================================================
// PARSE SAVED EXPERIENCE
// =========================================================

function parseExperienceEntry(entry) {

    const parts =
        entry.split(/\r?\n\s*\r?\n/);


    const mainPart =
        parts[0] || "";

    const description =
        parts
            .slice(1)
            .join("\n\n")
            .trim();


    const lines =
        mainPart
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean);


    if (!lines.length) {
        return null;
    }


    const title =
        lines[0] || "";

    const company =
        lines[1] || "";


    let start = "";
    let end = "";


    if (lines[2]) {

        const dateParts =
            lines[2].split(/\s+-\s+/);

        start =
            dateParts[0]?.trim() || "";

        end =
            dateParts
                .slice(1)
                .join(" - ")
                .trim() || "";
    }


    return {
        title,
        company,
        start,
        end,
        description
    };
}


// =========================================================
// LOAD SAVED EXPERIENCE
// =========================================================

function loadSavedExperience() {

    const field =
        document.getElementById("experience");

    const container =
        document.getElementById(
            "experienceContainer"
        );


    if (!field || !container) {
        return;
    }


    const saved =
        field.value.trim();


    if (!saved) {
        return;
    }


    container.innerHTML = "";


    const entries =
        saved.split(/\r?\n\s*\r?\n(?=[^\r\n]+\r?\n)/);


    entries.forEach(entry => {

        const data =
            parseExperienceEntry(entry);


        if (!data) {
            return;
        }


        createExperienceEntry(
            data.title,
            data.company,
            data.start,
            data.end,
            data.description
        );

    });
}


// =========================================================
// PARSE SAVED PROJECT
// =========================================================

function parseProjectEntry(entry) {

    const parts =
        entry.split(/\r?\n\s*\r?\n/);


    const mainPart =
        parts[0] || "";

    const description =
        parts
            .slice(1)
            .join("\n\n")
            .trim();


    const lines =
        mainPart
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean);


    if (!lines.length) {
        return null;
    }


    const name =
        lines[0] || "";


    let technologies =
        lines[1] || "";


    technologies =
        technologies
            .replace(
                /^Technologies:\s*/i,
                ""
            )
            .trim();


    return {
        name,
        technologies,
        description
    };
}


// =========================================================
// LOAD SAVED PROJECTS
// =========================================================

function loadSavedProjects() {

    const field =
        document.getElementById("projects");

    const container =
        document.getElementById(
            "projectsContainer"
        );


    if (!field || !container) {
        return;
    }


    const saved =
        field.value.trim();


    if (!saved) {
        return;
    }


    container.innerHTML = "";


    const entries =
        saved.split(/\r?\n\s*\r?\n(?=[^\r\n]+\r?\n)/);


    entries.forEach(entry => {

        const data =
            parseProjectEntry(entry);


        if (!data) {
            return;
        }


        createProjectEntry(
            data.name,
            data.technologies,
            data.description
        );

    });
}


// =========================================================
// LOAD SAVED DATA
// =========================================================

function loadSavedRepeatableData() {

    loadSavedEducation();

    loadSavedExperience();

    loadSavedProjects();
}


// =========================================================
// GET SELECTED TEMPLATE
// =========================================================

function getSelectedTemplate() {

    const selected =
        document.querySelector(
            'input[name="template"]:checked'
        );


    return selected
        ? selected.value
        : "template1";
}


// =========================================================
// APPLY TEMPLATE
// =========================================================

function applyTemplate() {

    if (!resumePreview) {
        return;
    }


    const template =
        getSelectedTemplate();


    // Remove previous template classes

    resumePreview.classList.remove(
        "template1",
        "template2",
        "template3",
        "template-professional",
        "template-modern",
        "template-creative"
    );


    // Store selected template

    resumePreview.dataset.template =
        template;


    // Apply current template

    switch (template) {

        case "template2":

            resumePreview.classList.add(
                "template-modern"
            );

            break;


        case "template3":

            resumePreview.classList.add(
                "template-creative"
            );

            break;


        case "template1":
        default:

            resumePreview.classList.add(
                "template-professional"
            );

            break;
    }
}


// =========================================================
// PROFILE PHOTO PREVIEW
// =========================================================

function updateProfilePhotoPreview(event) {

    const file =
        event.target.files &&
        event.target.files[0];


    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        alert(
            "Please select a valid image file."
        );

        event.target.value = "";

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function(e) {

            if (previewPhotoLive) {

                previewPhotoLive.src =
                    e.target.result;

                previewPhotoLive.style.display =
                    "block";
            }


            if (livePhotoWrapper) {

                livePhotoWrapper.style.display =
                    "block";
            }

        };


    reader.readAsDataURL(file);
}


// =========================================================
// CERTIFICATE PREVIEW
// =========================================================

function updateCertificatePreview(event) {

    const file =
        event.target.files &&
        event.target.files[0];


    const previewImage =
        document.getElementById(
            "certificatePreviewImage"
        );

    const previewBox =
        document.getElementById(
            "certificateUploadPreview"
        );

    const previewPdf =
        document.getElementById(
            "certificatePreviewPdf"
        );


    if (!file) {

        if (previewBox) {
            previewBox.style.display = "none";
        }

        return;
    }


    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf"
    ];


    if (!allowedTypes.includes(file.type)) {

        alert(
            "Please upload JPG, JPEG, PNG, WEBP or PDF."
        );

        event.target.value = "";

        if (previewBox) {
            previewBox.style.display = "none";
        }

        return;
    }


    // =====================================================
    // IMAGE CERTIFICATE
    // =====================================================

    if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
    ) {

        const reader =
            new FileReader();


        reader.onload =
            function(e) {

                if (previewImage) {

                    previewImage.src =
                        e.target.result;

                    previewImage.style.display =
                        "block";
                }


                if (previewPdf) {

                    previewPdf.style.display =
                        "none";
                }


                if (previewBox) {

                    previewBox.style.display =
                        "block";
                }

            };


        reader.readAsDataURL(file);

        return;
    }


    // =====================================================
    // PDF CERTIFICATE
    // =====================================================

    if (file.type === "application/pdf") {

        if (previewImage) {

            previewImage.src = "";

            previewImage.style.display =
                "none";
        }


        if (previewPdf) {

            previewPdf.style.display =
                "block";
        }


        if (previewBox) {

            previewBox.style.display =
                "block";
        }
    }
}


// =========================================================
// ADD EDUCATION
// =========================================================

function addEducation() {

    createEducationEntry();

    updateEntryNumbers();

    attachInputListeners();

    updateEverything();
}


// =========================================================
// ADD EXPERIENCE
// =========================================================

function addExperience() {

    createExperienceEntry();

    updateEntryNumbers();

    attachInputListeners();

    updateEverything();
}


// =========================================================
// ADD PROJECT
// =========================================================

function addProject() {

    createProjectEntry();

    updateEntryNumbers();

    attachInputListeners();

    updateEverything();
}


// =========================================================
// REMOVE ENTRY
// =========================================================

function removeEntry(button) {

    const item =
        button.closest(
            ".repeat-item"
        );


    if (!item) {
        return;
    }


    const container =
        item.parentElement;


    item.remove();


    // Keep one empty entry available

    if (
        container &&
        !container.querySelector(
            ".repeat-item"
        )
    ) {

        if (
            container.id ===
            "educationContainer"
        ) {

            createEducationEntry();
        }

        else if (
            container.id ===
            "experienceContainer"
        ) {

            createExperienceEntry();
        }

        else if (
            container.id ===
            "projectsContainer"
        ) {

            createProjectEntry();
        }
    }


    updateEntryNumbers();

    attachInputListeners();

    updateEverything();
}


// =========================================================
// UPDATE ENTRY NUMBERS
// =========================================================

function updateEntryNumbers() {

    const containerIds = [
        "educationContainer",
        "experienceContainer",
        "projectsContainer"
    ];


    containerIds.forEach(containerId => {

        const container =
            document.getElementById(
                containerId
            );


        if (!container) {
            return;
        }


        const items =
            container.querySelectorAll(
                ".repeat-item"
            );


        items.forEach(
            (item, index) => {

                const number =
                    item.querySelector(
                        ".entry-number"
                    );


                if (number) {

                    number.textContent =
                        index + 1;
                }

            }
        );

    });
}


// =========================================================
// INPUT LISTENERS
// =========================================================

function attachInputListeners() {

    const fields =
        document.querySelectorAll(
            "#resumeForm input, #resumeForm textarea, #resumeForm select"
        );


    fields.forEach(field => {

        field.removeEventListener(
            "input",
            updateEverything
        );

        field.removeEventListener(
            "change",
            updateEverything
        );


        field.addEventListener(
            "input",
            updateEverything
        );

        field.addEventListener(
            "change",
            updateEverything
        );

    });
}


// =========================================================
// TEMPLATE LISTENERS
// =========================================================

function attachTemplateListeners() {

    const templateInputs =
        document.querySelectorAll(
            'input[name="template"]'
        );


    templateInputs.forEach(input => {

        input.removeEventListener(
            "change",
            handleTemplateChange
        );


        input.addEventListener(
            "change",
            handleTemplateChange
        );

    });
}


// =========================================================
// TEMPLATE CHANGE
// =========================================================

function handleTemplateChange() {

    applyTemplate();

    updateEverything();
}


// =========================================================
// UPDATE EVERYTHING
// =========================================================

function updateEverything() {

    updatePersonalPreview();

    updateSummaryPreview();

    updateEducationPreview();

    updateExperiencePreview();

    updateProjectPreview();

    updateSkillsPreview();

    updateCertificationPreview();

    updateHiddenFields();

    updateEntryNumbers();

    applyTemplate();
}


// =========================================================
// FORM SUBMIT
// =========================================================

if (form) {

    form.addEventListener(
        "submit",
        function() {

            // Make absolutely sure repeatable
            // data is copied into hidden fields
            // before Flask receives the form.

            updateHiddenFields();

            applyTemplate();

        }
    );
}


// =========================================================
// INITIALIZATION
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // -------------------------------------------------
        // LOAD TEMPLATE SELECTED FROM TEMPLATES PAGE
        // -------------------------------------------------

        const selectedTemplate =
            localStorage.getItem(
                "resumepro_selected_template"
            );


        if (selectedTemplate) {

            const templateInput =
                document.querySelector(
                    `input[name="template"][value="${selectedTemplate}"]`
                );


            if (templateInput) {

                templateInput.checked = true;

            }

        }


        // -------------------------------------------------
        // LOAD SAVED REPEATABLE DATA
        // -------------------------------------------------

        loadSavedRepeatableData();


        // -------------------------------------------------
        // EDUCATION
        // -------------------------------------------------

        const educationContainer =
            document.getElementById(
                "educationContainer"
            );


        if (
            educationContainer &&
            !educationContainer.querySelector(
                ".repeat-item"
            )
        ) {

            createEducationEntry();
        }


        // -------------------------------------------------
        // EXPERIENCE
        // -------------------------------------------------

        const experienceContainer =
            document.getElementById(
                "experienceContainer"
            );


        if (
            experienceContainer &&
            !experienceContainer.querySelector(
                ".repeat-item"
            )
        ) {

            createExperienceEntry();
        }


        // -------------------------------------------------
        // PROJECTS
        // -------------------------------------------------

        const projectsContainer =
            document.getElementById(
                "projectsContainer"
            );


        if (
            projectsContainer &&
            !projectsContainer.querySelector(
                ".repeat-item"
            )
        ) {

            createProjectEntry();
        }


        // -------------------------------------------------
        // PROFILE PHOTO
        // -------------------------------------------------

        const profileInput =
            document.getElementById(
                "profile_image"
            );


        if (profileInput) {

            profileInput.addEventListener(
                "change",
                updateProfilePhotoPreview
            );
        }


        // -------------------------------------------------
        // CERTIFICATE UPLOAD
        // -------------------------------------------------

        const certificateFileInput =
            document.getElementById(
                "certificate_file"
            );


        if (certificateFileInput) {

            certificateFileInput.addEventListener(
                "change",
                updateCertificatePreview
            );
        }


        // -------------------------------------------------
        // NORMAL INPUT LISTENERS
        // -------------------------------------------------

        attachInputListeners();


        // -------------------------------------------------
        // TEMPLATE LISTENERS
        // -------------------------------------------------

        attachTemplateListeners();


        // -------------------------------------------------
        // ENTRY NUMBERS
        // -------------------------------------------------

        updateEntryNumbers();


        // -------------------------------------------------
        // APPLY TEMPLATE
        // -------------------------------------------------

        applyTemplate();


        // -------------------------------------------------
        // FINAL PREVIEW UPDATE
        // -------------------------------------------------

        updateEverything();

    }
);
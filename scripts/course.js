const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];
const courseContainer = document.getElementById("course-credits");
const allBtn = document.getElementById("all-btn");
const wddBtn = document.getElementById("wdd-btn");
const cseBtn = document.getElementById("cse-btn");

allBtn.addEventListener("click", () => filterCourses("ALL"));
wddBtn.addEventListener("click", () => filterCourses("WDD"));
cseBtn.addEventListener("click", () => filterCourses("CSE"));

function filterCourses(category) {
    let filteredCourses = [];

    if (category === "ALL") {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.category === category);
    }
    displayCourses(filteredCourses);

}

function displayCourses(courseList) {
    courseContainer.innerHTML = '';

    let totalCredits = 0;

    courseList.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.innerHTML = `
      <h3>${course.subject} ${course.number}: ${course.title}</h3>
    `;
        courseContainer.appendChild(card);
        totalCredits += course.credits;
    });
    const creditSummary = document.createElement("p");
    creditSummary.innerHTML = `<strong>Total Credits: ${totalCredits}</strong>`;
    courseContainer.appendChild(creditSummary);
}


// Filtering function
function filterCourses(department) {
    if (department === 'ALL') {
        displayCourses(courses);
    } else {
        const filtered = courses.filter(course => course.subject === department);
        displayCourses(filtered);
    }
}

// Add event listeners to filter buttons
document.querySelectorAll('buttons[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterCourses(filter);
    });
});

function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
    courseDetails.showModal();

    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}
courseDiv.addEventListener('click', () => {
    displayCourseDetails(course);
});
displayCourses(courses)


const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them wherever possible in the context of a language such as C#, Java, or JavaScript.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually programming their own Web sites using HTML, CSS, and JavaScript. Other topics include: copyright issues, image manipulation, online tools, and hosting a web site.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites through the use of JavaScript, providing server-side functionality for an enhanced user experience.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course focuses on user experience, accessibility, compliance, performance optimization, and best practices for modern web development. Students will learn to create interactive and responsive websites using HTML, CSS, and JavaScript.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

document.addEventListener('DOMContentLoaded', function() {
  displayCourses(courses);

  document.getElementById('all-courses').addEventListener('click', () => displayCourses(courses));
  document.getElementById('wdd-courses').addEventListener('click', () => displayCourses(courses.filter(course => course.subject === 'WDD')));
  document.getElementById('cse-courses').addEventListener('click', () => displayCourses(courses.filter(course => course.subject === 'CSE')));
});

function displayCourses(filteredCourses) {
  const container = document.getElementById('courses-container');
  container.innerHTML = '';

  filteredCourses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card' + (course.completed ? ' completed' : '');
    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p><strong>Title:</strong> ${course.title}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Description:</strong> ${course.description}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
    `;
    container.appendChild(card);
  });

  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  document.getElementById('credits').textContent = `Total Credits: ${totalCredits}`;
}
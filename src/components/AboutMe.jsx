import React from 'react';

export default function AboutMe() {
  const skills = [
    'React.js', 'Python', 'Machine Learning', 'JavaScript', 
    'HTML5', 'CSS3', 'Node.js', 'Git & GitHub', 'SQL'
  ];

  return (
    <section id="about">
      <h2>About Me</h2>
      <p>
        I am a student currently pursuing my Bachelor's degree in Computer Engineering with a specialization in Artificial Intelligence & Machine Learning (AIML) at CSPIT.
      </p>
      <p>
        I enjoy bridging the gap between design and development. I am highly motivated to build web applications while implementing machine learning models.
      </p>
      
      <h3>My Details</h3>
      <ul>
        <li><strong>Institution:</strong> CSPIT</li>
        <li><strong>Branch:</strong> CE (AIML)</li>
        <li><strong>Semester:</strong> 5th Semester</li>
        <li><strong>Focus:</strong> Web & ML</li>
      </ul>

      <h3>My Skills</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

import React from 'react'


  
const About = () => {
  const teamMembers = [
    {
      name: "Mutya Yuwan Ramadhani",
      role: "XII RPL 2",
      image: "https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, adipisci. Laudantium, necessitatibus repudiandae! Repellat, esse alias!",
    },
    {
      name: "Nurwidya Asyifa Wihdani",
      role: "XII RPL 2",
      image: "https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, adipisci. Laudantium, necessitatibus repudiandae! Repellat, esse alias! ",
    },
    {
      name: "Indah Ayu Astuti",
      role: "XII RPL 1",
      image: "https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Veritatis accusantium tempore corrupti aut id, quidem illo rerum doloribus! Sed vitae harum illum!",
    },
  ];
  
  return (
    <section className="py-2 ">
      <div className="container mx-auto px-12">
        <h1 className="text-4xl font-bold text-center mb-10"></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4"
                src={member.image}
                alt={member.name}
              />
              <h2 className="text-xl font-bold text-center">{member.name}</h2>
              <p className="text-gray-600 text-center mb-4">{member.role}</p>
              <p className="text-gray-700 text-center">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

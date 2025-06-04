import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useTheme } from '../../contexts/ThemeContext';
import  jsPDF  from 'jspdf';
import  html2canvas  from 'html2canvas';

const Resume: React.FC = () => {
  const navigate = useNavigate(); // Get the navigate function
  const { theme } = useTheme();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (resumeRef.current) {
      const printContents = resumeRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };


  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Godfirst_Wilfred_Resume.pdf');
  };

  return (
    <section
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : theme === 'cyber'
          ? 'bg-black text-neon-blue'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div
        ref={resumeRef}
        className={`max-w-3xl mx-auto p-8 rounded-lg shadow-lg ${
          theme === 'dark'
            ? 'bg-gray-800'
            : theme === 'cyber'
            ? 'bg-gray-900 border border-neon-blue'
            : 'bg-white'
        }`}
        style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
      >
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400">Godfirst Wilfred</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            +2348038866521 | mayor@spotsavor.com |{' '}
            <a
              href="https://www.linkedin.com/in/godfirst-wilfred-4480b5125"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-500 underline"
            >
              LinkedIn
            </a>
          </p>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 border-blue-700 dark:border-blue-400 pb-1 mb-3">
            Professional Summary
          </h2>
          <p>
            Results-driven Python Developer and Data Science Consultant with expertise in building scalable web
            applications, managing data, and solving complex technical problems. Proficient in Django, REST APIs,
            and database management, with hands-on experience in version control systems like Git and GitHub. Adept
            at troubleshooting, debugging, and delivering high-quality solutions tailored to client needs. Strong
            background in IT support and project management, complemented by a Bachelor’s degree in Computer Science
            and certifications in Data Science and Network Security.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 border-blue-700 dark:border-blue-400 pb-1 mb-3">
            Education
          </h2>
          <p className="font-semibold">University of the People, California</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Bachelor of Science in Computer Science – November 2023</li>
            <li>Associate of Science in Computer Science – March 2023</li>
            <li>Undergraduate Certificate in Network and Application Security – December 2023</li>
            <li>Undergraduate Certificate in Data Science – June 2023</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 border-blue-700 dark:border-blue-400 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="mb-4">
            <p className="font-semibold">Software Engineer, Tch Vult LTD.</p>
            <p className="italic text-sm mb-2">August 2023 – Present</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Developed and deployed web applications using Python, Django, and REST APIs.</li>
              <li>Developed and deployed web applications using Node, React and Vanilla JavaScript.</li>
              <li>Daily Report using Agile-Scrum methodology.</li>
              <li>Collaborated with co-workers to troubleshoot and resolve code-related issues.</li>
              <li>Utilized Git and GitHub for version control and project collaboration.</li>
            </ul>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Freelance Programmer</p>
            <p className="italic text-sm mb-2">August 2022 – Present</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Developed and deployed web applications using Python, Django, and REST APIs.</li>
              <li>Utilized Git and GitHub for version control and project collaboration.</li>
              <li>Conducted data analysis and built custom tools to streamline workflows.</li>
              <li>Integrated APIs and managed databases using Python and MySQL.</li>
              <li>Collaborated with clients to troubleshoot and resolve code-related issues.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">IT Support Specialist, TechGoip Nig. LTD.</p>
            <p className="italic text-sm mb-2">2016 – October 2019</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Diagnosed and resolved technical issues with printers, networks, and operating systems.</li>
              <li>Installed, configured, and maintained computer hardware and software systems.</li>
              <li>Provided IT support to various departments, ensuring seamless operations.</li>
              <li>Maintained accurate inventory records of IT equipment and supplies.</li>
              <li>Monitored network performance and implemented improvements as needed.</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 border-blue-700 dark:border-blue-400 pb-1 mb-3">
            Skills
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Programming Languages:</strong> Python, JavaScript</li>
            <li><strong>Frameworks:</strong> Django, Pandas, Node.js, React</li>
            <li><strong>Databases:</strong> MySQL (basic), Database Management using Python</li>
            <li><strong>APIs:</strong> REST APIs</li>
            <li><strong>Version Control:</strong> Git, GitHub</li>
            <li><strong>Other:</strong> Project Management, HTML, CSS, JavaScript, Debugging, Scripting, Data Analysis, API Integration</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 border-blue-700 dark:border-blue-400 pb-1 mb-3">
            Projects
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <a
                href="https://vicmartedu.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Vicmart Edu
              </a>
              : A website developed for Connect students around the world with the study abroad opportunities, showcasing responsive design and user-friendly functionality.
            </li>
            <li>
              <a
                href="https://funmilolarealestate.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Funmilola Real Estate
              </a>
              : A platform for the Real Estate marketplace that allows buyers and sellers to easily execute a transaction on their own.
            </li>
            <li>
              <a
                href="https://g4mgpharma.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                G4MG Pharma
              </a>
              : A professional website built for a pharmaceutical company, featuring seamless navigation and API integrations.
            </li>
            <li>
              <a
                href="https://dosafoundation.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Dosa Foundation
              </a>
              : A website for a charity organization, highlighting donation tracking and event management features.
            </li>
          </ul>
        </section>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handlePrint}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Print Resume
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Download PDF
          </button>
        </div>
        {/* Back to Portfolio Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/')}
            className={`font-semibold py-2 px-4 rounded shadow ${
              theme === 'dark'
                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                : theme === 'cyber'
                ? 'bg-neon-blue hover:bg-blue-600 text-black'
                : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
            }`}
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default Resume;

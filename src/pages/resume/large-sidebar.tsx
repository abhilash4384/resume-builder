import IResume from '../../types/resume-model';

const LargeSidebar = ({ data }: { data: IResume }) => {
  return (
    <section className="resume-main-section">
      <div className="bg-secondary">
        <div className="row-space-between py-5 mb-2">
          <div>
            <p className="text-large text-primary text-uppercase ml-5 pt-5">
              {data.name}
            </p>
            <p className="text-primary text-italic  ml-6">{data.title}</p>
          </div>

          <div>
            {' '}
            <p className="text-primary text-italic  ml-6">
              {data.personal_details.phone}
            </p>
            <p className="text-primary text-italic  ml-6">
              {data.personal_details.email}
            </p>
            <p className="text-primary text-italic  ml-6">
              <a href={data.personal_details.linked_in_profile} target="_blank">
                {' '}
                LinkedIn{' '}
              </a>
            </p>
            {data?.personal_details?.portfolio_link && (
              <p className="text-primary text-italic  ml-6">
                <a href={data.personal_details.portfolio_link} target="_blank">
                  Portfolio{' '}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="resume-section-header ml-10 py-2">
        <p className="text-title text-uppercase text-grey">About Me</p>
      </div>

      <div className="ml-10">
        <p className="pr-4 py-2">{data.about_me}</p>
      </div>

      <div className="resume-section-header ml-10 pb-2 mt-5">
        <p className="text-title text-uppercase text-grey">Work Experience</p>
      </div>

      {data.experiance.map((exp, index) => {
        return (
          <div className="ml-10 py-3 work-experience-container" key={index}>
            <div className="work-experiece-siderbase">
              <p className="text-grey"> {exp.duration}</p>
            </div>
            <div className="work-experience-main-section">
              <div className="row-space-between pb-2">
                <div>
                  <p className="text-title text-bold">{exp.company_name}</p>
                  <p className="text-grey">{exp.role_title}</p>
                </div>
                <div>
                  <p className="text-small">{exp.location}</p>
                </div>
              </div>
              {exp.projects.map((project, i) => (
                <div key={i} className="my-3">
                  <div className="row-space-between py-1">
                    <p>
                      <span className="text-bold">Project {i + 1}: </span>{' '}
                      {project.project_name}
                    </p>
                    {project.project_link && project.project_link_title && (
                      <a
                        className="text-small"
                        href={project.project_link}
                        target="_blank"
                      >
                        {project.project_link_title}
                      </a>
                    )}
                  </div>
                  <p className="py-1">
                    <span className="text-bold">Description: </span>
                    {project.project_description}
                  </p>
                  <p className="py-1">
                    <span className="text-bold">Tech-Stack: </span>
                    {project.technologies_used}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default LargeSidebar;

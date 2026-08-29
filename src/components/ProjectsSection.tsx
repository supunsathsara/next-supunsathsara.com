import ProjectsGrid from "@/components/ProjectsGrid";
import { PROJECT_STORIES } from "@/content/stories";
import { getProjects } from "@/lib/github";

const ProjectsSection = async () => {
  const projects = await getProjects();

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-2 md:mb-4">
        My Projects
      </h2>
      <p className="text-center text-[#ADB7BE] mb-4">
        Synced live from my{" "}
        <a
          href={`https://github.com/supunsathsara`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white hover:underline"
        >
          GitHub repositories
        </a>
      </p>
      <ProjectsGrid projects={projects} stories={PROJECT_STORIES} />
    </section>
  );
};

export default ProjectsSection;

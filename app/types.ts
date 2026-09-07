export interface SkillGroup {
    title: string;
    items: string[];
}

export interface PortfolioData {
    name: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    role: string;
    skills: SkillGroup[];
    experience: ExperienceItem[];
    education: EducationItem[];
    projects: ProjectItem[];
    articles: ArticleItem[];
    certifications?: CertificationItem[];
    links: SocialLinks;
}

export interface ExperienceItem {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    highlights: string[];
}

export interface EducationItem {
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
}

export interface ProjectItem {
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    github?: string;
    result?: string;
    video?: string;
}

export interface ArticleItem {
    title: string;
    venue: string;
    year: string;
    description: string;
    url?: string;
}

export interface CertificationItem {
    name: string;
    issuer: string;
    date: string;
}

export interface SocialLinks {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
}

import { ResearchPaper } from "../types/research"

export const mockResearchPapers: ResearchPaper[] = [
  {
    id: "1",
    title:
      "Deep Learning for Natural Language Processing: A Comprehensive Survey",
    authors: "Zhang, L., Wang, S., & Liu, B.",
    abstract:
      "This paper presents a comprehensive survey of deep learning methods for natural language processing (NLP). We review the historical development of neural network models for NLP tasks, from early feed-forward and recurrent neural networks to modern transformer-based architectures. The survey covers applications including machine translation, sentiment analysis, question answering, and text generation. We also discuss current challenges and future research directions in the field.",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    publishedYear: 2023,
    field: "Computer Science",
    classifications: [
      "Natural Language Processing",
      "Deep Learning",
      "Artificial Intelligence"
    ],
    doi: "10.1234/nlp.2023.0001",
    journal: "Journal of Artificial Intelligence Research"
  },
  {
    id: "2",
    title:
      "Climate Change Impacts on Global Agricultural Systems: A Meta-Analysis",
    authors: "Johnson, M., Garcia, P., & Smith, T.",
    abstract:
      "This meta-analysis examines the projected impacts of climate change on agricultural systems worldwide. We synthesize findings from 157 studies published between 2000 and 2022, covering various crops, regions, and climate scenarios. Results indicate significant regional variations in vulnerability, with tropical and subtropical regions facing the greatest risks. The paper also evaluates adaptation strategies and their potential effectiveness in mitigating negative impacts on food security.",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    publishedYear: 2022,
    field: "Environmental Science",
    classifications: [
      "Climate Change",
      "Agriculture",
      "Food Security",
      "Adaptation"
    ],
    doi: "10.1234/env.2022.0045",
    journal: "Global Environmental Change"
  },
  {
    id: "3",
    title:
      "Quantum Computing for Optimization Problems: Algorithms and Applications",
    authors: "Chen, H., Nakamura, K., & Williams, R.",
    abstract:
      "This paper explores the potential of quantum computing for solving complex optimization problems. We review quantum algorithms including quantum approximate optimization algorithm (QAOA) and quantum annealing, comparing their performance with classical approaches. Case studies in logistics, finance, and drug discovery demonstrate significant speedups for specific problem instances. We discuss current hardware limitations and the prospects for quantum advantage in practical applications.",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    publishedYear: 2023,
    field: "Physics",
    classifications: ["Quantum Computing", "Optimization", "Algorithms"],
    doi: "10.1234/quantum.2023.0012",
    journal: "Quantum Information Processing"
  },
  {
    id: "4",
    title: "The Role of Gut Microbiota in Neurodegenerative Diseases",
    authors: "Rodriguez, A., Kim, J., & Patel, S.",
    abstract:
      "This review examines the emerging evidence for gut-brain axis involvement in neurodegenerative disorders. We analyze studies investigating microbiome alterations in Alzheimer's, Parkinson's, and ALS patients, and discuss potential mechanisms including inflammation, metabolite production, and immune modulation. The paper evaluates the therapeutic potential of microbiome-targeted interventions such as probiotics, prebiotics, and fecal microbiota transplantation for disease prevention and management.",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    publishedYear: 2022,
    field: "Neuroscience",
    classifications: [
      "Microbiome",
      "Neurodegenerative Diseases",
      "Gut-Brain Axis"
    ],
    doi: "10.1234/neuro.2022.0078",
    journal: "Nature Reviews Neuroscience"
  },
  {
    id: "5",
    title:
      "Blockchain Technology for Supply Chain Transparency: Implementation Challenges",
    authors: "Thompson, E., Mehta, R., & Anderson, J.",
    abstract:
      "This paper investigates the implementation challenges of blockchain technology for enhancing supply chain transparency. Through case studies across food, pharmaceutical, and electronics industries, we identify key barriers including technical limitations, governance issues, and adoption resistance. The research proposes a framework for evaluating blockchain suitability for specific supply chain contexts and outlines strategies for overcoming implementation obstacles.",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    publishedYear: 2023,
    field: "Business",
    classifications: ["Blockchain", "Supply Chain Management", "Transparency"],
    doi: "10.1234/scm.2023.0034",
    journal: "Supply Chain Management: An International Journal"
  },
  {
    id: "6",
    title:
      "Genetic Risk Factors for Autoimmune Diseases: A Genome-Wide Association Study",
    authors: "Wilson, L., Takahashi, M., & Brown, D.",
    abstract:
      "This genome-wide association study (GWAS) identifies novel genetic risk factors for multiple autoimmune diseases. Analyzing data from 45,000 patients and 65,000 controls across diverse populations, we discover 23 previously unreported loci associated with autoimmune susceptibility. Functional annotation reveals enrichment in immune regulatory pathways and potential drug targets. The findings contribute to understanding shared genetic architecture across autoimmune conditions and have implications for personalized medicine approaches.",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    publishedYear: 2022,
    field: "Genetics",
    classifications: ["Genomics", "Autoimmune Diseases", "GWAS"],
    doi: "10.1234/genetics.2022.0056",
    journal: "Nature Genetics"
  }
]

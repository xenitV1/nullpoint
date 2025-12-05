
import { Experiment, User, ExperimentCategory, PreviewData } from './types';

export const INITIAL_USER: User = {
  userId: "user_demo_01",
  userName: "Dr. Demo Researcher",
  userType: "Academic",
  credits: 25000,
  subscriptionTier: "Startup",
  purchaseHistory: [
    { expId: "exp_003", title: "Antibody Affinity Maturation Fail", date: "2023-11-20", price: 8000 }
  ],
  uploadedExperiments: []
};

const CATEGORIES = [
  'Antiviral Drug Discovery',
  'Antibody Therapeutics',
  'CRISPR Gene Editing',
  'Battery Materials',
  'Oncology',
  'Material Science'
] as const;

const STAGES = [
  'Target Validation',
  'Hit-to-Lead',
  'Lead Optimization',
  'Preclinical',
  'Clinical Phase I/II'
] as const;

// Helper to generate context-aware mock table data
const generatePreviewData = (category: ExperimentCategory): PreviewData => {
  let headers: string[] = [];
  let rows: Record<string, string | number>[] = [];
  let chartType: PreviewData['chartType'] = 'bar';
  let chartData: any[] = [];

  if (category === 'Antiviral Drug Discovery' || category === 'Oncology' || category === 'Antibody Therapeutics') {
    headers = ['Compound ID', 'Mol. Weight', 'IC50 (µM)', 'Cell Toxicity (%)', 'Binding Affinity (Kd)', 'Result'];
    for (let i = 0; i < 5; i++) {
      rows.push({
        'Compound ID': `CPD-${Math.floor(Math.random() * 9000) + 1000}`,
        'Mol. Weight': (Math.random() * 300 + 200).toFixed(1),
        'IC50 (µM)': (Math.random() * 50 + 5).toFixed(2),
        'Cell Toxicity (%)': (Math.random() * 20).toFixed(1),
        'Binding Affinity (Kd)': `${(Math.random() * 100 + 10).toFixed(0)} nM`,
        'Result': 'No Effect'
      });
    }
    // Scatter data for IC50 vs Toxicity
    chartType = 'scatter';
    for (let i = 0; i < 20; i++) {
        chartData.push({
            x: Number((Math.random() * 50).toFixed(1)), // IC50
            y: Number((Math.random() * 100).toFixed(1)), // Toxicity
            z: Math.random() * 10 // Bubble size (optional visual)
        });
    }

  } else if (category === 'Battery Materials' || category === 'Material Science') {
    headers = ['Cycle Number', 'Specific Capacity (mAh/g)', 'Voltage (V)', 'Coulombic Efficiency', 'Temp (°C)'];
    // Generate linear data for cycles
    chartType = 'line';
    let capacity = 200;
    for (let i = 0; i < 5; i++) {
      rows.push({
        'Cycle Number': (i + 1) * 50,
        'Specific Capacity (mAh/g)': (200 - (i * 15)).toFixed(1),
        'Voltage (V)': (4.2 - (i * 0.1)).toFixed(2),
        'Coulombic Efficiency': `${(99.5 - (i * 0.2)).toFixed(2)}%`,
        'Temp (°C)': (25 + Math.random() * 5).toFixed(1)
      });
    }
    // Generate more points for the chart
    for(let i=0; i<20; i++) {
        capacity = capacity - (Math.random() * 2);
        chartData.push({
            name: (i+1)*10, // Cycle
            value: Number(capacity.toFixed(1)) // Capacity
        });
    }

  } else if (category === 'CRISPR Gene Editing') {
    headers = ['Target Locus', 'gRNA Sequence', 'On-Target Indel %', 'Off-Target Sites', 'Frameshift %', 'Outcome'];
    chartType = 'bar';
    for (let i = 0; i < 5; i++) {
      const indel = (Math.random() * 80).toFixed(1);
      const name = `Exon ${Math.floor(Math.random() * 10) + 1}`;
      rows.push({
        'Target Locus': name,
        'gRNA Sequence': `G${['A','T','C','G'].sort(() => 0.5 - Math.random()).slice(0, 10).join('')}...`,
        'On-Target Indel %': indel,
        'Off-Target Sites': Math.floor(Math.random() * 15),
        'Frameshift %': (Math.random() * 60).toFixed(1),
        'Outcome': 'High Off-target'
      });
      chartData.push({
          name: name,
          value: Number(indel)
      });
    }
  } else {
    headers = ['Sample ID', 'Parameter A', 'Parameter B', 'Timestamp', 'Status'];
    chartType = 'bar';
    for (let i = 0; i < 5; i++) {
      rows.push({
        'Sample ID': `SMP-${Math.floor(Math.random() * 1000)}`,
        'Parameter A': Math.random().toFixed(4),
        'Parameter B': Math.random().toFixed(4),
        'Timestamp': new Date().toISOString().split('T')[0],
        'Status': 'Inconclusive'
      });
    }
    chartData = [
        { name: 'Group A', value: 40 },
        { name: 'Group B', value: 30 },
        { name: 'Group C', value: 20 },
        { name: 'Group D', value: 50 },
    ];
  }

  return { headers, rows, chartType, chartData };
};

// Helper to generate mock experiments
const generateExperiments = (count: number): Experiment[] => {
  const experiments: Experiment[] = [];
  
  // Specific Featured Item
  experiments.push({
    id: "exp_001",
    title: "SARS-CoV-2 Mpro Inhibitor Screening Failure",
    category: "Antiviral Drug Discovery",
    targetClass: "Protease",
    failureStage: "Lead Optimization",
    methodology: "Fluorescence-based Assay",
    experimentDate: "2023-08-15",
    uploadDate: "2023-09-20",
    sampleSize: 247,
    price: 15000,
    currency: "USD",
    sellerReputation: 4.8,
    verificationStatus: "Peer Reviewed",
    confidenceScore: 0.89,
    tags: ["COVID-19", "protease_inhibitor", "in_vitro"],
    anonymizationLevel: "High",
    summary: "Screened 247 small molecules against SARS-CoV-2 main protease. All compounds showed IC50 > 50µM. Detailed structure-activity relationship data included. Ideal for training ML negative selection models.",
    dataFormat: ["CSV", "SDF", "PDF"],
    fileSize: "45 MB",
    downloads: 12,
    featured: true,
    previewContent: generatePreviewData("Antiviral Drug Discovery")
  });

  // Generate others
  for (let i = 2; i <= count; i++) {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const stage = STAGES[Math.floor(Math.random() * STAGES.length)];
    const isFeatured = Math.random() > 0.9;
    
    experiments.push({
      id: `exp_${String(i).padStart(3, '0')}`,
      title: `${category.split(' ')[0]} Phase ${Math.floor(Math.random()*3)+1} Negative Results`,
      category: category,
      targetClass: "Various",
      failureStage: stage,
      methodology: "High Throughput Screening",
      experimentDate: "2023-01-10",
      uploadDate: "2023-10-05",
      sampleSize: Math.floor(Math.random() * 500) + 50,
      price: Math.floor(Math.random() * 20000) + 2000,
      currency: "USD",
      sellerReputation: Number((Math.random() * 2 + 3).toFixed(1)),
      verificationStatus: Math.random() > 0.5 ? "AI Verified" : "Unverified",
      confidenceScore: Number((Math.random() * 0.3 + 0.7).toFixed(2)),
      tags: ["negative_data", "failed_trial", "raw_data"],
      anonymizationLevel: "High",
      summary: `Comprehensive dataset containing negative findings for ${category} research. Includes raw data points and statistical analysis showing lack of efficacy or toxicity issues.`,
      dataFormat: ["CSV", "PDF"],
      fileSize: `${Math.floor(Math.random() * 100) + 10} MB`,
      downloads: Math.floor(Math.random() * 50),
      featured: isFeatured,
      previewContent: generatePreviewData(category)
    });
  }
  return experiments;
};

export const MOCK_EXPERIMENTS = generateExperiments(30);

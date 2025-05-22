import React from "react";
import { useParams } from "react-router-dom";

const departments = [
  { 
    id: 1, 
    name: 'Adi Dravidar & Tribal Welfare', 
    description: 'The Adi Dravidar & Tribal Welfare Department is responsible for the welfare and development of Scheduled Castes (SC) and Scheduled Tribes (ST) in Tamil Nadu. It implements various schemes for education, economic development, housing, and social empowerment of these communities. The department works to eliminate social discrimination and ensure equal opportunities through affirmative action programs and special component plans.'
  },
  { 
    id: 2, 
    name: 'Agriculture', 
    description: 'The Agriculture Department plays a pivotal role in enhancing farm productivity and farmers\' welfare in Tamil Nadu. It focuses on sustainable agricultural practices, crop diversification, soil health management, and water conservation. The department implements schemes for subsidized inputs, crop insurance, organic farming, and precision agriculture. It also provides extension services, weather-based advisories, and promotes agricultural research and technology transfer to boost farm incomes.'
  },
  { 
    id: 3, 
    name: 'Animal Husbandry & Fisheries', 
    description: 'This department works towards the development of livestock, dairy, poultry, and fisheries sectors. It focuses on animal health care, breed improvement, fodder development, and disease control. The fisheries wing promotes both marine and inland fisheries through infrastructure development, modern fishing techniques, and aquaculture. The department implements schemes for livestock insurance, dairy development, and fish farmers\' welfare to enhance protein availability and rural livelihoods.'
  },
  { 
    id: 4, 
    name: 'BC, MBC and Minorities Welfare', 
    description: 'The Backward Classes (BC), Most Backward Classes (MBC) and Minorities Welfare Department works for the socio-economic development of backward classes and religious minorities in Tamil Nadu. It implements educational scholarships, hostels, economic assistance schemes, and skill development programs. The department also provides financial assistance for marriage, funeral, and self-employment ventures to uplift these communities and ensure their equitable participation in the state\'s development.'
  },
  { 
    id: 5, 
    name: 'Commercial Taxes and Registration Department', 
    description: 'This department is responsible for levy and collection of commercial taxes including GST, VAT, and other state taxes. The Registration wing handles property registration, stamp duty collection, and maintenance of land records. The department focuses on tax administration reforms, digital services, and taxpayer facilitation while ensuring compliance. It plays a crucial role in revenue generation for the state government\'s development activities.'
  },
  { 
    id: 6, 
    name: 'Co-operation, Food and Consumer Protection', 
    description: 'The Cooperation Department promotes cooperative movement in agriculture, credit, marketing, and other sectors. It oversees cooperative banks, societies, and apex institutions. The Food wing manages public distribution system (PDS) ensuring food security through ration shops. The Consumer Protection division safeguards consumer rights, prevents unfair trade practices, and maintains quality standards of essential commodities across the state.'
  },
  { 
    id: 7, 
    name: 'Energy', 
    description: 'The Energy Department is responsible for power generation, transmission, and distribution in Tamil Nadu. It oversees TANGEDCO (generation and distribution) and TANTRANSCO (transmission). The department formulates policies for renewable energy (solar, wind), energy conservation, and rural electrification. It balances the state\'s growing power demand with sustainable energy solutions while ensuring reliable and affordable electricity for all consumers.'
  },
  { 
    id: 8, 
    name: 'Environment and Forests', 
    description: 'This department is the custodian of Tamil Nadu\'s rich biodiversity and natural resources. It manages protected areas (wildlife sanctuaries, national parks), afforestation programs, and conservation initiatives. The department implements pollution control measures, climate change mitigation strategies, and environmental impact assessments. It works to balance ecological sustainability with development needs through strict enforcement of environmental laws and promotion of green technologies.'
  },
  { 
    id: 9, 
    name: 'Handlooms, Handicrafts, Textiles and Khadi', 
    description: 'The department works to preserve and promote Tamil Nadu\'s traditional handloom and handicraft industries. It supports weavers and artisans through skill development, design innovation, marketing assistance, and credit facilities. The Khadi wing promotes village industries and natural fiber products. The department organizes exhibitions, provides subsidies, and implements welfare schemes to sustain these heritage crafts while generating rural employment opportunities.'
  },
  { 
    id: 10, 
    name: 'Health and Family Welfare', 
    description: 'This department is responsible for public healthcare delivery system in Tamil Nadu. It operates government hospitals, primary health centers, and implements various health programs. Key focus areas include maternal and child health, communicable disease control, non-communicable disease prevention, and health insurance schemes. The department also regulates private healthcare, promotes medical education, and implements family welfare programs to improve health indicators across the state.'
  },
];

export default function DepartmentDetail() {
  const { id } = useParams();
  const dept = departments.find((d) => d.id === Number(id));

  if (!dept) return <div className="not-found">Department not found.</div>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-xl shadow-md">
      <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 m-0">{dept.name}</h2>
        <div className="ml-auto w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
          {dept.name.charAt(0)}
        </div>
      </div>
      <div className="leading-relaxed text-gray-700 text-justify">
        <p>{dept.description}</p>
      </div>
      <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500">
        <span>Department ID: {dept.id}</span>
      </div>
    </div>
  );
}

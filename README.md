# NxtGenSec - Next Generation Security & Innovation Hub

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/savireddykirankumarreddys-projects/nxtgensec)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Security Patched](https://img.shields.io/badge/Security-Patched-brightgreen?style=for-the-badge)](https://nextjs.org/blog/security-update-2025-12-11)

**NxtGenSec** is a cutting-edge platform focused on securing digital assets and pioneering the future of technology through AI, blockchain, quantum computing, and advanced automation. We create revolutionary solutions, transform businesses, and develop tomorrow's tech leaders with security woven into everything we do.

## 🌟 Key Features

- **Innovative Security Solutions**: Revolutionary AI systems, quantum solutions, blockchain platforms, and next-gen automation tools
- **Business Transformation**: Enterprise transformation with AI-driven processes and smart automation
- **Talent Development**: Cultivating next-gen tech experts in cybersecurity, AI, and emerging technologies
- **Interactive Learning Paths**: Comprehensive courses in cybersecurity and software development
- **Career Programs**: Internship and mentorship opportunities for aspiring tech professionals
- **Modern UI/UX**: Sleek, responsive design with custom animations and interactive elements

## 🛡️ Security

This application has been patched against critical security vulnerabilities:

- **React2Shell (CVE-2025-55182)** - Remote code execution vulnerability in React Server Components
- **Denial of Service (CVE-2025-55184)** - Potential service disruption
- **Source Code Disclosure (CVE-2025-55183)** - Unauthorized access to source code

All dependencies have been updated to patched versions to ensure the highest level of security.

## 🚀 Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom animations
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives and [Lucide Icons](https://lucide.dev/)
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
nxtgensec/
├── app/                     # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── hero-section.tsx    # Hero/banner section
│   ├── about-section.tsx   # About company section
│   ├── projects-section.tsx# Approach section (renamed from Projects)
│   ├── courses-section.tsx # Learning paths
│   ├── internships-section.tsx # Career Programs section
│   ├── navigation.tsx      # Navigation bar
│   ├── footer.tsx          # Footer component
│   └── ...                 # Other components
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nxtgensec/nxtgensec.git
cd nxtgensec
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `pnpm dev` - Runs the app in development mode
- `pnpm build` - Builds the app for production
- `pnpm start` - Runs the built app in production mode
- `pnpm lint` - Runs the linter

## 🎯 Core Sections & Navigation

### 1. Home/Hero Section
The landing page introduces NxtGenSec's mission and vision with prominent call-to-action buttons:
- **Start Learning** - Navigate directly to the Learning section
- **Career Programs** - Navigate to the Career Programs section

### 2. About Section
Company overview, values, and mission statement.

### 3. Approach Section (Renamed from Projects)
Showcase of innovative security solutions and methodologies.

### 4. Learning Section (Courses)
Comprehensive learning paths divided into two specialized tracks:

#### 🔐 Cybersecurity Track
Three progressive levels to suit different skill levels:
- **Beginner Level** - Fundamental concepts and essential skills
- **Intermediate Level** - Hands-on techniques and real-world applications
- **Advanced Level** - Deep expertise for professional roles

#### 💻 Development Track
Three progressive levels for software development:
- **Beginner Level** - Programming fundamentals and basic development skills
- **Intermediate Level** - Advanced programming concepts and frameworks
- **Advanced Level** - Expert-level development and architecture skills

##### Course Registration Process:
1. Navigate to the **Learning** section using the main navigation menu
2. Choose between **Cybersecurity Track** or **Development Track**
3. Select your appropriate level (**Beginner**, **Intermediate**, or **Advanced**)
4. Review the course content and bonus resources
5. Click the **Enroll** button to proceed to the registration form
6. Complete the Google Form to finalize your enrollment

Each track offers valuable bonus resources worth thousands of rupees, including tools, eBooks, video courses, and certification materials.

### 5. Career Programs Section (Renamed from Internships)
Internship and mentorship opportunities for aspiring tech professionals. This section is currently under development with a notification banner informing visitors that programs will be available soon.

## 🔧 Customization

To customize the content:

1. Edit component files in the `components/` directory
2. Modify section content in respective component files
3. Update navigation links in `components/navigation.tsx`
4. Adjust styling in `app/globals.css`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by NxtGenSec.

## 📞 Contact

For inquiries, please reach out to our team through the contact section on our website or via our social media channels.

---

<p align="center">
  Built with ❤️ by the NxtGenSec Team
</p>
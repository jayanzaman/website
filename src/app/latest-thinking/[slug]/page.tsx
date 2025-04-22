'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaClock, FaTag } from 'react-icons/fa';

const articles = {
  'quantum-computing-finance': {
    title: "Quantum Computing in Financial Services",
    category: "Technology",
    content: `
      Quantum computing represents a paradigm shift in computational capabilities, promising to revolutionize the financial services industry. This transformative technology has the potential to solve complex problems that are currently intractable for classical computers.

      ## Key Applications in Finance

      ### Risk Analysis and Management
      Quantum computers can process vast amounts of data simultaneously, enabling more sophisticated risk models and real-time analysis of market conditions.

      ### Portfolio Optimization
      By leveraging quantum algorithms, financial institutions can optimize investment portfolios across a much larger set of variables and scenarios than previously possible.

      ### Fraud Detection
      Quantum machine learning algorithms can identify patterns and anomalies in transaction data with unprecedented accuracy and speed.

      ## Implementation Challenges

      While the potential of quantum computing is immense, several challenges need to be addressed:

      1. Hardware Limitations
      2. Error Correction
      3. Algorithm Development
      4. Talent Acquisition

      ## Future Outlook

      The financial services industry stands at the cusp of a quantum revolution. Early adopters who invest in quantum capabilities today will be well-positioned to leverage this technology when it reaches maturity.
    `,
    imageUrl: "/images/quantum-finance.jpg",
    author: "Dr. Sarah Chen",
    date: "April 21, 2025",
    readTime: "5 min read"
  },
  'future-digital-banking': {
    title: "The Future of Digital Banking",
    category: "Innovation",
    content: `
      Digital banking is undergoing a profound transformation, driven by technological advances and changing consumer preferences. This evolution is reshaping how financial services are delivered and consumed.

      ## Key Trends

      ### Open Banking
      APIs and open banking initiatives are creating new opportunities for collaboration between traditional banks and fintech companies.

      ### AI-Powered Services
      Artificial intelligence is enabling personalized banking experiences and more efficient operations.

      ### Blockchain Integration
      Distributed ledger technology is streamlining cross-border transactions and improving security.

      ## Impact on Traditional Banking

      The rise of digital banking is forcing traditional institutions to:

      1. Modernize Legacy Systems
      2. Adopt Agile Methodologies
      3. Focus on Customer Experience
      4. Invest in Digital Talent

      ## Looking Ahead

      The future of banking will be increasingly digital, with a focus on seamless, personalized experiences delivered through multiple channels.
    `,
    imageUrl: "/images/digital-banking.jpg",
    author: "Michael Wong",
    date: "April 20, 2025",
    readTime: "4 min read"
  },
  'beyond-underwriting-proactive-risk-control': {
    title: 'Beyond Underwriting: How Proactive Risk Control Fuels Insurance Profitability',
    content: `
      In the insurance world, growth is often seen through the lens of acquiring new customers — offering competitive premiums, enticing coverage, and expanding market share. While underwriting new policies is undeniably important, insurers may be overlooking a powerful lever for sustainable profitability: strategic risk control within their existing book of business.
      
      ## The Underwriting Obsession: Why New Isn't Always Better
      
      It's easy to get caught up in the race to win new accounts. The underwriting process — evaluating, selecting, and pricing policies — remains a foundational pillar of insurance. But focusing solely on new business can narrow an insurer's strategic vision. Existing policyholders, often viewed as fixed exposures, actually represent untapped potential.
      
      ## Unlocking Value in the Portfolio: The Power of Risk Engineering
      
      Instead of waiting for claims to arrive, insurers can proactively reshape existing risks through collaboration with risk engineers and risk control experts. This approach isn't just about loss prevention — it's about profit transformation.
      
      By applying tailored mitigation strategies to current policyholders, insurers can:
      
      1. Reduce claims frequency and severity
      2. Lower loss ratios and boost underwriting results
      3. Foster long-term customer loyalty through safety incentives
      4. Drive better pricing outcomes at renewal
      5. Improve operational resilience in volatile markets
      
      This isn't theory — it's a proven path to profitability.
    `,
    category: 'Insurance',
    date: 'April 20, 2025',
    author: 'Jayan Zaman',
    imageUrl: '/images/default-article.jpg',
    readTime: '7 min read'
  }
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return (
      <div className="content-wrapper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">Article Not Found</h1>
          <Link 
            href="/latest-thinking"
            className="inline-flex items-center text-[#1A1A1A] hover:text-[#FF5F00]"
          >
            <FaArrowLeft className="mr-2" /> Back to Latest Thinking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/latest-thinking"
          className="inline-flex items-center text-[#1A1A1A] hover:text-[#FF5F00] mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Latest Thinking
        </Link>

        <article>
          <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image 
              src={article.imageUrl} 
              alt={article.title} 
              fill
              className="object-cover"
            />
          </div>

          <div className="flex items-center space-x-4 mb-6 text-sm text-[#4A4A4A]">
            <div className="flex items-center">
              <FaTag className="mr-2 text-[#FF5F00]" />
              {article.category}
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2 text-[#FF5F00]" />
              {article.readTime}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">{article.title}</h1>
          
          <div className="flex items-center mb-8">
            <div>
              <div className="font-medium text-[#1A1A1A]">{article.author}</div>
              <div className="text-sm text-[#4A4A4A]">{article.date}</div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-[#4A4A4A]">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Share this article</h2>
          <div className="flex space-x-4">
            <button className="px-4 py-2 border border-[#E5E5E5] rounded-md text-[#4A4A4A] hover:text-[#FF5F00] hover:border-[#FF5F00]">
              Twitter
            </button>
            <button className="px-4 py-2 border border-[#E5E5E5] rounded-md text-[#4A4A4A] hover:text-[#FF5F00] hover:border-[#FF5F00]">
              LinkedIn
            </button>
            <button className="px-4 py-2 border border-[#E5E5E5] rounded-md text-[#4A4A4A] hover:text-[#FF5F00] hover:border-[#FF5F00]">
              Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

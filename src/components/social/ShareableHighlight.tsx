/**
 * Shareable Highlight Component
 * Creates shareable quotes and highlights from case study content
 */

import React, { useState, useRef } from 'react';
import { Share2, Download, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { CaseStudy } from '@/types/caseStudy';
import html2canvas from 'html2canvas';

interface ShareableHighlightProps {
  caseStudy: CaseStudy;
  type: 'quote' | 'metric' | 'result';
  content: {
    text: string;
    author?: string;
    metric?: {
      label: string;
      value: string | number;
      unit?: string;
    };
  };
  className?: string;
}

const ShareableHighlight: React.FC<ShareableHighlightProps> = ({
  caseStudy,
  type,
  content,
  className = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleCopyText = async () => {
    try {
      let textToCopy = '';
      
      if (type === 'quote' && content.author) {
        textToCopy = `"${content.text}" - ${content.author}`;
      } else if (type === 'metric' && content.metric) {
        textToCopy = `${content.metric.label}: ${content.metric.value}${content.metric.unit || ''}`;
      } else {
        textToCopy = content.text;
      }
      
      textToCopy += `\n\nFrom: ${caseStudy.title} Case Study\nView full case study: ${window.location.origin}/portfolio/${caseStudy.id}/case-study`;
      
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success('Text copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };
  
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        width: 800,
        height: 600,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `${caseStudy.title.replace(/\s+/g, '-').toLowerCase()}-highlight.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate image');
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${caseStudy.title} - Case Study Highlight`,
        text: content.text,
        url: `${window.location.origin}/portfolio/${caseStudy.id}/case-study`
      }).catch(console.error);
    } else {
      handleCopyText();
    }
  };
  
  const renderContent = () => {
    switch (type) {
      case 'quote':
        return (
          <div className="text-center">
            <blockquote className="text-xl font-medium text-white mb-4 leading-relaxed">
              "{content.text}"
            </blockquote>
            {content.author && (
              <cite className="text-teal font-medium">
                — {content.author}
              </cite>
            )}
          </div>
        );
      
      case 'metric':
        return (
          <div className="text-center">
            {content.metric && (
              <>
                <div className="text-4xl font-bold text-teal mb-2">
                  {content.metric.value}{content.metric.unit}
                </div>
                <div className="text-lg text-white/80 mb-4">
                  {content.metric.label}
                </div>
              </>
            )}
            <div className="text-white/60">
              {content.text}
            </div>
          </div>
        );
      
      case 'result':
        return (
          <div className="text-center">
            <div className="text-lg font-medium text-white mb-4 leading-relaxed">
              {content.text}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center text-white">
            {content.text}
          </div>
        );
    }
  };
  
  return (
    <div className={`relative group ${className}`}>
      <Card 
        ref={cardRef}
        className="bg-gradient-to-br from-gray-900 to-black border-white/10 p-8 relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-teal/20 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {renderContent()}
          
          {/* Case study attribution */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-sm text-white/60 text-center">
              <div className="font-medium text-white/80">{caseStudy.title}</div>
              <div className="text-xs">Case Study by Techsphere Technologies</div>
            </div>
          </div>
        </div>
        
        {/* Logo watermark */}
        <div className="absolute bottom-4 right-4 opacity-20">
          <div className="text-xs font-bold text-white">TECHSPHERE</div>
        </div>
      </Card>
      
      {/* Action buttons */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyText}
            className="p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70"
            title="Copy text"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownloadImage}
            disabled={isGenerating}
            className="p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70"
            title="Download as image"
          >
            <Download className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70"
            title="Share"
          >
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareableHighlight;
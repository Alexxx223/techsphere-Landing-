/**
 * Social Sharing Component
 * Provides social media sharing functionality for case studies
 */

import React, { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Mail, Link, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { CaseStudy } from '@/types/caseStudy';
import { generateSocialShareUrls, copyUrlToClipboard } from '@/utils/section-navigation';
import { trackShare } from '@/utils/sharing-analytics';

interface SocialShareProps {
  caseStudy: CaseStudy;
  section?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'floating';
  showLabel?: boolean;
}

const SocialShare: React.FC<SocialShareProps> = ({
  caseStudy,
  section,
  className = '',
  variant = 'default',
  showLabel = true
}) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrls = generateSocialShareUrls(
    caseStudy.id, 
    caseStudy.title, 
    section
  );
  
  const handleCopyLink = async () => {
    const success = await copyUrlToClipboard(caseStudy.id, section);
    if (success) {
      // Track copy link action
      trackShare('copy_link', 'case_study', caseStudy.id, section, {
        title: caseStudy.title,
        category: caseStudy.category
      });
      
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy link');
    }
  };
  
  const handleShare = (platform: string, url: string) => {
    // Track sharing analytics
    trackShare(platform, 'case_study', caseStudy.id, section, {
      title: caseStudy.title,
      category: caseStudy.category
    });
    
    // Open sharing window
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      url,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };
  
  const shareItems = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: shareUrls.twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: shareUrls.linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: shareUrls.facebook,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Email',
      icon: Mail,
      url: shareUrls.email,
      color: 'hover:text-gray-400'
    }
  ];
  
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {shareItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            onClick={() => handleShare(item.name.toLowerCase(), item.url)}
            className={`p-2 ${item.color} transition-colors`}
            title={`Share on ${item.name}`}
          >
            <item.icon className="h-4 w-4" />
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="p-2 hover:text-teal transition-colors"
          title="Copy link"
        >
          {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
        </Button>
      </div>
    );
  }
  
  if (variant === 'floating') {
    return (
      <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 ${className}`}>
        <div className="flex flex-col gap-2 bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-white/10">
          {shareItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              onClick={() => handleShare(item.name.toLowerCase(), item.url)}
              className={`p-2 ${item.color} transition-colors`}
              title={`Share on ${item.name}`}
            >
              <item.icon className="h-4 w-4" />
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="p-2 hover:text-teal transition-colors"
            title="Copy link"
          >
            {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${className}`}
        >
          <Share2 className="h-4 w-4" />
          {showLabel && 'Share'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {shareItems.map((item) => (
          <DropdownMenuItem
            key={item.name}
            onClick={() => handleShare(item.name.toLowerCase(), item.url)}
            className="gap-2 cursor-pointer"
          >
            <item.icon className="h-4 w-4" />
            Share on {item.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleCopyLink}
          className="gap-2 cursor-pointer"
        >
          {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy link'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShare;
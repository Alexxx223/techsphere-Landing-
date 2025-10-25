/**
 * Social Sharing Analytics
 * Tracks sharing events and provides insights
 */

export interface SharingEvent {
  platform: string;
  contentType: 'case_study' | 'highlight' | 'quote' | 'metric';
  contentId: string;
  section?: string;
  timestamp: number;
  url: string;
}

export interface SharingAnalytics {
  totalShares: number;
  platformBreakdown: Record<string, number>;
  contentTypeBreakdown: Record<string, number>;
  topSharedContent: Array<{
    contentId: string;
    shares: number;
    title?: string;
  }>;
  recentShares: SharingEvent[];
}

class SharingAnalyticsManager {
  private events: SharingEvent[] = [];
  private storageKey = 'techsphere_sharing_analytics';
  
  constructor() {
    this.loadFromStorage();
  }
  
  /**
   * Track a sharing event
   */
  trackShare(
    platform: string,
    contentType: SharingEvent['contentType'],
    contentId: string,
    section?: string,
    additionalData?: Record<string, any>
  ): void {
    const event: SharingEvent = {
      platform: platform.toLowerCase(),
      contentType,
      contentId,
      section,
      timestamp: Date.now(),
      url: window.location.href
    };
    
    this.events.push(event);
    this.saveToStorage();
    
    // Send to Google Analytics if available
    this.sendToGA(event, additionalData);
    
    // Send to custom analytics endpoint if configured
    this.sendToCustomAnalytics(event, additionalData);
  }
  
  /**
   * Get sharing analytics summary
   */
  getAnalytics(timeRange?: { start: number; end: number }): SharingAnalytics {
    let filteredEvents = this.events;
    
    if (timeRange) {
      filteredEvents = this.events.filter(
        event => event.timestamp >= timeRange.start && event.timestamp <= timeRange.end
      );
    }
    
    const platformBreakdown = this.groupBy(filteredEvents, 'platform');
    const contentTypeBreakdown = this.groupBy(filteredEvents, 'contentType');
    
    const contentShares = this.events.reduce((acc, event) => {
      acc[event.contentId] = (acc[event.contentId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topSharedContent = Object.entries(contentShares)
      .map(([contentId, shares]) => ({ contentId, shares }))
      .sort((a, b) => b.shares - a.shares)
      .slice(0, 10);
    
    return {
      totalShares: filteredEvents.length,
      platformBreakdown,
      contentTypeBreakdown,
      topSharedContent,
      recentShares: filteredEvents
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 20)
    };
  }
  
  /**
   * Get sharing analytics for specific content
   */
  getContentAnalytics(contentId: string): {
    totalShares: number;
    platformBreakdown: Record<string, number>;
    sectionBreakdown: Record<string, number>;
    timeline: Array<{ date: string; shares: number }>;
  } {
    const contentEvents = this.events.filter(event => event.contentId === contentId);
    
    const platformBreakdown = this.groupBy(contentEvents, 'platform');
    const sectionBreakdown = this.groupBy(
      contentEvents.filter(event => event.section),
      'section'
    );
    
    // Group by date for timeline
    const dateGroups = contentEvents.reduce((acc, event) => {
      const date = new Date(event.timestamp).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const timeline = Object.entries(dateGroups)
      .map(([date, shares]) => ({ date, shares }))
      .sort((a, b) => a.date.localeCompare(b.date));
    
    return {
      totalShares: contentEvents.length,
      platformBreakdown,
      sectionBreakdown,
      timeline
    };
  }
  
  /**
   * Get popular sharing times
   */
  getPopularSharingTimes(): {
    hourly: Record<string, number>;
    daily: Record<string, number>;
    monthly: Record<string, number>;
  } {
    const hourly: Record<string, number> = {};
    const daily: Record<string, number> = {};
    const monthly: Record<string, number> = {};
    
    this.events.forEach(event => {
      const date = new Date(event.timestamp);
      const hour = date.getHours().toString();
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const month = date.toLocaleDateString('en-US', { month: 'long' });
      
      hourly[hour] = (hourly[hour] || 0) + 1;
      daily[day] = (daily[day] || 0) + 1;
      monthly[month] = (monthly[month] || 0) + 1;
    });
    
    return { hourly, daily, monthly };
  }
  
  /**
   * Export analytics data
   */
  exportData(): string {
    return JSON.stringify({
      events: this.events,
      analytics: this.getAnalytics(),
      exportedAt: new Date().toISOString()
    }, null, 2);
  }
  
  /**
   * Clear all analytics data
   */
  clearData(): void {
    this.events = [];
    this.saveToStorage();
  }
  
  private groupBy(events: SharingEvent[], key: keyof SharingEvent): Record<string, number> {
    return events.reduce((acc, event) => {
      const value = event[key] as string;
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }
  
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load sharing analytics from storage:', error);
    }
  }
  
  private saveToStorage(): void {
    try {
      // Keep only last 1000 events to prevent storage bloat
      const eventsToStore = this.events.slice(-1000);
      localStorage.setItem(this.storageKey, JSON.stringify(eventsToStore));
    } catch (error) {
      console.error('Failed to save sharing analytics to storage:', error);
    }
  }
  
  private sendToGA(event: SharingEvent, additionalData?: Record<string, any>): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'share', {
        method: event.platform,
        content_type: event.contentType,
        content_id: event.contentId,
        custom_parameter: event.section || 'main',
        ...additionalData
      });
    }
  }
  
  private sendToCustomAnalytics(event: SharingEvent, additionalData?: Record<string, any>): void {
    // Send to custom analytics endpoint if configured
    const analyticsEndpoint = process.env.REACT_APP_ANALYTICS_ENDPOINT;
    
    if (analyticsEndpoint) {
      fetch(analyticsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'sharing_event',
          event,
          additionalData,
          userAgent: navigator.userAgent,
          referrer: document.referrer
        })
      }).catch(error => {
        console.error('Failed to send sharing analytics:', error);
      });
    }
  }
}

// Export singleton instance
export const sharingAnalytics = new SharingAnalyticsManager();

// Utility functions
export const trackShare = (
  platform: string,
  contentType: SharingEvent['contentType'],
  contentId: string,
  section?: string,
  additionalData?: Record<string, any>
) => {
  sharingAnalytics.trackShare(platform, contentType, contentId, section, additionalData);
};

export const getSharingAnalytics = (timeRange?: { start: number; end: number }) => {
  return sharingAnalytics.getAnalytics(timeRange);
};

export const getContentSharingAnalytics = (contentId: string) => {
  return sharingAnalytics.getContentAnalytics(contentId);
};
"use client";

import * as React from "react";
import { BentoGridItem } from "./bento-grid";
import { ResultsLayout, FeaturesLayout, StatsLayout, BusinessTypesLayout } from "./bento-layouts";
import { TrendingUp, Users, Clock, DollarSign, Store, ShoppingBag, Heart, ShoppingCart, Zap, Shield, Target, BarChart3 } from "lucide-react";

// Preset for Retail Results Section
export const RetailResultsPreset = () => (
  <ResultsLayout className="max-w-6xl mx-auto">
    <BentoGridItem 
      title="Real Results Across Business Types"
      description="From boutiques to big-box stores, see how Partners Points drives measurable growth"
      icon={<TrendingUp className="w-4 h-4 text-primary" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-green-700 font-semibold">+42% Repeat Visits</div>
            <div className="text-green-600 text-xs">Boutique Fashion Chain</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-blue-700 font-semibold">+28% Basket Size</div>
            <div className="text-blue-600 text-xs">Electronics Retailer</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Results from 6-month implementations</p>
      </div>
    </BentoGridItem>
    
    <BentoGridItem 
      title="Flexible for Any Scale"
      icon={<Store className="w-4 h-4 text-primary" />}
    >
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Single Store</span>
          <span className="text-green-600">✓</span>
        </div>
        <div className="flex justify-between">
          <span>Chain Stores</span>
          <span className="text-green-600">✓</span>
        </div>
        <div className="flex justify-between">
          <span>Enterprise</span>
          <span className="text-green-600">✓</span>
        </div>
      </div>
    </BentoGridItem>
    
    <BentoGridItem 
      title="10-Second Integration"
      icon={<Clock className="w-4 h-4 text-primary" />}
    >
      <p className="text-sm text-muted-foreground">Loyalty processing happens in the same checkout window as payment</p>
    </BentoGridItem>
  </ResultsLayout>
);

// Preset for Business Types Section
export const BusinessTypesPreset = () => (
  <BusinessTypesLayout className="max-w-4xl mx-auto">
    <BentoGridItem 
      title="Restaurants"
      description="Drive repeat visits with seamless loyalty at the table or counter"
      icon={<Store className="w-5 h-5 text-primary" />}
    >
      <div className="mt-4">
        <div className="text-sm font-medium text-green-600">Average Results:</div>
        <div className="text-xs text-muted-foreground">+35% customer return rate</div>
      </div>
    </BentoGridItem>
    
    <BentoGridItem 
      title="Retail Stores"
      description="Reward purchases instantly, from fashion to electronics"
      icon={<ShoppingBag className="w-5 h-5 text-primary" />}
    >
      <div className="mt-4">
        <div className="text-sm font-medium text-blue-600">Average Results:</div>
        <div className="text-xs text-muted-foreground">+28% basket size increase</div>
      </div>
    </BentoGridItem>
    
    <BentoGridItem 
      title="Medical Clinics"
      description="Build patient loyalty with points for appointments and services"
      icon={<Heart className="w-5 h-5 text-primary" />}
    >
      <div className="mt-4">
        <div className="text-sm font-medium text-purple-600">Average Results:</div>
        <div className="text-xs text-muted-foreground">+45% appointment bookings</div>
      </div>
    </BentoGridItem>
    
    <BentoGridItem 
      title="Supermarkets"
      description="Encourage frequent shopping with points on everyday purchases"
      icon={<ShoppingCart className="w-5 h-5 text-primary" />}
    >
      <div className="mt-4">
        <div className="text-sm font-medium text-orange-600">Average Results:</div>
        <div className="text-xs text-muted-foreground">+22% weekly visits</div>
      </div>
    </BentoGridItem>
  </BusinessTypesLayout>
);

// Preset for Key Features
export const KeyFeaturesPreset = () => (
  <FeaturesLayout className="max-w-5xl mx-auto">
    <BentoGridItem 
      title="Built into Payment"
      description="No separate device or app switching required"
      icon={<Zap className="w-4 h-4 text-primary" />}
    >
      <div className="text-xs text-muted-foreground mt-2">
        Loyalty processing happens in the same 10-second window as payment
      </div>
    </BentoGridItem>
    
    <BentoGridItem 
      title="Zero Setup Costs"
      description="No hardware, no integration fees, no monthly minimums"
      icon={<Shield className="w-4 h-4 text-primary" />}
    >
      <div className="text-xs text-green-600 mt-2">
        Only pay when customers redeem points
      </div>
    </BentoGridItem>
    
    <BentoGridItem 
      title="Network Effect"
      description="Customers earn and redeem across all partner locations"
      icon={<Target className="w-4 h-4 text-primary" />}
    >
      <div className="text-xs text-muted-foreground mt-2">
        15,000+ terminals processing AED 1.5B+ monthly
      </div>
    </BentoGridItem>
    
    <BentoGridItem 
      title="Real-time Analytics"
      description="Track customer behavior and loyalty metrics instantly"
      icon={<BarChart3 className="w-4 h-4 text-primary" />}
    >
      <div className="text-xs text-muted-foreground mt-2">
        Detailed insights on redemption patterns and customer lifetime value
      </div>
    </BentoGridItem>
  </FeaturesLayout>
);

// Preset for Stats/Metrics
export const StatsPreset = () => (
  <StatsLayout className="max-w-4xl mx-auto">
    <BentoGridItem title="15,000+" description="Active Terminals">
      <div className="text-2xl font-bold text-primary">15K+</div>
    </BentoGridItem>
    
    <BentoGridItem title="AED 1.5B+" description="Monthly Volume">
      <div className="text-2xl font-bold text-green-600">1.5B+</div>
    </BentoGridItem>
    
    <BentoGridItem title="10 sec" description="Checkout Time">
      <div className="text-2xl font-bold text-blue-600">10s</div>
    </BentoGridItem>
    
    <BentoGridItem title="0 AED" description="Setup Cost">
      <div className="text-2xl font-bold text-purple-600">0</div>
    </BentoGridItem>
  </StatsLayout>
);
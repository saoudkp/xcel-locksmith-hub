# Xcel Locksmith — Payload CMS Integration PRD

> **Version:** 2.0  
> **Date:** 2026-02-23  
> **Status:** Planning  
> **Supersedes:** PRD.md (v1)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [Technology Stack](#3-technology-stack)
4. [Database Schema](#4-database-schema)
5. [Payload CMS Collections](#5-payload-cms-collections)
6. [Media & File Management](#6-media--file-management)
7. [API Layer](#7-api-layer)
8. [SEO Engine](#8-seo-engine)
9. [Authentication & Access Control](#9-authentication--access-control)
10. [Frontend Integration Map](#10-frontend-integration-map)
11. [Admin Dashboard Features](#11-admin-dashboard-features)
12. [Migration Plan](#12-migration-plan)
13. [Deployment & Infrastructure](#13-deployment--infrastructure)
14. [Cost Estimates](#14-cost-estimates)

---

## 1. Executive Summary

This document defines the complete backend architecture for converting the Xcel Locksmith static React site into a fully CMS-driven application using **Payload CMS 3.x** on **Next.js 15**. Every piece of visible content — services, pricing, team bios, certifications, cities, reviews, FAQs, gallery images, map boundaries, phone numbers, and section ordering — becomes editable through an admin dashboard with zero code changes.

### Goals

- **100% content editability** — no developer needed for day-to-day changes
- **Auto-generated SEO pages** — new cities/services automatically create landing pages
- **Media management** — upload team photos, certificates, gallery images, logos
- **Lead capture** — quote requests and contact forms stored in DB with email notifications
- **Role-based access** — owner, manager, and staff permission levels
- **Design parity** — identical frontend output, just API-driven instead of static imports

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD                       │
│              (Payload CMS Admin UI)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐ │
│  │ Services │ │  Cities  │ │   Team   │ │  Settings  │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └─────┬──────┘ │
└───────┼─────────────┼───────────┼──────────────┼────────┘
        │             │           │              │
        ▼             ▼           ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                   PAYLOAD CMS API                        │
│              (REST + GraphQL endpoints)                   │
│                                                          │
│  Collections:                                            │
│  ├── services          ├── team-members                  │
│  ├── service-categories├── certifications (media)        │
│  ├── service-areas     ├── gallery-items                 │
│  ├── reviews           ├── vehicles                      │
│  ├── faqs              ├── vehicle-models                │
│  ├── quote-requests    ├── pages (dynamic)               │
│  └── contact-submissions                                 │
│                                                          │
│  Globals:                                                │
│  ├── site-settings     ├── seo-defaults                  │
│  ├── navigation        └── homepage-layout               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   PostgreSQL Database                     │
│                  (Neon / Supabase / RDS)                  │
│                                                          │
│  + S3-compatible storage (Cloudflare R2 / AWS S3)        │
└─────────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js)                     │
│                                                          │
│  Server Components fetch from Payload Local API          │
│  ├── / (homepage — sections driven by homepage-layout)   │
│  ├── /services/[category]/[slug]                         │
│  ├── /service-areas/[city-slug]                          │
│  ├── /[category] (residential/commercial/automotive)     │
│  └── /[...slug] (dynamic CMS pages)                      │
│                                                          │
│  Static Generation (ISR) for all SEO pages               │
│  Client Components for interactivity (quote tool, etc.)  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
Admin uploads image ──► Payload Media ──► S3 Storage ──► CDN URL
Admin edits service  ──► Payload API  ──► PostgreSQL ──► ISR rebuild ──► Static page
User submits quote   ──► Next.js API  ──► Payload    ──► DB + Email notification
User leaves review   ──► Next.js API  ──► Payload    ──► Pending (needs approval)
```

---

## 3. Technology Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 15 (App Router) | SSG/ISR, Server Components, API routes |
| **CMS** | Payload CMS 3.x | Self-hosted, TypeScript-native, deeply customizable |
| **Database** | PostgreSQL 16 (via Neon) | Payload's recommended DB, free tier available |
| **Object Storage** | Cloudflare R2 | S3-compatible, free egress, $0.015/GB stored |
| **Hosting** | Vercel (Hobby → Pro) | Zero-config Next.js deploys, edge functions |
| **Email** | Resend | Transactional emails (quote confirmations, notifications) |
| **Maps** | Leaflet + OpenStreetMap | Free, no API key required |
| **Analytics** | Plausible (self-hosted) or Umami | Privacy-first, lightweight |
| **Image CDN** | Vercel Image Optimization | Auto WebP/AVIF, responsive sizing |
| **Search** | Payload built-in full-text | PostgreSQL tsvector search |

---

## 4. Database Schema

### 4.1 Entity Relationship Diagram

```
┌──────────────────┐     ┌──────────────────────┐
│ service_categories│     │      services         │
│──────────────────│     │──────────────────────│
│ id (PK)          │◄────│ category_id (FK)      │
│ name             │     │ id (PK)               │
│ slug             │     │ title                 │
│ label            │     │ slug                  │
│ description      │     │ short_description     │
│ headline         │     │ long_description      │
│ seo_title        │     │ starting_price        │
│ seo_description  │     │ icon                  │
│ hero_image       │     │ hero_image            │
│ color            │     │ benefits (json)       │
│ is_active        │     │ cta_text              │
│ sort_order       │     │ seo_title             │
│ created_at       │     │ seo_description       │
│ updated_at       │     │ is_active             │
└──────────────────┘     │ sort_order            │
                          │ created_at            │
                          │ updated_at            │
                          └──────────────────────┘

┌──────────────────┐     ┌──────────────────────┐
│  service_areas    │     │    team_members       │
│──────────────────│     │──────────────────────│
│ id (PK)          │     │ id (PK)               │
│ city_name        │     │ name                  │
│ slug             │     │ role                  │
│ state            │     │ experience            │
│ lat              │     │ bio                   │
│ lng              │     │ photo (media)         │
│ radius_miles     │     │ specialties (json)    │
│ response_time    │     │ is_active             │
│ seo_title        │     │ sort_order            │
│ seo_description  │     │ created_at            │
│ is_active        │     │ updated_at            │
│ sort_order       │     └──────┬───────────────┘
│ created_at       │            │ 1:N
│ updated_at       │            ▼
└──────────────────┘     ┌──────────────────────┐
                          │   certifications      │
                          │──────────────────────│
                          │ id (PK)               │
                          │ team_member_id (FK)   │
                          │ name                  │
                          │ file (media)          │
                          │ file_type             │
                          │ expiry_date           │
                          │ is_verified           │
                          │ sort_order            │
                          │ created_at            │
                          └──────────────────────┘

┌──────────────────┐     ┌──────────────────────┐
│    reviews        │     │   quote_requests      │
│──────────────────│     │──────────────────────│
│ id (PK)          │     │ id (PK)               │
│ customer_name    │     │ name                  │
│ star_rating      │     │ phone                 │
│ review_text      │     │ email                 │
│ review_date      │     │ service_type          │
│ source           │     │ service_id (FK, opt)  │
│ is_approved      │     │ location              │
│ is_featured      │     │ photo (media, opt)    │
│ created_at       │     │ notes                 │
│ updated_at       │     │ status (enum)         │
└──────────────────┘     │ created_at            │
                          │ updated_at            │
                          └──────────────────────┘

┌──────────────────┐     ┌──────────────────────┐
│      faqs         │     │   gallery_items       │
│──────────────────│     │──────────────────────│
│ id (PK)          │     │ id (PK)               │
│ question         │     │ title                 │
│ answer           │     │ before_image (media)  │
│ category         │     │ after_image (media)   │
│ is_active        │     │ description           │
│ sort_order       │     │ service_id (FK, opt)  │
│ created_at       │     │ is_active             │
│ updated_at       │     │ sort_order            │
└──────────────────┘     │ created_at            │
                          │ updated_at            │
                          └──────────────────────┘

┌──────────────────┐     ┌──────────────────────┐
│  vehicle_makes    │     │   vehicle_models      │
│──────────────────│     │──────────────────────│
│ id (PK)          │     │ id (PK)               │
│ name             │     │ make_id (FK)          │
│ logo (media)     │     │ name                  │
│ is_active        │     │ supported_services    │
│ sort_order       │     │   (M2M → services)   │
│ created_at       │     │ is_active             │
│ updated_at       │     │ created_at            │
└──────────────────┘     │ updated_at            │
                          └──────────────────────┘

┌──────────────────────────────────────────────┐
│         contact_submissions                    │
│──────────────────────────────────────────────│
│ id (PK)                                       │
│ name                                          │
│ email                                         │
│ phone                                         │
│ message                                       │
│ source (enum: contact_form|quote|call_back)   │
│ status (enum: new|contacted|closed)           │
│ created_at                                    │
│ updated_at                                    │
└──────────────────────────────────────────────┘
```

### 4.2 Globals (Single-Instance Settings)

```
┌─────────────────────────────────────────────┐
│            site_settings (Global)            │
│─────────────────────────────────────────────│
│ business_name          │ string              │
│ tagline                │ string              │
│ logo                   │ media               │
│ logo_dark              │ media (optional)     │
│ favicon                │ media               │
│ phone_number           │ string              │
│ phone_display          │ string              │
│ email                  │ string              │
│ address                │ string              │
│ hours                  │ string              │
│ response_time          │ string              │
│ google_maps_embed      │ string (optional)    │
│ social_links           │ array of {platform,  │
│                        │   url, icon}         │
│ primary_color          │ string (HSL)         │
│ accent_color           │ string (HSL)         │
│ default_seo_title      │ string              │
│ default_seo_description│ string              │
│ og_image               │ media               │
│ google_analytics_id    │ string (optional)    │
│ google_tag_manager_id  │ string (optional)    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│          homepage_layout (Global)            │
│─────────────────────────────────────────────│
│ sections               │ array of:           │
│   ├── section_type     │  enum (hero,        │
│   │                    │  services, reviews,  │
│   │                    │  gallery, quote,     │
│   │                    │  vehicle, team, map, │
│   │                    │  faq, contact,       │
│   │                    │  visitor-counter)    │
│   ├── heading          │  string             │
│   ├── subheading       │  string (optional)  │
│   ├── is_active        │  boolean            │
│   └── sort_order       │  number             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│           navigation (Global)                │
│─────────────────────────────────────────────│
│ items                  │ array of:           │
│   ├── label            │  string             │
│   ├── href             │  string             │
│   ├── is_active        │  boolean            │
│   └── sort_order       │  number             │
└─────────────────────────────────────────────┘
```

---

## 5. Payload CMS Collections

### 5.1 Services Collection

```typescript
// collections/Services.ts
import { CollectionConfig } from 'payload/types';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'startingPrice', 'isActive'],
    group: 'Content',
  },
  access: {
    read: () => true,              // Public
    create: isManagerOrAbove,
    update: isManagerOrAbove,
    delete: isAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true,
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [({ value, data }) => value || slugify(data.title)] }
    },
    { name: 'category', type: 'relationship', relationTo: 'service-categories', required: true },
    { name: 'shortDescription', type: 'textarea', required: true, maxLength: 200 },
    { name: 'longDescription', type: 'richText' },
    { name: 'startingPrice', type: 'number', required: true, min: 0 },
    { name: 'icon', type: 'text', required: true,
      admin: { description: 'Lucide icon name (e.g. "Home", "Car", "Building")' }
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'benefits', type: 'array', fields: [
      { name: 'benefit', type: 'text', required: true }
    ]},
    { name: 'ctaText', type: 'text', defaultValue: 'Call Now for Service' },
    // SEO
    { name: 'seoTitle', type: 'text', admin: { position: 'sidebar' } },
    { name: 'seoDescription', type: 'textarea', admin: { position: 'sidebar' } },
    // Status
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
  hooks: {
    afterChange: [revalidateServicePages],
  },
};
```

### 5.2 Service Categories

```typescript
export const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  admin: { useAsTitle: 'name', group: 'Content' },
  fields: [
    { name: 'name', type: 'text', required: true },          // "Residential"
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'label', type: 'text', required: true },          // "Residential Locksmith"
    { name: 'headline', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'color', type: 'text', admin: { description: 'Tailwind color class' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
};
```

### 5.3 Service Areas (Cities)

```typescript
export const ServiceAreas: CollectionConfig = {
  slug: 'service-areas',
  admin: { useAsTitle: 'cityName', group: 'Content' },
  fields: [
    { name: 'cityName', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'state', type: 'text', defaultValue: 'OH' },
    { name: 'lat', type: 'number', required: true },
    { name: 'lng', type: 'number', required: true },
    { name: 'radiusMiles', type: 'number', defaultValue: 5 },
    { name: 'responseTime', type: 'text', defaultValue: '20-30 min' },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
  hooks: {
    afterChange: [revalidateCityPages, regenerateSitemap],
  },
};
```

### 5.4 Team Members & Certifications

```typescript
export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: { useAsTitle: 'name', group: 'Content' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'experience', type: 'text' },
    { name: 'bio', type: 'textarea', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media', required: true },
    { name: 'specialties', type: 'array', fields: [
      { name: 'specialty', type: 'text', required: true }
    ]},
    { name: 'certifications', type: 'array', fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'file', type: 'upload', relationTo: 'media', required: true },
      { name: 'fileType', type: 'select', options: [
        { label: 'Image', value: 'image' },
        { label: 'PDF', value: 'pdf' },
      ]},
      { name: 'expiryDate', type: 'date' },
      { name: 'isVerified', type: 'checkbox', defaultValue: false,
        access: { update: isAdmin } // Only admin can mark verified
      },
    ]},
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
};
```

### 5.5 Reviews

```typescript
export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: { useAsTitle: 'customerName', group: 'Content' },
  fields: [
    { name: 'customerName', type: 'text', required: true },
    { name: 'starRating', type: 'number', required: true, min: 1, max: 5 },
    { name: 'reviewText', type: 'textarea', required: true },
    { name: 'reviewDate', type: 'date', required: true },
    { name: 'source', type: 'select', options: [
      { label: 'Website', value: 'website' },
      { label: 'Google', value: 'google' },
      { label: 'Yelp', value: 'yelp' },
      { label: 'Manual', value: 'manual' },
    ], defaultValue: 'website' },
    { name: 'isApproved', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
  access: {
    read: ({ req }) => req.user ? true : { isApproved: { equals: true } },
    create: () => true, // Public can submit
  },
  hooks: {
    afterChange: [({ doc, operation }) => {
      if (operation === 'create') sendAdminNotification('New review submitted', doc);
    }],
  },
};
```

### 5.6 FAQs

```typescript
export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: { useAsTitle: 'question', group: 'Content' },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'richText', required: true },
    { name: 'category', type: 'select', options: [
      { label: 'General', value: 'general' },
      { label: 'Pricing', value: 'pricing' },
      { label: 'Services', value: 'services' },
      { label: 'Emergency', value: 'emergency' },
    ]},
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
};
```

### 5.7 Gallery Items

```typescript
export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  admin: { useAsTitle: 'title', group: 'Content' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'beforeImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'afterImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'service', type: 'relationship', relationTo: 'services' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
};
```

### 5.8 Quote Requests (Lead Capture)

```typescript
export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  admin: {
    useAsTitle: 'name',
    group: 'Leads',
    defaultColumns: ['name', 'phone', 'serviceType', 'status', 'createdAt'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'serviceType', type: 'select', options: [
      { label: 'Residential', value: 'residential' },
      { label: 'Commercial', value: 'commercial' },
      { label: 'Automotive', value: 'automotive' },
    ]},
    { name: 'service', type: 'relationship', relationTo: 'services' },
    { name: 'location', type: 'text' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'notes', type: 'textarea' },
    { name: 'status', type: 'select', options: [
      { label: 'New', value: 'new' },
      { label: 'Contacted', value: 'contacted' },
      { label: 'Quoted', value: 'quoted' },
      { label: 'Won', value: 'won' },
      { label: 'Lost', value: 'lost' },
    ], defaultValue: 'new' },
    { name: 'honeypot', type: 'text', admin: { hidden: true } },
  ],
  access: {
    read: isStaffOrAbove,
    create: () => true,
    update: isStaffOrAbove,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [rejectIfHoneypotFilled],
    afterChange: [sendQuoteNotificationEmail],
  },
};
```

### 5.9 Vehicles

```typescript
export const VehicleMakes: CollectionConfig = {
  slug: 'vehicle-makes',
  admin: { useAsTitle: 'name', group: 'Vehicles' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
};

export const VehicleModels: CollectionConfig = {
  slug: 'vehicle-models',
  admin: { useAsTitle: 'name', group: 'Vehicles' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'make', type: 'relationship', relationTo: 'vehicle-makes', required: true },
    { name: 'supportedServices', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
};
```

### 5.10 Media Collection

```typescript
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../media',
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 300, position: 'centre' },
      { name: 'card', width: 600, height: 400, position: 'centre' },
      { name: 'hero', width: 1200, height: 600, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf'],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
  ],
  access: {
    read: () => true,
    create: isStaffOrAbove,
  },
};
```

---

## 6. Media & File Management

### Storage Architecture

```
Media Upload Flow:
                                   
Admin uploads ──► Payload Media ──► Image Processing ──► S3/R2 Bucket
                                      │
                                      ├── thumbnail (300x300)
                                      ├── card (600x400)  
                                      ├── hero (1200x600)
                                      └── original

Serving:
CDN URL ◄── Cloudflare CDN ◄── R2 Bucket
                │
                └── Cache headers: max-age=31536000
```

### Supported Upload Types

| Type | Use Case | Max Size | Auto-Processing |
|------|----------|----------|-----------------|
| **Images** (JPG, PNG, WebP) | Team photos, gallery, service images | 10MB | Resize, WebP conversion, EXIF strip |
| **PDFs** | Certifications, licenses | 5MB | Thumbnail generation |
| **SVGs** | Logos, icons | 1MB | Sanitization |

### Certificate Management

```
Admin Dashboard → Team Members → [Member] → Certifications
  ├── Upload certificate image/PDF
  ├── Set certification name
  ├── Set expiry date (optional)
  ├── Mark as "Verified" (admin only)
  └── Reorder certifications
```

---

## 7. API Layer

### 7.1 REST Endpoints (Auto-generated by Payload)

```
# Collections
GET    /api/services                    # List all active services
GET    /api/services/:id                # Single service
GET    /api/service-categories           # List categories
GET    /api/service-areas                # List cities
GET    /api/team-members                 # List team with certifications
GET    /api/reviews?where[isApproved]=true  # Approved reviews
GET    /api/faqs?where[isActive]=true    # Active FAQs
GET    /api/gallery-items                # Gallery items
GET    /api/vehicle-makes?depth=2        # Makes with models
POST   /api/quote-requests               # Submit quote (public)
POST   /api/reviews                      # Submit review (public)

# Globals
GET    /api/globals/site-settings        # Brand, contact, colors
GET    /api/globals/homepage-layout       # Section order & visibility
GET    /api/globals/navigation            # Nav items

# Media
GET    /api/media/:id                    # Media metadata + URLs
POST   /api/media                        # Upload (authenticated)
```

### 7.2 Custom Endpoints

```typescript
// endpoints/submit-quote.ts
export const submitQuote: Endpoint = {
  path: '/submit-quote',
  method: 'post',
  handler: async (req, res) => {
    // Validate with Zod
    const data = quoteSchema.parse(req.body);
    
    // Reject honeypot
    if (data.honeypot) return res.status(200).json({ success: true }); // Silent reject
    
    // Create in Payload
    const quote = await payload.create({ collection: 'quote-requests', data });
    
    // Send email notification
    await resend.emails.send({
      from: 'quotes@xcellocksmith.com',
      to: siteSettings.email,
      subject: `New Quote Request: ${data.name}`,
      html: quoteEmailTemplate(quote),
    });
    
    // Send customer confirmation
    if (data.email) {
      await resend.emails.send({
        from: 'noreply@xcellocksmith.com',
        to: data.email,
        subject: 'Your Quote Request — Xcel Locksmith',
        html: customerConfirmationTemplate(quote),
      });
    }
    
    return res.status(201).json({ success: true, id: quote.id });
  },
};
```

### 7.3 Webhook Integrations

```
Payload afterChange hooks:
  ├── services     → Revalidate /services/*, /[category]/*
  ├── service-areas → Revalidate /service-areas/*, regenerate sitemap
  ├── reviews      → Revalidate homepage /
  ├── team-members → Revalidate homepage /
  └── site-settings → Revalidate entire site
```

---

## 8. SEO Engine

### 8.1 Auto-Generated Pages

```
Total pages = 1 (home) + C (categories) + S (services) + A (areas) + S×A (combos)

Current: 1 + 3 + 29 + 24 + 0 = 57 pages
With combos: 1 + 3 + 29 + 24 + (29 × 24) = 753 pages

Admin adds 1 new city → +1 city page + 29 combo pages = +30 pages auto-generated
Admin adds 1 new service → +1 service page + 24 combo pages = +25 pages auto-generated
```

### 8.2 Dynamic Sitemap Generation

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await payload.find({ collection: 'services', where: { isActive: { equals: true } } });
  const areas = await payload.find({ collection: 'service-areas', where: { isActive: { equals: true } } });
  const categories = await payload.find({ collection: 'service-categories' });
  
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    ...categories.docs.map(cat => ({
      url: `${baseUrl}/services/${cat.slug}`,
      lastModified: cat.updatedAt,
      priority: 0.9,
    })),
    ...services.docs.map(svc => ({
      url: `${baseUrl}/services/${svc.category.slug}/${svc.slug}`,
      lastModified: svc.updatedAt,
      priority: 0.8,
    })),
    ...areas.docs.map(area => ({
      url: `${baseUrl}/service-areas/${area.slug}`,
      lastModified: area.updatedAt,
      priority: 0.8,
    })),
    // Service × City combo pages
    ...services.docs.flatMap(svc =>
      areas.docs.map(area => ({
        url: `${baseUrl}/services/${svc.category.slug}/${svc.slug}/${area.slug}`,
        lastModified: new Date(Math.max(new Date(svc.updatedAt).getTime(), new Date(area.updatedAt).getTime())),
        priority: 0.7,
      }))
    ),
  ];
}
```

### 8.3 Structured Data (Auto-generated)

```
JSON-LD schemas generated from CMS data:
  ├── LocalBusiness (from site-settings + service-areas)
  ├── FAQPage (from faqs collection)
  ├── Organization + Employee (from team-members)
  ├── Service / OfferCatalog (from services)
  ├── Review / AggregateRating (from reviews)
  └── BreadcrumbList (auto from URL structure)
```

---

## 9. Authentication & Access Control

### Role Hierarchy

```
┌─────────┐     ┌──────────┐     ┌─────────┐     ┌────────┐
│  Admin   │ ──► │ Manager  │ ──► │  Staff  │ ──► │ Public │
│          │     │          │     │         │     │        │
│ • All    │     │ • CRUD   │     │ • Read  │     │ • Read │
│   access │     │   content│     │ • Create│     │   only │
│ • Users  │     │ • Media  │     │   leads │     │ • Submit│
│ • Config │     │ • Leads  │     │ • View  │     │   forms│
│ • Delete │     │          │     │   leads │     │        │
└─────────┘     └──────────┘     └─────────┘     └────────┘
```

### Access Control Implementation

```typescript
// access/roles.ts
export const isAdmin = ({ req }: { req: PayloadRequest }) =>
  req.user?.role === 'admin';

export const isManagerOrAbove = ({ req }: { req: PayloadRequest }) =>
  ['admin', 'manager'].includes(req.user?.role);

export const isStaffOrAbove = ({ req }: { req: PayloadRequest }) =>
  ['admin', 'manager', 'staff'].includes(req.user?.role);

// Users collection
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  fields: [
    { name: 'role', type: 'select', required: true, options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Manager', value: 'manager' },
      { label: 'Staff', value: 'staff' },
    ], defaultValue: 'staff',
      access: { update: isAdmin } // Only admin can change roles
    },
    { name: 'name', type: 'text', required: true },
  ],
};
```

---

## 10. Frontend Integration Map

### Current Static → CMS Migration

| React Component | Current Import | CMS API Call | Caching |
|----------------|----------------|-------------|---------|
| `StickyHeader` | `siteConfig.ts` | `GET /api/globals/site-settings` + `navigation` | ISR 1hr |
| `HeroSection` | `siteConfig.ts` | `GET /api/globals/homepage-layout` (hero section) | ISR 1hr |
| `ServicesSection` | `services.ts` | `GET /api/services?where[isActive]=true&sort=sortOrder` | ISR 1hr |
| `ServiceDetailDialog` | `serviceDetails.ts` | `GET /api/services/:id?depth=1` | ISR 1hr |
| `ReviewsSection` | `reviews.ts` | `GET /api/reviews?where[isApproved]=true&sort=-reviewDate` | ISR 30min |
| `BeforeAfterGallery` | Static assets | `GET /api/gallery-items?where[isActive]=true` | ISR 1hr |
| `QuoteTool` | N/A | `POST /api/quote-requests` | N/A |
| `VehicleVerifier` | `vehicles.ts` | `GET /api/vehicle-makes?depth=2` | ISR 24hr |
| `TeamSection` | `team.ts` | `GET /api/team-members?depth=2` (includes certs) | ISR 1hr |
| `CertificateViewer` | `team.ts` certs | Media URLs from team-members response | ISR 1hr |
| `ServiceAreaMap` | `locations.ts` | `GET /api/service-areas?where[isActive]=true` | ISR 1hr |
| `FAQSection` | `faqs.ts` | `GET /api/faqs?where[isActive]=true&sort=sortOrder` | ISR 1hr |
| `ContactSection` | `siteConfig.ts` | `GET /api/globals/site-settings` | ISR 1hr |
| `Footer` | `siteConfig.ts` | `GET /api/globals/site-settings` | ISR 1hr |
| `StructuredData` | Multiple files | Composed from multiple API responses | ISR 1hr |
| `CategoryLandingPage` | `services.ts` | `GET /api/service-categories/:slug` + services | ISR 1hr |
| `CityLandingPage` | `locations.ts` | `GET /api/service-areas/:slug` + services | ISR 1hr |
| `ServiceLandingPage` | `services.ts` | `GET /api/services/:slug?depth=1` | ISR 1hr |

### Integration Pattern

```typescript
// Before (static)
import { services } from '@/data/services';
const residentialServices = services.filter(s => s.category === 'residential');

// After (CMS-driven)
const residentialServices = await payload.find({
  collection: 'services',
  where: {
    'category.slug': { equals: 'residential' },
    isActive: { equals: true },
  },
  sort: 'sortOrder',
});
```

---

## 11. Admin Dashboard Features

### Dashboard Overview

```
┌─────────────────────────────────────────────────────┐
│  XCEL LOCKSMITH — ADMIN DASHBOARD                    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  📊 Quick Stats                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │ 12 New   │ │ 29       │ │ 24       │ │ 4.9★   │ │
│  │ Leads    │ │ Services │ │ Cities   │ │ Rating │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│                                                      │
│  📋 Recent Quote Requests                            │
│  ┌──────────────────────────────────────────────┐   │
│  │ Maria S. | Residential | Cleveland | NEW     │   │
│  │ John D.  | Automotive  | Parma     | NEW     │   │
│  │ Lisa M.  | Commercial  | Westlake  | QUOTED  │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Sidebar:                                            │
│  ├── 📄 Content                                      │
│  │   ├── Services                                    │
│  │   ├── Service Categories                          │
│  │   ├── Service Areas                               │
│  │   ├── Team Members                                │
│  │   ├── Reviews                                     │
│  │   ├── FAQs                                        │
│  │   └── Gallery                                     │
│  ├── 🚗 Vehicles                                     │
│  │   ├── Vehicle Makes                               │
│  │   └── Vehicle Models                              │
│  ├── 📨 Leads                                        │
│  │   ├── Quote Requests                              │
│  │   └── Contact Submissions                         │
│  ├── 🖼️ Media                                        │
│  ├── ⚙️ Settings                                     │
│  │   ├── Site Settings                               │
│  │   ├── Homepage Layout                             │
│  │   └── Navigation                                  │
│  └── 👤 Users                                        │
└─────────────────────────────────────────────────────┘
```

### Custom Admin Components

1. **Lead Pipeline View** — Kanban board for quote requests (New → Contacted → Quoted → Won/Lost)
2. **SEO Page Preview** — Real-time preview of generated SEO pages before publishing
3. **Map Editor** — Visual map for adding/editing service area pins
4. **Section Reorder** — Drag-and-drop homepage section ordering
5. **Analytics Widget** — Page views, quote conversions, popular services

---

## 12. Migration Plan

### Phase 1: Foundation (Days 1-3)

```
□ Initialize Next.js 15 project with App Router
□ Install & configure Payload CMS 3.x
□ Set up PostgreSQL (Neon)
□ Configure S3-compatible storage (R2)
□ Create Users collection with role-based auth
□ Create Media collection with image processing
□ Deploy skeleton to Vercel
```

### Phase 2: Core Collections (Days 4-7)

```
□ Create all collections (services, categories, areas, team, etc.)
□ Create all globals (site-settings, navigation, homepage-layout)
□ Seed database with current static data
□ Upload all current images to media collection
□ Configure access control for all collections
□ Test CRUD operations via admin panel
```

### Phase 3: Frontend Port (Days 8-11)

```
□ Port React components to Next.js (Server + Client Components)
□ Replace static imports with Payload Local API calls
□ Implement ISR for all pages
□ Port all SEO pages (service, category, city landing pages)
□ Implement dynamic sitemap generation
□ Port quote submission to API endpoint
□ Port review submission with approval workflow
□ Configure email notifications (Resend)
```

### Phase 4: Polish & Launch (Days 12-14)

```
□ Custom admin dashboard components
□ End-to-end testing of all flows
□ Performance optimization (caching, image optimization)
□ DNS cutover & SSL
□ Client training documentation
□ Go live 🚀
```

---

## 13. Deployment & Infrastructure

```
┌─────────────────────────────────────────────┐
│              Vercel (Frontend)               │
│  Next.js App + Payload Admin UI              │
│  ├── Edge Functions (API routes)             │
│  ├── ISR (Static pages with revalidation)    │
│  └── Image Optimization CDN                  │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌───────────────┐    ┌───────────────────┐
│  Neon (DB)    │    │  Cloudflare R2    │
│  PostgreSQL   │    │  Media Storage    │
│  Free tier:   │    │  Free tier:       │
│  0.5GB        │    │  10GB + free      │
│               │    │  egress           │
└───────────────┘    └───────────────────┘
                          │
                          ▼
                   ┌───────────────┐
                   │ Cloudflare CDN│
                   │ (auto, free)  │
                   └───────────────┘
```

---

## 14. Cost Estimates

### Monthly Operating Costs

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| Vercel Hobby | 100GB bandwidth | $0 |
| Neon PostgreSQL | 0.5GB, 1 project | $0 |
| Cloudflare R2 | 10GB storage, free egress | $0 |
| Resend | 100 emails/day | $0 |
| Domain + DNS | Cloudflare | ~$12/year |
| **Total** | | **~$1/month** |

### Scaling Costs (Future)

| Trigger | Upgrade | Cost |
|---------|---------|------|
| >100GB bandwidth/mo | Vercel Pro | $20/mo |
| >0.5GB database | Neon Scale | $19/mo |
| >10GB media storage | R2 paid | $0.015/GB |
| >100 emails/day | Resend Pro | $20/mo |
| **Scaled Total** | | **~$60/month** |

---

## Appendix A: Environment Variables

```env
# Database
DATABASE_URI=postgresql://user:pass@host/db

# Payload
PAYLOAD_SECRET=your-secret-key-min-32-chars
NEXT_PUBLIC_SERVER_URL=https://xcellocksmith.com

# Storage (R2)
S3_BUCKET=xcel-media
S3_REGION=auto
S3_ENDPOINT=https://account.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=xxx
S3_SECRET_ACCESS_KEY=xxx

# Email
RESEND_API_KEY=re_xxx

# Analytics (optional)
PLAUSIBLE_DOMAIN=xcellocksmith.com
```

## Appendix B: Data Seeding Script

```typescript
// seed.ts — Run once to migrate static data to CMS
import { services } from './src/data/services';
import { locations } from './src/data/locations';
import { teamMembers } from './src/data/team';
import { reviews } from './src/data/reviews';
import { faqs } from './src/data/faqs';

async function seed(payload: Payload) {
  // 1. Create categories
  const categories = ['residential', 'commercial', 'automotive'];
  const catMap = {};
  for (const cat of categories) {
    const doc = await payload.create({ collection: 'service-categories', data: { name: cat, slug: cat } });
    catMap[cat] = doc.id;
  }

  // 2. Seed services
  for (const svc of services) {
    await payload.create({ collection: 'services', data: { ...svc, category: catMap[svc.category] } });
  }

  // 3. Seed locations, team, reviews, faqs...
  for (const loc of locations) await payload.create({ collection: 'service-areas', data: loc });
  for (const member of teamMembers) await payload.create({ collection: 'team-members', data: member });
  for (const review of reviews) await payload.create({ collection: 'reviews', data: { ...review, isApproved: true } });
  for (const faq of faqs) await payload.create({ collection: 'faqs', data: faq });

  console.log('✅ Seed complete');
}
```

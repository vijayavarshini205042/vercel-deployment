#!/usr/bin/env python3
"""
DRMS — All 68 Departments Job Roles, Skills & Career Roadmap Master Database Generator
Strictly adheres to the 8-page DRMS specification.
Outputs:
  - public/js/data/all_68_departments_career_db.json
  - Updates public/js/data/careerData.js
"""

import json
import os
import sys

def make_roadmap(dept, role_name, tools, topics):
    return [
        {
            "level": 1,
            "title": "Foundation",
            "learn": [f"Basic principles and terminology of {dept}", f"Core mathematics and analytical methods", f"Introductory design tools ({tools[0] if tools else 'CAD/Modeling Tools'})"],
            "practice": [f"Solve 30+ fundamental analytical and calculation problems", f"Complete 5 introductory lab exercises"],
            "project": f"Fundamental Analysis & Calculation Workbook for {dept}",
            "outcome": f"Solid grasp of fundamental theory, unit conversions, and introductory tools."
        },
        {
            "level": 2,
            "title": "Core Skills",
            "learn": [f"Primary domain engineering standards and methodologies", f"Industry-standard software workflows ({', '.join(tools[:2])})", "Engineering documentation and safety compliance"],
            "practice": [f"Simulate standard workflows in {tools[0] if tools else 'Simulation Suite'}", "Draft standard engineering specifications"],
            "project": f"Standard Engineering Simulation & Sizing Project in {dept}",
            "outcome": "Ability to independently model and execute standard industry design workflows."
        },
        {
            "level": 3,
            "title": "Projects",
            "learn": ["Multi-component integration and design optimization", "Design for Quality, Reliability, and Cost Reduction", "Data analysis and result validation"],
            "practice": ["Build end-to-end prototype models and conduct stress/parameter testing", "Write comprehensive project technical reports"],
            "project": f"Integrated Domain System Design & Optimization Project",
            "outcome": "Verified capability to execute realistic multi-parameter engineering projects."
        },
        {
            "level": 4,
            "title": "Internship Preparation",
            "learn": ["Industry workflow standards, SOPs, and regulatory compliance", "Technical communication and engineering change orders (ECO)", "Professional presentation skills"],
            "practice": ["Participate in design reviews and code/model walkthroughs", "Audit real-world failure case studies"],
            "project": f"Industry Internship Portfolio & Case Study Analysis Report",
            "outcome": "Demonstrated readiness for competitive core and tech internships."
        },
        {
            "level": 5,
            "title": "Certifications / Learning",
            "learn": ["Global standards and industry vendor accreditation requirements", "Advanced domain specialization modules"],
            "practice": ["Complete practice tests and mock certification exams", "Review open-access research papers"],
            "project": f"Certified Professional Capstone Demonstration",
            "outcome": "Attainment of recognized industry or academic certifications."
        },
        {
            "level": 6,
            "title": "Placement Preparation",
            "learn": [f"High-frequency technical interview questions in {dept}", "Aptitude, quantitative problem solving, and logical reasoning", "Behavioral and situational HR questions"],
            "practice": ["Conduct 5+ mock peer interviews", f"Solve 100+ domain technical problems"],
            "project": f"Comprehensive Placement Technical Portfolio & Defense Document",
            "outcome": "High clearance rate in on-campus and off-campus placement drives."
        },
        {
            "level": 7,
            "title": "Job & Career Progression",
            "learn": ["Enterprise project management and team leadership", "Cost estimation, budgeting, and client relationship management", "Emerging technologies and future trends in the discipline"],
            "practice": ["Lead cross-functional engineering reviews", "Formulate long-term technology roadmaps"],
            "project": f"Next-Generation Strategic Engineering Architecture Blueprint",
            "outcome": "Rapid promotion from Trainee/Junior Engineer to Technical Specialist and Architect."
        }
    ]

def make_projects(dept, role_name, tools):
    t_str = ", ".join(tools[:3])
    return [
        {
            "level": "Beginner",
            "title": f"Introductory {role_name} Analysis & Modeling Study",
            "problemStatement": f"Students lack structured understanding of basic {dept} component sizing and simulation.",
            "technologies": tools[:2] if len(tools) >= 2 else ["Standard Engineering Tools"],
            "mainFeatures": [f"Basic modeling in {tools[0] if tools else 'Software'}", "Parameter verification", "Analytical report generation"],
            "expectedLearningOutcome": f"Foundational competency in engineering tools and calculation accuracy."
        },
        {
            "level": "Intermediate",
            "title": f"Process Optimization & Multi-Parameter System Design in {dept}",
            "problemStatement": f"Real-world industrial units suffer efficiency bottlenecks requiring optimization.",
            "technologies": tools[:3] if len(tools) >= 3 else ["Standard Industrial Suites"],
            "mainFeatures": ["Dynamic process simulation", "Sensitivity analysis", "Standard compliance check", "BOM & Cost estimation"],
            "expectedLearningOutcome": f"Ability to troubleshoot and optimize complex systems in {dept}."
        },
        {
            "level": "Advanced",
            "title": f"Industry-Scale Smart & Sustainable {role_name} Solution",
            "problemStatement": f"Enterprises need sustainable, IoT/AI-enabled smart engineering solutions.",
            "technologies": tools + ["IoT / Cloud Telemetry", "Optimization Algorithms"],
            "mainFeatures": ["Real-time data telemetry", "Predictive failure detection", "Environmental impact reduction", "Full lifecycle evaluation"],
            "expectedLearningOutcome": f"Leadership-level project execution demonstrating cross-disciplinary engineering."
        }
    ]

print("Script template ready. Building dictionary...")

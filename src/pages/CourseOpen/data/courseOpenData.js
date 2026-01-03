// src/pages/CourseOpen/data/courseOpenData.js

// iOS/Safari friendly MP4 sources (reliable sample bucket)
const V = {
  bbb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  ed: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  sintel: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  tears: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  blaze: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  escape: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  fun: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  joy: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  melt: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  subaru:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  bull:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  grand:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
};

export const courseOpenData = {

  hero: {
    title: "UI/UX Design Course",
    description:
      "Welcome to our UI/UX Design course! This comprehensive program will equip you with the knowledge and skills to create exceptional user interfaces (UI) and enhance user experiences (UX). Dive into the world of design thinking, wireframing, prototyping, and usability testing. Below is an overview of the curriculum.",
  },

  // Video showcase UI (banner/controls) uchun meta
  videoUI: {
    poster: "/favicon.svg",
    badgeTitle: "UzStudents Preview",
    badgeSub: "Learning • Assignments • Feedback",
    ctaTitle: "Watch how it works",
    ctaSub: "Tap to play • Auto pause on scroll",
  },

  // ✅ ONLY 4 modules (01-04)
  modules: [
    {
      number: "01",
      title: "Introduction to UI/UX Design",
      lessons: [
        {
          id: "01-01",
          title: "Understanding UI/UX Design Principles",
          sub: "Lesson 01",
          time: "45 Minutes",
          videoSrc: V.ed,
        },
        {
          id: "01-02",
          title: "Importance of User-Centered Design",
          sub: "Lesson 02",
          time: "1 Hour",
          featured: true, // screenshotdagi orange border kabi default highlight
          videoSrc: V.bbb,
        },
        {
          id: "01-03",
          title: "The Role of UI/UX Design in Product Development",
          sub: "Lesson 03",
          time: "45 Minutes",
          videoSrc: V.sintel,
        },
      ],
    },

    {
      number: "02",
      title: "User Research and Analysis",
      lessons: [
        {
          id: "02-01",
          title: "Conducting User Research and Interviews",
          sub: "Lesson 01",
          time: "1 Hour",
          videoSrc: V.escape,
        },
        {
          id: "02-02",
          title: "Analyzing User Needs and Behavior",
          sub: "Lesson 02",
          time: "1 Hour",
          videoSrc: V.fun,
        },
        {
          id: "02-03",
          title: "Creating User Personas and Scenarios",
          sub: "Lesson 03",
          time: "45 Minutes",
          videoSrc: V.joy,
        },
      ],
    },

    {
      number: "03",
      title: "Wireframing and Prototyping",
      lessons: [
        {
          id: "03-01",
          title: "Introduction to Wireframing Tools and Techniques",
          sub: "Lesson 01",
          time: "1 Hour",
          videoSrc: V.blaze,
        },
        {
          id: "03-02",
          title: "Creating Low-Fidelity Wireframes",
          sub: "Lesson 02",
          time: "1 Hour",
          videoSrc: V.melt,
        },
        {
          id: "03-03",
          title: "Prototyping and Interactive Mockups",
          sub: "Lesson 03",
          time: "1 Hour",
          videoSrc: V.tears,
        },
      ],
    },

    {
      number: "04",
      title: "Visual Design and Branding",
      lessons: [
        {
          id: "04-01",
          title: "Color Theory and Typography in UI Design",
          sub: "Lesson 01",
          time: "1 Hour",
          videoSrc: V.subaru,
        },
        {
          id: "04-02",
          title: "Visual Hierarchy and Layout Design",
          sub: "Lesson 02",
          time: "1 Hour",
          videoSrc: V.bull,
        },
        {
          id: "04-03",
          title: "Creating a Strong Brand Identity",
          sub: "Lesson 03",
          time: "45 Minutes",
          videoSrc: V.grand,
        },
      ],
    },
  ],
};

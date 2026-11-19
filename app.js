/**
 * V0AULT — ARCHITECTURAL PRAXIS
 * Interactive Engine: Inward Bevel Push, Dynamic Lighting, Tactile Audio & Material Lab
 */

(function () {
  'use strict';

  // Contact email: assembled at load time so it never appears as a plain address in the HTML source
  document.querySelectorAll('[data-email-user][data-email-domain]').forEach((link) => {
    const address = link.getAttribute('data-email-user') + '@' + link.getAttribute('data-email-domain');
    link.setAttribute('href', 'mailto:' + address);
    link.textContent = address;
  });

  // State Management
  const state = {
    isVaultUnlocked: false,
    isPushing: false,
    audioEnabled: true,
    lightMode: 'cursor', // 'cursor' | 'zenith' | 'raking' | 'studio'
    subPage: 'bio', // 'bio' | 'education'
    bevelDepth: 4.0,
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    cursorX: window.innerWidth / 2,
    cursorY: window.innerHeight / 2
  };

  // DOM Elements
  const landingView = document.getElementById('landing-view');
  const mainPortfolio = document.getElementById('main-portfolio');
  const entranceTriggerZone = document.getElementById('entrance-trigger-zone');
  const logoMonolithFrame = document.getElementById('logo-monolith-frame');
  const logoInnerPlate = document.getElementById('logo-inner-plate');
  const v0aultMonogramNormal = document.getElementById('v0ault-monogram-normal');
  const v0aultMonogramPressed = document.getElementById('v0ault-monogram-pressed');
  const sheenLayer = document.getElementById('sheen-layer');
  const noiseCanvas = document.getElementById('noise-canvas');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const sealVaultBtn = document.getElementById('seal-vault-btn');
  const footerSealBtn = document.getElementById('footer-seal-btn');
  const depthSlider = document.getElementById('bevel-depth-slider');
  const depthReadout = document.getElementById('depth-readout');
  const solarReadout = document.getElementById('solar-azimuth-readout');
  const lightPills = document.querySelectorAll('.button-toggle-group .beveled-pill');
  const projectModal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body');

  // 10 Distinct Architecture Projects with Curated Editorial Narratives
  const ARCH_PROJECTS = [
    {
      id: '001',
      num: '001',
      title: 'Form study | The Wall:  The blended Fibonacci',
      location: '',
      design: 'Vivian Park',
      year: '2023',
      status: '',
      program: '',
      area: '',
      intro: 'To translate the mathematical beauty of the Fibonacci sequence into a sculptural, translucent wall, exploring the relationship between natural proportions, spatial depth in a continuous form.',
      body: 'To achieve this sculptural structure, acrylic panels were cut into triangles to replicate glass panes which then were positioned protruding beyond a single z-y plane in the fibonacci sequence. Each triangle was carefuly measured for not only its height but its distance across the horizontal plane to give the wall a greater volume than simply its glass thickness. In addition, the vertical glass walls are linked framelessly with three hand etched panel of arcylic, replicating translucent glass, appearing as a separate element from the transparent front wall glass.',
      heroImg: 'architectureprojectpage_images/001/ov3.png',
      primaryImg: 'architectureprojectpage_images/001/ov3.png',
      images: [
        {
          src: 'architectureprojectpage_images/001/ov3.png',
          alt: 'Form study | The Wall:  The blended Fibonacci - Main Perspective',
          aspectRatio: '2656 / 1768',
          ratioVal: 1.502,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/001/ov31.png',
          alt: 'Form study | The Wall:  The blended Fibonacci - Top Plan View',
          aspectRatio: '3196 / 746',
          ratioVal: 4.284,
          fitMode: 'hero-fit-width'
        },
        {
          src: 'architectureprojectpage_images/001/ov32.png',
          alt: 'Form study | The Wall:  The blended Fibonacci - Fibonacci Proportion Diagram',
          aspectRatio: '2984 / 1192',
          ratioVal: 2.503,
          fitMode: 'hero-fit-width'
        },
        {
          src: 'architectureprojectpage_images/001/ov33.png',
          alt: 'Form study | The Wall:  The blended Fibonacci - Side Profile Elevation',
          aspectRatio: '1754 / 2096',
          ratioVal: 0.837,
          fitMode: 'hero-fit-height'
        }
      ]
    },
    {
      id: '002',
      num: '002',
      title: 'Form study | The collage:  Uplifting form of nature',
      location: '',
      design: 'Vivian Park',
      year: '2023',
      status: '',
      program: '',
      area: '',
      intro: 'Exploring how contrast is used above a predetermined layout. Using contrast to spread awareness on algae as a plentiful sustainable material.',
      body: 'Jan Schoonhoven \'s oeuvre determined the pre-made plate. Algae offers contrast in terms of color from monotone to green, in terms of the organic texture, and its free yet orderly rhythm that moves across the more obstruct linear existing space. Learning from the ‘RESTORE’ exhibition displayed at the Design Museum in London in 2022, this collage showcases algae as an important organism to appreciate and make use of as a natural material with sustainable potential. Natural recyclable materials such as paper, tape,string and loose gravel can give a contrasting effect rather than a blend. In addition, this collage reminds us that nature will always grow and build above man made structures. Only additive procedures were considered in the making of the collage to emphasize this message.',
      heroImg: 'architectureprojectpage_images/002/arch_002_01.png',
      primaryImg: 'architectureprojectpage_images/002/arch_002_01.png',
      images: [
        {
          src: 'architectureprojectpage_images/002/arch_002_01.png',
          alt: 'Form study | The collage:  Uplifting form of nature',
          aspectRatio: '1786 / 1780',
          ratioVal: 1.003,
          fitMode: 'hero-fit-height'
        }
      ]
    },
    {
      id: '003',
      num: '003',
      title: 'Rustwijk Urban Development Proposal Meeslaan',
      location: 'Meeslaan, Delft',
      design: 'Vivian Park, tutor Monica Palfy',
      year: '2024',
      status: 'Urban',
      program: 'Urban',
      area: '',
      intro: 'A guide for a sustainable pedestrian + cycle based neighbourhood presented with VR. An interconnected future scenario neighbourhood suited for multiple uprising resident user groups such as elderly and young professionals.',
      body: 'An urban development consists of conscious streetscape, zoning, connection between streetscapes, sustainable mobility, prioritising uses, resilient inclusive spaces, and other reshaping methods that improve an underdeveloped area. For the meeslaan neighourhood it is key to develop the site to offer interaction, rest and restoration of nature. Meeslaan is an area with large nature potentials, hence nature elements were taken as inspiration for the design of sitting spaces, streetscapes and facades. The development aims a long-term design in ways such as implementing sustainable path uses, and hightening the residents\' awareness of nature by cultivating the rich growing nature. A walkthrough of the site was made possible with a completely rendered site and twinmotion VR. A presentation of the work with an intuitive self adjusted view.',
      heroImg: 'architectureprojectpage_images/003/arch_003_01.png',
      primaryImg: 'architectureprojectpage_images/003/arch_003_36.png',
      images: [
        {
          src: 'architectureprojectpage_images/003/arch_003_01.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 01',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_11.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 11',
          aspectRatio: '1920 / 1182',
          ratioVal: 1.624,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_35.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 35',
          aspectRatio: '6343 / 4614',
          ratioVal: 1.375,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center top',
          transform: 'scale(1.08) translateY(12px)'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_02.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 02',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_03.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 03',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_04.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 04',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_05.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 05',
          aspectRatio: '1539 / 901',
          ratioVal: 1.708,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_06.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 06',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_07.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 07',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_08.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 08',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_09.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 09',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_10.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 10',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_12.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 12',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_13.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 13',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_14.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 14',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_15.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 15',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_16.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 16',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_17.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 17',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_18.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 18',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_19.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 19',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_20.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 20',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_21.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 21',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_22.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 22',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_23.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 23',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_24.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 24',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_25.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 25',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_26.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 26',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_27.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 27',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_28.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 28',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_29.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 29',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_30.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 30',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_31.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 31',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_32.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 32',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_33.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 33',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_34.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 34',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        }
      ],
      bottomImages: [
        {
          src: 'architectureprojectpage_images/003/arch_003_36.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 36',
          aspectRatio: '9939 / 3508',
          ratioVal: 2.833,
          fitMode: 'hero-fit-width'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_37.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 37',
          aspectRatio: '3420 / 2214',
          ratioVal: 1.545,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_38.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 38',
          aspectRatio: '3420 / 2214',
          ratioVal: 1.545,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_39.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 39',
          aspectRatio: '3420 / 2214',
          ratioVal: 1.545,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_40.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 40',
          aspectRatio: '3741 / 2585',
          ratioVal: 1.447,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/003/arch_003_41.png',
          alt: 'Rustwijk Urban Development Proposal Meeslaan - View 41',
          aspectRatio: '3420 / 2214',
          ratioVal: 1.545,
          fitMode: 'hero-fit-wallpaper'
        }
      ]
    },
    {
      id: '004',
      num: '004',
      title: 'Escher Museum pavilion AI optimization',
      location: 'The Hague, The Netherlands',
      design: 'Vivian Park, tutor Andreas Mananas',
      year: '2024',
      status: 'public pavilion',
      program: 'public pavilion',
      area: '',
      intro: 'Selective path mimicing Escher\'s tesselated waterfall bridges with a canopy optimized for comfort sun and shade intensity.',
      body: 'The sunken entry to the Escher Museum was designed to showcase sculptures to set a transition from the street to a slowed down museum atmosphere. The design replicates Escher\'s waterfall art piece, elevating the spatial experiance, allowing the journey of the visitor to be a part of the art. With this core concept inspired by Escher\'s spatially captivating art, spatial mapping and parametric design was achieved through grasshopper and AI tools.',
      extraInfo: `<p class="arch-proj-extra-para">Graph A supports a moderate hierarchial movement through sculpture functions, eventually redirectioning back to the garden and museum entrances, terras and information point. Graph B is similar to graph A in its hierarchial organization of sculptures, achieved through two definate decision lines emerging from each sculpture function, restricing to exclusively a back and forth movement from each sculpture point. Graph B however portrays a flexible organization between the terrace, information and garden entrance functions, while the museum entrance is accessbile in the outmost 9th depth, once the hierchial path of sculpture is passed. note*: the lines demonstrate arbitrary form and length</p>\n        <h4 class="arch-proj-extra-heading">Roof optimization</h4>\n        <p class="arch-proj-extra-para">Following the roof design in grasshopper, where control variables are defined as 1. the selection of a isocurve, 2. the height of the selected isocurve, and 3. the size of hole patterns, the roof is optimized to ensure sufficient sunlight in the terrace. For this calculation, the square nearing the museum entrance and restaurant was selected to provide analyses, although the terrace is a fully flowing space from the information point, down the stairs and towards the square. Fig 13 notes a diagram to visualize the process. The roof variables and measurables are collected which is filtered with Directsunhours, where precision of the analysis can be adjusted with grid size, followed by a mathamatical calculation constraint (A) that sets the difference between the grid’s 50% and sunny point counts to 0. Galapogos is run under these constraints and provides optimums that can be reinstated. The reinstated choice is displayed in fig 14. While this solution (minimized to 0.5) fits the 50% shade in the summer season, it is uncorrelated with the sunlight provided during the spring season. Upon this decision, the procedure was repeated with the roof variables, with a calculation constraint (A+B) including setting the difference in grid count and sunny point count is 0. Wallacei takes these two objectives and plots a choice of frontmost 49 results. A satisfactory roof design visualized in fig 15 is selected and is taken to application.</p>\n        <h4 class="arch-proj-extra-heading">Galapogos and Wallacei</h4>\n        <p class="arch-proj-extra-para">Galapogos optimizes for variables and a single criteria or one fitness function, however Wallacei optimizes with multi- criteria through two fitness functions as portrayed in the diagram of fig 13 ‘calculation constraint A+B’. Galapogos is ideal when prioritizing one variable. In contrast, for problems requiring a balance between multiple objectives (e.g., optimizing both structural efficiency and environmental performance), Wallacei would be more suitable, as it allows for exploration of complex trade-offs across various fitness functions</p>`,
      heroImg: 'architectureprojectpage_images/004/arch_004_01.png',
      primaryImg: 'architectureprojectpage_images/004/arch_004_06.png',
      images: [
        {
          src: 'architectureprojectpage_images/004/arch_004_01.png',
          alt: 'Escher Museum pavilion AI optimization - View 01',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_02.png',
          alt: 'Escher Museum pavilion AI optimization - View 02',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center top',
          transform: 'scale(1.1)'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_03.png',
          alt: 'Escher Museum pavilion AI optimization - View 03',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_04.png',
          alt: 'Escher Museum pavilion AI optimization - View 04',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_05.png',
          alt: 'Escher Museum pavilion AI optimization - View 05',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        }
      ],
      bottomImages: [
        {
          src: 'architectureprojectpage_images/004/arch_004_06.png',
          alt: 'Escher Museum pavilion AI optimization - Fig 1 & 2 Justified Tree Graphs',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_07.png',
          alt: 'Escher Museum pavilion AI optimization - Fig 3 & 4 Sculpture Garden Graphs',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_08.png',
          alt: 'Escher Museum pavilion AI optimization - Fig 7 Plan View of Geometry and Functions',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_09.png',
          alt: 'Escher Museum pavilion AI optimization - Fig 9 Double Ramp and Flow',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_10.png',
          alt: 'Escher Museum pavilion AI optimization - Fig 10 Network Graph Geometries',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_11.png',
          alt: 'Escher Museum pavilion AI optimization - Fig 11 Grasshopper Roof Optimization Script',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_12.png',
          alt: 'Escher Museum pavilion AI optimization - Fig 13 Diagram of Development Variables',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/004/arch_004_13.png',
          alt: 'Escher Museum pavilion AI optimization - Fig 14 & 15 Optimal Solutions (Galapagos & Wallacei)',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        }
      ]
    },
    {
      id: '005',
      num: '005',
      title: 'Studio HOB',
      location: 'NIBC Den Haag, Netherlands',
      design: 'Vivian Park, tutor Thomas Ponds',
      year: '2025',
      status: 'residential, renovation',
      program: 'residential, renovation',
      area: '',
      intro: 'Having quiet soft corners, diffused light is a sanctuary for highly sensitive people (HSP)s who can get easily overstimulated.',
      body: 'Studios in the Huis [home] or Binnen [indoors] (HoB) offers two types, the \'home-working\' variation that offers a softly lit work nook and the \'indoors-working\' variation where HSP\'s can work in the collective, softly divided work space in the building atrium. The reference towards contracting and unfurling falls under the overarching concept of the sensitive and dynamic plant Mimosa Pudica that folds when approached. Room dividers, curtains, blinds and the roof all foster this flexible home environment.',
      heroImg: 'architectureprojectpage_images/005/arch_005_01.png',
      primaryImg: 'architectureprojectpage_images/005/arch_005_16.jpg',
      images: [
        {
          src: 'architectureprojectpage_images/005/arch_005_01.png',
          alt: 'Studio HOB - View 01',
          aspectRatio: '9892 / 5388',
          ratioVal: 1.836,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_02.jpg',
          alt: 'Studio HOB - View 02',
          aspectRatio: '4961 / 2809',
          ratioVal: 1.766,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_03.png',
          alt: 'Studio HOB - View 03',
          aspectRatio: '5099 / 4093',
          ratioVal: 1.246,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_04.png',
          alt: 'Studio HOB - View 04',
          aspectRatio: '4514 / 4284',
          ratioVal: 1.054,
          fitMode: 'hero-fit-height'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_05.png',
          alt: 'Studio HOB - View 05',
          aspectRatio: '5423 / 4062',
          ratioVal: 1.335,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_06.png',
          alt: 'Studio HOB - View 06',
          aspectRatio: '5712 / 4284',
          ratioVal: 1.333,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_07.png',
          alt: 'Studio HOB - View 07',
          aspectRatio: '5712 / 4284',
          ratioVal: 1.333,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_08.png',
          alt: 'Studio HOB - View 08',
          aspectRatio: '1279 / 1522',
          ratioVal: 0.840,
          fitMode: 'hero-fit-height'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_09.png',
          alt: 'Studio HOB - View 09',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_10.png',
          alt: 'Studio HOB - View 10',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_11.png',
          alt: 'Studio HOB - View 11',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_12.png',
          alt: 'Studio HOB - View 12',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_13.png',
          alt: 'Studio HOB - View 13',
          aspectRatio: '7265 / 4228',
          ratioVal: 1.718,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_14.png',
          alt: 'Studio HOB - View 14',
          aspectRatio: '7265 / 4228',
          ratioVal: 1.718,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_15.png',
          alt: 'Studio HOB - View 15',
          aspectRatio: '7265 / 4228',
          ratioVal: 1.718,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        }
      ],
      bottomImages: [
        {
          src: 'architectureprojectpage_images/005/arch_005_16.jpg',
          alt: 'Studio HOB - Exploded Axonometric Diagram',
          aspectRatio: '2380 / 7016',
          ratioVal: 0.339,
          fitMode: 'hero-fit-height'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_17.png',
          alt: 'Studio HOB - Type HW & Type BW Unit Axonometric',
          aspectRatio: '2439 / 2339',
          ratioVal: 1.043,
          fitMode: 'hero-fit-height'
        },
        {
          src: 'architectureprojectpage_images/005/arch_005_18.png',
          alt: 'Studio HOB - 1:50 Ground Floor Plan Section',
          aspectRatio: '5741 / 2707',
          ratioVal: 2.121,
          fitMode: 'hero-fit-width'
        }
      ]
    },
    {
      id: '006',
      num: '006',
      title: 'Field Engraved',
      location: 'Elwood, Melbourne',
      design: 'Vivian Park, tutor Madeleine Thorpe',
      year: '2025',
      status: 'public',
      program: 'public',
      area: '',
      intro: 'Sensory, gardening, and playing are interwoven in one landscape. Land is carved or extruded to add planting bed, bench or water layers along the paths.',
      body: 'A place where your senses lead you to activate your senses through sensorial experiences. The project Field Engraved stems from themes of environment inclusive design, enhancement of social life, and a harmony of sensorial experiences. In attempt to equate the pleasurable experience the pavilion includes extensive programs such as public food planting, water regulating features, vapor interactions and interactive facades.\n\nThe facades are playfully positioned, taking the basic forms of an engraving pattern from a figure skating blade. As a result, two mediums are engraved on the field, which are interchangeably used as a bench or a waist-leveled gardening bed. As referred to as Duplex facades here, they criss cross through the Elwood field often intersecting each other. As if scattered across the frosty field, the duplex facades erect in non-identical heights, as though it is imitating an abandoned site, ultimately relating to the idea of what was once touched, had contact with and left an engraving.\n\nLocated in the south of Melbourne CBD, Elwood’s great site potential in accessibility, orientation, bounds, and traffic should not be taken for granted. Hence may this be the pleasurable park you walk through whether on a wheelchair, on a bike or with a stroller.',
      heroImg: 'architectureprojectpage_images/006/arch_006_01.png',
      primaryImg: 'architectureprojectpage_images/006/arch_006_07.png',
      images: [
        {
          src: 'architectureprojectpage_images/006/arch_006_01.png',
          alt: 'Field Engraved - View 01',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center 42%'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_02.png',
          alt: 'Field Engraved - View 02',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_03.png',
          alt: 'Field Engraved - View 03',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center 35%'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_04.png',
          alt: 'Field Engraved - View 04',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_05.png',
          alt: 'Field Engraved - View 05',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_06.png',
          alt: 'Field Engraved - View 06',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        }
      ],
      bottomImages: [
        {
          src: 'architectureprojectpage_images/006/arch_006_07.png',
          alt: 'Field Engraved - Concept Diagram (Pleasure Garden)',
          aspectRatio: '2481 / 3508',
          ratioVal: 0.707,
          fitMode: 'hero-fit-height'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_08.png',
          alt: 'Field Engraved - Figure Skating Blade & Engraving Pattern Reference',
          aspectRatio: '1504 / 652',
          ratioVal: 2.307,
          fitMode: 'hero-fit-width'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_09.png',
          alt: 'Field Engraved - Early Trace Sketches (Water, People, Structure)',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_10.png',
          alt: 'Field Engraved - Carved Field Mediums Plan Study',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_11.png',
          alt: 'Field Engraved - Topography, Micro-watershed & Wind Analysis',
          aspectRatio: '3314 / 3508',
          ratioVal: 0.945,
          fitMode: 'hero-fit-height'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_12.png',
          alt: 'Field Engraved - Interactive Rain-Drip Duplex Facade Study',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/006/arch_006_13.png',
          alt: 'Field Engraved - Seasonal Botanical Palette & Planting Matrix',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper'
        }
      ]
    },
    {
      id: '007',
      num: '007',
      title: 'House of Honest Light',
      location: 'Naoshima, Japan',
      design: 'Douwe v.d. Sman, Ilian Ibrahim, Vivian Park',
      year: '2026',
      status: 'residential',
      program: 'residential',
      area: '',
      intro: 'A home lit without artifitial light. The intertwined wooden pattern reinforces komorebi, inviting light in time stamps, into dedicated spaces in the form of dappling light.',
      body: 'A home that embraces natural light, is a home that lets light express itself. There is something about the tree that has always expressed honesty. The art of being complete, including any shadows. This home, and the couple who live in it, embrace living honestly, like under the dappling light or in the shade. Komorebi is the japanese term for lightstreaks seeping through trees. Komorebi is a natural phenomenon and exists only because the shadow plays a part in creating ‘completeness’ of the effect. The form of the home, together with the intertwined wooden pattern reinforces the behaviour of komorebi, inviting light into the courtyard and other dedicated spaces in the form of dappling light. The light patterns differ per room activity, while allowing light and shadows to move through time.',
      heroImg: 'architectureprojectpage_images/007/arch_007_01.png',
      primaryImg: 'architectureprojectpage_images/007/arch_007_08.png',
      images: [
        {
          src: 'architectureprojectpage_images/007/arch_007_01.png',
          alt: 'House of Honest Light - Corridor & Courtyard Render (Cover)',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/007/arch_007_02.png',
          alt: 'House of Honest Light - Living Area Render',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/007/arch_007_03.png',
          alt: 'House of Honest Light - Kitchen Render',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/007/arch_007_04.png',
          alt: 'House of Honest Light - Studio / Study Render',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/007/arch_007_05.png',
          alt: 'House of Honest Light - Hinoki Bathroom Render',
          aspectRatio: '1920 / 1080',
          ratioVal: 1.778,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'architectureprojectpage_images/007/arch_007_06.png',
          alt: 'House of Honest Light - Site Section',
          aspectRatio: '5199 / 3372',
          ratioVal: 1.542,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/007/arch_007_07.png',
          alt: 'House of Honest Light - Komorebi Light & Pattern Diagram',
          aspectRatio: '3508 / 2481',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        }
      ],
      bottomImages: [
        {
          src: 'architectureprojectpage_images/007/arch_007_08.png',
          alt: 'House of Honest Light - Floor Plan & Light Section Key',
          aspectRatio: '3508 / 4961',
          ratioVal: 0.707,
          fitMode: 'hero-fit-height'
        }
      ]
    },
    {
      id: '008',
      num: '008',
      title: 'The Sea of Crying Eyes',
      location: 'Rome, Italy (convertable module)',
      design: 'Douwe v.d. Sman, Ilian Ibrahim, Vivian Park',
      year: '2026',
      status: 'public',
      program: 'public',
      area: '',
      intro: 'Can we modulize safe and cooled streets? Watering plants with mussel shell curtains on steel wires, act as figurative eyes, transforms neglected streets into safer and cooler ones.',
      body: 'Rome is a city defined by movement and a lively urban life. Yet not every street shares the same energy. In narrow alleys and passageways that remain neglected and underused, creates spaces that feel disconnected from the urban scale. This also contributes to a diminished sense of safety and belonging in the urban context of Rome. The accumulation of mussel shells, symbolizing the sea of eyes addresses the neglect by transforming the streets into safer, cooler and more interactive urban spaces. Taking inspiration from ancient roman water architecture: the Nymphaeum, aqueducts and the impluvium. This pavilion acts as a guardian for the people by creating moments for different user groups through a collection of modular elements, made of shellcrete, musselshells and stainless steel wires.',
      heroImg: 'architectureprojectpage_images/008/arch_008_01.png',
      primaryImg: 'architectureprojectpage_images/008/arch_008_05_display.png',
      images: [
        {
          src: 'architectureprojectpage_images/008/arch_008_01.png',
          alt: 'The Sea of Crying Eyes - Street Entrance Render (Cover)',
          aspectRatio: '3726 / 2560',
          ratioVal: 1.455,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center 45%'
        },
        {
          src: 'architectureprojectpage_images/008/arch_008_02.png',
          alt: 'The Sea of Crying Eyes - Interior Oculus & Mussel Shell Curtain Render',
          aspectRatio: '2560 / 1920',
          ratioVal: 1.333,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/008/arch_008_03.png',
          alt: 'The Sea of Crying Eyes - Rome Alley Site Locations 1, 2 & 3',
          aspectRatio: '4213 / 3186',
          ratioVal: 1.322,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/008/arch_008_04.png',
          alt: 'The Sea of Crying Eyes - Relocation of the Pavilion Modular Permutations',
          aspectRatio: '3414 / 2342',
          ratioVal: 1.458,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center top'
        }
      ],
      bottomImages: [
        {
          src: 'architectureprojectpage_images/008/arch_008_05_display.png',
          alt: 'The Sea of Crying Eyes - Modular Elements & Oculus Waterfall Axonometric',
          aspectRatio: '6541 / 4502',
          ratioVal: 1.453,
          fitMode: 'hero-fit-wallpaper'
        }
      ]
    },
    {
      id: '009',
      num: '009',
      title: 'Zwembad Found',
      location: 'Lansingerland, Netherlands',
      design: 'Vivian Park, tutor Frank Schnater, Ruurd Kuijlenburg',
      year: '2026',
      status: 'public',
      program: 'public',
      area: '',
      intro: 'Mussel shells grants extensive physical benefits. The chemical composition of mussels filters rain/pool waters we touch. Its shells insulate and rubble texture connects us to aquaculture.',
      body: 'Mirrored mussel shaped domes emerge from the grounds of a nation-wide protected park as though shells are found in the dutch sands. Following this biophillic approach, the pool offers an immersive experience that shows the potentials of mussels via form, access, water circulation, air flow, insulation and sustainabiliy. A detachable mussel shell mounted facade panel, acidic rain can be neutralized and reused for showers, taps and small pools of water.',
      heroImg: 'architectureprojectpage_images/009/arch_009_01.png',
      primaryImg: 'architectureprojectpage_images/009/arch_009_12.jpg',
      images: [
        {
          src: 'architectureprojectpage_images/009/arch_009_01.png',
          alt: 'Zwembad Found - Mirrored Mussel Shell Domes (Cover)',
          aspectRatio: '2560 / 1891',
          ratioVal: 1.354,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_02.png',
          alt: 'Zwembad Found - Domes & Landscape Integration',
          aspectRatio: '2560 / 1891',
          ratioVal: 1.354,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center bottom'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_03.png',
          alt: 'Zwembad Found - Site & Landscape Panorama',
          aspectRatio: '4034 / 1775',
          ratioVal: 2.273,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center',
          transform: 'scale(1.06)',
          transformOrigin: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_04.png',
          alt: 'Zwembad Found - Pool Basin & Aquatic Atmosphere',
          aspectRatio: '2553 / 1776',
          ratioVal: 1.438,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_05.png',
          alt: 'Zwembad Found - Natural Light & Mussel Shell Roof Atmosphere',
          aspectRatio: '3024 / 2097',
          ratioVal: 1.442,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_06.png',
          alt: 'Zwembad Found - Water Circulation & Biophilic Domes',
          aspectRatio: '2536 / 1653',
          ratioVal: 1.534,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_07_display.png',
          alt: 'Zwembad Found - Structural Shell & Water Circulation Diagram',
          aspectRatio: '3840 / 2968',
          ratioVal: 1.294,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center 75%'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_08.png',
          alt: 'Zwembad Found - Mussel Filtration & Acid Rain Neutralization Axonometric',
          aspectRatio: '9933 / 7677',
          ratioVal: 1.294,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center 75%'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_09_display.png',
          alt: 'Zwembad Found - Detail Study & Section',
          aspectRatio: '3200 / 1864',
          ratioVal: 1.717,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_10.png',
          alt: 'Zwembad Found - Longitudinal Landscape Section',
          aspectRatio: '9933 / 4979',
          ratioVal: 1.995,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center',
          transform: 'scale(1.26) translateY(-7vh)',
          transformOrigin: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_11.png',
          alt: 'Zwembad Found - Transverse Architectural Section',
          aspectRatio: '9933 / 4979',
          ratioVal: 1.995,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center',
          transform: 'scale(1.26) translateY(-7vh)',
          transformOrigin: 'center center'
        }
      ],
      bottomImages: [
        {
          src: 'architectureprojectpage_images/009/arch_009_12.jpg',
          alt: 'Zwembad Found - Mussel Aquaculture & Material Study 01',
          aspectRatio: '4032 / 3024',
          ratioVal: 1.333,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_13.png',
          alt: 'Zwembad Found - Material Sample & Shell Rubble Texture',
          aspectRatio: '3069 / 2358',
          ratioVal: 1.302,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_14.jpg',
          alt: 'Zwembad Found - Chemical Filtration Experiment 01',
          aspectRatio: '2854 / 1989',
          ratioVal: 1.435,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_15.png',
          alt: 'Zwembad Found - Filtration Testing & Water Purity',
          aspectRatio: '4032 / 2886',
          ratioVal: 1.397,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_16.jpg',
          alt: 'Zwembad Found - Prototype Model & Shell Casting 01',
          aspectRatio: '1216 / 878',
          ratioVal: 1.385,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_17.jpg',
          alt: 'Zwembad Found - Prototype Model & Shell Casting 02',
          aspectRatio: '848 / 1249',
          ratioVal: 0.679,
          fitMode: 'hero-fit-height',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_18.png',
          alt: 'Zwembad Found - Detail Drawing & Wall Build-Up',
          aspectRatio: '2480 / 3508',
          ratioVal: 0.707,
          fitMode: 'hero-fit-height',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_19.png',
          alt: 'Zwembad Found - Facade Panel Attachment Detail',
          aspectRatio: '2481 / 2415',
          ratioVal: 1.027,
          fitMode: 'hero-fit-height',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_20.png',
          alt: 'Zwembad Found - Technical Plan & Water Filtration Layout 01',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_21.png',
          alt: 'Zwembad Found - Technical Plan & Water Filtration Layout 02',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_22.png',
          alt: 'Zwembad Found - Technical Plan & Water Filtration Layout 03',
          aspectRatio: '4961 / 3508',
          ratioVal: 1.414,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_23.png',
          alt: 'Zwembad Found - Structural Detail & Foundation Section',
          aspectRatio: '7301 / 4861',
          ratioVal: 1.502,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_24.png',
          alt: 'Zwembad Found - Dome Geometry & Panel Tessellation',
          aspectRatio: '4687 / 2865',
          ratioVal: 1.636,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_25.png',
          alt: 'Zwembad Found - Air Flow & Insulation Diagram',
          aspectRatio: '6981 / 4341',
          ratioVal: 1.608,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/009/arch_009_26.jpg',
          alt: 'Zwembad Found - Physical Model & Spatial Study',
          aspectRatio: '1792 / 2390',
          ratioVal: 0.75,
          fitMode: 'hero-fit-height',
          objectPosition: 'center center'
        }
      ]
    },
    {
      id: '010',
      num: '010',
      title: 'The Balance',
      location: 'Tuen Mun, Hong Kong',
      design: 'Vivian Park',
      year: '2026',
      status: 'public',
      program: 'public',
      area: '',
      intro: 'This is an AI project. Taking inspiration from the barre, a structure to assist balance, every hallway, stairwell and outer facade invites users to support their next movement impulse.\nTools used: Comfy UI, Nano Banana, Qwen VL, Chat GPT',
      body: 'As metropolitan cities become denser, small-income families move further away from the core hub, where most recreational facilities are situated. Tuen Mun is a district, among many of those in Hong Kong, lacking recreational facilities. This performing arts building, overarching the streets and greenery manifests a healthier and balanced society for under funded suburban districts.\n\nThis performing arts building takes inspiration from the wooden ballet barre, a structure to help balance in dance. The linear facade forms lines of a barre, while the descending stairs and elevator shaft imitates the lines of the legs in the Cambré derrière, a position often held with a barre. These implied lines of the Cambré derrière mark the entrance that leads to the core atrium connecting two flank sides of the building, each featuring auditoriums and studios. The interior space follows the building’s directionality featuring barres running throughout the hallways and its interior.',
      heroImg: 'architectureprojectpage_images/010/arch_010_01.png',
      primaryImg: 'architectureprojectpage_images/010/arch_010_06.png',
      images: [
        {
          src: 'architectureprojectpage_images/010/arch_010_01.png',
          alt: 'The Balance - Performing Arts Building Linear Facade (Cover)',
          aspectRatio: '2880 / 1472',
          ratioVal: 1.957,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/010/arch_010_02.png',
          alt: 'The Balance - Cambré Derrière Stairwell & Urban Elevation',
          aspectRatio: '2880 / 1472',
          ratioVal: 1.957,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/010/arch_010_03.png',
          alt: 'The Balance - Interior Hallway & Movement Ballet Barre',
          aspectRatio: '1664 / 2582',
          ratioVal: 0.644,
          fitMode: 'hero-fit-height',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/010/arch_010_04.png',
          alt: 'The Balance - Core Atrium & Structural Flow',
          aspectRatio: '1636 / 1170',
          ratioVal: 1.398,
          fitMode: 'hero-fit-wallpaper',
          objectPosition: 'center center'
        },
        {
          src: 'architectureprojectpage_images/010/arch_010_05.png',
          alt: 'The Balance - Auditorium Studio & Movement Space',
          aspectRatio: '1528 / 1909',
          ratioVal: 0.8,
          fitMode: 'hero-fit-height',
          objectPosition: 'center center'
        }
      ],
      bottomImages: [
        {
          src: 'architectureprojectpage_images/010/arch_010_06.png',
          alt: 'The Balance - Architectural Concept, Plan & Movement Diagram',
          aspectRatio: '1920 / 1023',
          ratioVal: 1.877,
          fitMode: 'hero-fit-wallpaper'
        }
      ]
    }
  ];

  let currentProjectIndex = 0;

  // Load any of the 10 architecture projects into the project page view
  function loadArchProject(indexOrId) {
    let project = null;
    if (typeof indexOrId === 'number') {
      currentProjectIndex = (indexOrId >= 0 && indexOrId < ARCH_PROJECTS.length) ? indexOrId : 0;
      project = ARCH_PROJECTS[currentProjectIndex];
    } else if (typeof indexOrId === 'string') {
      const clean = indexOrId.replace(/^0+/, '');
      const idx = ARCH_PROJECTS.findIndex(p => p.num === indexOrId || p.id === indexOrId || p.num.replace(/^0+/, '') === clean);
      currentProjectIndex = idx !== -1 ? idx : 0;
      project = ARCH_PROJECTS[currentProjectIndex];
    } else {
      currentProjectIndex = 0;
      project = ARCH_PROJECTS[0];
    }

    if (!project) return;

    const numEl = document.getElementById('arch-proj-num');
    const titleEl = document.getElementById('arch-proj-title');
    const heroImgEl = document.getElementById('arch-proj-hero-img');
    const primaryImgEl = document.getElementById('arch-proj-primary-img');
    const introParaEl = document.getElementById('arch-proj-intro-para');
    const bodyParaEl = document.getElementById('arch-proj-body-para');
    const specLocEl = document.getElementById('arch-spec-location');
    const specDesignEl = document.getElementById('arch-spec-design');
    const specYearEl = document.getElementById('arch-spec-year');
    const specStatusEl = document.getElementById('arch-spec-status');
    const counterEl = document.getElementById('arch-proj-img-counter');

    if (numEl) numEl.textContent = project.num;
    if (titleEl) titleEl.textContent = project.title;
    if (heroImgEl) heroImgEl.src = project.heroImg || 'assets/placeholder-grey.png';
    if (primaryImgEl) primaryImgEl.src = project.primaryImg || 'assets/placeholder-grey.png';
    if (introParaEl) introParaEl.textContent = project.intro;
    if (bodyParaEl) bodyParaEl.textContent = project.body;
    if (specLocEl) {
      specLocEl.textContent = project.location || '';
      const row = specLocEl.closest('.arch-spec-row');
      if (row) row.style.display = project.location ? '' : 'none';
    }
    if (specDesignEl) {
      specDesignEl.textContent = project.design || '';
      const row = specDesignEl.closest('.arch-spec-row');
      if (row) row.style.display = project.design ? '' : 'none';
    }
    if (specYearEl) {
      specYearEl.textContent = project.year || '';
      const row = specYearEl.closest('.arch-spec-row');
      if (row) row.style.display = project.year ? '' : 'none';
    }
    if (specStatusEl) {
      const prog = project.program || project.status || '';
      specStatusEl.textContent = prog;
      const row = specStatusEl.closest('.arch-spec-row');
      if (row) row.style.display = prog ? '' : 'none';
    }

    const rightColEl = document.getElementById('arch-proj-col-right');
    if (rightColEl) {
      if (project.extraInfo) {
        rightColEl.innerHTML = project.extraInfo;
        rightColEl.removeAttribute('aria-hidden');
      } else {
        rightColEl.innerHTML = '';
        rightColEl.setAttribute('aria-hidden', 'true');
      }
    }

    renderProjectSlideshow(project);
  }

  let updateArchSlide = null;
  let heroAutoplayTimer = null;
  let heroFadeTimer = null;
  let archLightboxImages = [];
  let archLightboxIndex = 0;
  let isArchLightboxOpen = false;
  let onArchLightboxSync = null;

  function updateArchLightboxImage() {
    const lightboxImg = document.getElementById('arch-lightbox-img');
    if (!lightboxImg || !archLightboxImages.length) return;
    const cur = archLightboxImages[archLightboxIndex];
    if (!cur) return;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = cur.src;
      lightboxImg.alt = cur.alt || 'Project View';
      lightboxImg.style.opacity = '1';
    }, 80);
  }

  function openArchLightbox(images, startIndex, syncCallback) {
    const lightbox = document.getElementById('arch-lightbox');
    const lightboxImg = document.getElementById('arch-lightbox-img');
    if (!lightbox || !lightboxImg || !images || !images.length) return;

    archLightboxImages = images;
    archLightboxIndex = ((startIndex || 0) % images.length + images.length) % images.length;
    onArchLightboxSync = typeof syncCallback === 'function' ? syncCallback : null;
    isArchLightboxOpen = true;

    const cur = archLightboxImages[archLightboxIndex];
    lightboxImg.src = cur.src;
    lightboxImg.alt = cur.alt || 'Project View';
    lightboxImg.style.opacity = '1';

    lightbox.classList.remove('is-closed');
    lightbox.setAttribute('aria-hidden', 'false');
    playDebossClickSound();
  }

  function closeArchLightbox() {
    const lightbox = document.getElementById('arch-lightbox');
    if (!lightbox || !isArchLightboxOpen) return;
    isArchLightboxOpen = false;
    lightbox.classList.add('is-closed');
    lightbox.setAttribute('aria-hidden', 'true');
    playDebossClickSound();
  }

  function stepArchLightbox(delta) {
    if (!isArchLightboxOpen || !archLightboxImages.length) return;
    const total = archLightboxImages.length;
    archLightboxIndex = (archLightboxIndex + delta + total) % total;
    updateArchLightboxImage();
    if (onArchLightboxSync) {
      onArchLightboxSync(archLightboxIndex);
    }
    playDebossClickSound();
  }

  function stopHeroAutoplay() {
    if (heroAutoplayTimer) {
      clearTimeout(heroAutoplayTimer);
      heroAutoplayTimer = null;
    }
  }

  function clearHeroFadeTimer() {
    if (heroFadeTimer) {
      clearTimeout(heroFadeTimer);
      heroFadeTimer = null;
    }
  }

  // Helper to determine hero image framing mode
  function getHeroFitMode(imgObj) {
    if (!imgObj) return 'hero-fit-wallpaper';
    if (imgObj.fitMode) return imgObj.fitMode;
    const ratio = imgObj.ratioVal || (imgObj.aspectRatio ? (parseFloat(imgObj.aspectRatio.split('/')[0]) / parseFloat(imgObj.aspectRatio.split('/')[1])) : 1.5);
    if (ratio >= 1.25 && ratio <= 1.88) {
      return 'hero-fit-wallpaper';
    } else if (ratio < 1.15) {
      return 'hero-fit-height';
    } else {
      return 'hero-fit-width';
    }
  }

  // Dynamically setup and control project gallery & large full-page hero image
  function renderProjectSlideshow(project) {
    stopHeroAutoplay();
    clearHeroFadeTimer();
    if (isArchLightboxOpen) closeArchLightbox();

    const filmstrip = document.getElementById('arch-proj-filmstrip');
    const primaryImg = document.getElementById('arch-proj-primary-img');
    const frame = document.getElementById('arch-proj-primary-img-frame');
    const heroFrame = document.getElementById('arch-proj-hero');
    const heroImg = document.getElementById('arch-proj-hero-img');
    const counterEl = document.getElementById('arch-proj-img-counter');

    const heroImages = (project && project.images && project.images.length > 0)
      ? project.images
      : [
          {
            src: (project && (project.heroImg || project.primaryImg)) || 'assets/placeholder-grey.png',
            alt: (project && project.title) || 'Project Hero View',
            aspectRatio: '16 / 9',
            ratioVal: 1.77,
            fitMode: 'hero-fit-wallpaper'
          }
        ];

    const bottomImages = (project && project.bottomImages && project.bottomImages.length > 0)
      ? project.bottomImages
      : heroImages;

    let heroSlideIndex = 0;
    let bottomSlideIndex = 0;
    let isAutoplayStopped = false;
    let isHoveringFilmstrip = false;
    let heroTransitionToken = 0;
    const totalHeroSlides = heroImages.length;
    const totalBottomSlides = bottomImages.length;

    if (counterEl) {
      counterEl.textContent = `1/${totalBottomSlides}`;
    }

    // Ensure hero frame has black background and correct fit mode
    if (heroFrame) {
      heroFrame.style.backgroundColor = '#000000';
      heroFrame.classList.remove('hero-fit-wallpaper', 'hero-fit-height', 'hero-fit-width');
      heroFrame.classList.add(getHeroFitMode(heroImages[0]));
    }
    if (heroImg && heroImages[0]) {
      heroImg.src = heroImages[0].src;
      heroImg.alt = heroImages[0].alt || (project && project.title) || 'Project Hero View';
      heroImg.style.objectPosition = heroImages[0].objectPosition || '';
      heroImg.style.transform = heroImages[0].transform || '';
      if (heroImages[0].transform) heroImg.style.transformOrigin = heroImages[0].transformOrigin || 'center top';
      heroImg.style.opacity = '1';
    }
    if (primaryImg && bottomImages[0]) {
      primaryImg.src = bottomImages[0].src;
      primaryImg.alt = bottomImages[0].alt || (project && project.title) || 'Project View';
      primaryImg.style.opacity = '1';
      primaryImg.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openArchLightbox(bottomImages, bottomSlideIndex, (newIdx) => {
          setBottomSlide(newIdx, { silent: true });
        });
      };
    }

    // Update filmstrip thumbnails active highlight (and optionally center scroll on click/auto)
    function updateFilmstripHighlight(shouldScroll) {
      if (!filmstrip) return;
      const thumbEls = filmstrip.querySelectorAll('.arch-film-thumb');
      thumbEls.forEach((t, i) => {
        if (i === heroSlideIndex) {
          t.classList.add('is-active');
          if (shouldScroll) {
            const tLeft = t.offsetLeft;
            const tWidth = t.offsetWidth;
            const fWidth = filmstrip.clientWidth;
            const targetScroll = tLeft - (fWidth / 2) + (tWidth / 2);
            filmstrip.scrollTo({ left: targetScroll, behavior: 'smooth' });
          }
        } else {
          t.classList.remove('is-active');
        }
      });
    }

    // Function to set ONLY the Large Full Page Hero Image (hover preview, click lock, or auto-slideshow)
    function setHeroSlide(idx, opts = {}) {
      if (!heroImages || heroImages.length === 0) return;
      const isUserClick = typeof opts === 'boolean' ? opts : Boolean(opts.isUserClick);
      const isHover = typeof opts === 'object' && Boolean(opts.isHover);
      const targetIdx = (idx + totalHeroSlides) % totalHeroSlides;

      if (isUserClick) {
        // Clicking an image stops the automatic slideshow and fixes control to hover/click
        isAutoplayStopped = true;
        stopHeroAutoplay();
        playDebossClickSound();
      }

      const alreadyShowingTarget = (targetIdx === heroSlideIndex) && heroImg && heroImg.getAttribute('src') === heroImages[targetIdx].src;
      heroSlideIndex = targetIdx;
      updateFilmstripHighlight(!isHover);

      if (alreadyShowingTarget && (isUserClick || isHover)) {
        return;
      }

      const cur = heroImages[heroSlideIndex];

      // Slow smooth fade transition for full page hero image
      clearHeroFadeTimer();
      const myToken = ++heroTransitionToken;

      if (heroImg) {
        heroImg.style.opacity = '0';
        heroFadeTimer = setTimeout(() => {
          heroFadeTimer = null;
          if (myToken !== heroTransitionToken) return;

          const applyAndReveal = () => {
            if (myToken !== heroTransitionToken) return;
            if (heroFrame) {
              heroFrame.classList.remove('hero-fit-wallpaper', 'hero-fit-height', 'hero-fit-width');
              heroFrame.classList.add(getHeroFitMode(cur));
            }
            if (cur.objectPosition) {
              heroImg.style.objectPosition = cur.objectPosition;
            } else {
              heroImg.style.objectPosition = '';
            }
            if (cur.transform) {
              heroImg.style.transform = cur.transform;
              heroImg.style.transformOrigin = cur.transformOrigin || 'center top';
            } else {
              heroImg.style.transform = '';
              heroImg.style.transformOrigin = '';
            }
            requestAnimationFrame(() => {
              if (myToken === heroTransitionToken) {
                heroImg.style.opacity = '1';
              }
            });
          };

          heroImg.src = cur.src;
          heroImg.alt = cur.alt || (project && project.title) || 'Project Hero View';

          if (heroImg.complete && heroImg.naturalWidth > 0) {
            applyAndReveal();
          } else if (typeof heroImg.decode === 'function') {
            heroImg.decode().then(applyAndReveal).catch(applyAndReveal);
          } else {
            applyAndReveal();
          }
        }, 380);
      }

      // Continue auto slide only if user hasn't clicked to fix an image and isn't hovering strip
      if (!isAutoplayStopped && !isHoveringFilmstrip) {
        scheduleNextHeroSlide();
      }
    }

    // Schedule next auto slide (cycles very slowly, staying for around 7 seconds)
    function scheduleNextHeroSlide() {
      stopHeroAutoplay();
      if (isAutoplayStopped || isHoveringFilmstrip || totalHeroSlides <= 1) return;
      heroAutoplayTimer = setTimeout(() => {
        if (!isAutoplayStopped && !isHoveringFilmstrip) {
          setHeroSlide(heroSlideIndex + 1, { isUserClick: false, isHover: false });
        }
      }, 7000);
    }

    // Function to set ONLY the image at the end of the page (triggered by arrow buttons)
    function setBottomSlide(idx, opts) {
      if (!bottomImages || bottomImages.length === 0) return;
      bottomSlideIndex = (idx + totalBottomSlides) % totalBottomSlides;
      const cur = bottomImages[bottomSlideIndex];

      if (counterEl) {
        counterEl.textContent = `${bottomSlideIndex + 1}/${totalBottomSlides}`;
      }

      // Switch bottom primary image
      if (primaryImg) {
        primaryImg.style.opacity = '0';
        setTimeout(() => {
          primaryImg.src = cur.src;
          primaryImg.alt = cur.alt || (project && project.title) || 'Project View';
          primaryImg.style.opacity = '1';
        }, 90);
      }

      if (!opts || !opts.silent) {
        playDebossClickSound();
      }
    }

    // Render filmstrip thumbnails dynamically with exact aspect ratio
    if (filmstrip) {
      filmstrip.innerHTML = '';

      filmstrip.onmouseenter = () => {
        isHoveringFilmstrip = true;
        stopHeroAutoplay();
      };
      filmstrip.onmouseleave = () => {
        isHoveringFilmstrip = false;
        if (!isAutoplayStopped) {
          scheduleNextHeroSlide();
        }
      };

      heroImages.forEach((imgObj, idx) => {
        const thumb = document.createElement('div');
        thumb.className = `arch-film-thumb ${idx === 0 ? 'is-active' : ''}`;
        thumb.setAttribute('data-slide', idx);
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('tabindex', '0');
        thumb.setAttribute('aria-label', `View image ${idx + 1} of ${totalHeroSlides} in hero backdrop`);
        if (imgObj.aspectRatio) {
          thumb.style.aspectRatio = imgObj.aspectRatio;
        }

        const thumbImg = document.createElement('img');
        thumbImg.src = imgObj.src;
        thumbImg.alt = imgObj.alt || `Thumbnail ${idx + 1}`;
        thumb.appendChild(thumbImg);

        // Hover switches hero image smoothly with the slow transition
        thumb.addEventListener('mouseenter', () => {
          isHoveringFilmstrip = true;
          stopHeroAutoplay();
          setHeroSlide(idx, { isUserClick: false, isHover: true });
        });

        // Click fixes the image and stops the automatic slideshow
        thumb.addEventListener('click', () => {
          setHeroSlide(idx, { isUserClick: true, isHover: false });
        });

        // Keyboard activation matches click behavior
        thumb.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setHeroSlide(idx, { isUserClick: true, isHover: false });
          }
        });

        filmstrip.appendChild(thumb);
      });
    }

    updateArchSlide = function(deltaOrIndex) {
      const prevBtn = document.getElementById('arch-arrow-prev');
      const prevTop = prevBtn ? prevBtn.getBoundingClientRect().top : null;

      if (deltaOrIndex === 1 || deltaOrIndex === -1) {
        setBottomSlide(bottomSlideIndex + deltaOrIndex);
      } else if (typeof deltaOrIndex === 'number') {
        setBottomSlide(deltaOrIndex);
      }

      // Keep scroll position stable when images of differing heights swap
      if (prevBtn && prevTop !== null) {
        requestAnimationFrame(() => {
          const newTop = prevBtn.getBoundingClientRect().top;
          const diff = newTop - prevTop;
          if (Math.abs(diff) > 2) {
            window.scrollBy(0, diff);
          }
        });
      }
    };

    // Start auto-cycling the full-page hero images through the filmstrip row
    scheduleNextHeroSlide();
  }

  /* ==========================================================================
     MOVEMENT PROJECTS REPOSITORY & SLIDESHOW ENGINE
     ========================================================================== */
  const MOVEMENT_PROJECTS = [
    {
      id: 'heights-of-a-house',
      title: 'Heights of a House',
      year: '',
      intro: `The workshop encompasses of three sections, the basement, the ground floor and the roof/attic.
A batch of 5 groups of around 15 grade 1 students, children are given the task to reinact which activities take place per floor of a house. Movements are collected by sketching after each workshop.`,
      body: '',
      extraInfo: `<p class="arch-proj-extra-para">Contrary to the adult perspective of each floor of a house, no floor had a height restriction. No floor had activity restrictions. Color was prevalent, boundaries and fences were not referenced, collaborative activites were mentioned.</p>\n<p class="arch-proj-extra-para">To that, this drawing echos the ideals of a house that the children imagine. It communicates a house that defies building physics, a spatial arrangement with holes, slopes and jagged geometry. It also attempts to portray a potential shared home experience.</p>`,
      heroImg: 'movementprojectpage_images/heights_of_a_house/hero.png',
      primaryImg: 'movementprojectpage_images/heights_of_a_house/heights_of_a_house_01.png',
      heroImage: {
        src: 'movementprojectpage_images/heights_of_a_house/hero.png',
        alt: 'Heights of a House - Hero View',
        aspectRatio: '16 / 10',
        ratioVal: 1.6,
        fitMode: 'hero-fit-wallpaper'
      },
      bottomImages: [
        {
          src: 'movementprojectpage_images/heights_of_a_house/heights_of_a_house_01.png',
          alt: 'Heights of a House - Full Drawing',
          aspectRatio: '3508 / 4961',
          ratioVal: 0.707,
          fitMode: 'hero-fit-height'
        }
      ]
    },
    {
      id: 'human-systems',
      title: 'Human Systems',
      year: '',
      intro: `How can movement be a precedent to building systems?\nAre there areas of concentration? Is directionality present? Can strings or connections be identified?`,
      body: `* this is not an attempt to recreate conventional movement positions, The use of positions are purely experimental.\n\nwork in progress`,
      heroImg: 'movementprojectpage_images/human_systems/cover.png',
      primaryImg: 'movementprojectpage_images/human_systems/human_systems_01.png',
      heroImage: {
        src: 'movementprojectpage_images/human_systems/cover.png',
        alt: 'Human Systems - Hero View',
        aspectRatio: '16 / 9',
        ratioVal: 1.77,
        fitMode: 'hero-fit-wallpaper',
        objectPosition: 'center 20%'
      },
      heroVideo: {
        src: 'movementprojectpage_images/human_systems/3d batch 1.mp4',
        movSrc: 'movementprojectpage_images/human_systems/3d batch 1.mov',
        poster: 'movementprojectpage_images/human_systems/cover.png',
        fitMode: 'hero-fit-wallpaper'
      },
      bottomImages: [
        {
          src: 'movementprojectpage_images/human_systems/human_systems_01.png',
          alt: 'Human Systems - 01',
          aspectRatio: '1 / 1',
          ratioVal: 1.0,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'movementprojectpage_images/human_systems/human_systems_02.png',
          alt: 'Human Systems - 02',
          aspectRatio: '1 / 1',
          ratioVal: 1.0,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'movementprojectpage_images/human_systems/human_systems_03.png',
          alt: 'Human Systems - 03',
          aspectRatio: '1 / 1',
          ratioVal: 1.0,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'movementprojectpage_images/human_systems/human_systems_04.png',
          alt: 'Human Systems - 04',
          aspectRatio: '1 / 1',
          ratioVal: 1.0,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'movementprojectpage_images/human_systems/human_systems_05.png',
          alt: 'Human Systems - 05',
          aspectRatio: '1 / 1',
          ratioVal: 1.0,
          fitMode: 'hero-fit-wallpaper'
        },
        {
          src: 'movementprojectpage_images/human_systems/human_systems_06.png',
          alt: 'Human Systems - 06',
          aspectRatio: '1 / 1',
          ratioVal: 1.0,
          fitMode: 'hero-fit-wallpaper'
        }
      ]
    }
  ];

  let currentMoveProjectIndex = 0;
  let updateMoveSlide = null;

  function loadMovementProject(titleOrId) {
    let project = null;
    if (typeof titleOrId === 'number') {
      currentMoveProjectIndex = (titleOrId >= 0 && titleOrId < MOVEMENT_PROJECTS.length) ? titleOrId : 0;
      project = MOVEMENT_PROJECTS[currentMoveProjectIndex];
    } else if (typeof titleOrId === 'string') {
      const clean = titleOrId.toLowerCase().replace(/[^a-z0-9]/g, '');
      const idx = MOVEMENT_PROJECTS.findIndex(p =>
        p.id === titleOrId ||
        p.title.toLowerCase() === titleOrId.toLowerCase() ||
        p.title.toLowerCase().replace(/[^a-z0-9]/g, '') === clean ||
        p.id.replace(/[^a-z0-9]/g, '') === clean
      );
      currentMoveProjectIndex = idx !== -1 ? idx : 0;
      project = MOVEMENT_PROJECTS[currentMoveProjectIndex];
    } else {
      currentMoveProjectIndex = 0;
      project = MOVEMENT_PROJECTS[0];
    }

    if (!project) return;

    const titleEl = document.getElementById('move-proj-title');
    const heroImgEl = document.getElementById('move-proj-hero-img');
    const heroFrameEl = document.getElementById('move-proj-hero');
    const introParaEl = document.getElementById('move-proj-intro-para');
    const bodyParaEl = document.getElementById('move-proj-body-para');
    const specYearEl = document.getElementById('move-spec-year');
    const specYearRow = document.getElementById('move-spec-row-year');

    if (titleEl) titleEl.textContent = project.title;

    const hero = project.heroImage || (project.images && project.images[0]) || { src: project.heroImg || 'assets/placeholder-grey.png' };
    if (heroImgEl) {
      heroImgEl.src = hero.src;
      heroImgEl.alt = hero.alt || project.title;
      heroImgEl.style.objectPosition = hero.objectPosition || '';
      heroImgEl.style.transform = hero.transform || '';
      if (hero.transform) heroImgEl.style.transformOrigin = hero.transformOrigin || 'center center';
    }
    if (heroFrameEl) {
      heroFrameEl.classList.remove('hero-fit-wallpaper', 'hero-fit-height', 'hero-fit-width');
      heroFrameEl.classList.add(getHeroFitMode(hero));
    }

    const heroVideoEl = document.getElementById('move-proj-hero-video');
    if (project.heroVideo && heroVideoEl) {
      const vid = project.heroVideo;
      heroVideoEl.innerHTML = `
        <source src="${vid.src}" type="video/mp4" />
        ${vid.movSrc ? `<source src="${vid.movSrc}" type="video/quicktime" />` : ''}
      `;
      heroVideoEl.poster = vid.poster || hero.src || '';
      heroVideoEl.style.display = 'block';
      heroVideoEl.classList.remove('is-hidden');
      heroVideoEl.currentTime = 0;
      const playPromise = heroVideoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      if (heroImgEl) {
        heroImgEl.style.opacity = '0';
      }
    } else if (heroVideoEl) {
      heroVideoEl.pause();
      heroVideoEl.innerHTML = '';
      heroVideoEl.removeAttribute('src');
      heroVideoEl.style.display = 'none';
      heroVideoEl.classList.add('is-hidden');
      if (heroImgEl) {
        heroImgEl.style.opacity = '1';
      }
    }

    if (introParaEl) introParaEl.textContent = project.intro || '';
    if (bodyParaEl) bodyParaEl.textContent = project.body || '';

    if (specYearEl) specYearEl.textContent = project.year || '';
    if (specYearRow) specYearRow.style.display = project.year ? '' : 'none';

    const rightColEl = document.getElementById('move-proj-col-right');
    if (rightColEl) {
      if (project.extraInfo) {
        rightColEl.innerHTML = project.extraInfo;
        rightColEl.removeAttribute('aria-hidden');
      } else {
        rightColEl.innerHTML = '';
        rightColEl.setAttribute('aria-hidden', 'true');
      }
    }

    renderMovementProjectSlideshow(project);
  }

  function renderMovementProjectSlideshow(project) {
    if (isArchLightboxOpen) closeArchLightbox();

    const primaryImg = document.getElementById('move-proj-primary-img');
    const counterEl = document.getElementById('move-proj-img-counter');
    const controlsEl = document.getElementById('move-proj-img-controls');
    const prevBtn = document.getElementById('move-arrow-prev');

    const bottomImages = (project && project.bottomImages && project.bottomImages.length > 0)
      ? project.bottomImages
      : (project && project.images ? project.images : [{ src: project.primaryImg || 'assets/placeholder-grey.png', alt: project.title }]);

    let bottomSlideIndex = 0;
    const totalBottomSlides = bottomImages.length;

    if (counterEl) {
      counterEl.textContent = `1/${totalBottomSlides}`;
    }

    if (controlsEl) {
      controlsEl.style.display = totalBottomSlides > 1 ? '' : 'none';
    }

    if (primaryImg && bottomImages[0]) {
      primaryImg.src = bottomImages[0].src;
      primaryImg.alt = bottomImages[0].alt || (project && project.title) || 'Project View';
      primaryImg.style.opacity = '1';
      primaryImg.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openArchLightbox(bottomImages, bottomSlideIndex, (newIdx) => {
          setBottomSlide(newIdx, { silent: true });
        });
      };
    }

    function setBottomSlide(idx, opts) {
      if (!bottomImages || bottomImages.length === 0) return;
      bottomSlideIndex = (idx + totalBottomSlides) % totalBottomSlides;
      const cur = bottomImages[bottomSlideIndex];

      if (counterEl) {
        counterEl.textContent = `${bottomSlideIndex + 1}/${totalBottomSlides}`;
      }

      if (primaryImg) {
        primaryImg.style.opacity = '0';
        setTimeout(() => {
          primaryImg.src = cur.src;
          primaryImg.alt = cur.alt || (project && project.title) || 'Project View';
          primaryImg.style.opacity = '1';
        }, 90);
      }

      if (!opts || !opts.silent) {
        playDebossClickSound();
      }
    }

    updateMoveSlide = function(deltaOrIndex) {
      if (totalBottomSlides <= 1) return;
      const prevTop = prevBtn ? prevBtn.getBoundingClientRect().top : null;

      if (deltaOrIndex === 1 || deltaOrIndex === -1) {
        setBottomSlide(bottomSlideIndex + deltaOrIndex);
      } else if (typeof deltaOrIndex === 'number') {
        setBottomSlide(deltaOrIndex);
      }

      if (prevBtn && prevTop !== null) {
        requestAnimationFrame(() => {
          const newTop = prevBtn.getBoundingClientRect().top;
          const diff = newTop - prevTop;
          if (Math.abs(diff) > 2) {
            window.scrollBy(0, diff);
          }
        });
      }
    };
  }

  /* ==========================================================================
     1. PROCEDURAL SNOW & PLASTER MICRO-TEXTURE NOISE
     ========================================================================== */
  function initNoiseCanvas() {
    if (!noiseCanvas) return;
    const ctx = noiseCanvas.getContext('2d');
    let width = (noiseCanvas.width = window.innerWidth);
    let height = (noiseCanvas.height = window.innerHeight);

    function generateNoise() {
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;
      const len = data.length;

      // Fine crystalline noise matching assets/LOGO.png std dev (~6.5 on 249 base)
      for (let i = 0; i < len; i += 4) {
        // High-frequency subtle variance
        const grain = (Math.random() - 0.5) * 28;
        const val = Math.min(255, Math.max(0, 248 + grain));
        data[i] = val;     // R
        data[i + 1] = val; // G
        data[i + 2] = val; // B
        data[i + 3] = 40;  // Subtle alpha
      }
      ctx.putImageData(imgData, 0, 0);
    }

    generateNoise();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = noiseCanvas.width = window.innerWidth;
        height = noiseCanvas.height = window.innerHeight;
        generateNoise();
      }, 250);
    });
  }

  /* ==========================================================================
     2. PROCEDURAL WEB AUDIO API (Tactile Stone & Vault Sound Synthesis)
     ========================================================================== */
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Vault Door Push Inward Sound (Muted per user request)
  function playVaultPushSound() {
    // Intentionally silenced
  }

  // Vault Handle Wheel Rotation Sound (Muted per user request)
  function playVaultSpinSound() {
    // Intentionally silenced
  }

  // ASMR Soft Snow Packing Crunch Sound Generator (Slow, tactile, micro-crystalline compaction)
  function playDebossClickSound() {
    if (!state.audioEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.58; // ~580ms extended, slow, rich crystalline snow packing

    // 1. Procedural Snow Crystal Noise Buffer with Granular Micro-Compressions
    const sampleRate = ctx.sampleRate || 44100;
    const frameCount = Math.floor(sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, frameCount, sampleRate);
    const channelData = noiseBuffer.getChannelData(0);

    // Micro-compaction density curve: 5 cascading micro-clusters of crystalline fractures
    const jitter = (Math.random() - 0.5) * 0.04;
    const p1 = 0.10 + jitter;
    const p2 = 0.26 + jitter;
    const p3 = 0.44 + jitter;
    const p4 = 0.64 + jitter;
    const p5 = 0.80 + jitter;

    let smoothedVal = 0;
    for (let i = 0; i < frameCount; i++) {
      const t = i / frameCount;
      const white = (Math.random() * 2 - 1);
      
      // Soft one-pole smoothing for velvety, powder-snow ASMR intimacy (removes harsh sizzle)
      smoothedVal = (smoothedVal * 0.40) + (white * 0.60);

      // Micro-texture envelope simulating continuous slow snow compaction under gradual pressure
      const c1 = Math.exp(-Math.pow((t - p1) / 0.08, 2)) * 0.85;
      const c2 = Math.exp(-Math.pow((t - p2) / 0.10, 2)) * 1.00;
      const c3 = Math.exp(-Math.pow((t - p3) / 0.12, 2)) * 0.88;
      const c4 = Math.exp(-Math.pow((t - p4) / 0.13, 2)) * 0.65;
      const c5 = Math.exp(-Math.pow((t - p5) / 0.14, 2)) * 0.38;
      const env = (c1 + c2 + c3 + c4 + c5) * Math.pow(1 - t, 0.60);

      channelData[i] = smoothedVal * env;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // 2. High-Frequency Crystal Crunch Layer (Gentle bandpass sweeping down as snow packs dense)
    const crunchFilter = ctx.createBiquadFilter();
    crunchFilter.type = 'bandpass';
    const baseFreq = 2150 + (Math.random() * 260 - 130);
    crunchFilter.frequency.setValueAtTime(baseFreq, now);
    crunchFilter.frequency.exponentialRampToValueAtTime(750, now + duration);
    crunchFilter.Q.setValueAtTime(1.5, now);

    const crunchGain = ctx.createGain();
    crunchGain.gain.setValueAtTime(0.24, now);
    crunchGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // 3. Low-Frequency Density Cushion Layer (Muffled snowpack body)
    const packFilter = ctx.createBiquadFilter();
    packFilter.type = 'lowpass';
    packFilter.frequency.setValueAtTime(520, now);
    packFilter.frequency.exponentialRampToValueAtTime(130, now + duration);

    const packGain = ctx.createGain();
    packGain.gain.setValueAtTime(0.28, now);
    packGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // 4. Sub-compaction tactile thumb thud (Gentle sine sweep for physical sensation of packing mass)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(82, now);
    subOsc.frequency.exponentialRampToValueAtTime(34, now + 0.22);

    subGain.gain.setValueAtTime(0.12, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    // Master bus for click to prevent clipping and give smooth ASMR presence
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.92, now);

    // Connect noise chains
    noiseSource.connect(crunchFilter);
    crunchFilter.connect(crunchGain);
    crunchGain.connect(masterGain);

    noiseSource.connect(packFilter);
    packFilter.connect(packGain);
    packGain.connect(masterGain);

    // Connect sub thud
    subOsc.connect(subGain);
    subGain.connect(masterGain);

    masterGain.connect(ctx.destination);

    // Trigger all layers
    noiseSource.start(now);
    noiseSource.stop(now + duration + 0.02);
    subOsc.start(now);
    subOsc.stop(now + 0.24);
  }

  // Tactile Material Friction Sound (Micro acoustic grain when dragging)
  let frictionOsc = null;
  let frictionGain = null;

  function playMaterialFriction(freq = 600, intensity = 0.06) {
    if (!state.audioEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 80, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, now);
    filter.Q.setValueAtTime(6, now);

    gain.gain.setValueAtTime(intensity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  /* ==========================================================================
     3. ENTRANCE LANDING PAGE: INWARD BEVEL PUSH & TRANSITION
     "To start off, I want the first website landing page to be the image provided
      (the V0AULT logo). Maintain the crisp quality and snow like texture. 
      This will be centered big, taking up 1/3 of the screen. Then once the mouse 
      clicks anywhere near the logo, the logo should have an animated effect of 
      bevelling inwards as though it has been pushed. Then the next landing page 
      should open, the logo fading out."
     ========================================================================== */
  function initEntranceInteraction() {
    if (!landingView || !entranceTriggerZone) return;

    // Handle the Click Event ("clicks anywhere near the logo")
    function handleEntranceClick(e) {
      if (state.isVaultUnlocked || state.isPushing) return;
      executeInwardBevelPush();
    }

    entranceTriggerZone.addEventListener('click', handleEntranceClick);
    landingView.addEventListener('click', handleEntranceClick);
  }

  // The Core Push & Bevel Animation Sequence:
  // Standalone brand logo fluidly, softly, smoothly, slowly turns and shifts to Image 14 pressed logo in unison,
  // followed by a soft circle open transition to the Bio page.
  function executeInwardBevelPush() {
    if (state.isPushing || state.isVaultUnlocked) return;
    state.isPushing = true;

    // Soft ASMR snow packing crunch on initial tactile press
    playDebossClickSound();

    // 1. Stage 1: Fluid, soft, slow standalone rotation while shifting appearance to pressed icon
    entranceTriggerZone.classList.add('is-turning');

    const turnDuration = 2500;

    // 2. Stage 2: ONLY after rotation completes, trigger soft circle open transition
    setTimeout(() => {
      const circleIris = document.getElementById('circle-open-iris');
      if (circleIris) {
        circleIris.classList.add('is-expanding');
      }

      // Once the soft circle expands to fill the screen (~550ms), reveal the Bio page
      setTimeout(() => {
        mainPortfolio.classList.remove('is-hidden');
        landingView.classList.add('is-hidden');

        setTimeout(() => {
          mainPortfolio.classList.add('is-revealed');
        }, 30);

        // Softly fade out the circle iris to reveal the Bio page underneath
        if (circleIris) {
          circleIris.style.transition = 'opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
          circleIris.style.opacity = '0';
        }

        // Final cleanup
        setTimeout(() => {
          entranceTriggerZone.classList.remove('is-turning');
          state.isVaultUnlocked = true;
          state.isPushing = false;
          document.body.classList.add('vault-unlocked');

          if (circleIris) {
            circleIris.classList.remove('is-expanding');
            circleIris.style.transition = '';
            circleIris.style.opacity = '';
          }

          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 500);

      }, 550);

    }, turnDuration);
  }

  // Re-seal the Vault (Return to Entrance Landing View)
  function sealVault() {
    if (!state.isVaultUnlocked || state.isPushing) return;
    state.isPushing = true;

    playDebossClickSound();
    document.body.classList.remove('vault-unlocked');

    // Reset displacement filter values
    const feDisplace = document.getElementById('fe-displace');
    const feShadowDeepen = document.getElementById('fe-shadow-deepen');
    if (feDisplace) feDisplace.setAttribute('scale', '0');
    if (feShadowDeepen) feShadowDeepen.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0');

    // Smoothly fade out portfolio
    mainPortfolio.classList.remove('is-revealed');

    setTimeout(() => {
      mainPortfolio.classList.add('is-hidden');

      // Reset sub-page view to bio
      const bioGroup = document.getElementById('bio-body-group');
      const eduGroup = document.getElementById('edu-body-group');
      const contactGroup = document.getElementById('contact-body-group');
      const archGroup = document.getElementById('arch-body-group');
      const archProjectGroup = document.getElementById('arch-project-group');
      const moveProjectGroup = document.getElementById('move-project-group');
      const moveGroup = document.getElementById('move-body-group');
      const sketchGroup = document.getElementById('sketch-body-group');
      const captureGroup = document.getElementById('capture-body-group');
      const conversationsGroup = document.getElementById('conversations-body-group');
      const memoGroup = document.getElementById('memo-body-group');
      const photoEdu = document.getElementById('photo-wrap-education');
      const photoContact = document.getElementById('photo-wrap-contact');
      const eduItem = document.getElementById('bio-item-education');
      const contactItem = document.getElementById('bio-item-contact');
      const archNav = document.getElementById('bio-nav-arch-btn');
      const moveNav = document.getElementById('bio-nav-move-btn');
      const waveNav = document.getElementById('bio-nav-wave-btn') || document.getElementById('bio-seal-wave-btn');

      if (eduGroup) {
        eduGroup.classList.remove('is-active', 'is-fading-out');
        eduGroup.classList.add('is-hidden');
        eduGroup.setAttribute('aria-hidden', 'true');
      }
      if (contactGroup) {
        contactGroup.classList.remove('is-active', 'is-fading-out');
        contactGroup.classList.add('is-hidden');
        contactGroup.setAttribute('aria-hidden', 'true');
      }
      if (archGroup) {
        archGroup.classList.remove('is-active', 'is-fading-out');
        archGroup.classList.add('is-hidden');
        archGroup.setAttribute('aria-hidden', 'true');
      }
      if (archProjectGroup) {
        archProjectGroup.classList.remove('is-active', 'is-fading-out');
        archProjectGroup.classList.add('is-hidden');
        archProjectGroup.setAttribute('aria-hidden', 'true');
      }
      if (moveProjectGroup) {
        moveProjectGroup.classList.remove('is-active', 'is-fading-out');
        moveProjectGroup.classList.add('is-hidden');
        moveProjectGroup.setAttribute('aria-hidden', 'true');
      }
      if (moveGroup) {
        moveGroup.classList.remove('is-active', 'is-fading-out');
        moveGroup.classList.add('is-hidden');
        moveGroup.setAttribute('aria-hidden', 'true');
      }
      [sketchGroup, captureGroup, conversationsGroup, memoGroup].forEach(g => {
        if (g) {
          g.classList.remove('is-active', 'is-fading-out');
          g.classList.add('is-hidden');
          g.setAttribute('aria-hidden', 'true');
        }
      });
      if (bioGroup) {
        bioGroup.classList.remove('is-fading-out', 'is-hidden');
        bioGroup.classList.add('is-active');
        bioGroup.setAttribute('aria-hidden', 'false');
      }
      if (photoEdu) {
        photoEdu.classList.remove('is-hidden-on-contact', 'is-hidden-on-arch');
      }
      if (photoContact) {
        photoContact.classList.remove('is-hidden-on-edu', 'is-hidden-on-arch');
      }
      if (eduItem) eduItem.classList.remove('is-hidden-on-arch');
      if (contactItem) contactItem.classList.remove('is-hidden-on-arch');
      if (archNav) archNav.classList.remove('is-active');
      if (moveNav) moveNav.classList.remove('is-active');
      if (waveNav) waveNav.classList.remove('is-active');

      const bioViewEl = document.getElementById('bio-view');
      if (bioViewEl) bioViewEl.classList.remove('is-project-page');

      state.subPage = 'bio';

      // Re-display landing view flush and clean
      landingView.classList.remove('is-hidden');
      landingView.style.opacity = '0';
      landingView.style.transform = 'scale(1)';

      entranceTriggerZone.classList.remove('is-turning', 'is-pushed', 'is-spinning');

      setTimeout(() => {
        landingView.style.opacity = '1';
        state.isVaultUnlocked = false;
        state.isPushing = false;
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 50);
    }, 450);
  }

  if (sealVaultBtn) sealVaultBtn.addEventListener('click', sealVault);
  if (footerSealBtn) footerSealBtn.addEventListener('click', sealVault);

  /* ==========================================================================
     4. DYNAMIC LIGHTING & INWARD BEVEL CALCULATION ENGINE
     ========================================================================== */
  function updateLighting(x, y) {
    if (state.lightMode !== 'cursor') return;

    // Calculate light vector from center of viewport to mouse
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = x - cx;
    const dy = y - cy;
    const len = Math.hypot(dx, dy) || 1;

    // Light source angle: normalize
    // Negative because shadow falls OPPOSITE to light source
    const lx = -(dx / len);
    const ly = -(dy / len);

    // Subtle smoothing
    state.lightX = lx;
    state.lightY = ly;

    document.documentElement.style.setProperty('--light-x', lx.toFixed(3));
    document.documentElement.style.setProperty('--light-y', ly.toFixed(3));

    // Update solar azimuth angle readout
    const angleRad = Math.atan2(dy, dx);
    let angleDeg = Math.round((angleRad * 180) / Math.PI + 180);
    if (solarReadout) {
      solarReadout.textContent = `DYNAMIC CURSOR LIGHT · ${angleDeg}° AZIMUTH`;
    }
  }

  // Fixed light angle presets
  function applyLightPreset(mode) {
    state.lightMode = mode;
    document.body.setAttribute('data-light-mode', mode);

    let lx = -0.707;
    let ly = -0.707;
    let label = 'DYNAMIC CURSOR LIGHT';

    switch (mode) {
      case 'zenith':
        lx = 0.0;
        ly = -1.0;
        label = 'ZENITH NOON · 90° VERTICAL APERTURE';
        break;
      case 'raking':
        lx = -0.92;
        ly = -0.38;
        label = 'RAKING LOW SUNSET · 15° GRAZING RELIEF';
        break;
      case 'studio':
        lx = -0.58;
        ly = -0.81;
        label = 'STUDIO DIFFUSE · NORTH-FACING SKYLIGHT';
        break;
      case 'cursor':
      default:
        state.lightMode = 'cursor';
        updateLighting(state.mouseX, state.mouseY);
        return;
    }

    document.documentElement.style.setProperty('--light-x', lx.toFixed(3));
    document.documentElement.style.setProperty('--light-y', ly.toFixed(3));
    if (solarReadout) solarReadout.textContent = label;
  }

  lightPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      lightPills.forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      playDebossClickSound();
      applyLightPreset(pill.getAttribute('data-light'));
    });
  });

  // Bevel Depth Slider
  if (depthSlider) {
    depthSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      state.bevelDepth = val;
      document.documentElement.style.setProperty('--depth', val.toFixed(1));
      if (depthReadout) depthReadout.textContent = `${val.toFixed(1)} MM RELIEF`;
    });
  }

  /* ==========================================================================
     5. MOUSE TRACKING & INTERACTIVE LIGHTING
     ========================================================================== */
  function initInteractionTracking() {
    window.addEventListener('mousemove', (e) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      if (state.lightMode === 'cursor') {
        updateLighting(e.clientX, e.clientY);
      }
    });

    // Tactile button click feedback
    document.addEventListener('click', (e) => {
      if (e.target.closest('.beveled-btn, .beveled-pill, .beveled-icon-btn, .beveled-action-btn')) {
        playDebossClickSound();
      }
    });
  }

  /* ==========================================================================
     6. BIO, EDUCATION, CONTACT & ARCHITECTURE ALBUM INTERACTIONS
     ========================================================================== */
  function initBioInteractions() {
    const sealLogoBtn = document.getElementById('bio-brand-logo-btn');
    const sealWaveBtn = document.getElementById('bio-seal-wave-btn');

    const bioGroup = document.getElementById('bio-body-group');
    const eduGroup = document.getElementById('edu-body-group');
    const contactGroup = document.getElementById('contact-body-group');
    const archGroup = document.getElementById('arch-body-group');
    const archProjectGroup = document.getElementById('arch-project-group');
    const moveProjectGroup = document.getElementById('move-project-group');
    const moveGroup = document.getElementById('move-body-group');
    const sketchGroup = document.getElementById('sketch-body-group');
    const captureGroup = document.getElementById('capture-body-group');
    const conversationsGroup = document.getElementById('conversations-body-group');
    const memoGroup = document.getElementById('memo-body-group');

    const waveNavBtn = document.getElementById('bio-nav-wave-btn') || document.getElementById('bio-seal-wave-btn');
    const floatingMenu = document.getElementById('floating-menu');
    const menuBtns = Array.from(document.querySelectorAll('.floating-menu-btn'));

    const eduTrigger = document.getElementById('bio-item-education');
    const contactTrigger = document.getElementById('bio-item-contact');
    const photoEdu = document.getElementById('photo-wrap-education');
    const photoContact = document.getElementById('photo-wrap-contact');

    const archNavBtn = document.getElementById('bio-nav-arch-btn');
    const moveNavBtn = document.getElementById('bio-nav-move-btn');
    const bioModal = document.getElementById('bio-modal');
    const bioModalContent = document.getElementById('bio-modal-content');
    const bioModalClose = document.getElementById('bio-modal-close');
    const bioModalOverlay = document.getElementById('bio-modal-overlay');

    let isTransitioning = false;
    let isMenuOpen = false;

    function openFloatingMenu() {
      if (isMenuOpen) return;
      isMenuOpen = true;
      playDebossClickSound();
      if (waveNavBtn) waveNavBtn.classList.add('is-active');
      if (floatingMenu) {
        floatingMenu.classList.add('is-open');
        floatingMenu.classList.remove('is-hidden', 'is-fading-out');
        floatingMenu.setAttribute('aria-hidden', 'false');
      }
      if (window.innerWidth <= 860) {
        document.body.classList.add('mobile-menu-active');
      }
    }

    function closeFloatingMenu() {
      if (!isMenuOpen) return;
      isMenuOpen = false;
      document.body.classList.remove('mobile-menu-active');
      if (waveNavBtn) waveNavBtn.classList.remove('is-active');
      if (floatingMenu) {
        floatingMenu.classList.remove('is-open');
        floatingMenu.classList.add('is-fading-out');
        setTimeout(() => {
          if (!isMenuOpen && floatingMenu) {
            floatingMenu.classList.add('is-hidden');
            floatingMenu.classList.remove('is-fading-out');
            floatingMenu.setAttribute('aria-hidden', 'true');
          }
        }, 280);
      }
    }

    function toggleFloatingMenu() {
      if (isMenuOpen) {
        closeFloatingMenu();
      } else {
        openFloatingMenu();
      }
    }

    // Sub-Page Navigation (Bio <-> Education <-> Contact <-> Architecture <-> Movement <-> Menu Pages) with Fadeout Fade-in
    function navigateToSubPage(targetPage, pushState = true) {
      if (state.subPage === targetPage || isTransitioning) return;
      isTransitioning = true;
      const prevPage = state.subPage;
      state.subPage = targetPage;
      playDebossClickSound();

      if (isMenuOpen) {
        closeFloatingMenu();
      }

      // Update floating menu buttons pressed state
      menuBtns.forEach(b => {
        if (b.getAttribute('data-menu') === targetPage) {
          b.classList.add('is-active');
        } else {
          b.classList.remove('is-active');
        }
      });

      const isArchProject = targetPage.startsWith('architecture-project');
      const wasArchProject = prevPage && prevPage.startsWith('architecture-project');
      const isMoveProject = targetPage.startsWith('movement-project');
      const wasMoveProject = prevPage && prevPage.startsWith('movement-project');

      if (!isArchProject && typeof stopHeroAutoplay === 'function') {
        stopHeroAutoplay();
      }

      if (!isMoveProject) {
        const moveVid = document.getElementById('move-proj-hero-video');
        if (moveVid) moveVid.pause();
      }

      // Current active group
      let currentGroup = bioGroup;
      if (prevPage === 'education') currentGroup = eduGroup;
      else if (prevPage === 'contact') currentGroup = contactGroup;
      else if (prevPage === 'architecture') currentGroup = archGroup;
      else if (wasArchProject) currentGroup = archProjectGroup;
      else if (prevPage === 'movement') currentGroup = moveGroup;
      else if (wasMoveProject) currentGroup = moveProjectGroup;
      else if (prevPage === 'sketch') currentGroup = sketchGroup;
      else if (prevPage === 'capture') currentGroup = captureGroup;
      else if (prevPage === 'conversations') currentGroup = conversationsGroup;
      else if (prevPage === 'memo') currentGroup = memoGroup;

      // Target active group
      let targetGroup = bioGroup;
      if (targetPage === 'education') targetGroup = eduGroup;
      else if (targetPage === 'contact') targetGroup = contactGroup;
      else if (targetPage === 'architecture') targetGroup = archGroup;
      else if (isArchProject) targetGroup = archProjectGroup;
      else if (targetPage === 'movement') targetGroup = moveGroup;
      else if (isMoveProject) targetGroup = moveProjectGroup;
      else if (targetPage === 'sketch') targetGroup = sketchGroup;
      else if (targetPage === 'capture') targetGroup = captureGroup;
      else if (targetPage === 'conversations') targetGroup = conversationsGroup;
      else if (targetPage === 'memo') targetGroup = memoGroup;

      // Update right-side interactive items visibility:
      // When on Architecture, Movement, or Menu landing pages: hide education and contact items to give stage full focus
      const isSimplePage = (targetPage === 'sketch' || targetPage === 'capture' || targetPage === 'conversations' || targetPage === 'memo');
      const isVaultPage = (targetPage === 'architecture' || isArchProject || targetPage === 'movement' || isMoveProject || isSimplePage);
      if (eduTrigger) {
        if (isVaultPage) {
          eduTrigger.classList.add('is-hidden-on-arch');
        } else {
          eduTrigger.classList.remove('is-hidden-on-arch');
        }
      }

      if (contactTrigger) {
        if (isVaultPage) {
          contactTrigger.classList.add('is-hidden-on-arch');
        } else {
          contactTrigger.classList.remove('is-hidden-on-arch');
        }
      }

      // Update individual photos visibility for bio/education/contact:
      // Bio: both photos visible
      // Education: Photo A visible, Photo B hidden
      // Contact: Photo A hidden, Photo B visible
      if (photoEdu) {
        if (targetPage === 'contact') {
          photoEdu.classList.add('is-hidden-on-contact');
        } else {
          photoEdu.classList.remove('is-hidden-on-contact');
        }
      }

      if (photoContact) {
        if (targetPage === 'education') {
          photoContact.classList.add('is-hidden-on-edu');
        } else {
          photoContact.classList.remove('is-hidden-on-edu');
        }
      }

      // Mutual header toggle:
      // When 'architecture' is active, 'architecture' is pressed, 'movement' is normal.
      // When 'movement' is active, 'movement' is pressed, 'architecture' is normal.
      // On Bio/Education/Contact/Menu pages, all appear as standard header logos.
      if (archNavBtn) {
        if (targetPage === 'architecture' || isArchProject) {
          archNavBtn.classList.add('is-active');
        } else {
          archNavBtn.classList.remove('is-active');
        }
      }

      if (moveNavBtn) {
        if (targetPage === 'movement' || isMoveProject) {
          moveNavBtn.classList.add('is-active');
        } else {
          moveNavBtn.classList.remove('is-active');
        }
      }

      // When on Architecture Project or Movement Project page: toggle full-screen hero backdrop mode
      const bioViewEl = document.getElementById('bio-view');
      if (bioViewEl) {
        if (isArchProject || isMoveProject) {
          bioViewEl.classList.add('is-project-page');
        } else {
          bioViewEl.classList.remove('is-project-page');
        }
        bioViewEl.classList.toggle('is-architecture-deck-page', targetPage === 'architecture' || targetPage === 'movement');
      }

      if (targetPage === 'architecture' || targetPage === 'movement' || isArchProject || isMoveProject) {
        window.scrollTo(0, 0);
      }

      // 1. Fade out current body texts / album
      if (currentGroup) {
        currentGroup.classList.remove('is-active');
        currentGroup.classList.add('is-fading-out');
      }

      // 2. After fade-out (300ms), swap and fade in target group
      setTimeout(() => {
        if (currentGroup) {
          currentGroup.classList.remove('is-fading-out');
          currentGroup.classList.add('is-hidden');
          currentGroup.setAttribute('aria-hidden', 'true');
        }

        if (targetGroup) {
          targetGroup.classList.remove('is-hidden');
          targetGroup.classList.add('is-fading-out');
          targetGroup.setAttribute('aria-hidden', 'false');

          void targetGroup.offsetHeight; // Force reflow

          requestAnimationFrame(() => {
            targetGroup.classList.remove('is-fading-out');
            targetGroup.classList.add('is-active');
            isTransitioning = false;

            // If navigating to architecture, refresh card deck positioning and align to active project card
            if (targetPage === 'architecture' && window.archAlbumDeckAPI) {
              if (prevPage && prevPage.startsWith('architecture-project') && currentProjectIndex !== undefined && window.archAlbumDeckAPI.goToProject) {
                const currentProj = ARCH_PROJECTS[currentProjectIndex];
                window.archAlbumDeckAPI.refresh();
                if (currentProj) {
                  window.archAlbumDeckAPI.goToProject(currentProj.num);
                }
              } else {
                if (window.archAlbumDeckAPI.reset) {
                  window.archAlbumDeckAPI.reset();
                } else {
                  window.archAlbumDeckAPI.refresh();
                }
              }
            }

            // If navigating to movement, refresh movement card deck
            if (targetPage === 'movement' && window.moveAlbumDeckAPI) {
              window.moveAlbumDeckAPI.refresh();
              if (prevPage && prevPage.startsWith('movement-project') && currentMoveProjectIndex !== undefined && window.moveAlbumDeckAPI.goToCard) {
                window.moveAlbumDeckAPI.goToCard(currentMoveProjectIndex);
              }
            }

            // If navigating to sketch, refresh sketch deck
            if (targetPage === 'sketch' && window.sketchDeckAPI) {
              window.sketchDeckAPI.refresh();
            }

            // If navigating to capture, center photo stream to match Image 15
            if (targetPage === 'capture' && window.captureStreamAPI) {
              window.captureStreamAPI.refresh();
            }

            // If navigating to conversations, center stream to match Image 16
            if (targetPage === 'conversations' && window.conversationStreamAPI) {
              window.conversationStreamAPI.refresh();
            }

            // Reset scroll position when opening the Memo page
            if (targetPage === 'memo' && targetGroup) {
              targetGroup.scrollTop = 0;
            }
          });
        } else {
          isTransitioning = false;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);

      if (pushState && window.history && window.history.pushState) {
        window.history.pushState({ subPage: targetPage }, '', `#${targetPage}`);
      }
    }

    // Brand logo button:
    // When on Education, Contact or Architecture page -> returns to Bio page
    // When on Bio page -> re-seals vault to Entrance
    if (sealLogoBtn) {
      sealLogoBtn.addEventListener('click', () => {
        if (state.subPage !== 'bio') {
          navigateToSubPage('bio');
        } else {
          sealVault();
        }
      });
    }

    // Wave button always re-seals vault immediately
    if (sealWaveBtn) {
      sealWaveBtn.addEventListener('click', sealVault);
    }

    // Header '< ARCHITECTURE' button -> transitions to Architecture Landing Page (or returns from project page)
    if (archNavBtn) {
      archNavBtn.addEventListener('click', () => {
        if (state.subPage && state.subPage.startsWith('architecture-project')) {
          navigateToSubPage('architecture');
        } else if (state.subPage !== 'architecture') {
          navigateToSubPage('architecture');
        } else {
          playDebossClickSound();
        }
      });
    }

    // Clicking 'education' -> transitions to Education page
    if (eduTrigger) {
      eduTrigger.addEventListener('click', () => {
        if (state.subPage !== 'education') {
          navigateToSubPage('education');
        } else {
          playDebossClickSound();
        }
      });
    }

    // Clicking 'contact' -> transitions to Contact page
    if (contactTrigger) {
      contactTrigger.addEventListener('click', () => {
        if (state.subPage !== 'contact') {
          navigateToSubPage('contact');
        } else {
          playDebossClickSound();
        }
      });
    }

    // Movement popover modal
    function openBioModal(title, html) {
      if (!bioModal || !bioModalContent) return;
      playDebossClickSound();
      bioModalContent.innerHTML = `
        <h3 class="bio-engraved-title" style="font-size: 20px; margin-top: 0; margin-bottom: 20px; font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: 0.05em; color: #85857d;">${title}</h3>
        <div style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: 0.05em; color: #85857d; line-height: 1.6; font-size: 14.5px;">
          ${html}
        </div>
      `;
      bioModal.classList.remove('is-closed');
      document.body.style.overflow = 'hidden';
    }

    function closeBioModal() {
      if (!bioModal) return;
      playDebossClickSound();
      bioModal.classList.add('is-closed');
      document.body.style.overflow = '';
    }

    if (bioModalClose) bioModalClose.addEventListener('click', closeBioModal);
    if (bioModalOverlay) bioModalOverlay.addEventListener('click', closeBioModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (isMenuOpen) closeFloatingMenu();
        if (bioModal && !bioModal.classList.contains('is-closed')) closeBioModal();
      }
    });

    if (waveNavBtn) {
      waveNavBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFloatingMenu();
      });
    }

    // Floating menu buttons:
    // When pressed, button switches to Image 12 pressed state while others stay Image 11 normal state.
    // Takes user to new landing page and fades out floating menu leaving only original header.
    menuBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        playDebossClickSound();
        const target = btn.getAttribute('data-menu');

        menuBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        setTimeout(() => {
          closeFloatingMenu();
          if (target === 'bio') {
            navigateToSubPage('bio');
          } else {
            navigateToSubPage(target);
          }
        }, 220);
      });
    });

    // Close floating menu when clicking outside
    window.addEventListener('click', (e) => {
      if (isMenuOpen && floatingMenu && !floatingMenu.contains(e.target) && (!waveNavBtn || !waveNavBtn.contains(e.target))) {
        closeFloatingMenu();
      }
    });

    // Simple landing pages return to Bio buttons
    const simpleBackBtns = document.querySelectorAll('.simple-landing-back-btn');
    simpleBackBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        navigateToSubPage('bio');
      });
    });

    if (moveNavBtn) {
      moveNavBtn.addEventListener('click', () => {
        if (state.subPage && state.subPage.startsWith('movement-project')) {
          navigateToSubPage('movement');
        } else if (state.subPage !== 'movement') {
          navigateToSubPage('movement');
        } else {
          playDebossClickSound();
        }
      });
    }

    window.addEventListener('popstate', (e) => {
      const hash = window.location.hash.replace('#', '');
      const page = hash || ((e.state && e.state.subPage) ? e.state.subPage : 'bio');
      if (page.startsWith('architecture-project')) {
        const numPart = page.replace('architecture-project-', '').replace('architecture-project', '');
        loadArchProject(numPart || 0);
      } else if (page.startsWith('movement-project')) {
        const idPart = page.replace('movement-project-', '').replace('movement-project', '');
        loadMovementProject(idPart || 0);
      }
      navigateToSubPage(page, false);
    });

    if (window.location.hash === '#education') {
      navigateToSubPage('education', false);
    } else if (window.location.hash === '#contact') {
      navigateToSubPage('contact', false);
    } else if (window.location.hash === '#architecture') {
      navigateToSubPage('architecture', false);
    } else if (window.location.hash === '#movement') {
      navigateToSubPage('movement', false);
    } else if (window.location.hash === '#sketch') {
      navigateToSubPage('sketch', false);
    } else if (window.location.hash === '#capture') {
      navigateToSubPage('capture', false);
    } else if (window.location.hash === '#conversations') {
      navigateToSubPage('conversations', false);
    } else if (window.location.hash === '#memo') {
      navigateToSubPage('memo', false);
    } else if (window.location.hash.startsWith('#architecture-project')) {
      const hashPart = window.location.hash.replace('#architecture-project-', '').replace('#architecture-project', '');
      loadArchProject(hashPart || 0);
      navigateToSubPage(window.location.hash.replace('#', ''), false);
    } else if (window.location.hash.startsWith('#movement-project')) {
      const hashPart = window.location.hash.replace('#movement-project-', '').replace('#movement-project', '');
      loadMovementProject(hashPart || 0);
      navigateToSubPage(window.location.hash.replace('#', ''), false);
    }

    const navItems = document.querySelectorAll('.bio-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        playDebossClickSound();
      });
    });

    // Initialize 3D Photo Album Decks & Project Page Controllers
    initArchAlbumDeck(navigateToSubPage);
    initMoveAlbumDeck(navigateToSubPage);
    initArchProjectInteractions(navigateToSubPage);
    initMoveProjectInteractions(navigateToSubPage);
    initSketchPage(navigateToSubPage);
    initCapturePage(navigateToSubPage);
    initConversationPage(navigateToSubPage);
  }

  /* ==========================================================================
     7. 3D ARCHITECTURE PHOTO ALBUM DECK & SCROLL WHEEL ENGINE (Image 8)
     ========================================================================== */
  function initArchAlbumDeck(navigateToSubPage) {
    const albumContainer = document.getElementById('arch-album-container');
    const archGroup = document.getElementById('arch-body-group');
    const cards = Array.from(document.querySelectorAll('#arch-deck .arch-card'));

    if (!cards.length) return;

    let activeIndex = 0;
    const totalCards = cards.length;
    let isWheelLocked = false;
    let wheelDeltaAccumulator = 0;
    const WHEEL_THRESHOLD = 20; // Smooth sensitivity threshold
    const WHEEL_COOLDOWN = 280; // ms cooldown for trackpad & mouse wheel momentum
    let pendingRepositionTimers = [];

    // Clear and flush any pending card repositioning timers
    function clearPendingTimers() {
      if (pendingRepositionTimers.length) {
        pendingRepositionTimers.forEach(t => {
          clearTimeout(t.id);
          if (t.card && t.slot !== undefined) {
            applySlotStyle(t.card, t.slot, true);
          }
        });
        pendingRepositionTimers = [];
      }
    }

    // Geometry & depth styling for card at relative depth slot k:
    // Exactly 4 image frames visible at a time (k = 0, 1, 2, 3)
    // Foreground card height: ~3/4 of window height (74vh)
    // Visible back card (Card 3) top preserved at a safe distance below the header row
    function getSlotStyle(k) {
      let yOffset, zOffset, scale, opacity;
      const vh = window.innerHeight;
      const isMobile = window.innerWidth <= 860;
      
      let cardH, headerH, targetSpace, padB, scale3, yOffset3, step;

      if (isMobile) {
        // Mobile layout: scale card height and stack spacing to fit phone screen dimensions
        cardH = Math.min(430, Math.max(260, Math.round(vh * 0.52)));
        headerH = Math.min(54, Math.max(42, Math.round(vh * 0.065)));
        targetSpace = 12;
        padB = Math.min(32, Math.max(18, Math.round(vh * 0.038)));

        const deckBottomFromTop = vh - padB;
        const card3TargetTopFromTop = headerH + targetSpace;
        const card3TopFromDeckBottom = deckBottomFromTop - card3TargetTopFromTop;
        scale3 = 0.84;
        yOffset3 = card3TopFromDeckBottom - (cardH * scale3);
        step = Math.max(20, Math.min(32, Math.round(yOffset3 / 3)));
      } else {
        // Desktop / Monitor layout (100% untouched)
        cardH = Math.min(860, Math.max(480, Math.round(vh * 0.74)));
        headerH = Math.min(80, Math.max(62, Math.round(vh * 0.075)));
        targetSpace = Math.min(18, Math.max(12, Math.round(vh * 0.016)));
        padB = Math.min(62, Math.max(44, Math.round(vh * 0.055)));

        const deckBottomFromTop = vh - padB;
        const card3TargetTopFromTop = headerH + targetSpace;
        const card3TopFromDeckBottom = deckBottomFromTop - card3TargetTopFromTop;
        scale3 = 0.81;
        yOffset3 = card3TopFromDeckBottom - (cardH * scale3);
        step = Math.max(52, Math.round(yOffset3 / 3));
      }

      if (k === 0) {
        yOffset = 0;
        zOffset = 0;
        scale = 1;
        opacity = 1;
      } else if (k === 1) {
        yOffset = -step;
        zOffset = -75;
        scale = 0.940;
        opacity = 0.90;
      } else if (k === 2) {
        yOffset = -2 * step;
        zOffset = -150;
        scale = 0.875;
        opacity = 0.78;
      } else if (k === 3) {
        yOffset = -3 * step;
        zOffset = -225;
        scale = 0.810;
        opacity = 0.65;
      } else {
        // Hidden deeper in deck (k = 4..9): tucked behind card 3, completely out of view
        yOffset = -3 * step - 12;
        zOffset = -250 - (k - 3) * 15;
        scale = 0.76;
        opacity = 0;
      }

      const zIndex = 25 - k;
      return {
        yOffset,
        zOffset,
        scale,
        transform: `translate3d(0, ${yOffset}px, ${zOffset}px) scale(calc(${scale.toFixed(3)} * var(--card-hover-scale, 1)))`,
        opacity: opacity.toFixed(2),
        zIndex: `${zIndex}`,
        pointerEvents: (k <= 3) ? 'auto' : 'none'
      };
    }

    // Apply 3D slot transform and accessibility attributes to a card
    function applySlotStyle(card, k, isInstant = false) {
      const s = getSlotStyle(k);
      if (isInstant) {
        card.style.transition = 'none';
      }
      card.classList.remove('is-past');
      if (k === 0) {
        card.classList.remove('is-peeking');
        card.classList.add('is-active-card');
        card.style.cursor = 'pointer';
        card.setAttribute('aria-hidden', 'false');
      } else {
        card.classList.remove('is-active-card');
        card.classList.add('is-peeking');
        card.style.cursor = (k <= 3) ? 'pointer' : 'default';
        card.setAttribute('aria-hidden', (k <= 3) ? 'false' : 'true');
      }
      card.style.transform = s.transform;
      card.style.opacity = s.opacity;
      card.style.zIndex = s.zIndex;
      card.style.pointerEvents = s.pointerEvents;

      if (isInstant) {
        void card.offsetHeight;
        card.style.transition = '';
      }
    }

    // Lay out all cards in steady-state circular order
    function updateStack(isInstant = false) {
      clearPendingTimers();
      for (let k = 0; k < totalCards; k++) {
        const card = cards[(activeIndex + k) % totalCards];
        applySlotStyle(card, k, isInstant);
      }
    }

    // Scroll forward: Current front card rolls down & away, stack advances, front card loops to the back
    function stepNext(playSound = true) {
      clearPendingTimers();
      const oldActive = activeIndex;
      const newActive = (activeIndex + 1) % totalCards;
      activeIndex = newActive;
      if (playSound) playDebossClickSound();

      // Current front card peels forward and drops out of view
      const oldCard = cards[oldActive];
      oldCard.classList.remove('is-active-card', 'is-peeking');
      oldCard.classList.add('is-past');
      oldCard.style.transform = 'translate3d(0, 160px, 80px) scale(1.06)';
      oldCard.style.opacity = '0';
      oldCard.style.zIndex = '16';
      oldCard.style.pointerEvents = 'none';
      oldCard.setAttribute('aria-hidden', 'true');

      // Remaining cards shift one slot forward
      for (let k = 0; k < totalCards - 1; k++) {
        const card = cards[(newActive + k) % totalCards];
        applySlotStyle(card, k, false);
      }

      // Reposition exited card seamlessly to the back slot without animation jump
      const backSlot = totalCards - 1;
      const timer = setTimeout(() => {
        applySlotStyle(oldCard, backSlot, true);
        oldCard.style.opacity = '0';
        void oldCard.offsetHeight;
        oldCard.style.transition = 'opacity 0.35s ease';
        oldCard.style.opacity = getSlotStyle(backSlot).opacity;
        setTimeout(() => { oldCard.style.transition = ''; }, 360);
      }, 380);

      pendingRepositionTimers.push({ id: timer, card: oldCard, slot: backSlot });
    }

    // Scroll backward: Last/previous image rolls in front of the current image, looping continuously
    function stepPrev(playSound = true) {
      clearPendingTimers();
      const newActive = (activeIndex - 1 + totalCards) % totalCards;
      activeIndex = newActive;
      if (playSound) playDebossClickSound();

      // The incoming previous card starts below in front
      const incomingCard = cards[newActive];
      incomingCard.style.transition = 'none';
      incomingCard.classList.remove('is-active-card', 'is-peeking');
      incomingCard.classList.add('is-past');
      incomingCard.style.transform = 'translate3d(0, 160px, 80px) scale(1.06)';
      incomingCard.style.opacity = '0';
      incomingCard.style.zIndex = '16';
      incomingCard.style.pointerEvents = 'none';
      void incomingCard.offsetHeight; // Force reflow to commit initial pose

      // Roll incoming card into active foreground slot, and push all existing cards back one slot
      requestAnimationFrame(() => {
        incomingCard.style.transition = '';
        applySlotStyle(incomingCard, 0, false);
        for (let k = 1; k < totalCards; k++) {
          const card = cards[(newActive + k) % totalCards];
          applySlotStyle(card, k, false);
        }
      });
    }

    // Step to a specific project card with seamless circular transition
    function stepToCard(targetIndex) {
      if (targetIndex === activeIndex) return;
      const diff = (targetIndex - activeIndex + totalCards) % totalCards;

      if (diff === 1) {
        stepNext();
      } else if (diff === totalCards - 1) {
        stepPrev();
      } else {
        clearPendingTimers();
        const prevActive = activeIndex;
        activeIndex = targetIndex;
        playDebossClickSound();

        const exitedCards = [];
        for (let s = 0; s < diff; s++) {
          const card = cards[(prevActive + s) % totalCards];
          exitedCards.push(card);
          card.classList.remove('is-active-card', 'is-peeking');
          card.classList.add('is-past');
          card.style.transform = 'translate3d(0, 160px, 80px) scale(1.06)';
          card.style.opacity = '0';
          card.style.zIndex = `${16 + s}`;
          card.style.pointerEvents = 'none';
          card.setAttribute('aria-hidden', 'true');
        }

        const remainingCount = totalCards - diff;
        for (let k = 0; k < remainingCount; k++) {
          const card = cards[(targetIndex + k) % totalCards];
          applySlotStyle(card, k, false);
        }

        const timer = setTimeout(() => {
          exitedCards.forEach((card, idx) => {
            const slot = remainingCount + idx;
            applySlotStyle(card, slot, true);
          });
        }, 380);

        pendingRepositionTimers.push({ id: timer });
      }
    }

    // Clicking on any image in the architecture landing page opens its own architecture project page!
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (state.subPage !== 'architecture' && (!archGroup || archGroup.classList.contains('is-hidden'))) return;
        e.stopPropagation();
        const projectId = card.getAttribute('data-project-id');
        loadArchProject(projectId);
        const project = ARCH_PROJECTS[currentProjectIndex] || ARCH_PROJECTS[0];
        if (navigateToSubPage) {
          navigateToSubPage(`architecture-project-${project.num}`);
        }
      });
    });

    // Scroll Wheel Interception Engine
    function onWheelScroll(e) {
      if (state.subPage !== 'architecture') return;

      // Prevent parent window scrolling so the scroll wheel cycles the physical album smoothly
      e.preventDefault();

      wheelDeltaAccumulator += e.deltaY;

      if (isWheelLocked) return;

      if (Math.abs(wheelDeltaAccumulator) >= WHEEL_THRESHOLD) {
        if (wheelDeltaAccumulator > 0) {
          // Scroll down -> next project card (silent on wheel)
          stepNext(false);
        } else {
          // Scroll up -> previous project card (silent on wheel)
          stepPrev(false);
        }

        isWheelLocked = true;
        wheelDeltaAccumulator = 0;

        setTimeout(() => {
          isWheelLocked = false;
          wheelDeltaAccumulator = 0;
        }, WHEEL_COOLDOWN);
      }
    }

    if (albumContainer) {
      albumContainer.addEventListener('wheel', onWheelScroll, { passive: false });
    }
    if (archGroup) {
      archGroup.addEventListener('wheel', onWheelScroll, { passive: false });
    }
    window.addEventListener('wheel', (e) => {
      if (state.subPage === 'architecture') {
        onWheelScroll(e);
      }
    }, { passive: false });

    // Keyboard Arrow Keys (Up/Down & Left/Right)
    window.addEventListener('keydown', (e) => {
      if (state.subPage !== 'architecture') return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        stepNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        stepPrev();
      }
    });

    // Touch Swipe Navigation for Mobile / Tablets
    let touchStartY = 0;
    let touchStartX = 0;
    let touchTracking = false;

    function onArchTouchStart(e) {
      if (state.subPage !== 'architecture' || e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchTracking = true;
    }

    function onArchTouchMove(e) {
      if (!touchTracking || state.subPage !== 'architecture') return;
      if (e.cancelable) {
        e.preventDefault(); // Stop mobile browser from sliding the whole page layout down
      }
    }

    function onArchTouchEnd(e) {
      if (!touchTracking || state.subPage !== 'architecture') return;
      touchTracking = false;
      if (e.changedTouches.length === 1) {
        const dy = e.changedTouches[0].clientY - touchStartY;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 22) {
          if (dy < 0) {
            stepNext(); // Swiped up -> next frame
          } else {
            stepPrev(); // Swiped down -> previous frame
          }
        }
      }
    }

    window.addEventListener('touchstart', onArchTouchStart, { passive: true });
    window.addEventListener('touchmove', onArchTouchMove, { passive: false });
    window.addEventListener('touchend', onArchTouchEnd, { passive: true });

    // Pre-decode all cover card images so 3D deck scrolling remains smooth
    function preDecodeDeckImages() {
      cards.forEach((card) => {
        const img = card.querySelector('img');
        if (!img) return;
        img.decoding = 'async';
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {});
        }
      });
    }

    // Export API for external refreshes
    window.archAlbumDeckAPI = {
      refresh: () => {
        preDecodeDeckImages();
        updateStack(true);
      },
      reset: () => {
        preDecodeDeckImages();
        activeIndex = 0;
        updateStack(true);
      },
      goToCard: stepToCard,
      goToProject: (projectNum) => {
        const clean = String(projectNum).padStart(3, '0');
        const idx = cards.findIndex(c => c.getAttribute('data-project-id') === clean);
        if (idx !== -1) {
          stepToCard(idx);
        }
      },
      stepNext: stepNext,
      stepPrev: stepPrev,
      getCurrentIndex: () => activeIndex
    };

    // Handle resize to recalculate responsive step and stack positions
    window.addEventListener('resize', () => {
      if (state.subPage === 'architecture') {
        updateStack(true);
      }
    });

    // Initialize initial 3D positions & pre-decode deck covers
    updateStack(true);
    preDecodeDeckImages();
  }

  /* ==========================================================================
     7B. 3D MOVEMENT PHOTO ALBUM DECK & SCROLL WHEEL ENGINE
     ========================================================================== */
  function initMoveAlbumDeck(navigateToSubPage) {
    const albumContainer = document.getElementById('move-album-container');
    const moveGroup = document.getElementById('move-body-group');
    const cards = Array.from(document.querySelectorAll('#move-deck .arch-card'));

    if (!cards.length) return;

    let activeIndex = 0;
    const totalCards = cards.length;
    let isWheelLocked = false;
    let wheelDeltaAccumulator = 0;
    const WHEEL_THRESHOLD = 20; // Smooth sensitivity threshold
    const WHEEL_COOLDOWN = 280; // ms cooldown for trackpad & mouse wheel momentum
    let pendingRepositionTimers = [];

    // Clear and flush any pending card repositioning timers
    function clearPendingTimers() {
      if (pendingRepositionTimers.length) {
        pendingRepositionTimers.forEach(t => {
          clearTimeout(t.id);
          if (t.card && t.slot !== undefined) {
            applySlotStyle(t.card, t.slot, true);
          }
        });
        pendingRepositionTimers = [];
      }
    }

    // Geometry & depth styling for card at relative depth slot k:
    // Exactly 4 image frames visible at a time (k = 0, 1, 2, 3)
    // Foreground card height: ~3/4 of window height (74vh)
    // Visible back card (Card 3) top preserved at a safe distance below the header row
    function getSlotStyle(k) {
      let yOffset, zOffset, scale, opacity;
      const vh = window.innerHeight;
      const isMobile = window.innerWidth <= 860;
      
      let cardH, headerH, targetSpace, padB, scale3, yOffset3, step;

      if (isMobile) {
        // Mobile layout: scale card height and stack spacing to fit phone screen dimensions
        cardH = Math.min(430, Math.max(260, Math.round(vh * 0.52)));
        headerH = Math.min(54, Math.max(42, Math.round(vh * 0.065)));
        targetSpace = 12;
        padB = Math.min(32, Math.max(18, Math.round(vh * 0.038)));

        const deckBottomFromTop = vh - padB;
        const card3TargetTopFromTop = headerH + targetSpace;
        const card3TopFromDeckBottom = deckBottomFromTop - card3TargetTopFromTop;
        scale3 = 0.84;
        yOffset3 = card3TopFromDeckBottom - (cardH * scale3);
        step = Math.max(20, Math.min(32, Math.round(yOffset3 / 3)));
      } else {
        // Desktop / Monitor layout (100% untouched)
        cardH = Math.min(860, Math.max(480, Math.round(vh * 0.74)));
        headerH = Math.min(80, Math.max(62, Math.round(vh * 0.075)));
        targetSpace = Math.min(18, Math.max(12, Math.round(vh * 0.016)));
        padB = Math.min(62, Math.max(44, Math.round(vh * 0.055)));

        const deckBottomFromTop = vh - padB;
        const card3TargetTopFromTop = headerH + targetSpace;
        const card3TopFromDeckBottom = deckBottomFromTop - card3TargetTopFromTop;
        scale3 = 0.81;
        yOffset3 = card3TopFromDeckBottom - (cardH * scale3);
        step = Math.max(52, Math.round(yOffset3 / 3));
      }

      if (k === 0) {
        yOffset = 0;
        zOffset = 0;
        scale = 1;
        opacity = 1;
      } else if (k === 1) {
        yOffset = -step;
        zOffset = -75;
        scale = 0.940;
        opacity = 0.90;
      } else if (k === 2) {
        yOffset = -2 * step;
        zOffset = -150;
        scale = 0.875;
        opacity = 0.78;
      } else if (k === 3) {
        yOffset = -3 * step;
        zOffset = -225;
        scale = 0.810;
        opacity = 0.65;
      } else {
        // Hidden deeper in deck (k = 4..9): tucked behind card 3, completely out of view
        yOffset = -3 * step - 12;
        zOffset = -250 - (k - 3) * 15;
        scale = 0.76;
        opacity = 0;
      }

      const zIndex = 25 - k;
      return {
        yOffset,
        zOffset,
        scale,
        transform: `translate3d(0, ${yOffset}px, ${zOffset}px) scale(calc(${scale.toFixed(3)} * var(--card-hover-scale, 1)))`,
        opacity: opacity.toFixed(2),
        zIndex: `${zIndex}`,
        pointerEvents: (k <= 3) ? 'auto' : 'none'
      };
    }

    // Apply 3D slot transform and accessibility attributes to a card
    function applySlotStyle(card, k, isInstant = false) {
      const s = getSlotStyle(k);
      if (isInstant) {
        card.style.transition = 'none';
      }
      card.classList.remove('is-past');
      if (k === 0) {
        card.classList.remove('is-peeking');
        card.classList.add('is-active-card');
        card.style.cursor = 'pointer';
        card.setAttribute('aria-hidden', 'false');
      } else {
        card.classList.remove('is-active-card');
        card.classList.add('is-peeking');
        card.style.cursor = (k <= 3) ? 'pointer' : 'default';
        card.setAttribute('aria-hidden', (k <= 3) ? 'false' : 'true');
      }
      card.style.transform = s.transform;
      card.style.opacity = s.opacity;
      card.style.zIndex = s.zIndex;
      card.style.pointerEvents = s.pointerEvents;

      if (isInstant) {
        void card.offsetHeight;
        card.style.transition = '';
      }
    }

    // Lay out all cards in circular order
    function updateStack(isInstant = false) {
      clearPendingTimers();
      for (let k = 0; k < totalCards; k++) {
        const card = cards[(activeIndex + k) % totalCards];
        applySlotStyle(card, k, isInstant);
      }
    }

    // Scroll forward: Current front card rolls down & away, stack advances, front card loops to the back
    function stepNext(playSound = true) {
      clearPendingTimers();
      const oldActive = activeIndex;
      const newActive = (activeIndex + 1) % totalCards;
      activeIndex = newActive;
      if (playSound) playDebossClickSound();

      const oldCard = cards[oldActive];
      oldCard.classList.remove('is-active-card', 'is-peeking');
      oldCard.classList.add('is-past');
      oldCard.style.transform = 'translate3d(0, 160px, 80px) scale(1.06)';
      oldCard.style.opacity = '0';
      oldCard.style.zIndex = '16';
      oldCard.style.pointerEvents = 'none';
      oldCard.setAttribute('aria-hidden', 'true');

      for (let k = 0; k < totalCards - 1; k++) {
        const card = cards[(newActive + k) % totalCards];
        applySlotStyle(card, k, false);
      }

      const backSlot = totalCards - 1;
      const timer = setTimeout(() => {
        applySlotStyle(oldCard, backSlot, true);
        oldCard.style.opacity = '0';
        void oldCard.offsetHeight;
        oldCard.style.transition = 'opacity 0.35s ease';
        oldCard.style.opacity = getSlotStyle(backSlot).opacity;
        setTimeout(() => { oldCard.style.transition = ''; }, 360);
      }, 380);

      pendingRepositionTimers.push({ id: timer, card: oldCard, slot: backSlot });
    }

    // Scroll backward: Last/previous image rolls in front of the current image, looping continuously
    function stepPrev(playSound = true) {
      clearPendingTimers();
      const newActive = (activeIndex - 1 + totalCards) % totalCards;
      activeIndex = newActive;
      if (playSound) playDebossClickSound();

      const incomingCard = cards[newActive];
      incomingCard.style.transition = 'none';
      incomingCard.classList.remove('is-active-card', 'is-peeking');
      incomingCard.classList.add('is-past');
      incomingCard.style.transform = 'translate3d(0, 160px, 80px) scale(1.06)';
      incomingCard.style.opacity = '0';
      incomingCard.style.zIndex = '16';
      incomingCard.style.pointerEvents = 'none';
      void incomingCard.offsetHeight;

      requestAnimationFrame(() => {
        incomingCard.style.transition = '';
        applySlotStyle(incomingCard, 0, false);
        for (let k = 1; k < totalCards; k++) {
          const card = cards[(newActive + k) % totalCards];
          applySlotStyle(card, k, false);
        }
      });
    }

    // Step to a specific card with seamless transition
    function stepToCard(targetIndex) {
      if (targetIndex === activeIndex) return;
      const diff = (targetIndex - activeIndex + totalCards) % totalCards;

      if (diff === 1) {
        stepNext();
      } else if (diff === totalCards - 1) {
        stepPrev();
      } else {
        clearPendingTimers();
        const prevActive = activeIndex;
        activeIndex = targetIndex;
        playDebossClickSound();

        const exitedCards = [];
        for (let s = 0; s < diff; s++) {
          const card = cards[(prevActive + s) % totalCards];
          exitedCards.push(card);
          card.classList.remove('is-active-card', 'is-peeking');
          card.classList.add('is-past');
          card.style.transform = 'translate3d(0, 160px, 80px) scale(1.06)';
          card.style.opacity = '0';
          card.style.zIndex = `${16 + s}`;
          card.style.pointerEvents = 'none';
          card.setAttribute('aria-hidden', 'true');
        }

        const remainingCount = totalCards - diff;
        for (let k = 0; k < remainingCount; k++) {
          const card = cards[(targetIndex + k) % totalCards];
          applySlotStyle(card, k, false);
        }

        const timer = setTimeout(() => {
          exitedCards.forEach((card, idx) => {
            const slot = remainingCount + idx;
            applySlotStyle(card, slot, true);
          });
        }, 380);

        pendingRepositionTimers.push({ id: timer });
      }
    }

    // Clicking on an image with a project in the movement landing page opens its movement project page!
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (state.subPage !== 'movement' && (!moveGroup || moveGroup.classList.contains('is-hidden'))) return;
        e.stopPropagation();
        const projectId = card.getAttribute('data-project-id');
        if (projectId) {
          loadMovementProject(projectId);
          const project = MOVEMENT_PROJECTS[currentMoveProjectIndex] || MOVEMENT_PROJECTS[0];
          if (navigateToSubPage) {
            navigateToSubPage(`movement-project-${project.id}`);
          }
        } else {
          // If a peeking card without a dedicated project page is clicked, smoothly step to it within the album
          const cardIdx = parseInt(card.getAttribute('data-index'), 10) || 0;
          if (cardIdx !== activeIndex) {
            stepToCard(cardIdx);
          } else {
            playDebossClickSound();
          }
        }
      });
    });

    // Scroll Wheel Interception Engine
    function onWheelScroll(e) {
      if (state.subPage !== 'movement') return;

      e.preventDefault();
      wheelDeltaAccumulator += e.deltaY;

      if (isWheelLocked) return;

      if (Math.abs(wheelDeltaAccumulator) >= WHEEL_THRESHOLD) {
        if (wheelDeltaAccumulator > 0) {
          stepNext(false);
        } else {
          stepPrev(false);
        }

        isWheelLocked = true;
        wheelDeltaAccumulator = 0;

        setTimeout(() => {
          isWheelLocked = false;
          wheelDeltaAccumulator = 0;
        }, WHEEL_COOLDOWN);
      }
    }

    if (albumContainer) {
      albumContainer.addEventListener('wheel', onWheelScroll, { passive: false });
    }
    if (moveGroup) {
      moveGroup.addEventListener('wheel', onWheelScroll, { passive: false });
    }
    window.addEventListener('wheel', (e) => {
      if (state.subPage === 'movement') {
        onWheelScroll(e);
      }
    }, { passive: false });

    // Keyboard Arrow Keys
    window.addEventListener('keydown', (e) => {
      if (state.subPage !== 'movement') return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        stepNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        stepPrev();
      }
    });

    // Touch Swipe Navigation for Mobile / Tablets
    let touchStartY = 0;
    let touchStartX = 0;
    let touchTracking = false;

    function onMoveTouchStart(e) {
      if (state.subPage !== 'movement' || e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchTracking = true;
    }

    function onMoveTouchMove(e) {
      if (!touchTracking || state.subPage !== 'movement') return;
      if (e.cancelable) {
        e.preventDefault(); // Stop mobile browser from sliding the whole page down
      }
    }

    function onMoveTouchEnd(e) {
      if (!touchTracking || state.subPage !== 'movement') return;
      touchTracking = false;
      if (e.changedTouches.length === 1) {
        const dy = e.changedTouches[0].clientY - touchStartY;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 22) {
          if (dy < 0) {
            stepNext(); // Swiped up -> next frame
          } else {
            stepPrev(); // Swiped down -> previous frame
          }
        }
      }
    }

    window.addEventListener('touchstart', onMoveTouchStart, { passive: true });
    window.addEventListener('touchmove', onMoveTouchMove, { passive: false });
    window.addEventListener('touchend', onMoveTouchEnd, { passive: true });

    // Export API
    window.moveAlbumDeckAPI = {
      refresh: () => updateStack(true),
      goToCard: stepToCard,
      stepNext: stepNext,
      stepPrev: stepPrev,
      getCurrentIndex: () => activeIndex
    };

    // Handle resize to recalculate responsive step and stack positions
    window.addEventListener('resize', () => {
      if (state.subPage === 'movement') {
        updateStack(true);
      }
    });

    updateStack(true);
  }

  /* ==========================================================================
     8. ARCHITECTURE PROJECT PAGE INTERACTIONS (Image 10 Reference)
     ========================================================================== */
  function initArchProjectInteractions(navigateToSubPage) {
    const backBtn = document.getElementById('arch-proj-back-btn');
    const prevBtn = document.getElementById('arch-arrow-prev');
    const nextBtn = document.getElementById('arch-arrow-next');
    const tabs = Array.from(document.querySelectorAll('.arch-proj-tab'));

    // Initialize initial project slideshow
    renderProjectSlideshow(ARCH_PROJECTS[currentProjectIndex || 0]);

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (updateArchSlide) updateArchSlide(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (updateArchSlide) updateArchSlide(1);
      });
    }

    const lightboxClose = document.getElementById('arch-lightbox-close');
    const lightboxBackdrop = document.getElementById('arch-lightbox-backdrop');
    const lightboxPrev = document.getElementById('arch-lightbox-prev');
    const lightboxNext = document.getElementById('arch-lightbox-next');

    if (lightboxClose) {
      lightboxClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeArchLightbox();
      });
    }
    if (lightboxBackdrop) {
      lightboxBackdrop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeArchLightbox();
      });
    }
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        stepArchLightbox(-1);
      });
    }
    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        stepArchLightbox(1);
      });
    }

    // Keyboard support for '<' and '>' / left and right arrows on architecture project page
    window.addEventListener('keydown', (e) => {
      if (isArchLightboxOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeArchLightbox();
        } else if (e.key === 'ArrowLeft' || e.key === '<' || e.key === ',') {
          e.preventDefault();
          stepArchLightbox(-1);
        } else if (e.key === 'ArrowRight' || e.key === '>' || e.key === '.') {
          e.preventDefault();
          stepArchLightbox(1);
        }
        return;
      }

      if (state.subPage && state.subPage.startsWith('architecture-project')) {
        if (e.key === 'ArrowLeft' || e.key === '<' || e.key === ',') {
          e.preventDefault();
          if (updateArchSlide) updateArchSlide(-1);
        } else if (e.key === 'ArrowRight' || e.key === '>' || e.key === '.') {
          e.preventDefault();
          if (updateArchSlide) updateArchSlide(1);
        }
      } else if (state.subPage && state.subPage.startsWith('movement-project')) {
        if (e.key === 'ArrowLeft' || e.key === '<' || e.key === ',') {
          e.preventDefault();
          if (updateMoveSlide) updateMoveSlide(-1);
        } else if (e.key === 'ArrowRight' || e.key === '>' || e.key === '.') {
          e.preventDefault();
          if (updateMoveSlide) updateMoveSlide(1);
        }
      }
    });

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        playDebossClickSound();
      });
    });

    if (backBtn && navigateToSubPage) {
      backBtn.addEventListener('click', () => {
        if (isArchLightboxOpen) closeArchLightbox();
        if (typeof stopHeroAutoplay === 'function') stopHeroAutoplay();
        navigateToSubPage('architecture');
      });
    }

    // Pause hero slideshow / video when tab is hidden, resume when tab is visible
    document.addEventListener('visibilitychange', () => {
      const moveVid = document.getElementById('move-proj-hero-video');
      if (document.hidden) {
        if (typeof stopHeroAutoplay === 'function') stopHeroAutoplay();
        if (moveVid) moveVid.pause();
      } else if (state.subPage && state.subPage.startsWith('architecture-project')) {
        const project = ARCH_PROJECTS[currentProjectIndex || 0];
        if (project && project.images && project.images.length > 1) {
          renderProjectSlideshow(project);
        }
      } else if (state.subPage && state.subPage.startsWith('movement-project')) {
        if (moveVid && !moveVid.classList.contains('is-hidden')) {
          moveVid.play().catch(() => {});
        }
      }
    });
  }

  /* ==========================================================================
     8B. MOVEMENT PROJECT PAGE INTERACTIONS
     ========================================================================== */
  function initMoveProjectInteractions(navigateToSubPage) {
    const backBtn = document.getElementById('move-proj-back-btn');
    const prevBtn = document.getElementById('move-arrow-prev');
    const nextBtn = document.getElementById('move-arrow-next');

    // Initialize initial movement project slideshow
    loadMovementProject('Heights of a House');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (updateMoveSlide) updateMoveSlide(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (updateMoveSlide) updateMoveSlide(1);
      });
    }

    if (backBtn && navigateToSubPage) {
      backBtn.addEventListener('click', () => {
        if (isArchLightboxOpen) closeArchLightbox();
        const moveVid = document.getElementById('move-proj-hero-video');
        if (moveVid) moveVid.pause();
        navigateToSubPage('movement');
      });
    }
  }

  /* ==========================================================================
     9. UNUSUAL SKETCHES PAGE & VERTICAL FLICK ENGINE (Image 14 Reference)
     ========================================================================== */
  function initSketchPage(navigateToSubPage) {
    const sketchGroup = document.getElementById('sketch-body-group');
    const viewport = document.getElementById('sketch-deck-viewport');
    const cards = Array.from(document.querySelectorAll('.sketch-card'));
    const infoBox = document.getElementById('sketch-info-box');
    const itemTitle = document.getElementById('sketch-sub-title') || document.getElementById('sketch-item-title');
    const itemDesc = document.getElementById('sketch-sub-desc') || document.getElementById('sketch-item-desc');

    if (!sketchGroup || !cards.length) return;

    const SKETCH_DATA = [
      {
        id: 0,
        title: 'Internet & Plant pot',
        desc: "Affected by the weight of hard plastic, the plant continues to grow. Though its restraining materials are static, the plant continues to breathe. Both are containers, the internet box and the plant pot. One stores nanoscopic components, the other stores microscopic cells. It's quite clear which container holds an adaptive object."
      },
      {
        id: 1,
        title: 'Nail & Eraser',
        desc: "Puncture. A puncture so thin, the object experiencing the puncture remains intact. Looks like a support rod, but being supported by the mass it should support. A single nail suggests 'intervention'. 50 nails distributed across the surface may suggest otherwise..."
      },
      {
        id: 2,
        title: 'Coffee & Sleepmask',
        desc: "The time we are awake is so limited we rely on coffee to wake us and force our sleep with the help of a sleepmask, (unless it's for other reasons of course). Maybe it's time to ditch them both."
      },
      {
        id: 3,
        title: 'Wooden log & plastered interior wall',
        desc: "Preserved from 1708. Maybe it is an integral part to the structure. Maybe it carries meaning. It could be a additive design with a large margin of error. Whatever it may be, it shows that complexity and sobriety can coexist."
      }
    ];

    let activeIndex = 0;
    const totalCards = cards.length;
    let isWheelLocked = false;
    let wheelDeltaAccumulator = 0;
    const WHEEL_THRESHOLD = 18;
    const WHEEL_COOLDOWN = 320;
    let pendingRepositionTimers = [];

    function clearPendingTimers() {
      if (pendingRepositionTimers.length) {
        pendingRepositionTimers.forEach(t => clearTimeout(t));
        pendingRepositionTimers = [];
      }
    }

    // Apply slot position:
    // slot  0: Active center (y = 0)
    // slot  1: Next below (y = +56vh)
    // slot -1: Prev above (y = -56vh)
    // slot  2: Offscreen below (y = +110vh, invisible)
    // slot -2: Offscreen above (y = -110vh, invisible)
    function applySlot(card, slot, animate = true) {
      if (!card) return;
      if (!animate) {
        card.style.transition = 'none';
      } else {
        card.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      }

      card.classList.remove('is-active', 'is-next', 'is-prev', 'is-hidden-card');

      if (slot === 0) {
        card.classList.add('is-active');
        card.style.transform = 'translate(-50%, -50%) scale(1)';
        card.style.opacity = '1';
        card.style.zIndex = '10';
        card.style.pointerEvents = 'auto';
      } else if (slot === 1) {
        card.classList.add('is-next');
        card.style.transform = 'translate(-50%, calc(-50% + 47vh)) scale(0.92)';
        card.style.opacity = '0.55';
        card.style.zIndex = '5';
        card.style.pointerEvents = 'auto';
      } else if (slot === -1) {
        card.classList.add('is-prev');
        card.style.transform = 'translate(-50%, calc(-50% - 47vh)) scale(0.92)';
        card.style.opacity = '0.55';
        card.style.zIndex = '5';
        card.style.pointerEvents = 'auto';
      } else if (slot === 2) {
        // Offscreen below
        card.classList.add('is-hidden-card');
        card.style.transform = 'translate(-50%, calc(-50% + 100vh)) scale(0.85)';
        card.style.opacity = '0';
        card.style.zIndex = '1';
        card.style.pointerEvents = 'none';
      } else if (slot === -2) {
        // Offscreen above
        card.classList.add('is-hidden-card');
        card.style.transform = 'translate(-50%, calc(-50% - 100vh)) scale(0.85)';
        card.style.opacity = '0';
        card.style.zIndex = '1';
        card.style.pointerEvents = 'none';
      }
    }

    function updateText(immediate = false) {
      if (!infoBox) return;
      const data = SKETCH_DATA[activeIndex] || SKETCH_DATA[0];
      if (immediate) {
        if (itemTitle) itemTitle.textContent = data.title;
        if (itemDesc) itemDesc.textContent = data.desc;
        infoBox.classList.remove('is-changing');
      } else {
        infoBox.classList.add('is-changing');
        setTimeout(() => {
          if (itemTitle) itemTitle.textContent = data.title;
          if (itemDesc) itemDesc.textContent = data.desc;
          infoBox.classList.remove('is-changing');
        }, 180);
      }
    }

    // Set initial card poses
    function setInitialPose() {
      clearPendingTimers();
      const prevIdx = (activeIndex - 1 + totalCards) % totalCards;
      const nextIdx = (activeIndex + 1) % totalCards;
      const offscreenIdx = (activeIndex + 2) % totalCards;

      applySlot(cards[activeIndex], 0, false);
      applySlot(cards[nextIdx], 1, false);
      applySlot(cards[prevIdx], -1, false);
      applySlot(cards[offscreenIdx], 2, false);

      updateText(true);
    }

    // Scroll Down / Next -> All cards move UPWARD
    function stepNext(playSound = true) {
      clearPendingTimers();
      const prevActive = activeIndex;
      activeIndex = (activeIndex + 1) % totalCards;
      if (playSound) playDebossClickSound();

      const exitIdx = (prevActive - 1 + totalCards) % totalCards; // was -1 (above)
      const centerToPrevIdx = prevActive;                       // was 0 (center)
      const nextToCenterIdx = activeIndex;                      // was 1 (below)
      const enterIdx = (activeIndex + 1) % totalCards;          // was 2 (offscreen below)

      // Ensure entering card starts cleanly at slot 2 (+100vh) without transition
      applySlot(cards[enterIdx], 2, false);
      void cards[enterIdx].offsetHeight; // Force reflow

      // Animate all cards upward in unison
      requestAnimationFrame(() => {
        applySlot(cards[exitIdx], -2, true);        // exits upward to -100vh
        applySlot(cards[centerToPrevIdx], -1, true); // 0 -> -47vh
        applySlot(cards[nextToCenterIdx], 0, true);  // +47vh -> 0
        applySlot(cards[enterIdx], 1, true);         // enters upward +100vh -> +47vh
      });

      // After exit transition completes, silently teleport exited card to slot 2 (+100vh)
      const t = setTimeout(() => {
        applySlot(cards[exitIdx], 2, false);
      }, 420);
      pendingRepositionTimers.push(t);

      updateText();
    }

    // Scroll Up / Prev -> All cards move DOWNWARD
    function stepPrev(playSound = true) {
      clearPendingTimers();
      const prevActive = activeIndex;
      activeIndex = (activeIndex - 1 + totalCards) % totalCards;
      if (playSound) playDebossClickSound();

      const exitIdx = (prevActive + 1) % totalCards;           // was 1 (below)
      const centerToNextIdx = prevActive;                      // was 0 (center)
      const prevToCenterIdx = activeIndex;                     // was -1 (above)
      const enterIdx = (activeIndex - 1 + totalCards) % totalCards; // was -2 (offscreen above)

      // Ensure entering card starts cleanly at slot -2 (-100vh) without transition
      applySlot(cards[enterIdx], -2, false);
      void cards[enterIdx].offsetHeight; // Force reflow

      // Animate all cards downward in unison
      requestAnimationFrame(() => {
        applySlot(cards[exitIdx], 2, true);          // exits downward to +100vh
        applySlot(cards[centerToNextIdx], 1, true);  // 0 -> +47vh
        applySlot(cards[prevToCenterIdx], 0, true);  // -47vh -> 0
        applySlot(cards[enterIdx], -1, true);        // enters downward -100vh -> -47vh
      });

      // After exit transition completes, silently teleport exited card to slot -2 (-100vh)
      const t = setTimeout(() => {
        applySlot(cards[exitIdx], -2, false);
      }, 420);
      pendingRepositionTimers.push(t);

      updateText();
    }

    // Scroll Wheel Interception Engine
    function onWheelScroll(e) {
      if (state.subPage !== 'sketch') return;

      e.preventDefault();
      wheelDeltaAccumulator += e.deltaY;

      if (isWheelLocked) return;

      if (Math.abs(wheelDeltaAccumulator) >= WHEEL_THRESHOLD) {
        if (wheelDeltaAccumulator > 0) {
          stepNext(false);
        } else {
          stepPrev(false);
        }

        isWheelLocked = true;
        wheelDeltaAccumulator = 0;

        setTimeout(() => {
          isWheelLocked = false;
          wheelDeltaAccumulator = 0;
        }, WHEEL_COOLDOWN);
      }
    }

    if (viewport) {
      viewport.addEventListener('wheel', onWheelScroll, { passive: false });
    }
    sketchGroup.addEventListener('wheel', onWheelScroll, { passive: false });

    // Click on cards (peeking cards click to navigate directly)
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (state.subPage !== 'sketch') return;
        const nextIdx = (activeIndex + 1) % totalCards;
        const prevIdx = (activeIndex - 1 + totalCards) % totalCards;

        if (idx === nextIdx) {
          stepNext();
        } else if (idx === prevIdx) {
          stepPrev();
        } else if (idx === activeIndex) {
          playDebossClickSound();
        }
      });
    });

    // Keyboard Arrow Keys
    window.addEventListener('keydown', (e) => {
      if (state.subPage !== 'sketch') return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === '>' || e.key === '.') {
        stepNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === '<' || e.key === ',') {
        stepPrev();
      }
    });

    // Touch Swipe Navigation for mobile / touch devices
    let touchStartY = 0;
    sketchGroup.addEventListener('touchstart', (e) => {
      if (state.subPage !== 'sketch' || !e.touches.length) return;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    sketchGroup.addEventListener('touchend', (e) => {
      if (state.subPage !== 'sketch' || !e.changedTouches.length) return;
      const touchEndY = e.changedTouches[0].clientY;
      const dy = touchEndY - touchStartY;
      if (Math.abs(dy) > 35) {
        if (dy < 0) {
          stepNext(); // swipe up -> next
        } else {
          stepPrev(); // swipe down -> prev
        }
      }
    }, { passive: true });

    // Handle window resize to re-apply poses cleanly
    window.addEventListener('resize', () => {
      if (state.subPage === 'sketch') {
        setInitialPose();
      }
    });

    // Public API for subpage navigation
    window.sketchDeckAPI = {
      refresh: () => {
        setInitialPose();
      },
      goToIndex: (idx) => {
        activeIndex = (idx + totalCards) % totalCards;
        setInitialPose();
      }
    };

    // Initial render
    setInitialPose();
  }

  /* ==========================================================================
     10. CAPTURE / PHOTOGRAPHY STREAM ENGINE (Image 15 Reference - Snap Deck)
     ========================================================================== */
  function initCapturePage(navigateToSubPage) {
    const captureGroup = document.getElementById('capture-body-group');
    const viewport = document.getElementById('capture-feed-viewport');
    const stream = document.getElementById('capture-photo-stream');
    const subTitle = document.getElementById('capture-sub-title');
    const cards = Array.from(document.querySelectorAll('.capture-photo-card'));

    if (!captureGroup || !viewport || !stream || !cards.length) return;

    // Detect and enforce landscape aspect ratio dynamically for any landscape photo
    cards.forEach(card => {
      const ar = parseFloat(card.style.getPropertyValue('--ar')) || 0;
      if (ar > 1.05) {
        card.classList.add('is-landscape');
      }
      const img = card.querySelector('img');
      if (img) {
        if (img.complete && img.naturalWidth && img.naturalHeight) {
          if (img.naturalWidth > img.naturalHeight) {
            card.classList.add('is-landscape');
            card.style.setProperty('--ar', (img.naturalWidth / img.naturalHeight).toFixed(4));
            card.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
          }
        } else {
          img.addEventListener('load', () => {
            if (img.naturalWidth > img.naturalHeight) {
              card.classList.add('is-landscape');
              card.style.setProperty('--ar', (img.naturalWidth / img.naturalHeight).toFixed(4));
              card.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
              if (state.subPage === 'capture') {
                updateDeckPose(true);
              }
            }
          });
        }
      }
    });

    let activeIndex = 0; // Starts on Card 0 (photo_01: Gallarija < Sliema, Malta >)
    const totalCards = cards.length;
    let isWheelLocked = false;
    let wheelDeltaAccumulator = 0;
    const WHEEL_THRESHOLD = 28;
    const WHEEL_COOLDOWN = 480;
    let lastActiveCardIndex = -1;
    let subTitleTimer = null;

    // Measure card step (height + gap)
    function getCardStep() {
      const card = cards[0];
      const cardH = card ? card.offsetHeight : (window.innerHeight * 0.68);
      const gap = parseFloat(getComputedStyle(stream).gap) || (window.innerHeight * 0.045);
      return cardH + gap;
    }

    // Format capture label into semantic spans so location never orphans '>' and breaks gracefully on narrow screens
    function formatCaptureLabel(raw) {
      // Builds the label from plain text only (textContent), so no text is ever read as HTML.
      const frag = document.createDocumentFragment();
      if (!raw) return frag;
      let str = String(raw).trim();
      str = str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

      const nameEl = document.createElement('span');
      nameEl.className = 'capture-label-name';
      const openIdx = str.indexOf('<');
      const closeIdx = str.lastIndexOf('>');
      if (openIdx !== -1 && closeIdx > openIdx) {
        nameEl.textContent = str.substring(0, openIdx).trim();
        const locEl = document.createElement('span');
        locEl.className = 'capture-label-location';
        locEl.textContent = '<\u00A0' + str.substring(openIdx + 1, closeIdx).trim() + '\u00A0>';
        frag.appendChild(nameEl);
        frag.appendChild(document.createTextNode(' '));
        frag.appendChild(locEl);
      } else {
        nameEl.textContent = str;
        frag.appendChild(nameEl);
      }
      return frag;
    }

    function updateDeckPose(immediate = false) {
      const vH = viewport.clientHeight || window.innerHeight;
      const activeCard = cards[activeIndex] || cards[0];
      if (!activeCard) return;

      const cardH = activeCard.offsetHeight || (activeCard.classList.contains('is-landscape') ? (vH * 0.38) : (vH * 0.68));
      const cardCenter = (activeCard.offsetTop || (activeIndex * getCardStep())) + cardH / 2;
      const targetY = (vH / 2) - cardCenter;

      if (immediate) {
        stream.style.transition = 'none';
      } else {
        stream.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
      }

      stream.style.transform = `translate3d(-50%, ${targetY}px, 0)`;

      // Update card states (active vs peeking vs offscreen)
      cards.forEach((card, idx) => {
        const diff = Math.abs(idx - activeIndex);
        card.classList.remove('is-active', 'is-peeking', 'is-hidden-card');

        if (diff === 0) {
          card.classList.add('is-active');
        } else if (diff <= 2) {
          card.classList.add('is-peeking');
        } else {
          card.classList.add('is-hidden-card');
        }
      });

      // Update subtitle label with persistent smooth fade transition on every card change
      if (activeCard && subTitle) {
        const rawLabel = activeCard.getAttribute('data-label') || '';
        const formattedHtml = formatCaptureLabel(rawLabel);

        if (subTitleTimer) {
          clearTimeout(subTitleTimer);
          subTitleTimer = null;
        }

        if (immediate) {
          subTitle.classList.remove('is-changing');
          subTitle.replaceChildren(formattedHtml);
          lastActiveCardIndex = activeIndex;
        } else {
          if (activeIndex !== lastActiveCardIndex) {
            lastActiveCardIndex = activeIndex;
            subTitle.classList.add('is-changing');
            subTitleTimer = setTimeout(() => {
              subTitle.replaceChildren(formattedHtml);
              subTitle.classList.remove('is-changing');
              subTitleTimer = null;
            }, 180);
          } else {
            subTitle.replaceChildren(formattedHtml);
            subTitle.classList.remove('is-changing');
          }
        }
      }
    }

    function stepNext(playSound = true) {
      if (activeIndex < totalCards - 1) {
        activeIndex++;
        if (playSound) playDebossClickSound();
        updateDeckPose();
      }
    }

    function stepPrev(playSound = true) {
      if (activeIndex > 0) {
        activeIndex--;
        if (playSound) playDebossClickSound();
        updateDeckPose();
      }
    }

    function goToCard(idx) {
      if (idx < 0 || idx >= totalCards || idx === activeIndex) return;
      activeIndex = idx;
      playDebossClickSound();
      updateDeckPose();
    }

    // Scroll Wheel Interception Engine
    function onWheelScroll(e) {
      if (state.subPage !== 'capture') return;

      e.preventDefault();
      wheelDeltaAccumulator += e.deltaY;

      if (isWheelLocked) return;

      if (Math.abs(wheelDeltaAccumulator) >= WHEEL_THRESHOLD) {
        if (wheelDeltaAccumulator > 0) {
          stepNext(false);
        } else {
          stepPrev(false);
        }

        isWheelLocked = true;
        wheelDeltaAccumulator = 0;

        setTimeout(() => {
          isWheelLocked = false;
          wheelDeltaAccumulator = 0;
        }, WHEEL_COOLDOWN);
      }
    }

    captureGroup.addEventListener('wheel', onWheelScroll, { passive: false });
    viewport.addEventListener('wheel', onWheelScroll, { passive: false });

    // Click on photo card snaps to that card
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (state.subPage !== 'capture') return;
        e.stopPropagation();
        if (idx !== activeIndex) {
          goToCard(idx);
        } else {
          playDebossClickSound();
        }
      });
    });

    // Keyboard Arrow navigation
    window.addEventListener('keydown', (e) => {
      if (state.subPage !== 'capture') return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === '>' || e.key === '.') {
        stepNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === '<' || e.key === ',') {
        stepPrev();
      }
    });

    // Touch Swipe Navigation
    let touchStartY = 0;
    captureGroup.addEventListener('touchstart', (e) => {
      if (state.subPage !== 'capture' || !e.touches.length) return;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    captureGroup.addEventListener('touchend', (e) => {
      if (state.subPage !== 'capture' || !e.changedTouches.length) return;
      const touchEndY = e.changedTouches[0].clientY;
      const dy = touchEndY - touchStartY;
      if (Math.abs(dy) > 35) {
        if (dy < 0) {
          stepNext();
        } else {
          stepPrev();
        }
      }
    }, { passive: true });

    // Handle resize to preserve exact active card center
    window.addEventListener('resize', () => {
      if (state.subPage === 'capture') {
        updateDeckPose(true);
      }
    });

    window.captureStreamAPI = {
      refresh: () => {
        activeIndex = 0; // Starts on Card 0 (photo_01: Gallarija < Sliema, Malta >)
        lastActiveCardIndex = -1;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            updateDeckPose(true);
          });
        });
      },
      goToIndex: (idx) => {
        goToCard(idx);
      }
    };

    // Initial positioning on load
    updateDeckPose(true);
  }

  /* ==========================================================================
     11. CONVERSATION PAGE ENGINE (Image 16 Reference - Blank Cards Stream)
     ========================================================================== */
  function initConversationPage(navigateToSubPage) {
    const convoGroup = document.getElementById('conversations-body-group');
    const viewport = document.getElementById('conversation-feed-viewport');
    const stream = document.getElementById('conversation-photo-stream');
    const cards = Array.from(document.querySelectorAll('.conversation-card'));
    const bubble = document.getElementById('conversation-bubble');
    const bubbleSvg = document.getElementById('conversation-bubble-svg');
    const bubblePath = document.getElementById('conversation-bubble-path');

    if (!convoGroup || !viewport || !stream || !cards.length) return;

    // Liquid Bubble Dynamic SVG Border and Seamless Callout Tail Updater (Image 16)
    function updateBubblePath() {
      if (!bubble || !bubbleSvg || !bubblePath) return;
      const w = bubble.offsetWidth;
      const h = bubble.offsetHeight;
      if (!w || !h) return;

      const r = Math.min(28, Math.floor(w / 4), Math.floor(h / 4));
      const tailHalfH = 14;
      // Position pointer around 75% down the bubble height (adjacent to Andrea's quotes, pointing at middle card)
      const tailCenterY = Math.min(h - r - tailHalfH - 4, Math.max(r + tailHalfH + 4, Math.round(h * 0.75)));
      const tailTopY = tailCenterY - tailHalfH;
      const tailBottomY = tailCenterY + tailHalfH;
      const tailTipX = w + 22;

      // Seamless closed path for clear liquid bubble with integrated right callout pointer
      const d = [
        `M ${r} 0`,
        `H ${w - r}`,
        `A ${r} ${r} 0 0 1 ${w} ${r}`,
        `V ${tailTopY}`,
        `L ${tailTipX} ${tailCenterY}`,
        `L ${w} ${tailBottomY}`,
        `V ${h - r}`,
        `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
        `H ${r}`,
        `A ${r} ${r} 0 0 1 0 ${h - r}`,
        `V ${r}`,
        `A ${r} ${r} 0 0 1 ${r} 0`,
        `Z`
      ].join(' ');

      bubblePath.setAttribute('d', d);
      bubbleSvg.setAttribute('width', String(w + 30));
      bubbleSvg.setAttribute('height', String(h));
    }

    // Mobile Speech Bubbles with bottom-pointing callout arrow
    function updateMobileBubbles() {
      const mobileBubbles = document.querySelectorAll('.conversation-mobile-bubble');
      mobileBubbles.forEach(b => {
        const svg = b.querySelector('.conversation-mobile-bubble-svg');
        const path = b.querySelector('.conversation-mobile-bubble-path');
        if (!svg || !path) return;
        const w = b.offsetWidth;
        const h = b.offsetHeight;
        if (!w || !h) return;

        const r = Math.min(24, Math.floor(w / 6), Math.floor(h / 6));
        const tailHalfW = 14;
        const tailCenterX = Math.round(w / 2);
        const tailLeftX = tailCenterX - tailHalfW;
        const tailRightX = tailCenterX + tailHalfW;
        const tailTipY = h + 18;

        const d = [
          `M ${r} 0`,
          `H ${w - r}`,
          `A ${r} ${r} 0 0 1 ${w} ${r}`,
          `V ${h - r}`,
          `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
          `H ${tailRightX}`,
          `L ${tailCenterX} ${tailTipY}`,
          `L ${tailLeftX} ${h}`,
          `H ${r}`,
          `A ${r} ${r} 0 0 1 0 ${h - r}`,
          `V ${r}`,
          `A ${r} ${r} 0 0 1 ${r} 0`,
          `Z`
        ].join(' ');

        path.setAttribute('d', d);
        svg.setAttribute('width', String(w));
        svg.setAttribute('height', String(h + 24));
        svg.style.width = `${w}px`;
        svg.style.height = `${h + 24}px`;
      });
    }

    if (window.ResizeObserver) {
      if (bubble) {
        const ro = new ResizeObserver(() => {
          updateBubblePath();
        });
        ro.observe(bubble);
      }
      const mobileBubbles = document.querySelectorAll('.conversation-mobile-bubble');
      mobileBubbles.forEach(b => {
        const mro = new ResizeObserver(() => {
          updateMobileBubbles();
        });
        mro.observe(b);
      });
    }

    let activeIndex = 0; // Starts on Card 0 (A.T. centered)
    const totalCards = cards.length;
    let isWheelLocked = false;
    let wheelDeltaAccumulator = 0;
    const WHEEL_THRESHOLD = 28;
    const WHEEL_COOLDOWN = 480;

    // Editorial quotes data for conversation stream cards
    const CONVERSATION_DATA = [
      {
        id: 0,
        author: 'A. J. T. :',
        quotes: [
          '< It would be nice to relax and check in on my friends and family',
          '< Pop of color',
          '< Love a lively festival like the lantern festival'
        ]
      },
      {
        id: 1,
        author: 'K.R. L. :',
        quotes: [
          '< Faster access to appliances',
          '< Collective responsibility',
          '< Privacy'
        ]
      }
    ];

    const authorEl = document.getElementById('conversation-author');
    const quoteLinesEl = document.getElementById('conversation-quote-lines');

    // Fade the whole text bubble out and in smoothly when transitioning cards (like sketch page)
    // Writes quote lines as plain text (textContent), never as HTML.
    function renderQuoteLines(data) {
      quoteLinesEl.textContent = '';
      data.quotes.forEach(q => {
        const raw = q.startsWith('< ') ? q.slice(2) : q;
        const p = document.createElement('p');
        p.className = 'conversation-quote-line';
        p.textContent = '< ' + raw;
        quoteLinesEl.appendChild(p);
      });
    }

    function updateBubbleText(immediate = false) {
      if (!bubble || !authorEl || !quoteLinesEl) return;
      const data = CONVERSATION_DATA[activeIndex] || CONVERSATION_DATA[0];

      if (immediate) {
        authorEl.textContent = data.author;
        renderQuoteLines(data);
        bubble.classList.remove('is-changing');
        updateBubblePath();
      } else {
        bubble.classList.add('is-changing');
        setTimeout(() => {
          authorEl.textContent = data.author;
          renderQuoteLines(data);
          updateBubblePath();
          requestAnimationFrame(() => {
            bubble.classList.remove('is-changing');
          });
        }, 180);
      }
    }

    function getCardStep() {
      const card = cards[0];
      const cardH = card ? card.offsetHeight : (window.innerHeight * 0.68);
      const gap = parseFloat(getComputedStyle(stream).gap) || (window.innerHeight * 0.045);
      return cardH + gap;
    }

    function updateDeckPose(immediate = false) {
      const vH = viewport.clientHeight || window.innerHeight;
      const activeCard = cards[activeIndex] || cards[0];
      if (!activeCard) return;

      const cardH = activeCard.offsetHeight || (vH * 0.68);
      const cardCenter = (activeCard.offsetTop || (activeIndex * getCardStep())) + cardH / 2;
      const targetY = (vH / 2) - cardCenter;

      if (immediate) {
        stream.style.transition = 'none';
      } else {
        stream.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
      }

      stream.style.transform = `translate3d(-50%, ${targetY}px, 0)`;

      cards.forEach((card, idx) => {
        const diff = Math.abs(idx - activeIndex);
        card.classList.remove('is-active', 'is-peeking', 'is-hidden-card');

        if (diff === 0) {
          card.classList.add('is-active');
        } else if (diff <= 2) {
          card.classList.add('is-peeking');
        } else {
          card.classList.add('is-hidden-card');
        }
      });
    }

    function stepNext(playSound = true) {
      if (activeIndex < totalCards - 1) {
        activeIndex++;
        if (playSound) playDebossClickSound();
        updateDeckPose();
        updateBubbleText(false);
      }
    }

    function stepPrev(playSound = true) {
      if (activeIndex > 0) {
        activeIndex--;
        if (playSound) playDebossClickSound();
        updateDeckPose();
        updateBubbleText(false);
      }
    }

    function goToCard(idx) {
      if (idx < 0 || idx >= totalCards || idx === activeIndex) return;
      activeIndex = idx;
      playDebossClickSound();
      updateDeckPose();
      updateBubbleText(false);
    }

    // Scroll Wheel Interception Engine (Silent on wheel scroll)
    function onWheelScroll(e) {
      if (state.subPage !== 'conversations') return;
      if (window.innerWidth <= 860) return; // Allow natural continuous scroll on mobile

      e.preventDefault();
      wheelDeltaAccumulator += e.deltaY;

      if (isWheelLocked) return;

      if (Math.abs(wheelDeltaAccumulator) >= WHEEL_THRESHOLD) {
        if (wheelDeltaAccumulator > 0) {
          stepNext(false);
        } else {
          stepPrev(false);
        }

        isWheelLocked = true;
        wheelDeltaAccumulator = 0;

        setTimeout(() => {
          isWheelLocked = false;
          wheelDeltaAccumulator = 0;
        }, WHEEL_COOLDOWN);
      }
    }

    convoGroup.addEventListener('wheel', onWheelScroll, { passive: false });
    viewport.addEventListener('wheel', onWheelScroll, { passive: false });
    window.addEventListener('wheel', (e) => {
      if (state.subPage === 'conversations') {
        onWheelScroll(e);
      }
    }, { passive: false });

    // Click on photo card snaps to that card
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (state.subPage !== 'conversations') return;
        if (window.innerWidth <= 860) return;
        e.stopPropagation();
        if (idx !== activeIndex) {
          goToCard(idx);
        } else {
          playDebossClickSound();
        }
      });
    });

    // Keyboard Arrow navigation
    window.addEventListener('keydown', (e) => {
      if (state.subPage !== 'conversations') return;
      if (window.innerWidth <= 860) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === '>' || e.key === '.') {
        stepNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === '<' || e.key === ',') {
        stepPrev();
      }
    });

    // Touch Swipe Navigation (Desktop / Tablet carousel mode only)
    let touchStartY = 0;
    convoGroup.addEventListener('touchstart', (e) => {
      if (state.subPage !== 'conversations' || !e.touches.length) return;
      if (window.innerWidth <= 860) return;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    convoGroup.addEventListener('touchend', (e) => {
      if (state.subPage !== 'conversations' || !e.changedTouches.length) return;
      if (window.innerWidth <= 860) return; // Allow natural continuous scroll on mobile
      const touchEndY = e.changedTouches[0].clientY;
      const dy = touchEndY - touchStartY;
      if (Math.abs(dy) > 35) {
        if (dy < 0) {
          stepNext();
        } else {
          stepPrev();
        }
      }
    }, { passive: true });

    // Handle resize to preserve exact active card center and bubble frame
    window.addEventListener('resize', () => {
      if (state.subPage === 'conversations') {
        updateDeckPose(true);
        updateBubblePath();
        updateMobileBubbles();
      }
    });

    window.conversationStreamAPI = {
      refresh: () => {
        activeIndex = 0; // Focus on A.T. card
        updateBubbleText(true);
        requestAnimationFrame(() => {
          updateBubblePath();
          updateMobileBubbles();
          requestAnimationFrame(() => {
            updateDeckPose(true);
            updateBubblePath();
            updateMobileBubbles();
          });
        });
      },
      goToIndex: (idx) => {
        goToCard(idx);
      },
      updateBubble: () => {
        updateBubblePath();
        updateMobileBubbles();
      }
    };

    // Initial positioning on load
    updateDeckPose(true);
    updateBubbleText(true);
    updateMobileBubbles();
  }

  /* ==========================================================================
     INITIALIZATION ON DOM LOAD
     ========================================================================== */
  window.addEventListener('DOMContentLoaded', () => {
    initNoiseCanvas();
    initEntranceInteraction();
    initInteractionTracking();
    initBioInteractions();

    document.body.classList.remove('loading-state');
    console.log('V0AULT Architecture & Movement Bio Initialized.');
  });
})();

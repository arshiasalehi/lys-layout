import { useEffect, useRef, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'lys-layout-project-inquiry'
const BASE_PATH = getBasePath()

const DETAIL_ROUTES = {
  obsidian: '/selected-works/the-obsidian-suite',
  espresso: '/selected-works/espresso-minimalist',
  arches: '/selected-works/le-plateau-arches',
  atelier: '/selected-works/the-shadow-atelier',
  pins: '/selected-works/avenue-des-pins',
  industrial: '/selected-works/industrial-refined',
}

const START_PROJECT_ROUTES = {
  typology: '/start-your-project',
  location: '/start-your-project/location',
  timeline: '/start-your-project/timeline',
  budget: '/start-your-project/budget',
  submission: '/start-your-project/submission',
}

const START_PROJECT_ORDER = ['typology', 'location', 'timeline', 'budget', 'submission']

const SITE_ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  works: '/selected-works',
  journal: '/journal',
  privacy: '/privacy-policy',
  terms: '/terms-of-service',
  start: START_PROJECT_ROUTES.typology,
}

const SITE_LINKS = {
  instagram: 'https://instagram.com',
  pinterest: 'https://pinterest.com',
  linkedin: 'https://linkedin.com',
  inquiry: 'mailto:studio@lyslayout.com',
}

const WORK_DETAIL_CONTENT = {
  obsidian: {
    projectLabel: 'Project 01',
    title: 'The Obsidian Suite',
    heroImage:
      "linear-gradient(to bottom, rgba(18, 17, 14, 0.2), rgba(18, 17, 14, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5iVqdCVOIBUorunjUEf3N3ne0iMEF0NaxmkkN_iiAF3Ajt5Xik0vSnULRqyXAYXo43c2V-u8ineeY3JqmPhIprZTqqZn5dfwYkBeLaUtATZh66dPU5I1Y9m7d-z2MDT9b7xEkFjAXJFMIB78NxerqlFOVbcdOO_5-01lX4tdP8OH8LjR5sPfiWqszvV79qp4MUSDwHPulioT7GukdyB1qE727U_YuiJAxJd6HkkGoVWQGdctcFSDgHE1eIoTOUk7tEkpAQgyzj3M')",
    heroMeta: 'Montreal, Quebec - 2024',
    quote:
      '"A sanctuary where the dialogue between shadow and stone creates a rhythm of quiet permanence."',
    location: 'Plateau Mont-Royal, Montreal',
    scope: 'Full Interior Renovation, Custom Millwork, Lighting Design',
    type: 'Residential High-End',
    bodyNote:
      'Every material was selected for its tactile resonance, from the cold touch of honed black marble to the warmth of espresso-stained oak.',
    mainImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDI1ehlzniqFmE6Jhmo5QYikOOxQSBxTcZuB0YUUhOuHasutWo7-o8jXMJ-fqtQ4As6g2q5Sm1yXfwpOrXArslKE76W26vFu-shPqq6ThNyV3LsxwcxI5Xqrr7q_KMlmGhcDg1fzgGxQiWgBZ54zRv1RjjeSkA-9mE_yUVb4b3BAgyAgT55gE4fTGCdfh2ReJmxRzbolAwrHWBYncQSpNIkq9yFiE2-IRWqaTr4ZrnjDHXKuBaURM04D7U5dnCuMV7or10_OKCtqYw',
    detailImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxjFYMGAImCX7IVolmrQ34uX--FBEvc_qydpmvdSRGOyl-gmHVLnXwDcgk8k8MW4TM8TDRuASTUsNq_gLeanmEL-ii_9PrmjPymDI5tW_wIBtgFyhCxZEPtxnIU6Kn9M_Vh1YZzDFkwZqCdEqYh9mW8aBo3Si3gMP9hMjKATNDAg5CiqEUFBeG1ZYqs3sstMdlLy8rhplRq-MGs-WHEnS8PHIWeucUZPsBzStCKCpHRNqmN9s2VM2Qh660zZKF_ee6p_MHUb3Cg5w',
    materialImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqiF5zpDu4TcrApPUlKc087B4W10trwzmp10nife41HT6tX7JPnrcUDBReia9AJcsi18NgAAcr0xLNwgMopGQ7Bhma8fIIjlhS57q9DtVmRl7-3xq8eAanGtYtR7KHfowaOzjKnq1xlpvqG4VxH0NDF2f5jZpnNuoZYipFGdnfH7EmY5jnYiiDs1GSNMf4CowkFI6OuAO-EiGXV3NLUVuaNmAOnZbRA8C2l_q5Hxg72wSa0iMZtFnK7IzoW_HpvR4IxWdEj_I2oqY',
    wideImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2TV30UcLrpTMHmzGF_c46J4SjIQ5WtVh349Q8EFEO7mShSVu9Sohs8JZBC_YUM_6-2hXiJF-jsDeVE_yugICUgEGacqHBLmnTkSCkmszB5yTKGsNIcvqDtLYLWPBky3B5utckjWAqt7IpOWO7p0ieDZYU1sK5bXoyA5mk_CuoPysqGcLNQFHP9vGiqTPlQAQq9A7X6f_T0qR3LvNFyrTx-jVzdu_SiCPTWhKxAGzHhq_361iF2MxFt-npCUfApDetGfYlHYSukbk',
  },
  espresso: {
    projectLabel: 'Project 02',
    title: 'Espresso Minimalist',
    heroImage:
      "linear-gradient(to bottom, rgba(18, 17, 14, 0.2), rgba(18, 17, 14, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqiF5zpDu4TcrApPUlKc087B4W10trwzmp10nife41HT6tX7JPnrcUDBReia9AJcsi18NgAAcr0xLNwgMopGQ7Bhma8fIIjlhS57q9DtVmRl7-3xq8eAanGtYtR7KHfowaOzjKnq1xlpvqG4VxH0NDF2f5jZpnNuoZYipFGdnfH7EmY5jnYiiDs1GSNMf4CowkFI6OuAO-EiGXV3NLUVuaNmAOnZbRA8C2l_q5Hxg72wSa0iMZtFnK7IzoW_HpvR4IxWdEj_I2oqY')",
    heroMeta: 'Le Plateau, Montreal - 2024',
    quote:
      '"Quiet millwork, warm woods, and restrained geometry shape a home that feels deeply composed."',
    location: 'Le Plateau, Montreal',
    scope: 'Kitchen Redesign, Furnishing, Lighting Refinement',
    type: 'Residential Apartment',
    bodyNote:
      'The palette favors restraint: smoked oak, tactile stone, and seamless joinery that recedes into daily ritual.',
    mainImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqiF5zpDu4TcrApPUlKc087B4W10trwzmp10nife41HT6tX7JPnrcUDBReia9AJcsi18NgAAcr0xLNwgMopGQ7Bhma8fIIjlhS57q9DtVmRl7-3xq8eAanGtYtR7KHfowaOzjKnq1xlpvqG4VxH0NDF2f5jZpnNuoZYipFGdnfH7EmY5jnYiiDs1GSNMf4CowkFI6OuAO-EiGXV3NLUVuaNmAOnZbRA8C2l_q5Hxg72wSa0iMZtFnK7IzoW_HpvR4IxWdEj_I2oqY',
    detailImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxjFYMGAImCX7IVolmrQ34uX--FBEvc_qydpmvdSRGOyl-gmHVLnXwDcgk8k8MW4TM8TDRuASTUsNq_gLeanmEL-ii_9PrmjPymDI5tW_wIBtgFyhCxZEPtxnIU6Kn9M_Vh1YZzDFkwZqCdEqYh9mW8aBo3Si3gMP9hMjKATNDAg5CiqEUFBeG1ZYqs3sstMdlLy8rhplRq-MGs-WHEnS8PHIWeucUZPsBzStCKCpHRNqmN9s2VM2Qh660zZKF_ee6p_MHUb3Cg5w',
    materialImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrRlyX0sJw5w1HhU38AenM_UBzNE5m6uJLxkse5gNJJiqRagxloInjI1uOSu-_WaoFgHsVGrmZcHd8bL59bH43dl3HFSX76eqftmrMyX9WQgKQAghp6zqOCnBsLFyihogYTdSKPmS3EZIh3HH-gE3fwYVGlCm7kcz0C5AC1MbzBnBaIr3_2-G7NhKA_YzKVLtRD_NSJcSX2FMn1mIG6WoZECAPUbfDMhFCzUxYwEOcK7FkGM0RmUguLzf_0XqY3ODN7Pqm1SsLd04',
    wideImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDI1ehlzniqFmE6Jhmo5QYikOOxQSBxTcZuB0YUUhOuHasutWo7-o8jXMJ-fqtQ4As6g2q5Sm1yXfwpOrXArslKE76W26vFu-shPqq6ThNyV3LsxwcxI5Xqrr7q_KMlmGhcDg1fzgGxQiWgBZ54zRv1RjjeSkA-9mE_yUVb4b3BAgyAgT55gE4fTGCdfh2ReJmxRzbolAwrHWBYncQSpNIkq9yFiE2-IRWqaTr4ZrnjDHXKuBaURM04D7U5dnCuMV7or10_OKCtqYw',
  },
  arches: {
    projectLabel: 'Project 03',
    title: 'Le Plateau Arches',
    heroImage:
      "linear-gradient(to bottom, rgba(18, 17, 14, 0.2), rgba(18, 17, 14, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2TV30UcLrpTMHmzGF_c46J4SjIQ5WtVh349Q8EFEO7mShSVu9Sohs8JZBC_YUM_6-2hXiJF-jsDeVE_yugICUgEGacqHBLmnTkSCkmszB5yTKGsNIcvqDtLYLWPBky3B5utckjWAqt7IpOWO7p0ieDZYU1sK5bXoyA5mk_CuoPysqGcLNQFHP9vGiqTPlQAQq9A7X6f_T0qR3LvNFyrTx-jVzdu_SiCPTWhKxAGzHhq_361iF2MxFt-npCUfApDetGfYlHYSukbk')",
    heroMeta: 'Mont-Royal, Montreal - 2024',
    quote:
      '"Soft curvature and monumental openings transform circulation into a sculpted architectural experience."',
    location: 'Mont-Royal, Montreal',
    scope: 'Architectural Reframing, Custom Openings, Interior Styling',
    type: 'Residential Heritage Conversion',
    bodyNote:
      'Arches anchor the entire composition, pairing sculptural form with a softened, amber-lit material palette.',
    mainImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2TV30UcLrpTMHmzGF_c46J4SjIQ5WtVh349Q8EFEO7mShSVu9Sohs8JZBC_YUM_6-2hXiJF-jsDeVE_yugICUgEGacqHBLmnTkSCkmszB5yTKGsNIcvqDtLYLWPBky3B5utckjWAqt7IpOWO7p0ieDZYU1sK5bXoyA5mk_CuoPysqGcLNQFHP9vGiqTPlQAQq9A7X6f_T0qR3LvNFyrTx-jVzdu_SiCPTWhKxAGzHhq_361iF2MxFt-npCUfApDetGfYlHYSukbk',
    detailImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxjFYMGAImCX7IVolmrQ34uX--FBEvc_qydpmvdSRGOyl-gmHVLnXwDcgk8k8MW4TM8TDRuASTUsNq_gLeanmEL-ii_9PrmjPymDI5tW_wIBtgFyhCxZEPtxnIU6Kn9M_Vh1YZzDFkwZqCdEqYh9mW8aBo3Si3gMP9hMjKATNDAg5CiqEUFBeG1ZYqs3sstMdlLy8rhplRq-MGs-WHEnS8PHIWeucUZPsBzStCKCpHRNqmN9s2VM2Qh660zZKF_ee6p_MHUb3Cg5w',
    materialImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqiF5zpDu4TcrApPUlKc087B4W10trwzmp10nife41HT6tX7JPnrcUDBReia9AJcsi18NgAAcr0xLNwgMopGQ7Bhma8fIIjlhS57q9DtVmRl7-3xq8eAanGtYtR7KHfowaOzjKnq1xlpvqG4VxH0NDF2f5jZpnNuoZYipFGdnfH7EmY5jnYiiDs1GSNMf4CowkFI6OuAO-EiGXV3NLUVuaNmAOnZbRA8C2l_q5Hxg72wSa0iMZtFnK7IzoW_HpvR4IxWdEj_I2oqY',
    wideImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5iVqdCVOIBUorunjUEf3N3ne0iMEF0NaxmkkN_iiAF3Ajt5Xik0vSnULRqyXAYXo43c2V-u8ineeY3JqmPhIprZTqqZn5dfwYkBeLaUtATZh66dPU5I1Y9m7d-z2MDT9b7xEkFjAXJFMIB78NxerqlFOVbcdOO_5-01lX4tdP8OH8LjR5sPfiWqszvV79qp4MUSDwHPulioT7GukdyB1qE727U_YuiJAxJd6HkkGoVWQGdctcFSDgHE1eIoTOUk7tEkpAQgyzj3M',
  },
  atelier: {
    projectLabel: 'Project 04',
    title: 'The Shadow Atelier',
    heroImage:
      "linear-gradient(to bottom, rgba(18, 17, 14, 0.2), rgba(18, 17, 14, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxjFYMGAImCX7IVolmrQ34uX--FBEvc_qydpmvdSRGOyl-gmHVLnXwDcgk8k8MW4TM8TDRuASTUsNq_gLeanmEL-ii_9PrmjPymDI5tW_wIBtgFyhCxZEPtxnIU6Kn9M_Vh1YZzDFkwZqCdEqYh9mW8aBo3Si3gMP9hMjKATNDAg5CiqEUFBeG1ZYqs3sstMdlLy8rhplRq-MGs-WHEnS8PHIWeucUZPsBzStCKCpHRNqmN9s2VM2Qh660zZKF_ee6p_MHUb3Cg5w')",
    heroMeta: 'Old Port, Montreal - 2024',
    quote:
      '"Texture, shadow, and craft converge in a studio environment that feels both intimate and ceremonial."',
    location: 'Old Port, Montreal',
    scope: 'Creative Studio Design, Display Systems, Lighting Mood Studies',
    type: 'Boutique Commercial',
    bodyNote:
      'The atelier balances gallery restraint with warm, tactile detailing intended to slow the viewer down.',
    mainImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxjFYMGAImCX7IVolmrQ34uX--FBEvc_qydpmvdSRGOyl-gmHVLnXwDcgk8k8MW4TM8TDRuASTUsNq_gLeanmEL-ii_9PrmjPymDI5tW_wIBtgFyhCxZEPtxnIU6Kn9M_Vh1YZzDFkwZqCdEqYh9mW8aBo3Si3gMP9hMjKATNDAg5CiqEUFBeG1ZYqs3sstMdlLy8rhplRq-MGs-WHEnS8PHIWeucUZPsBzStCKCpHRNqmN9s2VM2Qh660zZKF_ee6p_MHUb3Cg5w',
    detailImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDI1ehlzniqFmE6Jhmo5QYikOOxQSBxTcZuB0YUUhOuHasutWo7-o8jXMJ-fqtQ4As6g2q5Sm1yXfwpOrXArslKE76W26vFu-shPqq6ThNyV3LsxwcxI5Xqrr7q_KMlmGhcDg1fzgGxQiWgBZ54zRv1RjjeSkA-9mE_yUVb4b3BAgyAgT55gE4fTGCdfh2ReJmxRzbolAwrHWBYncQSpNIkq9yFiE2-IRWqaTr4ZrnjDHXKuBaURM04D7U5dnCuMV7or10_OKCtqYw',
    materialImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqiF5zpDu4TcrApPUlKc087B4W10trwzmp10nife41HT6tX7JPnrcUDBReia9AJcsi18NgAAcr0xLNwgMopGQ7Bhma8fIIjlhS57q9DtVmRl7-3xq8eAanGtYtR7KHfowaOzjKnq1xlpvqG4VxH0NDF2f5jZpnNuoZYipFGdnfH7EmY5jnYiiDs1GSNMf4CowkFI6OuAO-EiGXV3NLUVuaNmAOnZbRA8C2l_q5Hxg72wSa0iMZtFnK7IzoW_HpvR4IxWdEj_I2oqY',
    wideImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2TV30UcLrpTMHmzGF_c46J4SjIQ5WtVh349Q8EFEO7mShSVu9Sohs8JZBC_YUM_6-2hXiJF-jsDeVE_yugICUgEGacqHBLmnTkSCkmszB5yTKGsNIcvqDtLYLWPBky3B5utckjWAqt7IpOWO7p0ieDZYU1sK5bXoyA5mk_CuoPysqGcLNQFHP9vGiqTPlQAQq9A7X6f_T0qR3LvNFyrTx-jVzdu_SiCPTWhKxAGzHhq_361iF2MxFt-npCUfApDetGfYlHYSukbk',
  },
  pins: {
    projectLabel: 'Project 05',
    title: 'Avenue des Pins',
    heroImage:
      "linear-gradient(to bottom, rgba(18, 17, 14, 0.2), rgba(18, 17, 14, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5iVqdCVOIBUorunjUEf3N3ne0iMEF0NaxmkkN_iiAF3Ajt5Xik0vSnULRqyXAYXo43c2V-u8ineeY3JqmPhIprZTqqZn5dfwYkBeLaUtATZh66dPU5I1Y9m7d-z2MDT9b7xEkFjAXJFMIB78NxerqlFOVbcdOO_5-01lX4tdP8OH8LjR5sPfiWqszvV79qp4MUSDwHPulioT7GukdyB1qE727U_YuiJAxJd6HkkGoVWQGdctcFSDgHE1eIoTOUk7tEkpAQgyzj3M')",
    heroMeta: 'Downtown, Montreal - 2024',
    quote:
      '"A penthouse shaped by panoramic light, restrained luxury, and architectural calm above the city."',
    location: 'Downtown, Montreal',
    scope: 'Penthouse Planning, Custom Furniture, Art Integration',
    type: 'Residential Penthouse',
    bodyNote:
      'Every intervention was calibrated to frame the skyline while preserving a feeling of stillness inside.',
    mainImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5iVqdCVOIBUorunjUEf3N3ne0iMEF0NaxmkkN_iiAF3Ajt5Xik0vSnULRqyXAYXo43c2V-u8ineeY3JqmPhIprZTqqZn5dfwYkBeLaUtATZh66dPU5I1Y9m7d-z2MDT9b7xEkFjAXJFMIB78NxerqlFOVbcdOO_5-01lX4tdP8OH8LjR5sPfiWqszvV79qp4MUSDwHPulioT7GukdyB1qE727U_YuiJAxJd6HkkGoVWQGdctcFSDgHE1eIoTOUk7tEkpAQgyzj3M',
    detailImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxjFYMGAImCX7IVolmrQ34uX--FBEvc_qydpmvdSRGOyl-gmHVLnXwDcgk8k8MW4TM8TDRuASTUsNq_gLeanmEL-ii_9PrmjPymDI5tW_wIBtgFyhCxZEPtxnIU6Kn9M_Vh1YZzDFkwZqCdEqYh9mW8aBo3Si3gMP9hMjKATNDAg5CiqEUFBeG1ZYqs3sstMdlLy8rhplRq-MGs-WHEnS8PHIWeucUZPsBzStCKCpHRNqmN9s2VM2Qh660zZKF_ee6p_MHUb3Cg5w',
    materialImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqiF5zpDu4TcrApPUlKc087B4W10trwzmp10nife41HT6tX7JPnrcUDBReia9AJcsi18NgAAcr0xLNwgMopGQ7Bhma8fIIjlhS57q9DtVmRl7-3xq8eAanGtYtR7KHfowaOzjKnq1xlpvqG4VxH0NDF2f5jZpnNuoZYipFGdnfH7EmY5jnYiiDs1GSNMf4CowkFI6OuAO-EiGXV3NLUVuaNmAOnZbRA8C2l_q5Hxg72wSa0iMZtFnK7IzoW_HpvR4IxWdEj_I2oqY',
    wideImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDI1ehlzniqFmE6Jhmo5QYikOOxQSBxTcZuB0YUUhOuHasutWo7-o8jXMJ-fqtQ4As6g2q5Sm1yXfwpOrXArslKE76W26vFu-shPqq6ThNyV3LsxwcxI5Xqrr7q_KMlmGhcDg1fzgGxQiWgBZ54zRv1RjjeSkA-9mE_yUVb4b3BAgyAgT55gE4fTGCdfh2ReJmxRzbolAwrHWBYncQSpNIkq9yFiE2-IRWqaTr4ZrnjDHXKuBaURM04D7U5dnCuMV7or10_OKCtqYw',
  },
  industrial: {
    projectLabel: 'Project 06',
    title: 'Industrial Refined',
    heroImage:
      "linear-gradient(to bottom, rgba(18, 17, 14, 0.2), rgba(18, 17, 14, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrRlyX0sJw5w1HhU38AenM_UBzNE5m6uJLxkse5gNJJiqRagxloInjI1uOSu-_WaoFgHsVGrmZcHd8bL59bH43dl3HFSX76eqftmrMyX9WQgKQAghp6zqOCnBsLFyihogYTdSKPmS3EZIh3HH-gE3fwYVGlCm7kcz0C5AC1MbzBnBaIr3_2-G7NhKA_YzKVLtRD_NSJcSX2FMn1mIG6WoZECAPUbfDMhFCzUxYwEOcK7FkGM0RmUguLzf_0XqY3ODN7Pqm1SsLd04')",
    heroMeta: 'Griffintown, Montreal - 2024',
    quote:
      '"Steel, shadow, and softened upholstery temper the industrial shell into something deeply livable."',
    location: 'Griffintown, Montreal',
    scope: 'Loft Transformation, Material Layering, Custom Lighting',
    type: 'Residential Loft',
    bodyNote:
      'The project balances raw structure with a quieter residential softness, preserving edge without losing warmth.',
    mainImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrRlyX0sJw5w1HhU38AenM_UBzNE5m6uJLxkse5gNJJiqRagxloInjI1uOSu-_WaoFgHsVGrmZcHd8bL59bH43dl3HFSX76eqftmrMyX9WQgKQAghp6zqOCnBsLFyihogYTdSKPmS3EZIh3HH-gE3fwYVGlCm7kcz0C5AC1MbzBnBaIr3_2-G7NhKA_YzKVLtRD_NSJcSX2FMn1mIG6WoZECAPUbfDMhFCzUxYwEOcK7FkGM0RmUguLzf_0XqY3ODN7Pqm1SsLd04',
    detailImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxjFYMGAImCX7IVolmrQ34uX--FBEvc_qydpmvdSRGOyl-gmHVLnXwDcgk8k8MW4TM8TDRuASTUsNq_gLeanmEL-ii_9PrmjPymDI5tW_wIBtgFyhCxZEPtxnIU6Kn9M_Vh1YZzDFkwZqCdEqYh9mW8aBo3Si3gMP9hMjKATNDAg5CiqEUFBeG1ZYqs3sstMdlLy8rhplRq-MGs-WHEnS8PHIWeucUZPsBzStCKCpHRNqmN9s2VM2Qh660zZKF_ee6p_MHUb3Cg5w',
    materialImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqiF5zpDu4TcrApPUlKc087B4W10trwzmp10nife41HT6tX7JPnrcUDBReia9AJcsi18NgAAcr0xLNwgMopGQ7Bhma8fIIjlhS57q9DtVmRl7-3xq8eAanGtYtR7KHfowaOzjKnq1xlpvqG4VxH0NDF2f5jZpnNuoZYipFGdnfH7EmY5jnYiiDs1GSNMf4CowkFI6OuAO-EiGXV3NLUVuaNmAOnZbRA8C2l_q5Hxg72wSa0iMZtFnK7IzoW_HpvR4IxWdEj_I2oqY',
    wideImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2TV30UcLrpTMHmzGF_c46J4SjIQ5WtVh349Q8EFEO7mShSVu9Sohs8JZBC_YUM_6-2hXiJF-jsDeVE_yugICUgEGacqHBLmnTkSCkmszB5yTKGsNIcvqDtLYLWPBky3B5utckjWAqt7IpOWO7p0ieDZYU1sK5bXoyA5mk_CuoPysqGcLNQFHP9vGiqTPlQAQq9A7X6f_T0qR3LvNFyrTx-jVzdu_SiCPTWhKxAGzHhq_361iF2MxFt-npCUfApDetGfYlHYSukbk',
  },
}

const NAV_ITEMS = [
  { label: 'Home', href: SITE_ROUTES.home },
  { label: 'Philosophy', href: SITE_ROUTES.about },
  { label: 'Works', href: SITE_ROUTES.works },
  { label: 'Services', href: SITE_ROUTES.services },
  { label: 'Journal', href: SITE_ROUTES.journal },
]

const HOME_FEATURES = [
  {
    icon: 'flare',
    title: 'Cinematic Vision',
    description: 'Dramatic lighting compositions that tell a silent story.',
  },
  {
    icon: 'texture',
    title: 'Refined Materials',
    description: 'Layered stone, smoked oak, and custom finishes chosen for depth and restraint.',
  },
]

const WORK_PREVIEWS = [
  {
    key: 'obsidian',
    title: 'The Obsidian Suite',
    label: 'Project 01',
    location: 'Westmount, Montreal',
    alt: 'Luxury suite with black marble and dark tones',
    homeClass: 'group relative aspect-[3/4] overflow-hidden rounded-lg bg-espresso',
    workClass: 'relative aspect-[3/4.5] overflow-hidden rounded-[80px_80px_1rem_1rem] bg-espresso',
  },
  {
    key: 'espresso',
    title: 'Espresso Minimalist',
    label: 'Project 02',
    location: 'Le Plateau, Montreal',
    alt: 'Minimalist espresso wood kitchen interior',
    homeClass:
      'group relative mt-12 aspect-[3/4] overflow-hidden rounded-lg bg-espresso md:mt-0 md:translate-y-12',
    workClass: 'relative aspect-square overflow-hidden rounded-[100px_100px_1rem_1rem] bg-espresso',
  },
  {
    key: 'arches',
    title: 'Le Plateau Arches',
    label: 'Project 03',
    location: 'Mont-Royal, Montreal',
    alt: 'Modern arches in a high-end architectural space',
    homeClass: 'group relative aspect-[3/4] overflow-hidden rounded-lg bg-espresso',
    workClass: 'relative aspect-[3/4] overflow-hidden rounded-[120px_120px_1rem_1rem] bg-espresso',
  },
  {
    key: 'atelier',
    title: 'The Shadow Atelier',
    label: 'Project 04',
    location: 'Old Port, Montreal',
    alt: 'Boutique atelier with shadow-driven lighting',
    workClass: 'relative aspect-[4/5] overflow-hidden rounded-[100px_100px_1rem_1rem] bg-espresso',
  },
  {
    key: 'pins',
    title: 'Avenue des Pins',
    label: 'Project 05',
    location: 'Downtown, Montreal',
    alt: 'Penthouse interior with panoramic city light',
    workClass: 'relative aspect-[2/3] overflow-hidden rounded-[150px_150px_1rem_1rem] bg-espresso',
  },
  {
    key: 'industrial',
    title: 'Industrial Refined',
    label: 'Project 06',
    location: 'Griffintown, Montreal',
    alt: 'Industrial loft softened with custom upholstery',
    workClass: 'relative aspect-[3/4] overflow-hidden rounded-[90px_90px_1rem_1rem] bg-espresso',
  },
]

const SERVICES_OVERVIEW = [
  {
    number: '01',
    title: 'Residential Architecture',
    description: 'Full-scale spatial planning for luxury homes.',
  },
  {
    number: '02',
    title: 'Interior Curatorship',
    description: 'Sourcing rare furniture and bespoke artifacts.',
  },
  {
    number: '03',
    title: 'Lighting Choreography',
    description: 'A rigorous approach to atmospheric illumination.',
  },
]

const RECOGNITION_ITEMS = [
  {
    publication: 'AD Collector 2024',
    title: '"Redefining the Dark Interior"',
    description: 'A deep dive into the sculptural lighting of our Obsidian project.',
  },
  {
    publication: 'Elle Decor',
    title: '"The Poetry of Stone"',
    description: "Showcasing the materiality of Julianne's latest residential works.",
  },
  {
    publication: 'Vogue Living',
    title: '"Atmospheric Mastery"',
    description: 'How Lys & Layout curates silence through design.',
  },
  {
    publication: 'Design Anthology',
    title: '"The Tactile Home"',
    description: 'Exploration of custom millwork and raw textures.',
  },
]

const JOURNAL_ENTRIES = [
  {
    tag: 'Press Feature',
    title: 'Redefining the dark interior.',
    description:
      "An editorial look at how sculptural lighting and tonal layering define the studio's most cinematic work.",
    href: DETAIL_ROUTES.obsidian,
    cta: 'Read through the Obsidian Suite',
  },
  {
    tag: 'Studio Essay',
    title: 'Material memory and quiet permanence.',
    description:
      'Why wood, stone, and metal are treated as emotional materials rather than simple finishes.',
    href: SITE_ROUTES.about,
    cta: 'Visit the studio philosophy',
  },
  {
    tag: 'Project Notes',
    title: 'How restraint shapes a room.',
    description:
      'A closer look at pacing, negative space, and why the quietest gestures often carry the most weight.',
    href: SITE_ROUTES.services,
    cta: 'Explore the studio process',
  },
]

const SERVICE_ITEMS = [
  {
    number: '01',
    title: 'Interior Architecture',
    description:
      'Comprehensive spatial planning and structural design that harmonizes form and function.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASq0nZyRdkDLJ3fDM7ag0wBtjs0lbN6kcer7Eu3gd0YrMVhoS7a54C3QqrHX6PAVmWwGX8goaoI5O1LBWYXQFI-3VxkILXP-Ym3PZUxj9RlUBYZv2EnOKjKbf2bu_hgIQ5iIg_VNr6_fXaZdmnfEZBvVpyvps1e5Vo9AZQw-Y8tapGPQjchE7PH85Q6c9aG8K2CyI0hYoTAebVSp1i8dQlyESnjh3yNMdUDioytmeTN62lkPe6gcN7atqXOlT6jg0wZBl2Uqlqpgo',
  },
  {
    number: '02',
    title: 'Bespoke Furnishing',
    description:
      'Curated furniture selections and custom commissions that define your unique signature.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYn_6yDuwfEmL9TPsEgme0jgnWzt9cx8anf_3TMPrLpEqhpOrwVlVIRJf-FpsAUpMnh6I5ubsG-CvAzTOuZmfUgNT_vXajquiEk-j_2dyfNj_ZbBH21e2SNiRNiFFWH-lS1AvB6F498DIqYw-yhlPjTT91plM7Kdrk_sxPOia3w6G9D1H_ckJZPXbhE9HOEXeesOzCreIxyeZ9ymMg9SRXKEEY9Vt1zzUOVJLqFlyGK92atvkTToeKj10ptcQY_GYVGkHauKuZaD0',
  },
  {
    number: '03',
    title: 'Art Curation',
    description:
      'Sourcing original artworks that resonate with your space and personal narrative.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDhfjIbCRNGk23lH14iNd34hNy5jahI7P9UX549fZD-Pp3gSqudLZvO8A2vwoe2WDegCN5Q92XtCqEKaNZyehO0mG6hpsSciKrtFaCeGA_xOmtshgpFwWmgSwHS9dUJu6gmT3rbLUgGivRGv0zDbe6-EsTqnaUEpUuWw6MZGG7416TfP3bjYzSCqZ4aYuM8-ibmo9PzvjHO1Z1JxFODgt0hvVrkOKU9OD2luW375nf3OKnW__wm3JnE-fCNVYEZ3r_-arZMZ8DdaX8',
  },
]

const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Exploring your lifestyle, aspirations, and the unique potential of your space.',
  },
  {
    number: '02',
    title: 'Concept',
    description: 'Developing the visual narrative, materiality, and structural flow.',
  },
  {
    number: '03',
    title: 'Realization',
    description: 'Meticulous project management and craftsmanship to bring the vision to life.',
  },
  {
    number: '04',
    title: 'Final Touch',
    description: 'Curating the final details and styling for a seamless transition into your new home.',
  },
]

const TYPOLOGY_OPTIONS = [
  {
    value: 'Residential',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5iVqdCVOIBUorunjUEf3N3ne0iMEF0NaxmkkN_iiAF3Ajt5Xik0vSnULRqyXAYXo43c2V-u8ineeY3JqmPhIprZTqqZn5dfwYkBeLaUtATZh66dPU5I1Y9m7d-z2MDT9b7xEkFjAXJFMIB78NxerqlFOVbcdOO_5-01lX4tdP8OH8LjR5sPfiWqszvV79qp4MUSDwHPulioT7GukdyB1qE727U_YuiJAxJd6HkkGoVWQGdctcFSDgHE1eIoTOUk7tEkpAQgyzj3M',
  },
  {
    value: 'Commercial',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2TV30UcLrpTMHmzGF_c46J4SjIQ5WtVh349Q8EFEO7mShSVu9Sohs8JZBC_YUM_6-2hXiJF-jsDeVE_yugICUgEGacqHBLmnTkSCkmszB5yTKGsNIcvqDtLYLWPBky3B5utckjWAqt7IpOWO7p0ieDZYU1sK5bXoyA5mk_CuoPysqGcLNQFHP9vGiqTPlQAQq9A7X6f_T0qR3LvNFyrTx-jVzdu_SiCPTWhKxAGzHhq_361iF2MxFt-npCUfApDetGfYlHYSukbk',
  },
]

const TIMELINE_OPTIONS = [
  {
    value: 'Immediate',
    description: 'Ready to begin conceptualization now',
  },
  {
    value: '3-6 Months',
    description: 'Planning for the near future',
  },
  {
    value: '6+ Months',
    description: 'Early stages of a longer-term vision',
  },
]

const BUDGET_OPTIONS = [
  {
    value: '$50k - $100k',
    description: 'Curated Refresh',
  },
  {
    value: '$100k - $250k',
    description: 'Bespoke Refinement',
  },
  {
    value: '$250k - $500k',
    description: 'Full Transformation',
  },
  {
    value: '$500k+',
    description: 'Grand Scale Vision',
  },
]

function normalizePath(pathname) {
  const strippedPath = stripBasePath(pathname)

  if (!strippedPath || strippedPath === '/') {
    return '/'
  }

  return strippedPath.replace(/\/+$/, '')
}

function getCurrentRoute() {
  return {
    pathname: normalizePath(window.location.pathname),
    hash: window.location.hash || '',
  }
}

function getStartProjectStep(pathname) {
  if (pathname === START_PROJECT_ROUTES.typology) {
    return 'typology'
  }

  return START_PROJECT_ORDER.find((step) => START_PROJECT_ROUTES[step] === pathname) || null
}

function getWorkDetailKey(pathname) {
  return Object.entries(DETAIL_ROUTES).find(([, route]) => route === pathname)?.[0] || null
}

function isModifiedClick(event) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0
}

function isInternalHref(href) {
  if (!href) {
    return false
  }

  try {
    const url = new URL(href, window.location.origin)
    return url.origin === window.location.origin
  } catch {
    return false
  }
}

function getBasePath() {
  const viteBase = import.meta.env.BASE_URL || '/'
  const normalized = viteBase.endsWith('/') ? viteBase.slice(0, -1) : viteBase

  return normalized === '' || normalized === '/' ? '' : normalized
}

function stripBasePath(pathname = '/') {
  if (!BASE_PATH) {
    return pathname || '/'
  }

  if (pathname === BASE_PATH) {
    return '/'
  }

  if (pathname.startsWith(`${BASE_PATH}/`)) {
    return pathname.slice(BASE_PATH.length) || '/'
  }

  return pathname || '/'
}

function addBasePath(pathname = '/') {
  if (!BASE_PATH) {
    return pathname || '/'
  }

  if (!pathname || pathname === '/') {
    return `${BASE_PATH}/`
  }

  return `${BASE_PATH}${pathname}`
}

function createDefaultInquiryState() {
  return {
    projectType: '',
    city: '',
    propertyType: '',
    timeline: '',
    budget: '',
    fullName: '',
    email: '',
    phone: '',
    message: '',
    fileNames: [],
  }
}

function loadInquiryState() {
  if (typeof window === 'undefined') {
    return createDefaultInquiryState()
  }

  try {
    const savedValue = window.localStorage.getItem(STORAGE_KEY)

    if (!savedValue) {
      return createDefaultInquiryState()
    }

    return {
      ...createDefaultInquiryState(),
      ...JSON.parse(savedValue),
    }
  } catch {
    return createDefaultInquiryState()
  }
}

function canContinueStep(step, inquiryState) {
  switch (step) {
    case 'typology':
      return Boolean(inquiryState.projectType)
    case 'location':
      return Boolean(inquiryState.city.trim()) && Boolean(inquiryState.propertyType.trim())
    case 'timeline':
      return Boolean(inquiryState.timeline)
    case 'budget':
      return Boolean(inquiryState.budget)
    case 'submission':
      return (
        Boolean(inquiryState.fullName.trim()) &&
        Boolean(inquiryState.email.trim()) &&
        Boolean(inquiryState.message.trim())
      )
    default:
      return false
  }
}

function buildMailtoLink(inquiryState) {
  const lines = [
    'Hello Lys & Layout,',
    '',
    'I would like to start a project inquiry.',
    '',
    `Project Type: ${inquiryState.projectType || 'Not specified'}`,
    `City: ${inquiryState.city || 'Not specified'}`,
    `Property Type: ${inquiryState.propertyType || 'Not specified'}`,
    `Timeline: ${inquiryState.timeline || 'Not specified'}`,
    `Budget: ${inquiryState.budget || 'Not specified'}`,
    '',
    'Project Vision:',
    inquiryState.message || 'Not provided',
    '',
    `Name: ${inquiryState.fullName || 'Not provided'}`,
    `Email: ${inquiryState.email || 'Not provided'}`,
    `Phone: ${inquiryState.phone || 'Not provided'}`,
    '',
    `Reference Files: ${inquiryState.fileNames.length > 0 ? inquiryState.fileNames.join(', ') : 'None attached in browser form'}`,
  ]

  const subject = encodeURIComponent(
    `Project Inquiry - ${inquiryState.projectType || 'New Project'}`
  )
  const body = encodeURIComponent(lines.join('\n'))

  return `${SITE_LINKS.inquiry}?subject=${subject}&body=${body}`
}

function getPageTitle(pathname, workDetailKey, startProjectStep) {
  if (workDetailKey) {
    return `${WORK_DETAIL_CONTENT[workDetailKey].title} | Lys & Layout`
  }

  if (startProjectStep) {
    return `Start Your Project | Lys & Layout`
  }

  if (pathname === SITE_ROUTES.about) {
    return 'About | Lys & Layout'
  }

  if (pathname === SITE_ROUTES.services) {
    return 'Services | Lys & Layout'
  }

  if (pathname === SITE_ROUTES.works) {
    return 'Selected Works | Lys & Layout'
  }

  if (pathname === SITE_ROUTES.journal) {
    return 'Journal | Lys & Layout'
  }

  if (pathname === SITE_ROUTES.privacy) {
    return 'Privacy Policy | Lys & Layout'
  }

  if (pathname === SITE_ROUTES.terms) {
    return 'Terms of Service | Lys & Layout'
  }

  return 'Lys & Layout | Interior Design Studio'
}

function App() {
  const [route, setRoute] = useState(() => getCurrentRoute())
  const [inquiryState, setInquiryState] = useState(() => loadInquiryState())

  const pathname = route.pathname
  const isAboutPage = pathname === SITE_ROUTES.about
  const isJournalPage = pathname === SITE_ROUTES.journal
  const isPrivacyPage = pathname === SITE_ROUTES.privacy
  const isTermsPage = pathname === SITE_ROUTES.terms
  const isServicesPage = pathname === SITE_ROUTES.services
  const startProjectStep = getStartProjectStep(pathname)
  const isSelectedWorksPage = pathname === SITE_ROUTES.works
  const workDetailKey = getWorkDetailKey(pathname)
  const isWorkDetailPage = Boolean(workDetailKey)

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getCurrentRoute())
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('hashchange', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('hashchange', handlePopState)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiryState))
  }, [inquiryState])

  useEffect(() => {
    document.documentElement.classList.add('dark')

    document.body.className = isSelectedWorksPage
      ? 'bg-work-carbon font-display text-slate-100 antialiased overflow-x-hidden'
      : isAboutPage || isJournalPage
        ? 'bg-about-background-dark plaster-texture font-display text-slate-100 antialiased overflow-x-hidden'
        : isPrivacyPage || isTermsPage
          ? 'bg-background-dark font-display text-slate-100 antialiased overflow-x-hidden'
          : startProjectStep
            ? 'bg-flow-espresso font-display text-slate-100 antialiased overflow-x-hidden'
            : isServicesPage
              ? 'bg-background-light dark:bg-services-background-dark font-display text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300'
              : isWorkDetailPage
                ? 'bg-background-dark font-display text-slate-100 antialiased overflow-x-hidden'
                : 'bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden'
  }, [
    isAboutPage,
    isJournalPage,
    isPrivacyPage,
    isTermsPage,
    isServicesPage,
    startProjectStep,
    isSelectedWorksPage,
    isWorkDetailPage,
  ])

  useEffect(() => {
    document.title = getPageTitle(pathname, workDetailKey, startProjectStep)
  }, [pathname, startProjectStep, workDetailKey])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (route.hash) {
        const target = document.getElementById(route.hash.slice(1))

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [route])

  function navigate(href, options = {}) {
    if (!href) {
      return
    }

    if (!isInternalHref(href)) {
      window.location.href = href
      return
    }

    const url = new URL(href, window.location.origin)
    const nextRoute = {
      pathname: normalizePath(url.pathname),
      hash: url.hash || '',
    }
    const nextHref = `${nextRoute.pathname}${nextRoute.hash}`
    const currentHref = `${route.pathname}${route.hash}`

    if (nextHref === currentHref) {
      if (nextRoute.hash) {
        const target = document.getElementById(nextRoute.hash.slice(1))
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }

    if (options.replace) {
      window.history.replaceState({}, '', addBasePath(nextHref))
    } else {
      window.history.pushState({}, '', addBasePath(nextHref))
    }

    setRoute(nextRoute)
  }

  const sharedProps = {
    currentPath: pathname,
    inquiryState,
    navigate,
    setInquiryState,
  }

  if (startProjectStep) {
    return <StartProjectPage step={startProjectStep} {...sharedProps} />
  }

  if (isAboutPage) {
    return <AboutPage {...sharedProps} />
  }

  if (isJournalPage) {
    return <JournalPage {...sharedProps} />
  }

  if (isPrivacyPage) {
    return <PolicyPage type="privacy" {...sharedProps} />
  }

  if (isTermsPage) {
    return <PolicyPage type="terms" {...sharedProps} />
  }

  if (isServicesPage) {
    return <ServicesPage {...sharedProps} />
  }

  if (isSelectedWorksPage) {
    return <SelectedWorksPage {...sharedProps} />
  }

  if (isWorkDetailPage) {
    return <WorkDetailPage workKey={workDetailKey} {...sharedProps} />
  }

  return <HomePage {...sharedProps} />
}

function AppLink({ href, navigate, className, children, onClick, ...props }) {
  const isInternal = isInternalHref(href)
  const resolvedHref = isInternal ? addBasePath(href) : href

  return (
    <a
      className={className}
      href={resolvedHref}
      onClick={(event) => {
        onClick?.(event)

        if (event.defaultPrevented || !isInternal || props.target === '_blank' || isModifiedClick(event)) {
          return
        }

        event.preventDefault()
        navigate(href)
      }}
      {...props}
    >
      {children}
    </a>
  )
}

function SiteHeader({
  currentPath,
  navigate,
  actionLabel = 'Inquire',
  actionHref = SITE_ROUTES.start,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 px-4 py-4 backdrop-blur-md sm:px-6 sm:py-5 lg:px-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <AppLink className="flex items-center gap-2 sm:gap-3" href={SITE_ROUTES.home} navigate={navigate}>
            <span className="material-symbols-outlined text-2xl text-primary">architecture</span>
            <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-white">
              Lys &amp; Layout
            </h2>
          </AppLink>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href

              return (
                <AppLink
                  key={item.href}
                  className={`uppercase transition-colors ${
                    isActive
                      ? 'text-[10px] font-bold tracking-[0.3em] text-primary'
                      : 'text-[10px] font-bold tracking-[0.3em] text-white hover:text-primary'
                  }`}
                  href={item.href}
                  navigate={navigate}
                >
                  {item.label}
                </AppLink>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <AppLink
              className="hidden h-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-6 text-[10px] font-black uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-background-dark sm:flex"
              href={actionHref}
              navigate={navigate}
            >
              {actionLabel}
            </AppLink>
            <button
              aria-controls="mobile-site-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-primary/40 hover:text-primary md:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <button
          aria-label="Close menu overlay"
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          type="button"
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-xs flex-col border-l border-white/10 bg-background-dark px-5 pb-8 pt-20 shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          id="mobile-site-menu"
        >
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href

              return (
                <AppLink
                  key={item.href}
                  className={`border-b pb-4 text-sm font-bold uppercase tracking-[0.3em] transition-colors ${
                    isActive
                      ? 'border-primary/40 text-primary'
                      : 'border-white/5 text-white hover:text-primary'
                  }`}
                  href={item.href}
                  navigate={navigate}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </AppLink>
              )
            })}
          </nav>

          <div className="mt-10">
            <AppLink
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-6 text-[10px] font-black uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-background-dark"
              href={actionHref}
              navigate={navigate}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {actionLabel}
            </AppLink>
          </div>
        </aside>
      </div>
    </>
  )
}

function SiteFooter({ navigate, tone = 'dark' }) {
  const backgroundClasses =
    tone === 'light'
      ? 'border-slate-800 bg-services-background-dark text-slate-500'
      : tone === 'about'
        ? 'plaster-texture border-white/5 bg-carbon text-slate-500'
        : tone === 'flow'
          ? 'border-white/5 bg-flow-espresso text-slate-500'
          : 'border-white/5 bg-carbon text-slate-500'

  return (
    <footer className={`border-t px-6 py-16 lg:px-20 ${backgroundClasses}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="space-y-4">
            <AppLink className="flex items-center gap-3" href={SITE_ROUTES.home} navigate={navigate}>
              <span className="material-symbols-outlined text-xl text-primary/50">architecture</span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">
                Lys &amp; Layout
              </span>
            </AppLink>
            <p className="max-w-xs text-[10px] uppercase tracking-[0.3em] leading-relaxed">
              Architectural interiors shaped by atmosphere, material, and restraint.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 text-[10px] uppercase tracking-[0.3em] sm:grid-cols-3">
            <div className="space-y-4">
              <h5 className="font-black text-white">Navigate</h5>
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <AppLink
                    key={item.href}
                    className="transition-colors hover:text-primary"
                    href={item.href}
                    navigate={navigate}
                  >
                    {item.label}
                  </AppLink>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-black text-white">Connect</h5>
              <div className="flex flex-col gap-3">
                <AppLink
                  className="transition-colors hover:text-primary"
                  href={SITE_LINKS.instagram}
                  navigate={navigate}
                  rel="noreferrer"
                  target="_blank"
                >
                  Instagram
                </AppLink>
                <AppLink
                  className="transition-colors hover:text-primary"
                  href={SITE_LINKS.pinterest}
                  navigate={navigate}
                  rel="noreferrer"
                  target="_blank"
                >
                  Pinterest
                </AppLink>
                <AppLink
                  className="transition-colors hover:text-primary"
                  href={SITE_LINKS.linkedin}
                  navigate={navigate}
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </AppLink>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-black text-white">Legal</h5>
              <div className="flex flex-col gap-3">
                <AppLink
                  className="transition-colors hover:text-primary"
                  href={SITE_ROUTES.privacy}
                  navigate={navigate}
                >
                  Privacy Policy
                </AppLink>
                <AppLink
                  className="transition-colors hover:text-primary"
                  href={SITE_ROUTES.terms}
                  navigate={navigate}
                >
                  Terms of Service
                </AppLink>
                <AppLink className="transition-colors hover:text-primary" href={SITE_LINKS.inquiry} navigate={navigate}>
                  studio@lyslayout.com
                </AppLink>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] font-medium uppercase tracking-[0.2em] md:flex-row">
          <div>© 2026 Lys &amp; Layout. All Rights Reserved.</div>
          <div>Montreal, Quebec</div>
        </div>
      </div>
    </footer>
  )
}

function AtmosphereCtaSection({
  navigate,
  title = (
    <>
      Ready to define <br />
      your atmosphere?
    </>
  ),
  description = "Every great space begins with a conversation. Let's create something timeless together.",
  ctaLabel = 'Begin Your Project',
}) {
  return (
    <section className="relative overflow-hidden bg-background-dark py-20 sm:py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="mb-6 font-serif text-3xl text-white sm:text-4xl md:mb-8 md:text-6xl">{title}</h2>
        <p className="mb-10 text-base leading-relaxed text-slate-400 md:mb-12 md:text-lg">
          {description}
        </p>
        <AppLink
          className="rounded-full bg-primary px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-background-dark shadow-[0_0_40px_rgba(242,162,13,0.2)] transition-transform hover:scale-105 sm:px-12 sm:py-5 sm:text-sm"
          href={SITE_ROUTES.start}
          navigate={navigate}
        >
          {ctaLabel}
        </AppLink>
      </div>
    </section>
  )
}

function HomePage({ currentPath, navigate }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <SiteHeader currentPath={currentPath} navigate={navigate} />

      <main className="flex-1 pt-18 sm:pt-20">
        <section className="relative min-h-[38rem] w-full overflow-hidden md:h-[90vh]">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(18, 17, 14, 0.4), rgba(26, 22, 15, 0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5iVqdCVOIBUorunjUEf3N3ne0iMEF0NaxmkkN_iiAF3Ajt5Xik0vSnULRqyXAYXo43c2V-u8ineeY3JqmPhIprZTqqZn5dfwYkBeLaUtATZh66dPU5I1Y9m7d-z2MDT9b7xEkFjAXJFMIB78NxerqlFOVbcdOO_5-01lX4tdP8OH8LjR5sPfiWqszvV79qp4MUSDwHPulioT7GukdyB1qE727U_YuiJAxJd6HkkGoVWQGdctcFSDgHE1eIoTOUk7tEkpAQgyzj3M')",
            }}
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-16 text-center">
            <h1 className="mb-6 max-w-4xl font-serif text-4xl italic leading-tight text-white sm:text-5xl md:mb-8 md:text-8xl">
              Spaces Designed With Intention
            </h1>
            <p className="mb-8 max-w-xl text-base font-light leading-relaxed text-slate-300 sm:text-lg md:mb-10 md:text-xl">
              Luxury interior design based in Montreal, crafting cinematic environments with
              timeless elegance and shadow-play.
            </p>
            <AppLink
              className="group flex items-center gap-3 rounded-full border border-primary/40 bg-background-dark/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-primary hover:text-background-dark sm:px-8 sm:py-4 sm:text-sm"
              href={SITE_ROUTES.works}
              navigate={navigate}
            >
              Explore the Collection
              <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </AppLink>
          </div>
        </section>

        <section className="bg-carbon py-20 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-20">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="space-y-8">
                <h2 className="font-serif text-3xl text-white sm:text-4xl md:text-6xl">
                  The Poetry <br />
                  of Shadow
                </h2>
                <p className="max-w-lg text-base leading-loose text-slate-400 md:text-lg">
                  We believe in the power of negative space and the quiet confidence of minimalism.
                  Our designs are not just rooms; they are experiences curated with cinematic
                  lighting and a focus on tactile luxury.
                </p>
                <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">
                  {HOME_FEATURES.map((feature) => (
                    <div
                      key={feature.title}
                      className="flex flex-col gap-4 rounded-xl border border-primary/5 bg-espresso/30 p-6"
                    >
                      <span className="material-symbols-outlined text-3xl text-primary">
                        {feature.icon}
                      </span>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-500">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-primary/10">
                <img
                  alt="Philosophy"
                  className="h-full w-full object-cover opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxjFYMGAImCX7IVolmrQ34uX--FBEvc_qydpmvdSRGOyl-gmHVLnXwDcgk8k8MW4TM8TDRuASTUsNq_gLeanmEL-ii_9PrmjPymDI5tW_wIBtgFyhCxZEPtxnIU6Kn9M_Vh1YZzDFkwZqCdEqYh9mW8aBo3Si3gMP9hMjKATNDAg5CiqEUFBeG1ZYqs3sstMdlLy8rhplRq-MGs-WHEnS8PHIWeucUZPsBzStCKCpHRNqmN9s2VM2Qh660zZKF_ee6p_MHUb3Cg5w"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background-dark py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-20">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end md:mb-16">
              <h2 className="font-serif text-3xl text-white sm:text-4xl md:text-5xl">Selected Works</h2>
              <AppLink
                className="border-b border-primary/30 pb-1 text-sm font-bold uppercase tracking-widest text-primary"
                href={SITE_ROUTES.works}
                navigate={navigate}
              >
                View All
              </AppLink>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {WORK_PREVIEWS.slice(0, 3).map((work) => (
                <AppLink
                  key={work.key}
                  className={work.homeClass}
                  href={DETAIL_ROUTES[work.key]}
                  navigate={navigate}
                >
                  <img
                    alt={work.alt}
                    className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
                    src={WORK_DETAIL_CONTENT[work.key].mainImage}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <span className="mb-2 translate-y-4 text-xs font-bold uppercase tracking-[0.3em] text-primary opacity-0 transition-opacity duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {work.label}
                    </span>
                    <h3 className="font-serif text-2xl text-white">{work.title}</h3>
                  </div>
                </AppLink>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-carbon py-24 md:py-40">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-14 text-center md:mb-20">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                Our Expertise
              </span>
              <h2 className="mt-4 font-serif text-3xl text-white sm:text-4xl md:text-5xl">Bespoke Services</h2>
            </div>
            <div className="space-y-12">
              <div className="brass-divider w-full" />
              {SERVICES_OVERVIEW.map((service) => (
                <div key={service.number}>
                  <AppLink
                    className="group flex flex-col justify-between gap-6 md:flex-row md:items-center"
                    href={SITE_ROUTES.services}
                    navigate={navigate}
                  >
                    <span className="font-mono text-slate-500">{service.number}</span>
                    <h3 className="font-serif text-2xl text-white transition-colors group-hover:text-primary md:text-3xl">
                      {service.title}
                    </h3>
                    <p className="max-w-xs text-sm text-slate-400">{service.description}</p>
                  </AppLink>
                  <div className="brass-divider mt-12 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <AtmosphereCtaSection navigate={navigate} />
      </main>

      <SiteFooter navigate={navigate} />
    </div>
  )
}

function SelectedWorksPage({ currentPath, navigate }) {
  const [expandedWork, setExpandedWork] = useState(null)

  function handleWorkCardClick(event, workKey) {
    if (window.matchMedia('(min-width: 768px)').matches) {
      return
    }

    if (expandedWork === workKey) {
      return
    }

    event.preventDefault()
    setExpandedWork(workKey)
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <SiteHeader currentPath={currentPath} navigate={navigate} />

      <main className="flex-1 pt-28 md:pt-32">
        <div className="mx-auto mb-16 max-w-[1800px] px-6 md:mb-24 lg:px-20 lg:mb-32">
          <div className="max-w-xl">
            <h1 className="mb-6 font-serif text-4xl text-white sm:text-5xl md:text-7xl">Selected Works</h1>
            <div className="mb-6 h-px w-12 bg-primary/40" />
            <p className="text-sm font-light leading-relaxed tracking-wide text-slate-400">
              A curated exhibition of cinematic interiors, defined by the interplay of shadow,
              texture, and Montreal&apos;s architectural soul.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[1800px] px-6 pb-20 md:pb-32 lg:px-20">
          <div className="columns-1 gap-12 md:columns-2 lg:columns-3 lg:gap-20">
            {WORK_PREVIEWS.map((work, index) => (
              <AppLink
                key={work.key}
                className={`masonry-column group block cursor-pointer ${
                  index === 1 ? 'pt-12' : ''
                } ${work.key === 'pins' ? 'lg:mt-24' : ''}`}
                href={DETAIL_ROUTES[work.key]}
                navigate={navigate}
                onClick={(event) => handleWorkCardClick(event, work.key)}
              >
                <div className={work.workClass}>
                  <img
                    alt={work.title}
                    className="h-full w-full object-cover opacity-80 transition-all duration-1000 ease-out group-hover:scale-105"
                    src={WORK_DETAIL_CONTENT[work.key].mainImage}
                  />
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center bg-work-carbon/60 p-8 text-center backdrop-blur-[2px] transition-opacity duration-500 ${
                      expandedWork === work.key
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <h3 className="mb-2 translate-y-4 font-serif text-3xl text-white transition-transform duration-500 group-hover:translate-y-0">
                      {work.title}
                    </h3>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.3em] text-primary transition-opacity delay-100 ${
                        expandedWork === work.key
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {work.location}
                    </p>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary md:hidden">
                      Tap again to open
                    </p>
                  </div>
                </div>
              </AppLink>
            ))}
          </div>
        </div>

        <AtmosphereCtaSection
          description="If one of these spaces feels close to your brief, the next step is turning that instinct into a clear direction."
          navigate={navigate}
          title={
            <>
              Found a project that <br />
              speaks your language?
            </>
          }
        />
      </main>

      <SiteFooter navigate={navigate} />
    </div>
  )
}

function WorkDetailPage({ currentPath, navigate, workKey }) {
  const content = WORK_DETAIL_CONTENT[workKey] || WORK_DETAIL_CONTENT.obsidian

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <SiteHeader currentPath={currentPath} navigate={navigate} />

      <main className="flex-1 pt-20">
        <section className="relative min-h-[34rem] w-full md:h-screen">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: content.heroImage,
            }}
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-16 text-center sm:pb-20 md:pb-24">
            <span className="mb-4 text-xs font-bold uppercase tracking-[0.5em] text-primary">
              {content.projectLabel}
            </span>
            <h1 className="mb-4 font-serif text-4xl text-white sm:text-6xl md:text-9xl">{content.title}</h1>
            <p className="text-xs font-light uppercase tracking-[0.2em] text-slate-400 sm:text-sm sm:tracking-widest">
              {content.heroMeta}
            </p>
          </div>
        </section>

        <section className="bg-carbon py-16 md:py-24 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-20">
            <div className="grid items-start gap-10 md:gap-16 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="font-serif text-2xl italic leading-tight text-white sm:text-3xl md:text-5xl lg:text-6xl">
                  {content.quote}
                </h2>
              </div>
              <div className="lg:col-span-4 lg:pl-12">
                <div className="space-y-6 border-t border-primary/20 pt-6 md:space-y-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <div>
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                      Location
                    </h4>
                    <p className="font-medium text-slate-300">{content.location}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                      Scope
                    </h4>
                    <p className="font-medium text-slate-300">{content.scope}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                      Type
                    </h4>
                    <p className="font-medium text-slate-300">{content.type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background-dark pb-24 md:pb-40">
          <div className="mx-auto max-w-7xl space-y-14 px-6 md:space-y-32 lg:px-20">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-t-[120px] border border-white/5 sm:rounded-t-[200px] md:rounded-t-[500px]">
              <img alt="Interior view" className="h-full w-full object-cover" src={content.mainImage} />
            </div>

            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-20">
              <div className="md:col-span-7">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/5">
                  <img alt="Detail view" className="h-full w-full object-cover" src={content.detailImage} />
                </div>
              </div>
              <div className="flex flex-col gap-8 md:col-span-5 md:gap-12">
                <div className="aspect-square overflow-hidden rounded-full border border-white/5 p-2">
                  <div className="h-full w-full overflow-hidden rounded-full">
                    <img
                      alt="Material detail"
                      className="h-full w-full object-cover"
                      src={content.materialImage}
                    />
                  </div>
                </div>
                <p className="text-base font-light italic leading-relaxed text-slate-500 md:text-lg lg:pl-10">
                  {content.bodyNote}
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-4 bg-primary/5 opacity-0 blur-3xl transition-opacity duration-1000 group-hover:opacity-100" />
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/5">
                <img
                  alt="Wide architectural shot"
                  className="h-full w-full object-cover"
                  src={content.wideImage}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-carbon py-24 md:py-40">
          <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[150px]" />
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <span className="mb-6 block text-xs font-bold uppercase tracking-[0.5em] text-primary">
              The Next Chapter
            </span>
            <h2 className="mb-8 font-serif text-3xl leading-tight text-white sm:text-5xl md:mb-10 md:text-7xl">
              Bring your vision <br />
              into the light.
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base font-light text-slate-400 md:mb-12 md:text-lg">
              Currently accepting select commissions for 2026. Let us curate your atmosphere.
            </p>
            <AppLink
              className="rounded-full bg-primary px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-background-dark shadow-[0_0_60px_rgba(242,162,13,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_80px_rgba(242,162,13,0.5)] sm:px-14 sm:py-6 sm:text-xs"
              href={SITE_ROUTES.start}
              navigate={navigate}
            >
              Start Your Project
            </AppLink>
          </div>
        </section>
      </main>

      <SiteFooter navigate={navigate} />
    </div>
  )
}

function AboutPage({ currentPath, navigate }) {
  const recognitionRef = useRef(null)

  function scrollRecognition(direction) {
    recognitionRef.current?.scrollBy({
      left: direction * 360,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <SiteHeader currentPath={currentPath} navigate={navigate} />

      <main className="flex-1 pt-20">
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 md:min-h-[80vh] md:pb-20 md:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,162,13,0.08)_0%,transparent_70%)]" />
          <div className="relative z-10 max-w-4xl text-center">
            <span className="mb-8 block text-xs font-bold uppercase tracking-[0.6em] text-primary">
              Atmospheric &amp; Sculptural
            </span>
            <h1 className="mb-8 font-serif text-4xl leading-[1.1] text-white sm:text-5xl md:mb-10 md:text-8xl">
              The poetry of <br />
              <span className="italic">silent spaces.</span>
            </h1>
            <div className="mx-auto h-24 w-px bg-gradient-to-b from-primary/60 to-transparent" />
          </div>
        </section>

        <section className="overflow-hidden bg-carbon/50 px-6 py-20 md:py-32 lg:py-48">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="relative flex h-[320px] items-center justify-center sm:h-[420px] md:h-[520px] lg:h-[600px]">
                <div className="absolute left-1/2 top-1/2 z-20 h-56 w-40 -translate-x-[70%] -translate-y-[60%] overflow-hidden rounded-full border border-white/10 sm:h-72 sm:w-48 md:h-96 md:w-64 md:-translate-x-12 md:-translate-y-8">
                  <img
                    alt="Detail"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqiF5zpDu4TcrApPUlKc087B4W10trwzmp10nife41HT6tX7JPnrcUDBReia9AJcsi18NgAAcr0xLNwgMopGQ7Bhma8fIIjlhS57q9DtVmRl7-3xq8eAanGtYtR7KHfowaOzjKnq1xlpvqG4VxH0NDF2f5jZpnNuoZYipFGdnfH7EmY5jnYiiDs1GSNMf4CowkFI6OuAO-EiGXV3NLUVuaNmAOnZbRA8C2l_q5Hxg72wSa0iMZtFnK7IzoW_HpvR4IxWdEj_I2oqY"
                  />
                </div>
                <div className="absolute left-1/2 top-1/2 z-10 h-[280px] w-52 -translate-x-[10%] -translate-y-[5%] overflow-hidden rounded-t-full border border-white/10 opacity-80 sm:h-[360px] sm:w-64 md:h-[500px] md:w-80 md:translate-x-16 md:translate-y-12">
                  <img
                    alt="Arch portrait"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxjFYMGAImCX7IVolmrQ34uX--FBEvc_qydpmvdSRGOyl-gmHVLnXwDcgk8k8MW4TM8TDRuASTUsNq_gLeanmEL-ii_9PrmjPymDI5tW_wIBtgFyhCxZEPtxnIU6Kn9M_Vh1YZzDFkwZqCdEqYh9mW8aBo3Si3gMP9hMjKATNDAg5CiqEUFBeG1ZYqs3sstMdlLy8rhplRq-MGs-WHEnS8PHIWeucUZPsBzStCKCpHRNqmN9s2VM2Qh660zZKF_ee6p_MHUb3Cg5w"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-[120px]" />
              </div>

              <div className="space-y-8 lg:pl-10">
                <h2 className="font-serif text-3xl italic text-white sm:text-4xl md:text-5xl">
                  Curated by Intention.
                </h2>
                <div className="space-y-5 text-base font-light leading-relaxed text-slate-400 md:text-lg">
                  <p>
                    Founded by Julianne Lys, the studio was born from a desire to strip away the
                    superfluous and focus on the visceral connection between human and habitat.
                  </p>
                  <p>
                    Our philosophy is rooted in the Atmospheric Sculptural: the belief that a room
                    should feel as intentional and permanent as a piece of fine art, yet as intimate
                    as a whisper.
                  </p>
                </div>
                <div className="pt-6">
                  <AppLink className="group flex items-center gap-4" href={SITE_ROUTES.journal} navigate={navigate}>
                    <div className="h-px w-12 bg-primary/40 transition-all duration-500 group-hover:w-20" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">
                      Full Bio
                    </span>
                  </AppLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-about-background-dark py-20 md:py-32 lg:py-48">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-24 text-center">
              <h2 className="mb-6 font-serif text-3xl text-white sm:text-4xl md:text-6xl">The Three Pillars</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
                Our foundational approach
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: 'Atmosphere',
                  description:
                    'The manipulation of light and shadow to evoke a specific emotional resonance.',
                  image: WORK_DETAIL_CONTENT.obsidian.mainImage,
                },
                {
                  title: 'Materiality',
                  description:
                    'Honest expressions of stone, wood, and metal in their most tactile forms.',
                  image: WORK_DETAIL_CONTENT.arches.mainImage,
                  className: 'md:translate-y-12',
                },
                {
                  title: 'Intention',
                  description:
                    "Every line, curve, and void serves a purpose for the inhabitant's journey.",
                  image: WORK_DETAIL_CONTENT.pins.mainImage,
                },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className={`group relative aspect-[3/4] overflow-hidden rounded-2xl ${
                    pillar.className || ''
                  }`}
                >
                  <img
                    alt={pillar.title}
                    className="h-full w-full scale-105 object-cover grayscale transition-all duration-1000 hover:grayscale-0 group-hover:scale-100"
                    src={pillar.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-about-background-dark via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="mb-3 font-serif text-2xl text-white sm:text-3xl">{pillar.title}</h3>
                    <p className="text-xs font-light uppercase leading-relaxed tracking-widest text-slate-300">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-carbon py-20 md:py-32 lg:py-48" id="recognition">
          <div className="mx-auto mb-16 flex max-w-7xl items-end justify-between gap-8 px-6">
            <div>
              <h2 className="font-serif text-4xl italic text-white">Recognition</h2>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                Features &amp; Publications
              </p>
            </div>
            <div className="hidden gap-4 md:flex">
              <button
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition-colors hover:border-primary/30 hover:text-primary"
                onClick={() => scrollRecognition(-1)}
                type="button"
              >
                <span className="material-symbols-outlined">west</span>
              </button>
              <button
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition-colors hover:border-primary/30 hover:text-primary"
                onClick={() => scrollRecognition(1)}
                type="button"
              >
                <span className="material-symbols-outlined">east</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="brass-line absolute left-0 top-1/2 z-0 w-full" />
            <div
              ref={recognitionRef}
              className="hide-scrollbar relative z-10 flex gap-6 overflow-x-auto px-6 md:gap-12 lg:px-[calc((100vw-80rem)/2)]"
            >
              {RECOGNITION_ITEMS.map((item) => (
                <article
                  key={item.title}
                  className="group w-[17rem] flex-none space-y-5 border border-white/5 bg-about-background-dark p-6 transition-all hover:border-primary/20 sm:w-80 sm:space-y-6 sm:p-10"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {item.publication}
                  </p>
                  <h4 className="font-serif text-2xl italic text-white">{item.title}</h4>
                  <div className="h-px w-8 bg-primary/40 transition-all duration-700 group-hover:w-full" />
                  <p className="text-sm font-light text-slate-400">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative flex items-center justify-center overflow-hidden bg-about-background-dark py-24 text-center md:py-48">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,162,13,0.15)_0%,transparent_60%)]" />
          <div className="relative z-10 max-w-2xl px-6">
            <h2 className="mb-10 font-serif text-3xl italic leading-tight text-white sm:text-5xl md:mb-12 md:text-7xl">
              Evolve your space.
            </h2>
            <AppLink
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-4 text-xs font-black text-about-background-dark shadow-[0_0_80px_-10px_rgba(242,162,13,0.5)] transition-all duration-300 hover:scale-105 sm:px-16 sm:py-8"
              href={SITE_ROUTES.start}
              navigate={navigate}
            >
              <span className="relative text-xs uppercase tracking-[0.4em]">Start Your Project</span>
            </AppLink>
          </div>
        </section>
      </main>

      <SiteFooter navigate={navigate} tone="about" />
    </div>
  )
}

function JournalPage({ currentPath, navigate }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <SiteHeader currentPath={currentPath} navigate={navigate} />

      <main className="flex-1 pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-24 lg:px-20">
          <div className="mb-20 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-primary">
              Journal &amp; Press
            </p>
            <h1 className="mb-8 font-serif text-4xl text-white sm:text-5xl md:text-7xl">
              Notes on atmosphere, material, and restraint.
            </h1>
            <p className="text-base leading-relaxed text-slate-400 md:text-lg">
              A running collection of studio observations, project features, and references that
              inform the Lys &amp; Layout approach to interior design.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {JOURNAL_ENTRIES.map((entry) => (
              <AppLink
                key={entry.title}
                className="group block border border-white/5 bg-carbon/70 p-6 transition-colors hover:border-primary/20 sm:p-8 md:p-10"
                href={entry.href}
                navigate={navigate}
              >
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  {entry.tag}
                </p>
                <h2 className="mb-4 font-serif text-2xl text-white sm:text-3xl">{entry.title}</h2>
                <p className="mb-8 text-sm leading-relaxed text-slate-400">{entry.description}</p>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-colors group-hover:text-primary">
                  {entry.cta}
                </span>
              </AppLink>
            ))}
          </div>
        </div>

        <AtmosphereCtaSection
          ctaLabel="Start Your Project"
          description="When the references are clear and the direction feels right, we can shape those ideas into a space with substance."
          navigate={navigate}
          title={
            <>
              Ready to move from <br />
              inspiration to action?
            </>
          }
        />
      </main>

      <SiteFooter navigate={navigate} tone="about" />
    </div>
  )
}

function PolicyPage({ currentPath, navigate, type }) {
  const isPrivacy = type === 'privacy'

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <SiteHeader currentPath={currentPath} navigate={navigate} />

      <main className="flex-1 px-6 pb-20 pt-28 md:pb-24 md:pt-32 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-primary">Legal</p>
          <h1 className="mb-8 font-serif text-4xl text-white sm:text-5xl md:text-7xl">
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </h1>
          <div className="space-y-6 border border-white/5 bg-carbon/60 p-6 text-slate-400 sm:p-8 md:space-y-8 md:p-10">
            <p>
              {isPrivacy
                ? 'Lys & Layout collects inquiry details only to review project requests, respond to consultations, and manage client communication.'
                : 'All project timelines, fees, and deliverables are defined through individual client agreements following an accepted inquiry.'}
            </p>
            <p>
              {isPrivacy
                ? 'Files shared through the inquiry process are treated as confidential reference material and are used only for internal project evaluation.'
                : 'Design concepts, drawings, and curated specifications remain the property of the studio until transferred through a signed agreement.'}
            </p>
            <p>
              {isPrivacy
                ? 'For any questions regarding stored information or inquiry submissions, contact the studio directly.'
                : 'For service questions, engagement terms, or project scope clarification, contact the studio before submitting an inquiry.'}
            </p>
            <AppLink
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:text-primary"
              href={SITE_LINKS.inquiry}
              navigate={navigate}
            >
              studio@lyslayout.com
            </AppLink>
          </div>
        </div>
      </main>

      <SiteFooter navigate={navigate} />
    </div>
  )
}

function ServicesPage({ currentPath, navigate }) {
  const [expandedService, setExpandedService] = useState(null)

  function handleServiceInteraction(serviceNumber) {
    if (window.matchMedia('(min-width: 768px)').matches) {
      navigate(SITE_ROUTES.start)
      return
    }

    if (expandedService === serviceNumber) {
      navigate(SITE_ROUTES.start)
      return
    }

    setExpandedService(serviceNumber)
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <SiteHeader
        actionHref={SITE_ROUTES.start}
        actionLabel="Inquire"
        currentPath={currentPath}
        navigate={navigate}
      />

      <main className="mx-auto flex-1 max-w-7xl px-6 py-16 pt-28 md:py-20 md:pt-32">
        <section className="mb-20 text-center md:mb-32">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Montreal Interior Design
          </span>
          <h1 className="mb-8 text-4xl font-light tracking-tight sm:text-5xl md:text-7xl">
            The Art of <span className="font-serif italic">Living Well</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Refined, bespoke interiors crafted for the discerning eye. We believe in the power of
            quiet luxury and structural integrity.
          </p>
        </section>

        <section className="mb-24 md:mb-40" id="journey">
          <div className="flex flex-col border-y border-slate-800">
            {SERVICE_ITEMS.map((service) => (
              <button
                key={service.number}
                aria-expanded={expandedService === service.number}
                className="group relative overflow-hidden border-b border-slate-800 text-left transition-all duration-500 last:border-b-0 hover:bg-primary/5"
                onClick={() => handleServiceInteraction(service.number)}
                type="button"
              >
                <div className="flex items-center justify-between gap-6 px-4 py-8 md:px-12 md:py-12">
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
                    <span className="font-mono text-sm text-slate-600">{service.number}</span>
                    <h3 className="text-2xl font-light transition-transform duration-500 group-hover:translate-x-4 sm:text-3xl md:text-4xl">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 md:gap-8">
                    <p className="hidden max-w-sm text-sm leading-relaxed text-slate-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                      {service.description}
                    </p>
                    <span className="material-symbols-outlined text-primary transition-transform group-hover:rotate-45">
                      arrow_forward
                    </span>
                  </div>
                </div>
                <div
                  className={`overflow-hidden px-4 transition-all duration-500 md:hidden ${
                    expandedService === service.number ? 'max-h-[420px] pb-6' : 'max-h-0'
                  }`}
                >
                  <div className="rounded-2xl border border-primary/10 bg-black/10 p-4">
                    <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl">
                      <img
                        alt={service.title}
                        className="h-full w-full object-cover"
                        src={service.image}
                      />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">{service.description}</p>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                      Tap again to inquire
                    </p>
                  </div>
                </div>
                <div className="absolute right-24 top-1/2 hidden h-64 w-48 -translate-y-1/2 translate-x-12 overflow-hidden rounded bg-slate-800 shadow-2xl opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
                  <img
                    alt={service.title}
                    className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
                    src={service.image}
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-24 md:mb-40">
          <h2 className="mb-14 text-center text-2xl font-light uppercase tracking-[0.2em] md:mb-20 md:text-3xl">
            The Journey
          </h2>
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="absolute left-0 top-[22px] hidden h-[1px] w-full bg-gradient-to-r from-transparent via-brass/40 to-transparent md:block" />

            {JOURNEY_STEPS.map((item) => (
              <div key={item.number} className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex size-11 items-center justify-center rounded-full border border-brass bg-services-background-dark dark:bg-services-background-dark">
                  <span className="text-xs font-bold text-brass">{item.number}</span>
                </div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">{item.title}</h4>
                <p className="max-w-[180px] text-xs leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] bg-background-dark py-20 md:py-32">
          <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
            <p className="mb-6 text-sm font-medium italic text-primary/80">By private appointment only</p>
            <h2 className="mb-6 font-serif text-3xl text-white sm:text-4xl md:mb-8 md:text-6xl">
              Begin your consultation
            </h2>
            <p className="mb-10 text-base text-slate-400 md:mb-12 md:text-lg">
              Every refined interior begins with a clear brief, a strong point of view, and the
              right conversation.
            </p>
            <AppLink
              className="rounded-full bg-primary px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-background-dark shadow-[0_0_40px_rgba(242,162,13,0.2)] transition-transform hover:scale-105 sm:px-12 sm:py-5 sm:text-sm"
              href={SITE_ROUTES.start}
              navigate={navigate}
            >
              Begin Your Project
            </AppLink>
            <p className="mt-12 text-xs uppercase tracking-widest text-slate-500">
              Montreal - New York - Paris
            </p>
          </div>
        </section>
      </main>

      <SiteFooter navigate={navigate} tone="light" />
    </div>
  )
}

function StartProjectPage({ currentPath, inquiryState, navigate, setInquiryState, step }) {
  const stepIndex = START_PROJECT_ORDER.indexOf(step)
  const totalSteps = START_PROJECT_ORDER.length
  const progressWidth = `${((stepIndex + 1) / totalSteps) * 100}%`
  const previousRoute =
    stepIndex === 0 ? SITE_ROUTES.services : START_PROJECT_ROUTES[START_PROJECT_ORDER[stepIndex - 1]]
  const nextRoute =
    stepIndex === totalSteps - 1 ? null : START_PROJECT_ROUTES[START_PROJECT_ORDER[stepIndex + 1]]
  const canContinue = canContinueStep(step, inquiryState)

  function updateInquiryState(patch) {
    setInquiryState((currentState) => ({
      ...currentState,
      ...patch,
    }))
  }

  function handleQuickSelect(field, value, route) {
    updateInquiryState({ [field]: value })
    navigate(route)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!canContinueStep('submission', inquiryState)) {
      return
    }

    window.location.href = buildMailtoLink(inquiryState)
  }

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col">
        <SiteHeader currentPath={currentPath} navigate={navigate} />

        <main className="flex flex-1 flex-col items-center px-6 pb-16 pt-28 md:justify-center md:pb-20 md:pt-32">
          <div className="w-full max-w-5xl">
            <div className="relative mb-12 h-[2px] w-full overflow-hidden bg-white/5 md:mb-24">
              <div
                className="progress-glow absolute left-0 top-0 h-full bg-primary transition-all duration-700"
                style={{ width: progressWidth }}
              />
            </div>

            {step === 'typology' && (
              <>
                <div className="mb-12 text-center md:mb-16">
                  <h1 className="mb-4 font-serif text-4xl text-white sm:text-5xl md:mb-6 md:text-7xl">Start Your Project</h1>
                  <p className="text-xs font-light uppercase tracking-widest text-slate-400">
                    Step 1 of 5: Project Typology
                  </p>
                </div>
                <div className="step-card brass-border mx-auto max-w-3xl rounded-3xl p-6 sm:p-8 md:p-16">
                  <h3 className="mb-8 text-center font-serif text-xl text-white sm:text-2xl md:mb-12 md:text-3xl">
                    How shall we categorize your vision?
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                    {TYPOLOGY_OPTIONS.map((option) => {
                      const isActive = inquiryState.projectType === option.value

                      return (
                        <button
                          key={option.value}
                          className={`group brass-border arch-frame relative flex flex-col items-center gap-6 bg-white/5 p-1 text-left transition-all duration-500 hover:bg-white/10 ${
                            isActive ? 'ring-1 ring-primary/50' : ''
                          }`}
                          onClick={() => handleQuickSelect('projectType', option.value, START_PROJECT_ROUTES.location)}
                          type="button"
                        >
                          <div className="arch-frame aspect-[4/5] w-full overflow-hidden">
                            <img
                              alt={option.value}
                              className="h-full w-full scale-110 object-cover grayscale transition-all duration-700 group-hover:scale-100 group-hover:grayscale-0"
                              src={option.image}
                            />
                          </div>
                          <div className="pb-8">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 transition-colors group-hover:text-primary">
                              {option.value}
                            </span>
                          </div>
                          <div className="arch-frame pointer-events-none absolute inset-0 border border-primary/0 transition-all group-hover:border-primary/40" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            {step === 'location' && (
              <>
                <div className="mb-12 text-center md:mb-16">
                  <h1 className="mb-4 font-serif text-4xl text-white sm:text-5xl md:mb-6 md:text-7xl">Start Your Project</h1>
                  <p className="text-xs font-light uppercase tracking-widest text-slate-400">
                    Step 2 of 5: Location &amp; Context
                  </p>
                </div>
                <div className="step-card brass-border mx-auto max-w-2xl rounded-3xl p-6 sm:p-8 md:p-16">
                  <h3 className="mb-8 text-center font-serif text-xl text-white sm:text-2xl md:mb-12 md:text-3xl">
                    Where is your vision taking shape?
                  </h3>
                  <div className="space-y-8 md:space-y-10">
                    <div className="space-y-3">
                      <label
                        className="ml-1 block text-[10px] font-bold uppercase tracking-[0.4em] text-white/40"
                        htmlFor="project-city"
                      >
                        City
                      </label>
                      <input
                        className="custom-input w-full rounded-xl px-6 py-5 font-light tracking-wide text-stone-warm placeholder:text-white/10"
                        id="project-city"
                        onChange={(event) => updateInquiryState({ city: event.target.value })}
                        placeholder="e.g. Montreal, QC"
                        type="text"
                        value={inquiryState.city}
                      />
                    </div>
                    <div className="space-y-3">
                      <label
                        className="ml-1 block text-[10px] font-bold uppercase tracking-[0.4em] text-white/40"
                        htmlFor="property-type"
                      >
                        Property Type
                      </label>
                      <input
                        className="custom-input w-full rounded-xl px-6 py-5 font-light tracking-wide text-stone-warm placeholder:text-white/10"
                        id="property-type"
                        onChange={(event) => updateInquiryState({ propertyType: event.target.value })}
                        placeholder="e.g. Penthouse, Heritage Home, Retail Space"
                        type="text"
                        value={inquiryState.propertyType}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 'timeline' && (
              <>
                <div className="mb-12 text-center md:mb-16">
                  <h1 className="mb-4 font-serif text-4xl text-white sm:text-5xl md:mb-6 md:text-7xl">Start Your Project</h1>
                  <p className="text-xs font-light uppercase tracking-widest text-slate-400">
                    Step 3 of 5: Timeline
                  </p>
                </div>
                <div className="step-card brass-border mx-auto max-w-3xl rounded-3xl p-6 sm:p-8 md:p-16">
                  <h3 className="mb-8 text-center font-serif text-xl text-white sm:text-2xl md:mb-12 md:text-3xl">
                    What is your intended timeline?
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {TIMELINE_OPTIONS.map((option) => {
                      const isActive = inquiryState.timeline === option.value

                      return (
                        <button
                          key={option.value}
                          className={`selection-tile rounded-2xl p-8 text-center ${
                            isActive ? 'active' : ''
                          }`}
                          onClick={() => handleQuickSelect('timeline', option.value, START_PROJECT_ROUTES.budget)}
                          type="button"
                        >
                          <span className="mb-2 block font-serif text-xl text-white">{option.value}</span>
                          <span className="text-[10px] font-medium uppercase leading-relaxed tracking-wider text-stone-warm">
                            {option.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            {step === 'budget' && (
              <>
                <div className="mb-12 text-center md:mb-16">
                  <h1 className="mb-4 font-serif text-4xl text-white sm:text-5xl md:mb-6 md:text-7xl">Start Your Project</h1>
                  <p className="text-xs font-light uppercase tracking-widest text-slate-400">
                    Step 4 of 5: Budget Range
                  </p>
                </div>
                <div className="step-card brass-border mx-auto max-w-4xl rounded-3xl p-6 sm:p-8 md:p-16">
                  <h3 className="mb-8 text-center font-serif text-xl text-white sm:text-2xl md:mb-12 md:text-3xl">
                    What is your intended investment?
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {BUDGET_OPTIONS.map((option) => {
                      const isActive = inquiryState.budget === option.value

                      return (
                        <button
                          key={option.value}
                          className={`selection-tile rounded-2xl p-8 text-center ${
                            isActive ? 'active' : ''
                          }`}
                          onClick={() => handleQuickSelect('budget', option.value, START_PROJECT_ROUTES.submission)}
                          type="button"
                        >
                          <span className="mb-3 block font-serif text-xl text-white">{option.value}</span>
                          <span className="text-[9px] font-medium uppercase leading-relaxed tracking-wider text-stone-warm">
                            {option.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            {step === 'submission' && (
              <>
                <div className="mb-12 text-center md:mb-16">
                  <h1 className="mb-4 font-serif text-4xl text-white sm:text-5xl md:mb-6 md:text-7xl">
                    Share Your Vision &amp; Contact Details
                  </h1>
                  <p className="text-xs font-light uppercase tracking-widest text-slate-400">
                    Step 5 of 5: Project Submission
                  </p>
                </div>
                <form className="step-card brass-border mx-auto max-w-3xl rounded-3xl p-6 sm:p-8 md:p-16" onSubmit={handleSubmit}>
                  <div className="mb-10 rounded-2xl border border-primary/10 bg-black/10 p-6">
                    <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                      Inquiry Summary
                    </h4>
                    <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                      <p>Project Type: {inquiryState.projectType || 'Not selected yet'}</p>
                      <p>City: {inquiryState.city || 'Not entered yet'}</p>
                      <p>Property Type: {inquiryState.propertyType || 'Not entered yet'}</p>
                      <p>Timeline: {inquiryState.timeline || 'Not selected yet'}</p>
                      <p className="md:col-span-2">Budget: {inquiryState.budget || 'Not selected yet'}</p>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h4 className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                      Upload Inspiration
                    </h4>
                    <label
                      className="arched-upload group flex cursor-pointer flex-col items-center justify-center p-12"
                      htmlFor="project-upload"
                    >
                      <span className="material-symbols-outlined mb-4 text-4xl text-primary/40 transition-colors group-hover:text-primary">
                        cloud_upload
                      </span>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-warm">
                        Drag &amp; Drop Moodboards or Photos
                      </p>
                      <p className="text-[9px] uppercase tracking-wider text-white/20">
                        Supported formats: JPG, PNG, PDF (Max 10MB)
                      </p>
                    </label>
                    <input
                      className="hidden"
                      id="project-upload"
                      multiple
                      onChange={(event) =>
                        updateInquiryState({
                          fileNames: Array.from(event.target.files || []).map((file) => file.name),
                        })
                      }
                      type="file"
                    />
                    {inquiryState.fileNames.length > 0 && (
                      <div className="mt-6 space-y-2 text-xs uppercase tracking-[0.2em] text-stone-warm">
                        {inquiryState.fileNames.map((fileName) => (
                          <p key={fileName}>{fileName}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mb-12 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">
                      Client Details
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>

                  <div className="space-y-6">
                    <input
                      className="premium-input w-full rounded-full px-8 py-5 text-xs font-medium tracking-wide placeholder:text-stone-warm/40"
                      onChange={(event) => updateInquiryState({ fullName: event.target.value })}
                      placeholder="Full Name"
                      type="text"
                      value={inquiryState.fullName}
                    />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <input
                        className="premium-input w-full rounded-full px-8 py-5 text-xs font-medium tracking-wide placeholder:text-stone-warm/40"
                        onChange={(event) => updateInquiryState({ email: event.target.value })}
                        placeholder="Email Address"
                        type="email"
                        value={inquiryState.email}
                      />
                      <input
                        className="premium-input w-full rounded-full px-8 py-5 text-xs font-medium tracking-wide placeholder:text-stone-warm/40"
                        onChange={(event) => updateInquiryState({ phone: event.target.value })}
                        placeholder="Phone Number"
                        type="tel"
                        value={inquiryState.phone}
                      />
                    </div>
                    <textarea
                      className="premium-input min-h-40 w-full rounded-3xl px-8 py-6 text-xs font-medium tracking-wide placeholder:text-stone-warm/40"
                      onChange={(event) => updateInquiryState({ message: event.target.value })}
                      placeholder="Tell us about the atmosphere you want to create, the problems you need solved, and any references that matter."
                      value={inquiryState.message}
                    />
                  </div>
                </form>
              </>
            )}

            <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:mt-20 sm:flex-row sm:gap-12">
              <AppLink
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 transition-colors hover:text-white"
                href={previousRoute}
                navigate={navigate}
              >
                Back
              </AppLink>

              {nextRoute ? (
                <button
                  className={`glow-button w-full rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all sm:w-auto sm:px-14 sm:py-6 sm:text-xs ${
                    canContinue
                      ? 'bg-primary text-background-dark'
                      : 'cursor-not-allowed bg-primary/30 text-background-dark/60'
                  }`}
                  disabled={!canContinue}
                  onClick={() => navigate(nextRoute)}
                  type="button"
                >
                  Continue
                </button>
              ) : (
                <button
                  className={`glow-button w-full rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all sm:w-auto sm:px-14 sm:py-6 sm:text-xs ${
                    canContinue
                      ? 'bg-primary text-background-dark'
                      : 'cursor-not-allowed bg-primary/30 text-background-dark/60'
                  }`}
                  disabled={!canContinue}
                  onClick={handleSubmit}
                  type="button"
                >
                  Submit Project Inquiry
                </button>
              )}
            </div>

            <div className="mt-16 text-center md:mt-24">
              <p className="text-[10px] uppercase tracking-[0.4em] leading-relaxed text-white/30">
                Our selective intake process ensures we maintain the highest <br />
                standards of bespoke architectural design.
              </p>
            </div>
          </div>
        </main>

        <SiteFooter navigate={navigate} tone="flow" />
      </div>

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute right-0 top-0 h-[260px] w-[260px] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/5 blur-[120px] sm:h-[500px] sm:w-[500px]" />
        <div className="absolute bottom-0 left-0 h-[260px] w-[260px] -translate-x-1/3 translate-y-1/2 rounded-full bg-primary/5 blur-[120px] sm:h-[500px] sm:w-[500px]" />
      </div>
    </>
  )
}

export default App
